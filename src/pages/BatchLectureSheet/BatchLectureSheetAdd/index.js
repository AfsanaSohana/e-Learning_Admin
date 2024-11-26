import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../../layout/adminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function BatchLectureSheetAdd() {
    const [inputs, setInputs] = useState({ id: '', course_id: '', batch_id: '', subject_id: '', l_sheet_name: '', number_of_l_sheet: '',module_id:'',assignment_id:'',module_id:''});
    const [course, setCourse] = useState([]);
    const [batch, setBatch] = useState([]);
    const [subject, setSubject] = useState([]);
    const [module, setModule] = useState([]);
    const [assignment, setAssignment] = useState([]);
    const [exam, setExam] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch batchLectureSheet data if `id` is present
    const getDatas = () => {
        if (id) {       
            axios.get(`${process.env.REACT_APP_API_URL}/batchLectureSheet/${id}`).then((response) => {
                setInputs(response.data.data);
            }).catch((error) => {
                console.error("Error fetching batchLectureSheet data", error);
            });
        }
    };

    // Fetch relational data (subject and batch)
    const getRelational = async () => {
        try {
            const courseResponse = await axios.get(`${process.env.REACT_APP_API_URL}/course`);
            const batchResponse = await axios.get(`${process.env.REACT_APP_API_URL}/batch`);
            const subjectResponse = await axios.get(`${process.env.REACT_APP_API_URL}/subject`);
            const moduleResponse = await axios.get(`${process.env.REACT_APP_API_URL}/module`);
            const assignmentResponse = await axios.get(`${process.env.REACT_APP_API_URL}/assignment`);
            const examResponse = await axios.get(`${process.env.REACT_APP_API_URL}/exam`);
            setCourse(courseResponse.data.data);
            setBatch(batchResponse.data.data);
            setSubject(subjectResponse.data.data);
            setModule(moduleResponse.data.data);
           setAssignment(assignmentResponse.data.data);
           setExam(examResponse.data.data);
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
            const apiurl = inputs.id ? `/batchLectureSheet/edit/${inputs.id}` : `/batchLectureSheet/create`;
            const response = await axios.post(`${process.env.REACT_APP_API_URL}${apiurl}`, inputs);
            console.log(response);
            navigate('/batchLectureSheet');
        } catch (error) {
            console.error("Error submitting the form", error);
        }
    };

    return (
        <AdminLayout>
            <div className="main-content container-fluid">
                <div className="page-title">
                    <h3>{id ? "Edit BatchLectureSheet" : "Add New BatchLectureSheet"}</h3>
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
                                                    <label htmlFor="exam_name">Course</label>
                                                     {course.length > 0 ? (
                                                        <select id=" course_id" className="form-control"
                                                            value={inputs.course_id} name="course_id" onChange={handleChange}>
                                                            <option value="">Select course</option>
                                                            {course.map((c) => (
                                                                <option key={c.id} value={c.id}>{c.course_name}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <p>Loading course...</p>
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
                                                    <label htmlFor="sheets">Lecture Sheet </label>
                                                    <input type="text" id="l_sheet_name" className="form-control"
                                                        value={inputs.l_sheet_name} name="l_sheet_name" onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="sheets">Number of sheet</label>
                                                    <input type="text" id="number_of_l_sheet" className="form-control"
                                                        value={inputs.number_of_l_sheet} name="number_of_l_sheet" onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="module_id">Module</label>
                                                    {module.length > 0 ? (
                                                        <select id="module_id" className="form-control"
                                                            value={inputs.module_id} name="module_id" onChange={handleChange}>
                                                            <option value="">Select Subject</option>
                                                            {module.map((s) => (
                                                                <option key={s.id} value={s.id}>{s.id}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <p>Loading module...</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="module_id">Assignment</label>
                                                    {assignment.length > 0 ? (
                                                        <select id="assignment_id" className="form-control"
                                                            value={inputs.assignment_id} name="assignment_id" onChange={handleChange}>
                                                            <option value="">Select Subject</option>
                                                            {assignment.map((s) => (
                                                                <option key={s.id} value={s.id}>{s.assignment_name}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <p>Loading assignment...</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="exam">Exam</label>
                                                    {exam.length > 0 ? (
                                                        <select id="exam_id" className="form-control"
                                                            value={inputs.exam_id} name="exam_id" onChange={handleChange}>
                                                            <option value="">Select Subject</option>
                                                            {exam.map((s) => (
                                                                <option key={s.id} value={s.id}>{s.exam_id}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <p>Loading exam...</p>
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

export default BatchLectureSheetAdd;
