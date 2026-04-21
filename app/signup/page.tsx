'use client';

import React,{ useState, useContext } from 'react';
import useAuth  from '../context/AuthContext';



const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState<string | null>(null);
    
    const { signup } = useAuth();

     const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        try {
            await signup(username, password, role);
            // Redirect or show success message
        } catch (error) {
            console.error('Signup failed:', error);
            setError('Signup failed. Please try again.');
            // Show error message to user
        }
     }  
  return (
    <div>
        <h1 className='text-lg font-bold '>Sign Up</h1>
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
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
      
    </div>
  )
}

export default SignupPage
