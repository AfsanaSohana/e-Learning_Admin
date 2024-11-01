import React, { useEffect, useState } from 'react';
import axios from '../../../components/axios';
import AdminLayout from '../../../layout/adminLayout';
import { useNavigate, useParams } from 'react-router-dom';

function StudentAdd() {
    const [inputs, setInputs] = useState({
        id: '',
        student_name: '',
        email: '',
        address: '',
        contact_number: '',
        photo: '',
        password: ''
    });
    const [selectedFile, setSelectedFile] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    function getData() {
        axios.get(`${process.env.REACT_APP_API_URL}/student/${id}`)
            .then(response => setInputs(response.data.data))
            .catch(error => console.error("Error fetching data:", error));
    }

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleFile = (e) => {
        setSelectedFile(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        for (let i = 0; i < selectedFile.length; i++) {
            formData.append('files[]', selectedFile[i]);
        }
        
        for (const property in inputs) {
            formData.append(property, inputs[property]);
        }

        try {
            let apiurl = inputs.id ? `/student/${inputs.id}` : `/student/create`;
            
            const response = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}${apiurl}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log(response);
            navigate('/student');
        } catch (e) {
            console.log("Error during submission:", e);
        }
    };

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
                                                            <label htmlFor="student_name">Student Name</label>
                                                            <input
                                                                type="text"
                                                                id="student_name"
                                                                className="form-control"
                                                                value={inputs.student_name || ''}
                                                                name="student_name"
                                                                onChange={handleChange}
                                                                placeholder="Enter student name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="email">Email</label>
                                                            <input
                                                                type="text"
                                                                id="email"
                                                                className="form-control"
                                                                value={inputs.email || ''}
                                                                name="email"
                                                                onChange={handleChange}
                                                                placeholder="sohana@email.com"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="address">Address</label>
                                                            <input
                                                                type="text"
                                                                id="address"
                                                                className="form-control"
                                                                value={inputs.address || ''}
                                                                name="address"
                                                                onChange={handleChange}
                                                                placeholder="road,street,city"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="photo">Photo</label>
                                                            <input
                                                                type="file"
                                                                id="photo"
                                                                className="form-control"
                                                                accept="image/*"
                                                                multiple
                                                                name="photo"
                                                                onChange={handleFile}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="password">Password</label>
                                                            <input
                                                                type="password"
                                                                id="password"
                                                                className="form-control"
                                                                value={inputs.password || ''}
                                                                name="password"
                                                                onChange={handleChange}
                                                                placeholder="******"
                                                            />
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

export default StudentAdd;
