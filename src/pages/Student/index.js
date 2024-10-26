import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../layout/adminLayout';
import { Link } from 'react-router-dom';


function Student() {

    const[data, setData]=useState([]);
    useEffect(() => {
        getDatas();
    }, []);

    function getDatas() {
        axios.get(`${process.env.REACT_APP_API_URL}/student`).then(function(response) {
            setData(response.data.data);
        });
    }
    const deleteData = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/student/${id}`).then(function(response){
            getDatas();
        });
    }
  return (
    <AdminLayout>
        <div className="row g-4">
            <div className="col-sm-12">
                <div className="bg-light rounded h-100 p-4">
                    <h6 className="mb-4">Student</h6>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Student Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                                <th scope="col">Contact Number</th>
                                <th scope="col">Photo</th>
                                <th scope="col">Password</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                                    {data && data.map((d, key) =>
                                        <tr key={d.id}>
                                            <td>{d.id}</td>
                                            <td>{d.student_name}</td>
                                            <td>{d.email}</td>
                                            <td>{d.address}</td>
                                            <td>{d.contact_number}</td>
                                            <td>{d.password}</td>
                                            <td>
                                                {
                                                    d.photo && d.photo.split(',').map((src, i) => (
                                                        <img key={i} src={`${process.env.REACT_APP_BACKEND_URL}/student/${src}`} alt="student" />
                                                    ))
                                                }
                                            </td>

                                            <td>
                                                <Link to={`/student/edit/${d.id}`} className='btn btn-info' >Edit</Link>
                                                <button type='button' onClick={() => deleteData(d.id)} className='btn btn-danger'>Delete</button>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AdminLayout>
  )
}

export default Student
