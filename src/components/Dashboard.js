import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={{display:'flex', flexDirection:'row'}}>
       <div style={{width:'20%',backgroundColor:'royalblue',height:'100vh'}}>
        <Link to='/addStudent' style={{color:'white',display:'block'}}>Add Student</Link>
        <Link to='/studentList' style={{color:'white',display:'block'}}>Student List</Link>
        <Link to='/addFaculty' style={{color:'white',display:'block'}}>Add Faculty</Link>
        <Link to='/facultyList' style={{color:'white',display:'block'}}>Faculty List</Link>
       </div>
       <div style={{width:'80%',backgroundColor:'wheat',height:'100vh'}}>
        <Outlet/>
       </div>
    </div>
  )
}

export default Dashboard