import React from 'react'
import { Link,useLocation } from 'react-router-dom'

function Sidebar() {
    const activeMenu=(e)=>{
        document.querySelectorAll('.submenu').forEach(
            function(e){
                e.classList.remove('active');
            }
        )
        const childElement = e.target.parentElement.querySelector('.submenu');
        if(childElement && childElement.classList.contains('submenu')){
            childElement.classList.add('active');
        }
    }

	const location = useLocation();
	const isLinkActive = (path)=>{
        return location.pathname == path ? 'active' : "";
    }
  return (
     <div className="sidebar pe-4 pb-3">
                    <nav className="navbar bg-secondary navbar-dark">
                        <a href="index.html" className="navbar-brand mx-4 mb-3">
                            <h3 className="text-light"><i className="fa fa-user-edit me-2"></i>eLearning</h3>
                        </a>
                        <div className="d-flex align-items-center ms-4 mb-4">
                            <div className="position-relative">
                                <img className="rounded-circle" src="/assets/img/user.jpg" alt="" style={{width: "40px", height: "40px"}}/>
                                <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                            </div>
                            <div className="ms-3">
                                <h6 className="mb-0 text-light">Sohana Afsana</h6>
                                <span>Admin</span>
                            </div>
                        </div>
                        <div className="navbar-nav w-100">
                            <a href="index.html" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-4"></i>Dashboard</a>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Course </a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to='/course/add'className="dropdown-item"> Add New </Link>
                                    <Link to='/course'className="dropdown-item"> list </Link>
                                    
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-1"></i>Classes</a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to='/classes/add'className="dropdown-item"> Add New </Link>
                                    <Link to='/classes'className="dropdown-item"> list </Link>
                                    
                                </div>
                            </div>
                             <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Student</a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to='/student/add'className="dropdown-item"> Add New </Link>
                                    <Link to='/student'className="dropdown-item"> list </Link>
                                    
                                </div>
                            </div>
                             <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Instructor </a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to='/instructor/add'className="dropdown-item"> Add New </Link>
                                    <Link to='/instructor'className="dropdown-item"> list </Link>
                                    
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Batch </a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to='/batch/add'className="dropdown-item"> Add New </Link>
                                    <Link to='/batch'className="dropdown-item"> list </Link>
                                    
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Lecture Sheet </a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to='/batchLectureSheet/add'className="dropdown-item"> Add New </Link>
                                    <Link to='/batchLectureSheet'className="dropdown-item"> list </Link>
                                    
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Subject</a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to='/subject/add'className="dropdown-item"> Add New </Link>
                                    <Link to='/subject'className="dropdown-item"> list </Link>
                                    
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Exam </a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to='/exam/add'className="dropdown-item"> Add New </Link>
                                    <Link to='/exam'className="dropdown-item"> list </Link>
                                    
                                </div>
                            </div>
                           
                           
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Routine</a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to='/routine/add'className="dropdown-item"> Add New </Link>
                                    <Link to='/routine'className="dropdown-item"> list </Link>
                                    
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i> Course Plan</a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to='/coursePlan/add'className="dropdown-item"> Add New </Link>
                                    <Link to='/coursePlan'className="dropdown-item"> list </Link>
                                    
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i> Assignment</a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to='/assignment/add'className="dropdown-item"> Add New </Link>
                                    <Link to='/assignment'className="dropdown-item"> list </Link>
                                    
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2">Exam Result</i></a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to='/examResult/add'className="dropdown-item"> Add New </Link>
                                    <Link to='/examResult'className="dropdown-item"> list </Link>
                                    
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2">Attendence</i> </a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to='/attendence/add'className="dropdown-item"> Add New </Link>
                                    <Link to='/attendence'className="dropdown-item"> list </Link>
                                    
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Batch Enroll </a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to='/batchEnroll/add'className="dropdown-item"> Add New </Link>
                                    <Link to='/batchEnroll'className="dropdown-item"> list </Link>
                                    
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Batch Enroll Request </a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to='/batchEnrollRequest/add'className="dropdown-item"> Add New </Link>
                                    <Link to='/batchEnrollRequest'className="dropdown-item"> list </Link>
                                    
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop ms-2 me-2"></i>Certificate </a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to='/certificate/add'className="dropdown-item"> Add New </Link>
                                    <Link to='/certificate'className="dropdown-item"> list </Link>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </nav>
                </div>
  )
}

export default Sidebar
