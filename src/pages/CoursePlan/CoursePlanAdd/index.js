import React, { useEffect, useState } from 'react';
import axios from '../../../components/axios';
import AdminLayout from '../../../layout/adminLayout';
import { useNavigate, useParams } from 'react-router-dom';

function CoursePlanAdd() {
  
  const [inputs, setInputs] = useState({ id: '', course_id: '', subject_id: '', title: '', document: '',model_test:'',model:'' });
  const [selectedFile, setSelectedFile] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState([]);
  const [selectedModelSheet, setselectedModelSheet] = useState([]);
  const [course, setCourse] = useState([]);
  const [subject, setSubject] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getDatas();
    }
    getRelational();
  }, []);

  function getDatas() {
    axios.get(`${process.env.REACT_APP_API_URL}/coursePlan/${id}`).then((response) => {
      setInputs(response.data.data);
    });
  }

  const getRelational = async () => {
    axios.get(`${process.env.REACT_APP_API_URL}/course`).then((response) => {
      setCourse(response.data.data);
    });
    axios.get(`${process.env.REACT_APP_API_URL}/subject`).then((response) => {
      setSubject(response.data.data);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleFileChange = (e) => {
    selectedDocument(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
      // Append photos to formData
            formData.append('document', selectedDocument[0]);
            formData.append('model_sheet', selectedModelSheet[0]);
        
        
        // Append other form inputs to formData
        for (const user in inputs) {
            formData.append(user, inputs[user]);
        }
        //

    // for (let i = 0; i < selectedFile.length; i++) {
    //   formData.append('files[]', selectedFile[i]);
    // }
    for (const property in inputs) {
      formData.append(property, inputs[property]);
    }

       try{
                let apiurl='';
                if(inputs.id!=''){
                    apiurl=`/coursePlan/edit/${inputs.id}`;
                }else{
                    apiurl=`/coursePlan/create`;
                }
                
                let response= await axios({
                    method: 'post',
                    responsiveTYpe: 'json',
                    url: `${process.env.REACT_APP_API_URL}${apiurl}`,
                   
                    // data: inputs
                    //for photo
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });//
                navigate('/coursePlan/coursePlanList')
            } 
            catch(e){
                console.log(e);
            }
  };

  return (
    <AdminLayout>
      <div className="main-content container-fluid">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>Add New Course Plan</h3>
            </div>
            <div className="col-12 col-md-6 order-md-2 order-first">
              <nav aria-label="breadcrumb" className="breadcrumb-header">
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
                              <label htmlFor="course_id">Course</label>
                              {course.length > 0 && (
                                <select
                                  id="course_id"
                                  className="form-control"
                                  defaultValue={inputs.course_id}
                                  name="course_id"
                                  onChange={handleChange}
                                >
                                  <option value="">Select course</option>
                                  {course.map((d) => (
                                    <option key={d.id} value={d.id}>{d.course_name}</option>
                                  ))}
                                </select>
                              )}
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="subject_id">Subject</label>
                              {subject.length > 0 && (
                                <select
                                  id="subject_id"
                                  className="form-control"
                                  defaultValue={inputs.subject_id}
                                  name="subject_id"
                                  onChange={handleChange}
                                >
                                  <option value="">Select subject</option>
                                  {subject.map((d) => (
                                    <option key={d.id} value={d.id}>{d.subject_name}</option>
                                  ))}
                                </select>
                              )}
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="title">Title</label>
                              <input
                                type="text"
                                id="title"
                                className="form-control"
                                defaultValue={inputs.title}
                                name="title"
                                onChange={handleChange}
                                placeholder="Enter course plan title"
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="document">Document</label>
                              <input
                                type="file"
                                id="document"
                                className="form-control"
                                name="document"
                                onChange={handleFileChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="model_test">Model Test</label>
                              <input
                                type="text"
                                id="model_test"
                                className="form-control"
                                defaultValue={inputs.model_test}
                                name="model_test"
                                onChange={handleChange}
                                placeholder="Enter model test"
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="model_sheet">Model Test Sheet</label>
                              <input
                                type="file"
                                id="model_sheet"
                                className="form-control"
                                name="model_sheet"
                                onChange={handleFileChange}
                                placeholder="Upload model test sheet"
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

export default CoursePlanAdd;
