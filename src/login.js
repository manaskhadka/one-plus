import React from 'react';

const LoginPage = () => {
  return (
    <div className="login-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <h1>Login</h1>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input type="text" placeholder="Username" style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }} />
        <input type="password" placeholder="Password" style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }} />
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

