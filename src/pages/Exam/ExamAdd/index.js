import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../../layout/adminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ExamAdd() {
    const [inputs, setInputs] = useState({ id: '', exam_name: '', duration: '', start_time: '', end_time: '', subject_id: '', batch_id: '' });
    const [subject, setSubject] = useState([]);
    const [batch, setBatch] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch exam data if `id` is present
    const getDatas = () => {
        if (id) {
            axios.get(`${process.env.REACT_APP_API_URL}/exam/${id}`).then((response) => {
                setInputs(response.data.data);
            }).catch((error) => {
                console.error("Error fetching exam data", error);
            });
        }
    };

    // Fetch relational data (subject and batch)
    const getRelational = async () => {
        try {
            const subjectResponse = await axios.get(`${process.env.REACT_APP_API_URL}/subject`);
            const batchResponse = await axios.get(`${process.env.REACT_APP_API_URL}/batch`);
            setSubject(subjectResponse.data.data);
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
            const apiurl = inputs.id ? `/exam/edit/${inputs.id}` : `/exam/create`;
            const response = await axios.post(`${process.env.REACT_APP_API_URL}${apiurl}`, inputs);
            console.log(response);
            navigate('/exam');
        } catch (error) {
            console.error("Error submitting the form", error);
        }
    };

    return (
        <AdminLayout>
            <div className="main-content container-fluid">
                <div className="page-title">
                    <h3>{id ? "Edit Exam" : "Add New Exam"}</h3>
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
                                                    <label htmlFor="exam_name">Exam Name</label>
                                                    <input type="text" id="exam_name" className="form-control"
                                                        value={inputs.exam_name} name="exam_name" onChange={handleChange} placeholder="Enter exam name" />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="duration">Duration</label>
                                                    <input type="text" id="duration" className="form-control"
                                                        value={inputs.duration} name="duration" onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="start_time">Start Date</label>
                                                    <input type="date" id="start_time" className="form-control"
                                                        value={inputs.start_time} name="start_time" onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="end_time">End Date</label>
                                                    <input type="date" id="end_time" className="form-control"
                                                        value={inputs.end_time} name="end_time" onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="subject_id">Subject</label>
                                                    {subject.length > 0 ? (
                                                        <select id="subject_id" className="form-control"
                                                            value={inputs.subject_id} name="subject_id" onChange={handleChange}>
                                                            <option value="">Select Subject</option>
                                                            {subject.map((s) => (
                                                                <option key={s.id} value={s.id}>{s.subject_name}</option>
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

export default ExamAdd;
