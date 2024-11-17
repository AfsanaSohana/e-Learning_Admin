import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../../layout/adminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function QuizAdd() {
    const [inputs, setInputs] = useState({ id: '', question: '', options: '',correct_answer: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch quiz data if `id` is present
    const getDatas = () => {
        if (id) {       
            axios.get(`${process.env.REACT_APP_API_URL}/quiz/${id}`).then((response) => {
                setInputs(response.data.data);
            }).catch((error) => {
                console.error("Error fetching quiz data", error);
            });
        }
    };

    

    useEffect(() => {
        getDatas();
       
    }, [id]); // Re-run when id changes

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        
        try {
            const apiurl = inputs.id ? `/quiz/edit/${inputs.id}` : `/quiz/create`;
            const response = await axios.post(`${process.env.REACT_APP_API_URL}${apiurl}`, inputs);
            console.log(response);
            navigate('/quiz');
        } catch (error) {
            console.error("Error submitting the form", error);
        }
    };

    return (
        <AdminLayout>
            <div className="main-content container-fluid">
                <div className="page-title">
                    <h3>{id ? "Edit Quiz" : "Add New Quiz"}</h3>
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
                                                    <label htmlFor="module_1">Question</label>
                                                    <input type="text" id="question" className="form-control"
                                                        value={inputs.module_1} name="module_1" onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="module_2">Qu2</label>
                                                    <input type="text" id="module_2" className="form-control"
                                                        value={inputs.module_2} name="module_2" onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="module_3">Quiz-3</label>
                                                    <input type="text" id="module_3" className="form-control"
                                                        value={inputs.module_3} name="module_3" onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="module_4">Quiz-3</label>
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

export default QuizAdd;
