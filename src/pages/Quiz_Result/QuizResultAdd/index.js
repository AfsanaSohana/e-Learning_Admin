import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../../layout/adminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function QuizAdd() {
    const [inputs, setInputs] = useState({ id: '', student_id: '',course_id: '', total_question: '', correct_answers: ''});
    const [student, setStudent] = useState([]);
    const [course, setCourse] = useState([]);
    const navigate = useNavigate(); 
    const { id } = useParams();

    // Fetch quizResult data if `id` is present
    const getDatas = () => {
        if (id) {       
            axios.get(`${process.env.REACT_APP_API_URL}/quizResult/${id}`).then((response) => {
                setInputs(response.data.data);
            }).catch((error) => {
                console.error("Error fetching quizResult data", error);
            });
        }
    };

    // Fetch relational data (subject and batch)
    const getRelational = async () => {
        try {
            const courseResponse = await axios.get(`${process.env.REACT_APP_API_URL}/course`);
            const studentResponse = await axios.get(`${process.env.REACT_APP_API_URL}/student`);
            setCourse(courseResponse.data.data);
            setStudent(studentResponse.data.data);
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
    
        if (!inputs.course_id || !inputs.question || !inputs.correct_answers) {
            alert("Please fill all the required fields!");
            return;
        }
    
        try {
            const apiurl = inputs.id ? `/quizResult/edit/${inputs.id}` : `/quizResult/create`;
            const response = await axios.post(`${process.env.REACT_APP_API_URL}${apiurl}`, inputs);
            console.log(response);
            navigate('/quizResult');
        } catch (error) {
            console.error("Error submitting the form", error);
            alert("Failed to save the quizResult. Please try again.");
        }
    };
    return (
        <AdminLayout>
            <div className="main-content container-fluid">
                <div className="page-title">
                    <h3>{id ? "Edit QuizResult" : "Add New QuizResult"}</h3>
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
                                                    <label htmlFor="question">Question</label>
                                                    <input type="text" id="question" className="form-control"
                                                        value={inputs.question} name="question" onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                 <label htmlFor="question">Question type</label>
                                               <select id="status" className="form-control" defaultValue={inputs.question_type} name='question_type' onChange={handleChange}>
                                        <option value="">--Select question_type--</option>
                                        <option value="0">Other question</option>
                                        <option value="1">True False</option>
                                        
                                    </select>
                                                
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="options_1">Option_1</label>
                                                    <input type="text" id="options_1" className="form-control"
                                                        value={inputs.options_1} name="options_1" onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="options_1">Option_2</label>
                                                    <input type="text" id="options_2" className="form-control"
                                                        value={inputs.options_2} name="options_2" onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="options_3">Option_3</label>
                                                    <input type="text" id="options_3" className="form-control"
                                                        value={inputs.options_3} name="options_3" onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="options_4">Option_4</label>
                                                    <input type="text" id="options_4" className="form-control"
                                                        value={inputs.options_4} name="options_4" onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="correct_answer">Answer</label>
                                                    <input type="text" id="correct_answer" className="form-control"
                                                        value={inputs.correct_answer} name="correct_answer" onChange={handleChange} />
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

export default QuizAdd;
