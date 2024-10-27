import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../../layout/adminLayout';
import { useNavigate } from 'react-router-dom';
import {useParams} from "react-router-dom";

function CertificateAdd() {
      const [inputs, setInputs] = useState({id:'',student_id:'',course_id:'',instructor_id:'',passing_date:'',director:''});
        const [student, setStudent] = useState([]);
        const [course, setCourse] = useState([]);
        const [instructor, setInstructor] = useState([]);
        const navigate=useNavigate();
        const {id} = useParams();
    
    function getDatas(){
        axios.get(`${process.env.REACT_APP_API_URL}/certificate/${id}`).then(function(response) {
            setInputs(response.data.data);
        });
    }
     const getRelational = async (e) => {
        axios.get(`${process.env.REACT_APP_API_URL}/student`).then(function(response) {
            setStudent(response.data.data);
         
        });
        axios.get(`${process.env.REACT_APP_API_URL}/course`).then(function(response) {
            setCourse(response.data.data);
         
        });
        axios.get(`${process.env.REACT_APP_API_URL}/instructor`).then(function(response) {
            setInstructor(response.data.data);
        });
       
        
    }

    useEffect(() => {
        if(id){
            getDatas();
        }
         getRelational()
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(inputs)
        
        try{
            let apiurl='';
            if(inputs.id!=''){
                apiurl=`/certificate/edit/${inputs.id}`;
            }else{
                apiurl=`/certificate/create`;
            }
            
            let response= await axios({
                method: 'post',
                responsiveTYpe: 'json',
                url: `${process.env.REACT_APP_API_URL}${apiurl}`,
                data: inputs
            });
            console.log(response)
            navigate('/certificate')
        } 
        catch(e){
            console.log(e);
        }
    }
  return (
    
     <AdminLayout>
        <div className="main-content container-fluid">
            <div className="page-title">
                <div className="row">
                    <div className="col-12 col-md-6 order-md-1 order-last">
                        <h3>Add New certificate</h3>
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
                                                        <label for="certificate">Student </label>
                                                            {student.length > 0 &&
                                                                <select  id="student_id" className="form-control" defaultValue={inputs.student_id} name="student_id" onChange={handleChange} >
                                                                    <option value="">Select Student</option>
                                                                            {student.map((d, key) =>
                                                                                <option value={d.id}>{d.student_name}</option>
                                                                            )}
                                                                </select>
                                                            }
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="course"> course </label>
                                                      {course.length > 0 &&
                                                            <select type="text" id="course_id" className="form-control" defaultValue={inputs.course_id} name="course_id" onChange={handleChange} placeholder="Enter class name">
                                                                <option value="">Select Course</option>
                                                                    {course.map((d, key) =>
                                                                        <option value={d.id}>{d.course_name}</option>
                                                                    )}
                                                            </select>
                                                      }
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label for="instructor">Instructor </label>
                                                            {instructor.length > 0 &&
                                                                <select  id="instructor_id" className="form-control" defaultValue={inputs.instructor_id} name="instructor_id" onChange={handleChange} >
                                                                    <option value="">Select instructor</option>
                                                                            {instructor.map((d, key) =>
                                                                                <option value={d.id}>{d.instructor_name}</option>
                                                                            )}
                                                                </select>
                                                            }
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="passing_date"> Passing Date</label>
                                                    <input type="date" id="passing_date" className="form-control" defaultValue={inputs.passing_date} name="passing_date" onChange={handleChange} placeholder=" "/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="duration"> Director</label>
                                                    <input type="text" id="director" className="form-control" defaultValue={inputs.director} name="director" onChange={handleChange} placeholder="Enter class name"/>
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
  )
}

export default CertificateAdd