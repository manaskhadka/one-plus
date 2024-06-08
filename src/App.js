import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Mainpage from './mainpage';
import Login from './login';
import Register from './register';
import EventForm from './EventForm';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App" style={{ fontFamily: 'Arial, sans-serif' }}>
          <nav style={{ backgroundColor: '#007bff', padding: '10px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', fontWeight: 'bold' }}>
              ONE-PLUS
            </div>
            <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', margin: '0', padding: '0' }}>
              <li style={{ margin: '0 10px' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
              </li>
              <li style={{ margin: '0 10px' }}>
                <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
              </li>
              <li style={{ margin: '0 10px' }}>
                <Link to="/event-form" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Post</Link>
              </li>
            </ul>
          </nav>
          <div style={{ padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Mainpage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/event-form" element={<EventForm />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
