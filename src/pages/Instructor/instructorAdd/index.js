import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../../layout/adminLayout';
import { useNavigate } from 'react-router-dom';
import {useParams} from "react-router-dom";

function InstructorAdd() {
      const [inputs, setInputs] = useState({id:'',instructor_name:'',designation:'',contact_number:'',email:'',fb_id:'',insta_id:'',twt_id:''});
    const navigate=useNavigate();
    const {id} = useParams();
    
    function getDatas(){
        axios.get(`${process.env.REACT_APP_API_URL}/instructor/${id}`).then(function(response) {
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
        
        try{
            let apiurl='';
            if(inputs.id!=''){
                apiurl=`/instructor/edit/${inputs.id}`;
            }else{
                apiurl=`/instructor/create`;
            }
            
            let response= await axios({
                method: 'post',
                responsiveTYpe: 'json',
                url: `${process.env.REACT_APP_API_URL}${apiurl}`,
                data: inputs
            });
            console.log(response)
            navigate('/instructor')
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
                        <h3>Add New Instructor</h3>
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
                                                    <label for="first-name-vertical"> Instructor Name</label>
                                                    <input type="text" id="instructor_name" className="form-control" defaultValue={inputs.instructor_name} name="instructor_name" onChange={handleChange} placeholder="Enter instructor name"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">Designation</label>
                                                    <input type="text" id="designation" className="form-control" defaultValue={inputs.designation} name="designation" onChange={handleChange} placeholder="inatructor"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">Contact Number</label>
                                                    <input type="text" id="contact_number" className="form-control" defaultValue={inputs.contact_number} onChange={handleChange} name="contact_number"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">Email</label>
                                                    <input type="text" id="email" className="form-control" defaultValue={inputs.email} name="email" onChange={handleChange} placeholder="inatructor@gmail.com"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">Facebook</label>
                                                    <input type="text" id="fb_id" className="form-control" defaultValue={inputs.fb_id} name="fb_id" onChange={handleChange} placeholder="inatructor123"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">Instagram</label>
                                                    <input type="text" id="insta_id" className="form-control" defaultValue={inputs.insta_id} name="insta_id" onChange={handleChange} placeholder="inatructor123"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">Twitter</label>
                                                    <input type="text" id="twt_id" className="form-control" defaultValue={inputs.twt_id} name="twt_id" onChange={handleChange} placeholder="inatructor123"/>
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

export default InstructorAdd
