import React, { useState } from 'react';
import { getDatabase, ref, update } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../Firebase'
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateStudent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [studId, setStudId] = useState(location.state[0]);
    const [name, setName] = useState(location.state[1].name);
    const [phone, setPhone] = useState(location.state[1].phone); 
    const [selectedFile, setSelectedFile] = useState(null);  
    
    const handleFile = (event) =>{
        const file = event.target.files[0];
        setSelectedFile(file);
    }

    // console.log(location);

    const submitHandler = async (event) => {
        event.preventDefault();
        if(selectedFile)
        {
            const db = getDatabase(app);
            const storage = getStorage(app);
            const myStorRef = storageRef(storage,`images/${location.state[0]}`);
            await uploadBytes(myStorRef,selectedFile);
            const imageUrl = await getDownloadURL(myStorRef);
            const studentRef = ref(db,'student/'+location.state[0]);
            update(studentRef,{
                name:name,
                phone:phone,
                imageUrl: imageUrl
            })
            .then(res=>{
                navigate('/dashboard/studentList')
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else{
            const db = getDatabase(app);
            const studentRef = ref(db,'student/'+location.state[0]);
            update(studentRef,{
                name:name,
                phone:phone
                
            })
            .then(res=>{
                navigate('/dashboard/studentList')
            })
            .catch(err=>{
                console.log(err)
            })
        }

    }
    return (
        <>
            <form onSubmit={submitHandler}>
                <input disabled value={studId} onChange={(e) => { setStudId(e.target.value) }} type="text" placeholder='studentId' />
                <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder='name' />
                <input value={phone} onChange={(e) => { setPhone(e.target.value) }} type="number" placeholder='phone number' />
                <input onChange={handleFile} type="file" />
                <img style={{width:'10%'}} src={location.state[1].imageUrl} alt="studentphoto" />
                <button type='submit'>Update</button>
            </form>
        </>
    )
}

export default UpdateStudent