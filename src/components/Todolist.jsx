import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


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

    const handleDateChange = (date) => {
        if (date) {
            setTodo({ ...todo, duedate: dayjs(date).toISOString().substring(0, 10) });
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
                    variant='outlined'
                    label='Description'
                    value={todo.description}
                    onChange={event => setTodo({ ...todo, description: event.target.value })}
                />
                <TextField
                    variant='outlined'
                    label='Priority'
                    value={todo.priority}
                    onChange={event => setTodo({ ...todo, priority: event.target.value })}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Due Date"
                        value={todo.duedate ? dayjs(todo.duedate) : null}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField variant='standard' {...params} />}
                    />
                </LocalizationProvider>
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