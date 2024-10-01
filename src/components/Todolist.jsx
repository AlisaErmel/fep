import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function Todolist() {
    const [todo, setTodo] = useState({ description: "", duedate: "", priority: "" });
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();

    const columns = [
        { field: "description", sortable: true, filter: true, floatingFilter: true, editable: true },
        {
            field: "priority", sortable: true, filter: true, floatingFilter: true, editable: true,
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
        },
        { field: "duedate", sortable: true, filter: true, floatingFilter: true, editable: true }
    ];


    const handleAdd = () => {
        if (!todo.description || !todo.duedate || !todo.priority) {
            alert("Type something first");
        }
        else {
            setTodos([todo, ...todos]);
            setTodo({ description: "", duedate: "", priority: "" });
        }
    }

    const handleDelete = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) =>
                index != gridRef.current.getSelectedNodes()[0].id))
        }
        else {
            alert('Select a row first!');
        }
    };



    return (
        <>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
                mt={2}
            >
                <TextField
                    variant='standard'
                    label='Description'
                    value={todo.description}
                    onChange={event => setTodo({ ...todo, description: event.target.value })}
                />
                <TextField
                    variant='standard'
                    label='Priority'
                    value={todo.priority}
                    onChange={event => setTodo({ ...todo, priority: event.target.value })}
                />
                <TextField
                    variant='standard'
                    label="Date"
                    value={todo.duedate}
                    onChange={event => setTodo({ ...todo, duedate: event.target.value })}
                />
                <Button
                    variant="contained"
                    onClick={handleAdd}>
                    Add
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    endIcon={<DeleteIcon />}
                    onClick={handleDelete}>
                    Delete
                </Button>
            </Stack>
            <div
                className='ag-theme-material'
                style={{ height: 500, width: '100%' }}
            >
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    columnDefs={columns}
                    rowData={todos}
                    rowSelection="single"
                />
            </div>
        </>
    );
}

export default Todolist;