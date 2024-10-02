import React from 'react'
import AdminLayout from '../../../layout/adminLayout'
import { useNavigate } from 'react-router-dom';
import {useParams} from "react-router-dom";

function CourseAdd() {
      const [inputs, setInputs] = useState({id:'',course_name:'',batch_id:'',course_category:'',duration:'',fees:''});
    const navigate=useNavigate();
    const {id} = useParams();
    
    function getDatas(){
        axios.get(`${process.env.REACT_APP_API_URL}/course/${id}`).then(function(response) {
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
                apiurl=`/course/${inputs.id}`;
            }else{
                apiurl=`/course/create`;
            }
            
            let response= await axios({
                method: 'post',
                responsiveTYpe: 'json',
                url: `${process.env.REACT_APP_API_URL}${apiurl}`,
                data: inputs
            });
            navigate('/course')
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
                        <h3>Add New Course</h3>
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
                                                    <label for="first-name-vertical">Name</label>
                                                    <input type="text" id="fist-name-vertical" className="form-control" defaultValue={inputs.course_name} name="namcourse_namee" onChange={handleChange} placeholder="Enter course_name"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">Batch ID</label>
                                                    <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.batch_id} name="batch_id" onChange={handleChange} placeholder="Hscms12"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">Course Category</label>
                                                    <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.course_category} name="course_category" onChange={handleChange} placeholder="Regular Batch"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">Duration</label>
                                                    <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.duration} name="duration" onChange={handleChange} placeholder="3.00-5.00 pm"/>
                                                    </div>
                                                </div>
                                              
                                                <div className="col-12">
                                                    <div className="form-group">
                                                    <label for="email-id-vertical">Fees</label>
                                                    <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.fees} name="fees" onChange={handleChange} placeholder="000.00"/>
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

export default CourseAdd
