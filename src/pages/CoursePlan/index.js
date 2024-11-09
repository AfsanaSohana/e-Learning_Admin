import React, { useEffect, useState } from 'react';
import axios from '../../components/axios';
import AdminLayout from '../../layout/adminLayout';
import { Link } from 'react-router-dom';


function CoursePlan() {

     const[data, setData]=useState([]);
    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = async (e) => {
        let res = await axios.get(`/coursePlan`)
        setData(res.data.data);

    }
    const deleteData = async (id) => {
        let res = await axios.delete(`/coursePlan/${id}`)
        getDatas();

    }
  return (
    <AdminLayout>
        <div className="row g-4">
            <div className="col-sm-12">
                <div className="bg-light rounded h-100 p-4">
                    <h6 className="mb-4">CoursePlan</h6>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Course Name</th>
                                <th scope="col">Subject Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Document </th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                                    {data && data.map((d, key) =>
                                        <tr key={d.id}>
                                            <td>{d.id}</td>
                                            <td>{d.course?.course_name}</td>
                                            <td>{d.subject?.subject_name}</td>
                                            <td>{d.title}</td>
                                            <td>
                                                {
                                                    d.document && d.document.split(',').map((src, i) => (
                                                        <img key={i} src={`${process.env.REACT_APP_BACKEND_URL}/coursePlanadd/${src}`} alt="coursePlan" />
                                                    ))
                                                }
                                            </td>
                                            <td>{d.model_test}</td> 
                                            <td>  {
                                                    d.model_sheet && d.model_sheet.split(',').map((src, i) => (
                                                        <img key={i} src={`${process.env.REACT_APP_BACKEND_URL}/coursePlanadd/${src}`} alt="coursePlan" />
                                                    ))
                                                }</td> 
                                            <td>
                                                <Link to={`/coursePlan/edit/${d.id}`} className='btn btn-info' >Edit</Link>
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

export default CoursePlan
