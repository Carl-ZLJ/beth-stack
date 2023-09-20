import { Database } from "bun:sqlite";
import { Todo } from "../types";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


const todos = sqliteTable('todos', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    content: text('content').notNull(),
    done: integer('done', { mode: 'boolean' }).notNull().default(false),
})

type Todos = typeof todos


const db = new Database("todos.sqlite", { create: true })


type TodoDB = {
    id: number,
    content: string,
    done: 0 | 1,
}


function createTodosTable() {
    const sql_create = `
        CREATE TABLE IF NOT EXISTS 'todos' (
        'id' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        'content' TEXT NOT NULL,
        'done' INTEGER NOT NULL
        )
    `

    db.run(sql_create)
}


function createDataIdTable() {
    const sql_create = `
        CREATE TABLE IF NOT EXISTS 'data_id' (
        'id' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        'name' TEXT NOT NULL,
        'last_id' INTEGER NOT NULL
        )
    `

    db.run(sql_create)
}


function next_id(name: string) {
    const query = db.query(`
        SELECT last_id
        FROM data_id
        WHERE name = ?
    `)

    let id = Number((query.get(name) as { last_id: string }).last_id) ?? 0

    id++

    db.query(`
        UPDATE 'data_id'
        SET last_id = ?
        WHERE name = ?
    `).run(id, name)

    return id
}


function newTodo(content: string, done: boolean = false) {
    const query = db.query(`
        INSERT INTO 'todos' ('id', 'content', 'done')
        VALUES (?, ?, ?)
    `)
    const id = next_id('todos')
    query.run(id, content, done ? 1 : 0)

    return {
        id,
        content,
        done,
    }
}


function findById(id: number) {
    const query = db.query(`
        SELECT *
        FROM 'todos'
        WHERE id = ?
    `)
    const t = query.get(id) as TodoDB
    
    return {
        ...t,
        done: Boolean(t.done),
    }
}


function findAll() {
    const query = db.query(`
        SELECT *
        FROM 'todos'
    `)

    const todos = query.all() as TodoDB[]

    return todos.map(t => ({
        ...t,
        done: Boolean(t.done),
    }))
}


function updateTodo({id, content, done}: Todo) {
    const query = db.query(`
        UPDATE 'todos'
        SET content = ?, done = ?
        WHERE id = ?
    `)

    query.run(content, done ? 1 : 0, id)
}


function deleteTodo(id: number) {
    const query = db.query(`
        DELETE FROM 'todos'
        WHERE id = ?
    `)

    query.run(id)
}


export const TodoModel = {
    newTodo,
    findById,
    findAll,
    updateTodo,
    deleteTodo,
    createDataIdTable,
    createTodosTable,
}