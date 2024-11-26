import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../layout/adminLayout';
import { Link } from 'react-router-dom';


function Exam() {

    const[data, setData]=useState([]);
    useEffect(() => {
        getDatas();
    }, []);

    function getDatas() {
        axios.get(`${process.env.REACT_APP_API_URL}/exam`).then(function(response) {
            setData(response.data.data);
        });
    }
    const deleteData = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/exam/${id}`).then(function(response){
            getDatas();
        });
    }
  return (
    <AdminLayout>
        <div className="row g-4">
            <div className="col-sm-12">
                <div className="bg-light rounded h-100 p-4">
                    <h6 className="mb-4">Exam</h6>
                    <table className="table">
                        <thead>
                            <tr>
                            
                                        <th scope="col">Exam Name</th>
                                          <th scope="col">Subject</th>
                                        <th scope="col">Batch</th>
                                        <th scope="col">Duration</th>
                                        <th scope="col">Start Time</th>
                                        <th scope="col">End Time</th>
                                        <th scope="col">Date</th>
                                      
                                        <th scope="col">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                                    {data && data.map((d, key) =>
                                        <tr key={d.id}>
                                            <td>{d.exam_name}</td>
                                            <td>{d.subject?.subject_name}</td>
                                            <td>{d.batch?.batch_name}</td>
                                            <td>{d.duration}</td>
                                            <td>{d.start_time}</td>
                                            <td>{d.end_time}</td>
                                            <td>{d.date}</td>
                                          
                                           
                                           
                                            <td>
                                                <Link to={`/exam/edit/${d.id}`} className='btn btn-info' >Edit</Link>
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

export default Exam
