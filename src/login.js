import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic here, e.g., make a request to your backend to verify credentials
    try {
      // Assuming login returns user data upon successful authentication
      const userData = await login({ username, password });
      console.log('Logged in as:', userData.username);
      

      // Redirect to dashboard or any other page upon successful login
      navigate('/')
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }} />
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>Login</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      <Link to="/register" style={{ marginTop: '20px', textDecoration: 'none' }}>
        <button style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: 'white', cursor: 'pointer' }}>Register</button>
      </Link>
    </div>
  );
};

export default LoginPage;