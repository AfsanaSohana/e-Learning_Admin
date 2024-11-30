import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../layout/adminLayout';
import { Link } from 'react-router-dom';


function Quiz() {

    const[data, setData]=useState([]);
    useEffect(() => {
        getDatas();
    }, []);

    function getDatas() {
        axios.get(`${process.env.REACT_APP_API_URL}/quiz`).then(function(response) {
            setData(response.data.data);
        });
    }
    const deleteData = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/quiz/${id}`).then(function(response){
            getDatas();
        });
    }
  return (
    <AdminLayout>
        <div className="row g-4">
            <div className="col-sm-12">
                <div className="bg-light rounded h-100 p-4">
                    <h6 className="mb-4">Quiz</h6>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Student ID</th>
                                <th scope="col">Course ID</th>
                                <th scope="col">Question Type</th>
                                <th scope="col">Option-1</th>
                                <th scope="col">Option-2</th>
                                <th scope="col">Option-3</th>
                                <th scope="col">Option-4</th>
                                <th scope="col">Answer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((d, key) =>
                                <tr key={d.id}>
                                    <td>{d.student?.student_name}</td>
                                    <td>{d.course?.course_name}</td>
                                    <td>{d.total_question}</td>
                                    <td>{d.correct_answers}</td>
                                    <td>
                                        <Link to={`/quiz/edit/${d.id}`} className='btn btn-info' >Edit</Link>
                                        <button type='button' onClick={() => deleteData(d.id)} className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AdminLayout>
  )
}

export default Quiz
