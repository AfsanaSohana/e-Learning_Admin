import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../layout/adminLayout';
import { Link } from 'react-router-dom';


function BatchEnrollRequest() {

    const[data, setData]=useState([]);
    useEffect(() => {
        getDatas();
    }, []);

    function getDatas() {
        axios.get(`${process.env.REACT_APP_API_URL}/batchEnrollRequest`).then(function(response) {
            setData(response.data.data);
        });
    }
    const deleteData = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/batchEnrollRequest/${id}`).then(function(response){
            getDatas();
        });
    }
  return (
    <AdminLayout>
        <div className="row g-4">
            <div className="col-sm-12">
                <div className="bg-light rounded h-100 p-4">
                    <h6 className="mb-4">BatchEnrollRequest</h6>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Batch</th>
                                <th scope="col">course</th>
                                <th scope="col">Student name</th>
                                <th scope="col">status</th>
                                <th scope="col">Enroll Rate</th>
                                <th scope="col">Fees</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                                    {data && data.map((d, key) =>
                                        <tr key={d.id}>
                                            <td>{d.batch_id}</td>
                                            <td>{d.course_id}</td>
                                            <td>{d.student_id}</td>
                                            <td>{d.status}</td>
                                            <td>{d.enroll_date}</td>
                                            <td>{d.fees}</td>
                                            <td>
                                                <Link to={`/batchEnrollRequest/edit/${d.id}`} className='btn btn-info' >Edit</Link>
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

export default BatchEnrollRequest
