import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../../layout/adminLayout';
import { useNavigate } from 'react-router-dom';
import {useParams} from "react-router-dom";

function AssignmentAdd() {
      const [inputs, setInputs] = useState({id:'',assignment_name:'',subject_id:'',course_id:'',batch_id:'',document:'',date:''});
        const [subject, setSubject] = useState([]);
        const [course, setCourse] = useState([]);
        const [batch, setBatch] = useState([]);
        const navigate=useNavigate();
        const {id} = useParams();
    
    function getDatas(){
        axios.get(`${process.env.REACT_APP_API_URL}/assignment/${id}`).then(function(response) {
            setInputs(response.data.data);
        });
    }
     const getRelational = async (e) => {
        axios.get(`${process.env.REACT_APP_API_URL}/subject`).then(function(response) {
            setSubject(response.data.data);
        });
        axios.get(`${process.env.REACT_APP_API_URL}/course`).then(function(response) {
            setCourse(response.data.data);
         
        });
        axios.get(`${process.env.REACT_APP_API_URL}/batch`).then(function(response) {
            setBatch(response.data.data);
         
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
        // const handelFile = (e) => {
        //     setSelectedFile(e.target.files)
        // }
        
        try{
            let apiurl='';
            if(inputs.id!=''){
                apiurl=`/assignment/edit/${inputs.id}`;
            }else{
                apiurl=`/assignment/create`;
            }
            
            let response= await axios({
                method: 'post',
                responsiveTYpe: 'json',
                url: `${process.env.REACT_APP_API_URL}${apiurl}`,
                data: inputs
            });
            console.log(response)
            navigate('/assignment')
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
                        <h3>Add New assignment</h3>
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
                                                    <label for="assignment_name">Assignment Name</label>
                                                    <input type="text" id="assignment_name" className="form-control" defaultValue={inputs.assignment_name} name="assignment_name" onChange={handleChange} placeholder="Enter assignment name"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label for="subject">Subject </label>
                                                            {subject.length > 0 &&
                                                                <select  id="subject_id" className="form-control" defaultValue={inputs.subject_id} name="subject_id" onChange={handleChange} >
                                                                    <option value="">Select subject</option>
                                                                            {subject.map((d, key) =>
                                                                                <option value={d.id}>{d.subject_name}</option>
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
                                                    <label for="course"> Batch </label>
                                                      {batch.length > 0 &&
                                                            <select type="text" id="batch_id" className="form-control" defaultValue={inputs.batch_id} name="batch_id" onChange={handleChange} placeholder="Enter class name">
                                                                <option value="">Select batch</option>
                                                                    {course.map((d, key) =>
                                                                        <option value={d.id}>{d.batch_name}</option>
                                                                    )}
                                                            </select>
                                                      }
                                                    </div>
                                                </div>
                                               
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="batch_type"> Document</label>
                                                    <input type="file" id="document" className="form-control" defaultValue={inputs.document} name="document" onChange={handleChange} placeholder="regular assignment "/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="duration"> Date</label>
                                                    <input type="date" id="date" className="form-control" defaultValue={inputs.date} name="date" onChange={handleChange} placeholder=""/>
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

export default AssignmentAdd