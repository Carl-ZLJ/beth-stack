import { html } from '@elysiajs/html'
import { BaseHTML } from '../components/BaseHTML'
import { Elysia } from 'elysia'


export const rootRoute = new Elysia()
    .use(html())
    .get('/', ({ html }) => html(
        <BaseHTML>
            <>
                <button hx-get='/clicked' hx-swap='outerHTML'>Click me</button>
                <div hx-get='/todos' hx-trigger='load' hx-swap='innerHTML'></div>
            </>
        </BaseHTML>
    ))
    .get('/clicked', () => 'Clicked!')
