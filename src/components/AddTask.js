import axios from "axios"
import { FormControl, TextField, Select, MenuItem, Button } from '@mui/material';
import { useEffect, useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import uuid from "react-uuid";
import moment from "moment/moment";
import dayjs, { Dayjs } from 'dayjs';
const AddTask = (props) => {
    const [task, setTask] = useState({
        id: '',
        title: '',
        description: '',
        status: '',
    })
    const [dueDate, setDueDate] = useState(dayjs('02/09/2023'))
    const statusAvailable = ['To Do', 'In Progress', 'Done']
    const [error,setError] = useState(false)
    useEffect(() => {
        if (props.taskDetails) {
            console.log(props.taskDetails)
            setTask(props.taskDetails)
            setDueDate(props.taskDetails.dueDate)
        }
    }, [])
    const addTask = async (e) => {
        e.preventDefault()
        let taskData = task
        taskData.dueDate = moment(dueDate).format('DD/MM/YYYY')
        if(taskData.title === '' || taskData.description ==='' || taskData.status ==='') {
            setError(true)
            alert('error')
            return
        } else {
            setError(false)
        }
        if (props.taskDetails) {
            await axios.put(`http://localhost:4000/tasks/${task.id}`, taskData)
        } else {
            taskData.id = uuid()
            await axios.post('http://localhost:4000/tasks', taskData)
        }
    }
    const changeHandler = (e) => {
        if (e.target.value !== '') {
            setTask({ ...task, [e.target.name]: e.target.value })
        }
    }
    return <form onSubmit={addTask}>
        <FormControl fullWidth>
            <label> Enter Title </label>
            <TextField fullWidth margin="normal" name="title" value={task.title} onChange={changeHandler} />
        </FormControl>
        <br />
        <FormControl fullWidth>
            <label> Enter Description </label>
            <TextField fullWidth margin="normal" name="description" value={task.description} onChange={changeHandler} multiline />
        </FormControl>
        <FormControl fullWidth>
            <label> Select status</label>
            <Select
                label="Status"
                onChange={changeHandler}
                name="status"
                value={task.status}
            >
                {statusAvailable.map((status, i) =>
                    <MenuItem value={status} key={i}>{status}</MenuItem>
                )}
            </Select>
        </FormControl>
        <FormControl>
            <label>Select Due Date</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={dueDate}
                    onChange={(newvalue) => setDueDate(newvalue)}
                />
            </LocalizationProvider>
        </FormControl>
        <br />
        <FormControl margin="normal">
            <Button type="submit" variant="contained">{props.taskDetails ? 'Edit' : 'Add'}</Button>
        </FormControl>
        {error && <p style={{color:"red"}}>Please enter all the details</p>}
    </form>
}

export default AddTask