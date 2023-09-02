import { IconButton} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
const EditTask = (props) =>{

    const editTask = () =>{
        props.setEditingTaskHandler(props.task)
    }
   return<IconButton onClick={editTask}>
        <EditIcon color="secondary" />
    </IconButton>

}

export default EditTask