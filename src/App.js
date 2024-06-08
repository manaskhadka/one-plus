import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Mainpage from './mainpage';
import Login from './login';
import Postpage from './postpage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/postpage">Post</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/postpage" element={<Postpage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
