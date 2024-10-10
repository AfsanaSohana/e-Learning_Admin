import * as React from 'react';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Protected from './components/protected';
import Course from './pages/Course';
import CourseAdd from './pages/Course/CourseAdd';
import Classes from './pages/Classes';
import ClassesAdd from './pages/Classes/ClassesAdd';

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
          <Route path="/classes/add" element={<ClassesAdd />} />
          <Route path="/classes/edit/:id" element={<ClassesAdd />} />
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
        {/* class */}
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
        } />
        {/* batch */}
          <Route path={"/batch"} element={
          <Protected isSignedIn={isSignedIn} >
            <Classes />
          </Protected>
        } />
        <Route path={"/batch/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <ClassesAdd />
          </Protected>
        } />
        <Route path={"/batch/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <ClassesAdd />
          </Protected>
        } />
      
        <Route path="/" element={<Dashboard />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
