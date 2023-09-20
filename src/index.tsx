import { Elysia } from 'elysia'
import { TodoModel } from './db/todoModel'
import { rootRoute } from './routes/root'
import { todoRoute } from './routes/todos'


TodoModel.createTodosTable()
TodoModel.createDataIdTable()

// app[method](path, handler, validator)
export const app = new Elysia()

app
    .use(rootRoute)
    .use(todoRoute)
    .listen(3000)


console.log(`Elysia is running at https://${app.server?.hostname}: ${app.server?.port}!`)
