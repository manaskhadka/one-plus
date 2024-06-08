import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('Select Profile Picture');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('profileImage', profileImage);

    try {
      const response = await axios.post('http://localhost:5000/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Handle success (e.g., redirect to login page)
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Registration failed');
    }
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
    setFileName(e.target.files[0] ? e.target.files[0].name : 'Select Profile Picture');
  };

  return (
    <div className="register-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }}
        />
        <label
          htmlFor="file-upload"
          className="custom-file-upload"
          style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '200px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#fff' }}
        >
          {fileName}
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          required
        />
        <button
          type="submit"
          style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
        >
          Register
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}

export default Register;


