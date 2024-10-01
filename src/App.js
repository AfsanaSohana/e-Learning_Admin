import * as React from 'react';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Protected from './components/protected';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const isSignedIn = localStorage.getItem("access_token") || false;
  return (
    <BrowserRouter>
   
      <Routes> 
        <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path={"/"} element={
            <Protected isSignedIn={isSignedIn} >
              <Dashboard />
            </Protected>
          } />
        <Route path="/" element={<Dashboard />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
