import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const LogoutHandler = () =>{
        localStorage.clear();
        navigate('/login')
    }
  return (
    <div style={{display:'flex', flexDirection:'row'}}>
       <div style={{width:'20%',backgroundColor:'royalblue',height:'100vh'}}>
        <Link to='/dashboard/addStudent' style={{color:'white',display:'block'}}>Add Student</Link>
        <Link to='/dashboard/studentList' style={{color:'white',display:'block'}}>Student List</Link>
        <Link to='/dashboard/addFaculty' style={{color:'white',display:'block'}}>Add Faculty</Link>
        <Link to='/dashboard/facultyList' style={{color:'white',display:'block'}}>Faculty List</Link>
        <button onClick={LogoutHandler}>logout</button>
       </div>
       <div style={{width:'80%',backgroundColor:'wheat',height:'100vh'}}>
        <Outlet/>
       </div>
    </div>
  )
}

export default Dashboard