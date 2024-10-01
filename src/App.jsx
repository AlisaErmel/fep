import { useState } from 'react';
import Todolist from './components/Todolist'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Home from './components/Home'

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Typography variant='h6'>
            My Todos
          </Typography>
        </Toolbar>
      </AppBar>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Home" />
        <Tab label="Todos" />
      </Tabs>
      {value === 0 && <Home />}
      {value === 1 && <Todolist />}
      <CssBaseline />
    </Container>
  )
}

export default App
