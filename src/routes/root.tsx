import { Fragment, html } from '@elysiajs/html'
import { BaseHTML } from '../components/BaseHTML'
import Elysia from 'elysia'

export const rootRoute = new Elysia()
    // @ts-ignore
    .use(html())
    // @ts-ignore
    .get('/', ({ html }) => html(
        <BaseHTML>
            <Fragment>
                <button hx-get='/clicked' hx-swap='outerHTML'>Click me</button>
                <div hx-get='/todos' hx-trigger='load' hx-swap='innerHTML'></div>
            </Fragment>
        </BaseHTML>
    ))
    .get('/clicked', () => 'Clicked!')
