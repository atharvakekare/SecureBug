import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componets/Login';
import Register from './componets/Register';
import Dashboard from './componets/Dashboard';
import Scan from './componets/Scan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/scan" element={<Scan />} />
      </Routes>
    </Router>
  );
}

export default App;
