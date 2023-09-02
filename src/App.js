import './App.css';
import TaskList from './components/TaskList';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';  
function App() {
  return (
    <Router>  
      <Routes>  
        <Route exact path='/' element={< TaskList />}></Route>  
        <Route exact path='/tasklist' element={< TaskList />}></Route>
        <Route exact path='/addtask' element={< TaskList />}></Route>
      </Routes>  
    </Router>  
  );
}

export default App;
