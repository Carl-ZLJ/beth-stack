import Elysia, { t } from "elysia"
import { TodoItem, TodoList } from "../components/Todo"
import { TodoModel } from "../db/todoModel"


const db = TodoModel.findAll()


export const todoRoute = new Elysia()
    .group('/todos',
        app =>
            app
                .get('/', () => <TodoList todos={db} />)
                .post('/toggle/:id', ({ params }) => {
                    const todo = TodoModel.findById(params.id)
                    if (todo) {
                        todo.done = !todo.done
                        TodoModel.updateTodo(todo)
                        return <TodoItem  {...todo} />
                    }
                },
                    {
                        params: t.Object({
                            id: t.Numeric(),
                        })
                    }
                )
                .delete('/:id', ({ params }) => {
                    const todo = TodoModel.findById(params.id)
                    if (todo) {
                        TodoModel.deleteTodo(todo.id)
                    }
                },
                    {
                        params: t.Object({
                            id: t.Numeric(),
                        })
                    }
                )
                .post('/', ({ body }) => {
                    if (body.content.length === 0) {
                        throw new Error('Content cannot be empty')
                    }
                    const todo = TodoModel.newTodo(body.content, false)
                    return <TodoItem  {...todo} />
                },
                    {
                        body: t.Object({
                            content: t.String(),
                        })
                    }
                )
    )

