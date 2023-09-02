import { IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useState } from 'react';
const DeleteTask = (props) =>{
    const deleteTask = async()=>{
        await axios.delete('http://localhost:4000/tasks/'+props.task.id)
        props.deleted()
    }
   return<IconButton onClick={deleteTask}>
        <DeleteIcon color="secondary" />
    </IconButton>

}

export default DeleteTask