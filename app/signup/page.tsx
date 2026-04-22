'use client';

import React,{ useState, useContext } from 'react';
import useAuth  from '../context/AuthContext';
import { La_Belle_Aurore } from 'next/font/google';



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
    <div className='min-h-screen flex items-center justify-center p-4'>
       <div className='items-center justify-center bg-amber-200 w-full max-w-md rounded-2xl shadow-lg p-8 gap-8'>
         <h1 className='text-2xl font-bold text-gray-700 mb-5 '>Sign Up</h1>
        {error && <p className='text-red-500'>{error}</p>}
      <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
     
        
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='User Name'
            className='text-gray-500 border-2 rounded-2xl p-2 border-amber-500'
          />
        

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='text-gray-500 border-2 rounded-2xl p-2 border-amber-500'
          />

            <div>
            <label className='text-gray-500'>Role:</label>

          <select value={role} onChange={(e) => setRole(e.target.value)} className='text-gray-500'>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
            </div>


        <button className='text-white bg-amber-400 hover:bg-amber-500 mb-5 py-2 px-4 rounded' type="submit">Sign Up</button>
      </form>
      <p className='text-gray-500'>Already have an account? <a className='text-red-950 font-bold' href="/login">Login</a></p>
       </div>
      
    </div>
  )
}

export default SignupPage
