'use client'

import React,{ useState, useContext } from 'react';
import useAuth  from '../context/AuthContext';


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();


     const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        try {
            await login(username, password);
            // Redirect or show success message
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your credentials and try again.');
            // Show error message to user
        }
     }
  return (
    <div>
        <h1 className='text-lg font-bold '>Login</h1>
        {error && <p className='text-red-500'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>

    </div>
  )
    

}

export default LoginPage

