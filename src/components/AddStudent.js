import React, { useState } from 'react';
import { getDatabase, set, ref } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../Firebase'
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const [studId, setStudId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const handleFile = (event) =>{
        const file = event.target.files[0];
        setSelectedFile(file);
    }


    const submitHandler = async (event) => {
        event.preventDefault();
        const db = getDatabase(app);
        const storage = getStorage(app);
        const myStorRef = storageRef(storage,`images/${studId}`);
        await uploadBytes(myStorRef,selectedFile);
        const imageUrl = await getDownloadURL(myStorRef);
        set(ref(db, 'student/' + studId), {
            name: name,
            phone: phone,
            imageUrl: imageUrl
        })
        .then(res=>{
            navigate('/dashboard/studentList');
        })
        .catch(err=>{
            console.log(err)
        })
        // console.log(studId, name, phone);
        

    }
    return (
        <>
            <form onSubmit={submitHandler}>
                <input onChange={(e) => { setStudId(e.target.value) }} type="text" placeholder='studentId' />
                <input onChange={(e) => { setName(e.target.value) }} type="text" placeholder='name' />
                <input onChange={(e) => { setPhone(e.target.value) }} type="number" placeholder='phone number' />
                <input onChange={handleFile} type="file" />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default AddStudent