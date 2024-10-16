import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../../layout/adminLayout';
import { useNavigate } from 'react-router-dom';
import {useParams} from "react-router-dom";

function ExamAdd() {
      const [inputs, setInputs] = useState({id:'',exam_name:'',duration:'',start_time:'',end_time:'',subject_id:'',batch_id:''});
        const [subject, setSubject] = useState([]);
        const [batch, setBatch] = useState([]);
    const navigate=useNavigate();
    const {id} = useParams();
    
    function getDatas(){
        axios.get(`${process.env.REACT_APP_API_URL}/exam/${id}`).then(function(response) {
            setInputs(response.data.data);
        });
    }
     const getRelational = async (e) => {
        axios.get(`${process.env.REACT_APP_API_URL}/subject`).then(function(response) {
            setSubject(response.data.data);
        });
   
    
        axios.get(`${process.env.REACT_APP_API_URL}/batch`).then(function(response) {
            setBatch(response.data.data);
        });
    }

    useEffect(() => {
        if(id){
            getDatas();
             getRelational()
        }
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
                apiurl=`/exam/edit/${inputs.id}`;
            }else{
                apiurl=`/exam/create`;
            }
            
            let response= await axios({
                method: 'post',
                responsiveTYpe: 'json',
                url: `${process.env.REACT_APP_API_URL}${apiurl}`,
                data: inputs
            });
            console.log(response)
            navigate('/exam')
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
                        <h3>Add New Exam</h3>
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
                                                    <label for="first-name-vertical"> Exam Name</label>
                                                    <input type="text" id="exam_name" className="form-control" defaultValue={inputs.exam_name} name="exam_name" onChange={handleChange} placeholder="Enter exam_name"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="first-name-vertical">Duration</label>
                                                    <input type="text" id="duration" className="form-control" defaultValue={inputs.duration} name="duration" onChange={handleChange} placeholder="Enter exam_name"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">Start Date</label>
                                                    <input type="text" id="start_time" className="form-control" defaultValue={inputs.start_time} name="start_time" onChange={handleChange} placeholder=""/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">End Date</label>
                                                    <input type="text" id="end_time" className="form-control" defaultValue={inputs.end_time} name="end_time" onChange={handleChange} placeholder=""/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">subject</label>
                                                   {subject.length > 0 &&
                                                            <select type="text" id="subject_id" className="form-control" defaultValue={inputs.subject_id} name="subject_id" onChange={handleChange} placeholder="Enter subject name">
                                                                <option value="">Select Subject</option>
                                                                    {subject.map((d, key) =>
                                                                        <option value={d.id}>{d.subject_name}</option>
                                                                    )}
                                                            </select>
                                                      }
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">Batch</label>
                                                    {batch.length > 0 &&
                                                            <select type="text" id="batch_id" className="form-control" defaultValue={inputs.batch_id} name="batch_id" onChange={handleChange} placeholder="Enter batch name">
                                                                <option value="">Select Batch</option>
                                                                    {batch.map((d, key) =>              
                                                                        <option value={d.id}>{d.batch_name}</option>
                                                                    )}
                                                            </select>
                                                      }
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

export default ExamAdd
