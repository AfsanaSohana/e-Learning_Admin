import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../../layout/adminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function RoutineAdd() {
    const [inputs, setInputs] = useState({
        id: '',
        batch_id: '',
        batch_name: '',
        day_name: '',
        rdate: '',
        start_time: '',
        end_time: '',
        note: ''
    });
    const [batch, setBatch] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    function getDatas() {
        axios.get(`${process.env.REACT_APP_API_URL}/routine/${id}`).then(response => {
            setInputs(response.data.data);
        });
    }

    const getRelational = async () => {
        try {
            const batchResponse = await axios.get(`${process.env.REACT_APP_API_URL}/batch`);
            setBatch(batchResponse.data.data);
        } catch (error) {
            console.error("Error fetching relational data", error);
        }
    };

    useEffect(() => {
        if (id) {
            getDatas();
        }
        getRelational();
    }, [id]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let apiurl = '';
            if (inputs.id !== '') {
                apiurl = `/routine/edit/${inputs.id}`;
            } else {
                apiurl = `/routine/create`;
            }

            let response = await axios({
                method: 'post',
                responseType: 'json',
                url: `${process.env.REACT_APP_API_URL}${apiurl}`,
                data: inputs
            });

            navigate('/routine');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <AdminLayout>
            <div className="main-content container-fluid">
                <div className="page-title">
                    <div className="row">
                        <div className="col-12 col-md-6 order-md-1 order-last">
                            <h3>Add New Routine</h3>
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
                                                            <label htmlFor="batch_id">Batch Name</label>
                                                            {batch.length > 0 &&
                                                                <select
                                                                    id="batch_id"
                                                                    className="form-control"
                                                                    defaultValue={inputs.batch_id} // Use value instead of defaultValue
                                                                    name="batch_id"
                                                                    onChange={handleChange}
                                                                >
                                                                    <option value="">Select</option>
                                                                    {batch.map((d, key) => (
                                                                        <option key={key} value={d.id}>{d.batch_name}</option>
                                                                    ))}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="day_name">Day name</label>
                                                            <input type="text" id="day_name" className="form-control" value={inputs.day_name} name="day_name" onChange={handleChange} placeholder="sunday" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="rdate">Date</label>
                                                            <input type="date" id="rdate" className="form-control" value={inputs.rdate} name="rdate" onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="start_time">Start Time</label>
                                                            <input type="time" id="start_time" className="form-control" value={inputs.start_time} name="start_time" onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="end_time">End Time</label>
                                                            <input type="time" id="end_time" className="form-control" value={inputs.end_time} name="end_time" onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="note">Note</label>
                                                            <input type="text" id="note" className="form-control" value={inputs.note} name="note" onChange={handleChange} />
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

export default RoutineAdd;
