import PropTypes from 'prop-types';

function TodoTable({ todos, handleDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    todos.map((todo, index) => (
                        <tr key={index}>
                            <td>{todo.description}</td>
                            <td>{todo.duedate}</td>
                            <td>{todo.priority}</td>
                            <td>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

TodoTable.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            duedate: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default TodoTable;
