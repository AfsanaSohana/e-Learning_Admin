import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../layout/adminLayout';
import { Link } from 'react-router-dom';

function BatchEnrollRequest() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getDatas();
    }, []);

    function getDatas() {
        axios.get(`${process.env.REACT_APP_API_URL}/batchEnrollRequest`).then(function(response) {
            setData(response.data.data);
        });
    }

    const approveData = (id) => {
        axios.put(`${process.env.REACT_APP_API_URL}/batchEnroll/approve/${id}`).then(function(response){
            getDatas(); 
        });
    }

    return (
        <AdminLayout>
            <div className="row g-4">
                <div className="col-sm-12">
                    <div className="bg-light rounded h-100 p-4">
                        <h6 className="mb-4">BatchEnroll</h6>
                        <div className="table-responsive"> {/* Add this wrapper to make table responsive */}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Batch</th>
                                        <th scope="col">Course</th>
                                        <th scope="col">Student Name</th>
                                        <th scope="col">Enroll Rate</th>
                                        <th scope="col">Fees</th>
                                        <th scope="col">Transaction Number</th>
                                        <th scope="col">Transaction ID</th>
                                        <th scope="col">Payment Method</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.map((d, key) =>
                                        <tr key={d.id}>
                                            <td>{d.batch_id}</td>
                                            <td>{d.course_id}</td>
                                            <td>{d.student_id}</td>
                                            <td>{d.enroll_date}</td>
                                            <td>{d.fees}</td>
                                            <td>{d.trans_number}</td>
                                            <td>{d.trans_id}</td>
                                            <td>{d.payment_method}</td>
                                            <td>
                                                <Link to={`/batchEnroll/edit/${d.id}`} className='btn btn-info'>Edit</Link>
                                                <button type='button' onClick={() => approveData(d.id)} className='btn btn-success'>Approve</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div> 
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default BatchEnrollRequest;
