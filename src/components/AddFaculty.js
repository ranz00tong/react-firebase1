import React, { useState } from 'react';
import {app} from '../Firebase';
import { getFirestore,collection,addDoc} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const AddFaculty = () => {
    const [selectedFile,setSelectedFile] = useState(null);
    const [facultyId,setFacultyId] = useState('')
    const [facultyName,setFacultyName] = useState('');
    const [phone,setPhone] = useState(null);
    const navigation = useNavigate();

    const handleFile = (event) =>{
        const file = event.target.files[0];
        setSelectedFile(file);
    }


    const submitHandler = async (event) =>{
        event.preventDefault();
        const storage = getStorage(app);
        const storRef = ref(storage,`facultyImages/${facultyId}`);
        const db = getFirestore(app);
        try{
            await uploadBytes(storRef,selectedFile);
            const imageUrl = await getDownloadURL(storRef);
            const docRef = await addDoc(collection(db,'faculty'),{
                facultyId: facultyId,
                facultyName: facultyName,
                phoneNumber: phone,
                imageUrl:imageUrl
            });
            console.log(docRef);
            navigation('/dashboard/facultyList')
        }
        catch(err){
            console.log(err)
        }
       
    }
  return (
    <div>
        <h1>Add Faculty</h1>
        <form onSubmit={submitHandler}>
            <input onChange={(e)=>{setFacultyId(e.target.value)}} type="text" placeholder='Faculty Id'/>
            <input onChange={(e)=>{setFacultyName(e.target.value)}} type="text" placeholder='Faculty Name'/>
            <input onChange={(e)=>{setPhone(e.target.value)}} type="number" placeholder='Phone' />
            <input onChange={handleFile} type="file" />
            <button type='submit'>submit</button>
        </form>
    </div>
  )
}

export default AddFaculty