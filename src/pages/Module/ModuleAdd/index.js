import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../../layout/adminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ModuleAdd() {
    const [inputs, setInputs] = useState({ id: '', course_id: '', batch_id: '',module_1: '', module_2: '', module_3: '',module_4:'' });
    const [course, setCourse] = useState([]);
    const [batch, setBatch] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch module data if `id` is present
    const getDatas = () => {
        if (id) {       
            axios.get(`${process.env.REACT_APP_API_URL}/module/${id}`).then((response) => {
                setInputs(response.data.data);
            }).catch((error) => {
                console.error("Error fetching module data", error);
            });
        }
    };

    // Fetch relational data (subject and batch)
    const getRelational = async () => {
        try {
            const coursetResponse = await axios.get(`${process.env.REACT_APP_API_URL}/course`);
            const batchResponse = await axios.get(`${process.env.REACT_APP_API_URL}/batch`);
            setCourse(coursetResponse.data.data);
            setBatch(batchResponse.data.data);
        } catch (error) {
            console.error("Error fetching relational data", error);
        }
    };

    useEffect(() => {
        getDatas();
        getRelational();
    }, [id]); // Re-run when id changes

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        
        try {
            const apiurl = inputs.id ? `/module/edit/${inputs.id}` : `/module/create`;
            const response = await axios.post(`${process.env.REACT_APP_API_URL}${apiurl}`, inputs);
            console.log(response);
            navigate('/module');
        } catch (error) {
            console.error("Error submitting the form", error);
        }
    };

    return (
        <AdminLayout>
            <div className="main-content container-fluid">
                <div className="page-title">
                    <h3>{id ? "Edit Module" : "Add New Module"}</h3>
                </div>
                <section id="basic-vertical-layouts">
                    <div className="card">
                        <div className="card-body">
                            {/* Render the form only if inputs are loaded */}
                            {inputs ? (
                                <form className="form form-vertical" onSubmit={handleSubmit}>
                                    <div className="form-body">
                                        <div className="row">
                                             <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="course">Course</label>
                                                    {course.length > 0 ? (
                                                        <select id="course_id" className="form-control"
                                                            value={inputs.course_id} name="course_id" onChange={handleChange}>
                                                            <option value="">Select </option>
                                                            {course.map((s) => (
                                                                <option key={s.id} value={s.id}>{s.course_name}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <p>Loading subjects...</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="batch_id">Batch</label>
                                                    {batch.length > 0 ? (
                                                        <select id="batch_id" className="form-control"
                                                            value={inputs.batch_id} name="batch_id" onChange={handleChange}>
                                                            <option value="">Select Batch</option>
                                                            {batch.map((b) => (
                                                                <option key={b.id} value={b.id}>{b.batch_name}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <p>Loading batches...</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="module_1">Module-1</label>
                                                    <input type="text" id="module_1" className="form-control"
                                                        value={inputs.module_1} name="module_1" onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="module_2">Module-2</label>
                                                    <input type="text" id="module_2" className="form-control"
                                                        value={inputs.module_2} name="module_2" onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="module_3">Module-3</label>
                                                    <input type="text" id="module_3" className="form-control"
                                                        value={inputs.module_3} name="module_3" onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="module_4">Module-3</label>
                                                    <input type="text" id="module_4" className="form-control"
                                                        value={inputs.module_4} name="module_4" onChange={handleChange} />
                                                </div>
                                            </div>


                                           

                                            <div className="col-12 d-flex justify-content-end">
                                                <button type="submit" className="btn btn-primary mr-1 mb-1">Submit</button>
                                                <button type="reset" className="btn btn-light-secondary mr-1 mb-1">Reset</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}

export default ModuleAdd;
