import React, { useEffect, useState } from 'react';
import axios from '../../components/axios';
import AdminLayout from '../../layout/adminLayout';
import { Link } from 'react-router-dom';


function Instructor() {

    const[data, setData]=useState([]);
    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = async (e) => {
        let res = await axios.get(`/instructor`)
        setData(res.data.data);

    }
    const deleteData = async (id) => {
        let res = await axios.delete(`/instructor/${id}`)
        getDatas();

    }
  return (
    <AdminLayout>
        <div className="row g-4">
            <div className="col-sm-12">
                <div className="bg-light rounded h-100 p-4">
                    <h6 className="mb-4">Instructor</h6>
                    <table className="table">
                        <thead>
                            <tr>
                                
                                <th scope="col">Instructor Name</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Contact number</th>
                                <th scope="col">Email</th>
                                <th scope="col">Fb ID</th>
                                <th scope="col">Instagram ID</th>
                                <th scope="col">Twitter ID</th>
                                <th scope="col">Photo</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                                    {data && data.map((d, key) =>
                                        <tr key={d.id}>
                                            <td>{d.instructor_name}</td>
                                            <td>{d.designation}</td>
                                            <td>{d.contact_number}</td>
                                            <td>{d.email}</td>
                                            <td>{d.fb_id}</td>
                                            <td>{d.insta_id}</td>
                                            <td>{d.twt_id}</td>
                                            <td>  {
                                                    d.photo && d.photo.split(',').map((src, i) => (
                                                        <img key={i} src={`${process.env.REACT_APP_BACKEND_URL}/instructoradd/${src}`} alt="instructor" width="50px" />
                                                    ))
                                                }</td>
                                            <td>
                                                <Link to={`/instructor/edit/${d.id}`} className='btn btn-info' >Edit</Link>
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

export default Instructor
