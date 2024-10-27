import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../../layout/adminLayout';
import { useNavigate } from 'react-router-dom';
import {useParams} from "react-router-dom";

function SyllabusAdd() {
      const [inputs, setInputs] = useState({id:'',course_id:'',subject_id:'',title:'',document:''});
          const [course, setCourse] = useState([]);
        const [subject, setSubject] = useState([]);
      
        const navigate=useNavigate();
        const {id} = useParams();
    
    function getDatas(){
        axios.get(`${process.env.REACT_APP_API_URL}/syllabus/${id}`).then(function(response) {
            setInputs(response.data.data);
        });
    }
     const getRelational = async (e) => {
      
        axios.get(`${process.env.REACT_APP_API_URL}/course`).then(function(response) {
            setCourse(response.data.data);
         
        });
          axios.get(`${process.env.REACT_APP_API_URL}/subject`).then(function(response) {
            setSubject(response.data.data);
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
                apiurl=`/syllabus/edit/${inputs.id}`;
            }else{
                apiurl=`/syllabus/create`;
            }
            
            let response= await axios({
                method: 'post',
                responsiveTYpe: 'json',
                url: `${process.env.REACT_APP_API_URL}${apiurl}`,
                data: inputs
            });
            console.log(response)
            navigate('/syllabus')
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
                        <h3>Add New syllabus</h3>
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
                                                        <label for="instructor">Course </label>
                                                            {course.length > 0 &&
                                                                <select  id="course_id" className="form-control" defaultValue={inputs.course_id} name="course_id" onChange={handleChange} >
                                                                    <option value="">Select course</option>
                                                                            {course.map((d, key) =>
                                                                                <option value={d.id}>{d.course_name}</option>
                                                                            )}
                                                                </select>
                                                            }
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label for="instructor">Subject </label>
                                                            {subject.length > 0 &&
                                                                <select  id="subject_id" className="form-control" defaultValue={inputs.subject_id} name="subject_id" onChange={handleChange} >
                                                                    <option value="">Select instructor</option>
                                                                            {subject.map((d, key) =>
                                                                                <option value={d.id}>{d.subject_name}</option>
                                                                            )}
                                                                </select>
                                                            }
                                                    </div>
                                                </div>
                                                
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="batch_name">Title</label>
                                                    <input type="textarea" id="title" className="form-control" defaultValue={inputs.title} name="title" onChange={handleChange} placeholder="Enter syllabus detail"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="batch_type">Document</label>
                                                    <input type="text" id="document" className="form-control" defaultValue={inputs.document} name="document" onChange={handleChange} placeholder=" "/>
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

export default SyllabusAdd