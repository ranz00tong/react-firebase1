import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import UpdateStudent from './components/UpdateStudent';
import AddFaculty from './components/AddFaculty';
import FacultyList from './components/FacultyList';
import UpdateFaculty from './components/UpdateFaculty';
import Signup from './components/Signup';
import Login from './components/Login';
import checkAuth from './checkAuth';




function App() {
  const myRouter = createBrowserRouter([
    {path:'',Component:Login},
    {path:'signup',Component:Signup},
    {path:'login',Component:Login},
    {path:'dashboard',loader:checkAuth, Component:Dashboard,children:[
      {path:'',Component:StudentList},
      {path:'studentList',Component:StudentList},
      {path:'addStudent',Component:AddStudent},
      {path:'updateStudent',Component:UpdateStudent},
      {path:'addFaculty',Component:AddFaculty},
      {path:'facultyList',Component:FacultyList},
      {path:'updateFaculty',Component:UpdateFaculty}
    ]}

  ])
  return (
    <>
      <RouterProvider router={myRouter}/>
    </>
  );
}

export default App;
