import * as React from 'react';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Protected from './components/protected';
import Course from './pages/Course';
import CourseAdd from './pages/Course/CourseAdd';

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
          <Route path={"/"} element={
            <Protected isSignedIn={isSignedIn} >
              <Dashboard />
            </Protected>
          } />
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
        <Route path="/" element={<Dashboard />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
