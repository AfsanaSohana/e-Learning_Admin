import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../layout/adminLayout';
import { Link } from 'react-router-dom';


function Module() {

    const[data, setData]=useState([]);
    useEffect(() => {
        getDatas();
    }, []);

    function getDatas() {
        axios.get(`${process.env.REACT_APP_API_URL}/module`).then(function(response) {
            setData(response.data.data);
        });
    }
    const deleteData = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/module/${id}`).then(function(response){
            getDatas();
        });
    }
  return (
    <AdminLayout>
        <div className="row g-4">
            <div className="col-sm-12">
                <div className="bg-light rounded h-100 p-4">
                    <h6 className="mb-4">Module</h6>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Course</th>
                                <th scope="col">Batch</th>
                                <th scope="col">Module Name</th>
                                <th scope="col">Video ID</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((d, key) =>
                                <tr key={d.id}>
                                    <td>{d.course?.course_name}</td>
                                    <td>{d.batch?.batch_name}</td>
                                    <td>{d.module_name}</td>
                                    <td>{d.video_id}</td>
                                    <td>
                                        <Link to={`/module/edit/${d.id}`} className='btn btn-info' >Edit</Link>
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

export default Module
