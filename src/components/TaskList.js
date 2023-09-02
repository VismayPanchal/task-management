import axios from "axios"
import { useEffect, useState } from "react"
import {TableRow,TableBody,TableCell, Table,TableHead, TableContainer, FormControl} from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import AddTask from "./AddTask";
import Paper from '@mui/material/Paper';
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import { useLocation } from 'react-router-dom'

const TaskList = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [del,setDelete] = useState(false)
    const [editing,setEditing] = useState(false)
    const [editingTask, setEditingTask] = useState({})
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const setEditingTaskHandler = (task) => {
        console.log(task)
        setEditingTask(task)
        setEditing(true)
        handleClickOpen()
      }
    const [tasks, setTasks] = useState([])
    useEffect(()=>{
        async function fetchtasks(){

            const respose = await axios.get('http://localhost:4000/tasks')
            setTasks(respose.data)
        }
        fetchtasks();
    },[del])
    useEffect(()=>{
        async function fetchtasks(){

            const respose = await axios.get('http://localhost:4000/tasks')
            setTasks(respose.data)
        }
        fetchtasks();
        if(location.pathname === '/addtask'){
            handleClickOpen()
            console.log('tru')
        }
    },[])
    const deleted = ()=>{
        setDelete(!del)
    }


    return <>
    <Dialog open={open} fullWidth onClose={handleClose}>
    <DialogTitle>Add New Task</DialogTitle>
    <DialogContent fullWidth>
        {   editing?
            <AddTask taskDetails={editingTask} />
            :
            <AddTask />
        }
        </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
    </DialogActions>
  </Dialog>  
  <TableContainer component={Paper}>

  <Table>
    <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>ID</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Due Date</TableCell>
            <TableCell align="left">Edit</TableCell>
            <TableCell align="left">Delete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {tasks.map((task,i) => {
            return (
            <TableRow key={task.id}>
            <TableCell align="left">{i+1}</TableCell>
            <TableCell align="left">{task.title}</TableCell>
            <TableCell align="left">{task.description}</TableCell>
            <TableCell align="left">{task.status}</TableCell>
            <TableCell align="left">{task.dueDate}</TableCell>
            <TableCell align="left"><EditTask setEditingTaskHandler={setEditingTaskHandler} task={task} /></TableCell>
            <TableCell align="left"><DeleteTask task={task} deleted={deleted}/></TableCell>
            </TableRow>
            )
        })}
        </TableBody>
    </Table>  
    </TableContainer>
        <br/>
        <Button onClick={handleClickOpen} margin="normal" variant="contained"> ADD Task</Button>
    </>
}

export default TaskList