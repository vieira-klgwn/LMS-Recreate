'use client'
import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType  {

    user: {userId: string, username: string, role: string} | null;
    token: string | null;
    login: (username:string,password:string) => Promise<void>;
    signup: (username:string,password:string, role:string) => Promise<void>;
    logout: () => void;
}



export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{userId: string, username: string, role: string} | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    
    useEffect(() => {
    
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            setToken(storedToken);
            axios.get('http://localhost:5000/user', {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
            .then(res => {
                setUser(res.data.user);
                
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                localStorage.removeItem('token');
                setToken(null);
            });
        }
    },[])

    const login = async (username:string,password:string) => {
        try {
            const res = await axios.post('http://localhost:5000/login', { username, password });
            setToken(res.data.token);
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
            router.push('/products');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }
    
    const signup = async (username:string,password:string, role:string) => {
        try {
            const res = await axios.post('http://localhost:5000/signup', { username, password, role });
            setToken(res.data.token);
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
            router.push('/products');
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        router.push('/login');
    }

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default useAuth;