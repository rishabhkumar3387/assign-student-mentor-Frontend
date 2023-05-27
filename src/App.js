import './App.css';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";

import Topbar from './Components/topBar';
import Home from './Components/home';
import AddMentor from './Components/addMentor';
import AddStudent from './Components/addStudent';
import AllMentors from './Components/allMentors';
import AllStudents from './Components/allStudents';
import AssignStudents from './Components/assignStudents';
import ChangeMentor from './Components/changeMentor';
import ViewMentor from './Components/ViewMentor';

function App() {
  return < >
  

  <Router>
    <Topbar/>
    <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/add-mentor' element={<AddMentor/>}/>
        <Route path='/add-student' element={<AddStudent/>}/>
        <Route path='/all-mentors' element={<AllMentors/>}/>
        <Route path='/all-students' element={<AllStudents/>}/>
        <Route path='/assign-students' element={<AssignStudents/>}/>
        <Route path='/change-mentor' element={<ChangeMentor/>}/>
        <Route path='/view-mentor' element={<ViewMentor/>}/>
        <Route path="/" element={<Home/>}/>
    </Routes>
  </Router>
  </>
}

export default App;
