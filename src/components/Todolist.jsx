import { useState } from 'react'
function Todolist() {
    const [todo, setTodo] = useState({ description: "", duedate: "" });
    const [todos, setTodos] = useState([]);

    const handleAdd = () => {
        if (!todo.description || !todo.duedate) {
            alert("Type something first");
        } else {
            setTodos([todo, ...todos]);
            setTodo({ description: "", duedate: "" })
        }
    }

    return (
        <>
            <h3>My Todos</h3>
            <input
                placeholder='Description'
                value={todo.description}
                onChange={event => setTodo({ ...todo, description: event.target.value })}
            />
            <input
                placeholder='Due date'
                value={todo.duedate}
                onChange={event => setTodo({ ...todo, duedate: event.target.value })}
            />
            <button onClick={handleAdd}>Add Todo</button>
            <table>
                <thead>
                    <tr>
                        <th>Due Date</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map((todo1, index) =>
                            <tr key={index}>
                                <td>{todo1.description}</td>
                                <td>{todo1.duedate}</td>
                            </tr>)
                    }
                </tbody>
            </table>
        </>
    );
}

export default Todolist;