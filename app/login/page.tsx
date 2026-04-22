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
    <div className='flex items-center justify-center min-h-screen p-4 '>
    <div className=' items-center justify-center gap-6 bg-amber-100 w-full max-w-md rounded-2xl shadow-lg p-8'>
        <h1 className='text-3xl font-bold text-red-800 font-extrabold w-full mx-auto'>Login</h1>
        {error && <p className='text-red-500'>{error}</p>}
      <form className='flex flex-col gap-8 m-8' onSubmit={handleSubmit}>
        
            
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full text-gray-500 border-amber-500 border-1 rounded-lg p-2'
            placeholder='Username'
          
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full text-gray-500 border-amber-500 border-1 rounded-lg p-2'
            placeholder='Password'
          />

        <button className='text-red-900 font-bold bg-amber-600 hover:bg-amber-700 rounded-4xl' type="submit">Login</button>
        
      </form>
      <p className='text-red-900'>Don't have an account? <a className='text-red-950 font-bold ' href="/signup">Sign up</a></p>

      

    </div></div>
  )
    

}

export default LoginPage

