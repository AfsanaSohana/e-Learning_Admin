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
          {/* <Route path="/routine" element={<Routine />} />
          <Route path="/routine/add" element={<RoutineAdd />} />
          <Route path="/routine/edit/:id" element={<RoutineAdd />} /> */}
          <Route path={"/"} element={
            <Protected isSignedIn={isSignedIn} >
              <Dashboard />
            </Protected>
          } />
          {/*  */}
          <Route path={"/course"} element={
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
        } />
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
