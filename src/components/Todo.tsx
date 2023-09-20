import { Todo } from "../types";

function TodoItem({ id, content, done }: Todo) {
    return <div>
        <p>{content}</p>
        <input
            type="checkbox"
            checked={done}
            hx-post={`/todos/toggle/${id}`}
            hx-target='closest div'
            hx-swap='outerHTML'
        />
        <button
            hx-delete={`/todos/${id}`}
            hx-target='closest div'
            hx-swap='outerHTML'
        >
            X</button>
    </div>
}

function TodoList({ todos }: { todos: Todo[] }) {
    return <div>
        {todos.map(todo => <TodoItem  {...todo} />)}
        <TodoForm />
    </div>
}

function TodoForm() {
    return <form
        hx-post='/todos'
        hx-swap='beforebegin'
        _='on submit target.reset()'
    >
        <input type="text" name="content" />
        <button type="submit">Add</button>
    </form>

}

export {
    TodoForm,
    TodoList,
    TodoItem,
}