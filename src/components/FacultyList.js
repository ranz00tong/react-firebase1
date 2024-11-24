import React, { useEffect, useState } from 'react';
import { app } from '../Firebase';
import { getFirestore, getDocs, collection, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { deleteObject, getStorage, ref } from 'firebase/storage';

const FacultyList = () => {
    const [facultyData, setFacultyData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const db = getFirestore(app);
        const docRef = collection(db, 'faculty');
        const docSnap = await getDocs(docRef);
        const data = docSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        // console.log(data);
        setFacultyData(data);
    }

    const deleteData = async (id, fId) => {
        const db = getFirestore(app);
        const dataRef = doc(db, 'faculty', id);
        const storage = getStorage(app);
        const storRef = ref(storage, 'facultyImages/' + fId)
        try {
            deleteObject(storRef)
                .then(res => {
                    deleteDoc(dataRef);
                    getData();
                })

        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Faculty List</h1>
            {facultyData.map((faculty) => {
                return (
                    <div key={faculty.id}>
                        <p>{faculty.facultyId}</p>
                        <img style={{ width: '10%' }} src={faculty.imageUrl} alt="facultyphoto" />
                        <p>{faculty.facultyName}  {faculty.phoneNumber}</p>
                        <button onClick={() => { deleteData(faculty.id, faculty.facultyId) }}>delete</button>
                        <button onClick={() => { navigate('/dashboard/updateFaculty', { state: faculty }) }}>update</button>
                        <hr />
                    </div>
                )
            })}

        </div>
    )
}

export default FacultyList