import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import Mainpage from './mainpage';
import EventForm from './EventForm';
import Login from './login'; // Import the Login component
import Register from './register'; // Import the Register component

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Route for Mainpage */}
          <Route path="/create-event" element={<EventForm />} /> {/* Route for EventForm */}
          <Route path="/mainpage" element={<Mainpage />} /> {/* Route for Login */}
          <Route path="/register" element={<Register />} /> {/* Route for Register */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;



