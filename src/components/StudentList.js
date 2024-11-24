import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import {getStorage, ref as storageRef, deleteObject} from 'firebase/storage';
import {app} from '../Firebase'
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
    const [studentData,setStudentData] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        
        const db = getDatabase(app);
        const studentRef = ref(db,'student');
        onValue(studentRef,(snapshot)=>{
            const data = snapshot.val();
            // console.log(data);
            setStudentData(data);
        })
    },[]);

    const deleteData = (key)=>{
        const db = getDatabase(app);
        const storage = getStorage(app);

        const studentRef = ref(db,'student/'+key);
        const myStorRef = storageRef(storage, 'images/'+key);
        deleteObject(myStorRef)
        .then(res=>{
            remove(studentRef);
        })
        .catch(err=>{
            console.log(err);
        })
        
    }
  return (
    <div>
        <h1>Student List</h1>
        {studentData && (
            <div>
                {Object.entries(studentData).map(([key,value])=>{
                    return (
                        <div key={key}>
                            <p>{key} </p>
                            <img style={{width:'10%'}} src={value.imageUrl} alt="studentphoto" />
                            <p>{value.name}  {value.phone}</p>
                            <button onClick={()=>{deleteData(key)}}>delete</button>
                            <button onClick={()=>{navigate('/dashboard/updateStudent', {state:[key,value]})}}>update</button>
                            <hr />
                        </div>
                    )
                })}
            </div>
        )}
    </div>
  )
}

export default StudentList