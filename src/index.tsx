import { Elysia } from 'elysia'
import { rootRoute } from './routes/root'
import { todoRoute } from './routes/todos'


// app[method](path, handler, validator)
export const app = new Elysia()

app
    .use(rootRoute)
    .use(todoRoute)
    .listen(3000)


console.log(`Elysia is running at https://${app.server?.hostname}: ${app.server?.port}!`)
