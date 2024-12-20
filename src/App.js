import * as React from 'react';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Protected from './components/protected';
import Course from './pages/Course';
import CourseAdd from './pages/Course/CourseAdd';
import Classes from './pages/Classes';
import ClassesAdd from './pages/Classes/ClassesAdd';
import Batch from './pages/Batch';
import BatchAdd from './pages/Batch/BatchAdd';
import Exam from './pages/Exam';
import ExamAdd from './pages/Exam/ExamAdd';
import Instructor from './pages/Instructor';
import InstructorAdd from './pages/Instructor/instructorAdd';
import Student from './pages/Student';
import StudentAdd from './pages/Student/StudentAdd';
import Routine from './pages/Routine';
import RoutineAdd from './pages/Routine/RoutineAdd';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Subject from './pages/Subject';
import SubjectAdd from './pages/Subject/SubjectAdd';
import BatchEnrollRequest from './pages/BatchEnrollRequest';
import BatchEnrollRequestAdd from './pages/BatchEnrollRequest/BatchEnrollRequestAdd';
import BatchEnroll from './pages/BatchEnroll';
import BatchEnrollAdd from './pages/BatchEnroll/BatchEnrollAdd';
import Certificate from './pages/Certificate';
import CertificateAdd from './pages/Certificate/CertificateAdd';
import CoursePlan from './pages/CoursePlan';
import CoursePlanAdd from './pages/CoursePlan/CoursePlanAdd';
import Attendence from './pages/Attendence';
import AttendenceAdd from './pages/Attendence/AttendenceAdd';
import BatchLectureSheet from './pages/BatchLectureSheet';
import BatchLectureSheetAdd from './pages/BatchLectureSheet/BatchLectureSheetAdd';
import Assignment from './pages/Assignment';
import AssignmentAdd from './pages/Assignment/AssignmentAdd';
import Module from './pages/Module';
import ModuleAdd from './pages/Module/ModuleAdd';
import Quiz from './pages/Quiz';
import QuizAdd from './pages/Quiz/QuizAdd';
import CertificateApplyRequest from './pages/CertificateApplyRequest';
import CertificateApplyRequestAdd from './pages/CertificateApplyRequest/CertificateApplyRequestAdd';

function App() {
  const isSignedIn = localStorage.getItem("access_token") || false;
  return (
    <BrowserRouter>
   
      <Routes> 
        <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/course" element={<Course />} />
          <Route path="/course/add" element={<CourseAdd />} />
          <Route path="/course/edit/:id" element={<CourseAdd />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/add" element={<ClassesAdd />} />
          <Route path="/classes/edit/:id" element={<ClassesAdd />} />
          <Route path="/batch" element={<Batch />} />
          <Route path="/batch/add" element={<BatchAdd />} />
          <Route path="/batch/edit/:id" element={<BatchAdd />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/exam/add" element={<ExamAdd />} />
          <Route path="/exam/edit/:id" element={<ExamAdd />} />
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/instructor/add" element={<InstructorAdd />} />
          <Route path="/instructor/edit/:id" element={<InstructorAdd />} />
          <Route path="/student" element={<Student />} />
          <Route path="/student/add" element={<StudentAdd />} />
          <Route path="/student/edit/:id" element={<StudentAdd />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/routine/add" element={<RoutineAdd />} />
          <Route path="/routine/edit/:id" element={<RoutineAdd />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/subject/add" element={<SubjectAdd />} />
          <Route path="/subject/edit/:id" element={<SubjectAdd />} />
          <Route path="/coursePlan" element={<CoursePlan />} />
          <Route path="/coursePlan/add" element={<CoursePlanAdd />} />
          <Route path="/coursePlan/edit/:id" element={<CoursePlanAdd />} />
          <Route path="/batchEnrollRequest" element={<BatchEnrollRequest />} />
          <Route path="/batchEnrollRequest/add" element={<BatchEnrollRequestAdd />} />
          <Route path="/batchEnrollRequest/edit/:id" element={<BatchEnrollRequestAdd />} />

          <Route path="/batchEnroll" element={<BatchEnroll/>} />
          <Route path="/batchEnroll/add" element={<BatchEnrollAdd />} />
          <Route path="/batchEnroll/edit/:id" element={<BatchEnrollAdd />} />

          <Route path="/certificateApplyRequest" element={<CertificateApplyRequest />} />
          <Route path="/certificateApplyRequest/add" element={<CertificateApplyRequestAdd/>} />
          <Route path="/certificateApplyRequest/edit/:id" element={<CertificateApplyRequestAdd />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/certificate/add" element={<CertificateAdd />} />
          <Route path="/certificate/edit/:id" element={<CertificateAdd />} />
          <Route path="/attendence" element={<Attendence />} />
          <Route path="/attendence/add" element={<AttendenceAdd />} />
          <Route path="/attendence/edit/:id" element={<AttendenceAdd />} />
          <Route path="/batchLectureSheet" element={<BatchLectureSheet />} />
          <Route path="/batchLectureSheet/add" element={<BatchLectureSheetAdd />} />
          <Route path="/batchLectureSheet/edit/:id" element={<BatchLectureSheetAdd />} />
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/assignment/add" element={<AssignmentAdd />} />
          <Route path="/assignment/edit/:id" element={<AssignmentAdd />} />
          <Route path="/module" element={<Module />} />
          <Route path="/module/add" element={<ModuleAdd />} />
          <Route path="/module/edit/:id" element={<ModuleAdd />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/add" element={<QuizAdd />} />
          <Route path="/quiz/edit/:id" element={<ModuleAdd />} />
          
          {/* <Route path={"/"} element={
            <Protected isSignedIn={isSignedIn} >
              <Dashboard />
            </Protected>
          } /> */}
          {/*  */}
          {/* <Route path={"/course"} element={
          <Protected isSignedIn={isSignedIn} >
            <Course />
          </Protected>
        } />
        <Route path={"/course/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <CourseAdd />
          </Protected>
        } />
        <Route path={"/course/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <CourseAdd />
          </Protected>
        } /> */}
        {/* class
          <Route path={"/classes"} element={
          <Protected isSignedIn={isSignedIn} >
            <Classes />
          </Protected>
        } />
        <Route path={"/classes/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <ClassesAdd />
          </Protected>
        } />
        <Route path={"/classes/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <ClassesAdd />
          </Protected>
        } /> */}
        {/* batch
          <Route path={"/batch"} element={
          <Protected isSignedIn={isSignedIn} >
            <Batch />
          </Protected>
        } />
        <Route path={"/batch/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <BatchAdd />
          </Protected>
        } />
        <Route path={"/batch/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <BatchAdd />
          </Protected>
        } /> */}
      
        <Route path="/" element={<Dashboard />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
