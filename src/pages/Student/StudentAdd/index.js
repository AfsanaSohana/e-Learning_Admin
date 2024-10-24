import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../../layout/adminLayout';
import { useNavigate } from 'react-router-dom';
import {useParams} from "react-router-dom";

function StudentAdd() {
      const [inputs, setInputs] = useState({id:'',student_name:'',email:'',contact_number:'',photo:''});
      const [selectedfile, setSelectedFile] = useState([]);
    const navigate=useNavigate();
  
    const {id} = useParams();
    
    function getDatas(){
        axios.get(`${process.env.REACT_APP_API_URL}/student/${id}`).then(function(response) {
            setInputs(response.data.data);
        });
    }

    useEffect(() => {
        if(id){
            getDatas();
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

        const handelFile = (e) => {
            setSelectedFile(e.target.files)
        }
        const handleSubmit = async (e) => {
            e.preventDefault();
    
            const formData = new FormData();
    
            for (let i = 0; i < selectedfile.length; i++) {
                formData.append('files[]', selectedfile[i])
            }
    
            for (const property in inputs) {
                formData.append(property, inputs[property])
            }
        
        try{
            let apiurl='';
            if(inputs.id!=''){
                apiurl=`/student/edit/${inputs.id}`;
            }else{
                apiurl=`/student/create`;
            }
            
            let response= await axios({
                method: 'post',
                responsiveTYpe: 'json',
                url: `${process.env.REACT_APP_API_URL}${apiurl}`,
                data: inputs
            });
            console.log(response)
            navigate('/student')
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
                        <h3>Add New Student</h3>
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
                                                    <label for="first-name-vertical"> Student Name</label>
                                                    <input type="text" id="student_name" className="form-control" defaultValue={inputs.student_name} name="student_name" onChange={handleChange} placeholder="Enter student name"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">Email</label>
                                                    <input type="text" id="email" className="form-control" defaultValue={inputs.email} name="email" onChange={handleChange} placeholder="sohana@email.com"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">Contact Number</label>
                                                    <input type="text" id="contact_number" className="form-control" defaultValue={inputs.contact_number} name="contact_number" onChange={handleChange} placeholder=""/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">photo</label>
                                                    <input type="file" id="photo" className="form-control" accept="image/*" multiple defaultValue={inputs.photo} name="photo" onChange={handelFile} placeholder="sohana@email.com"/>
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

export default StudentAdd
