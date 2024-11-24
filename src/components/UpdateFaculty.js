import React, { useState } from 'react';
import { app } from '../Firebase';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateFaculty = () => {
    const location = useLocation();
    const [facultyId, setFacultyId] = useState(location.state.facultyId)
    const [facultyName, setFacultyName] = useState(location.state.facultyName);
    const [phone, setPhone] = useState(location.state.phoneNumber);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();


    // console.log(location.state)
    const handleFile = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if (selectedFile) {
            const db = getFirestore(app);
            const storage = getStorage(app);
            const myStorRef = storageRef(storage,`facultyImages/${location.state.facultyId}`);
            await uploadBytes(myStorRef,selectedFile);
            const imageUrl = await getDownloadURL(myStorRef);
            const dataRef = doc(db, 'faculty', location.state.id);
            try {
                await updateDoc(dataRef, { facultyId:facultyId, facultyName: facultyName, phoneNumber: phone, imageUrl: imageUrl });
                navigate('/dashboard/facultyList');
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            const db = getFirestore(app);
            const dataRef = doc(db, 'faculty', location.state.id);
            try {
                await updateDoc(dataRef, { facultyId:facultyId, facultyName: facultyName, phoneNumber: phone });
                navigate('/dashboard/facultyList');
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <div>
            <h1>Update Faculty</h1>
            <form onSubmit={submitHandler}>
                <input disabled value={facultyId} onChange={(e) => { setFacultyId(e.target.value) }} type="text" placeholder='Faculty Id' />
                <input value={facultyName} onChange={(e) => { setFacultyName(e.target.value) }} type="text" placeholder='Faculty Name' />
                <input value={phone} onChange={(e) => { setPhone(e.target.value) }} type="phone" placeholder='Phone' />
                <input onChange={handleFile} type="file" />
                <img style={{ width: '10%' }} src={location.state.imageUrl} alt="facultyphoto" />
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default UpdateFaculty