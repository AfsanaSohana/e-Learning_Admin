import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../../layout/adminLayout';
import { useNavigate } from 'react-router-dom';
import {useParams} from "react-router-dom";

function BatchEnrollRequestAdd() {
    const [inputs, setInputs] = useState({id:'',batch_id:'',course_id:'',student_id:'',status:'',enroll_date:'',fees:''});
    const [batch, setBatch] = useState([]);
    const [course, setCourse] = useState([]);
    const [student, setStudent] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
    
    function getDatas(){
        axios.get(`${process.env.REACT_APP_API_URL}/batchEnrollRequest/${id}`).then(function(response) {
            setInputs(response.data.data);
        });
    }
    
    const getRelational = async () => {
        axios.get(`${process.env.REACT_APP_API_URL}/batch`).then(function(response) {
            setBatch(response.data.data);
        });
        axios.get(`${process.env.REACT_APP_API_URL}/course`).then(function(response) {
            setCourse(response.data.data);
        });
        axios.get(`${process.env.REACT_APP_API_URL}/student`).then(function(response) {
            setStudent(response.data.data);
        });
    }
    
    useEffect(() => {
        if(id){
            getDatas();
        }
        getRelational();
    }, [id]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(inputs);
        
        try {
            let apiurl = '';
            if(inputs.id !== ''){
                apiurl = `/batchEnrollRequest/edit/${inputs.id}`;
            } else {
                apiurl = `/batchEnrollRequest/create`;
            }
            
            let response = await axios({
                method: 'post',
                responseType: 'json',
                url: `${process.env.REACT_APP_API_URL}${apiurl}`,
                data: inputs
            });
            console.log(response);
            navigate('/batchEnrollRequest');
        } 
        catch(e) {
            console.log(e);
        }
    }

    return (
        <AdminLayout>
            <div className="main-content container-fluid">
                <div className="page-title">
                    <div className="row">
                        <div className="col-12 col-md-6 order-md-1 order-last">
                            <h3>Add New BatchEnrollRequest</h3>
                        </div>
                        <div className="col-12 col-md-6 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Add New</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
                <section id="basic-vertical-layouts">
                    <div className="row match-height">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <form className="form form-vertical" onSubmit={handleSubmit}>
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="batch">Batch</label>
                                                            {batch.length > 0 &&
                                                                <select id="batch_id" className="form-control" defaultValue={inputs.batch_id} name="batch_id" onChange={handleChange}>
                                                                    <option value="">Select batch</option>
                                                                    {batch.map((d, key) => (
                                                                        <option key={key} value={d.id}>{d.batch_name}</option>
                                                                    ))}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="Course">Course</label>
                                                            {course.length > 0 &&
                                                                <select id="course_id" className="form-control" defaultValue={inputs.course_id} name="course_id" onChange={handleChange}>
                                                                    <option value="">Select course</option>
                                                                    {course.map((d, key) => (
                                                                        <option key={key} value={d.id}>{d.course_name}</option>
                                                                    ))}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="student">Student</label>
                                                            {student.length > 0 &&
                                                                <select id="student_id" className="form-control" defaultValue={inputs.student_id} name="student_id" onChange={handleChange}>
                                                                    <option value="">Select student</option>
                                                                    {student.map((d, key) => (
                                                                        <option key={key} value={d.id}>{d.student_name}</option>
                                                                    ))}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="enroll_date">status</label>
                                                            <input type="text" id="status" className="form-control" defaultValue={inputs.status} name="status" onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="enroll_date">Enroll Date</label>
                                                            <input type="date" id="enroll_date" className="form-control" defaultValue={inputs.enroll_date} name="enroll_date" onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="fees">Fee</label>
                                                            <input type="text" id="fees" className="form-control" defaultValue={inputs.fees} name="fees" onChange={handleChange} placeholder="1000.00" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 d-flex justify-content-end">
                                                        <button type="submit" className="btn btn-primary mr-1 mb-1">Submit</button>
                                                        <button type="reset" className="btn btn-light-secondary mr-1 mb-1">Reset</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}

export default BatchEnrollRequestAdd;
