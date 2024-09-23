import PropTypes from 'prop-types';

function TodoTable({ todos, handleDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Due Date</th>
                    <th>Description</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    todos.map((todo, index) => (
                        <tr key={index}>
                            <td>{todo.duedate}</td>
                            <td>{todo.description}</td>
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
