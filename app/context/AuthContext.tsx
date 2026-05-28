'use client'
import axios, {AxiosError} from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType  {

    user: {userId: string, username: string, role: string} | null;
    token: string | null;
    login: (username:string,password:string) => Promise<void>;
    signup: (username:string,password:string, role:string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}



export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{userId: string, username: string, role: string} | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            setToken(storedToken);
            axios.get('http://127.0.0.0:3000/auth/profile', {
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
            })
            .finally(() => setLoading(false));
        }
        else{
            setLoading(false);
        }
    },[])

    const login = async (username:string,password:string) => {
        try {
            const res = await axios.post('http://127.0.0.0:3000/auth/login', { username, password });
            setToken(res.data.token);
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
            router.push('/products');
        } catch (error) {
            if (axios.isAxiosError(error)) {

                console.error('LOGIN AXIOS ERROR');

                console.error('Message:', error.message);

                console.error('Status:', error.response?.status);

                console.error('Data:', error.response?.data);

                console.error('Headers:', error.response?.headers);

           } else {

                console.error('UNKNOWN LOGIN ERROR:', error);

            }

            throw error;    
        }
    }
    
    const signup = async (username:string,password:string, role:string) => {
        try {
            const res = await axios.post('http://127.0.0.0:3000/auth/register', { username, password, role });
            setToken(res.data.token);
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
            router.push('/products');
        } catch (error) {
            if (axios.isAxiosError(error)) {

                console.error('SIGNUP AXIOS ERROR');

                console.error('Message:', error.message);

                console.error('Status:', error.response?.status);

                console.error('Data:', error.response?.data);

                console.error('Headers:', error.response?.headers);

           } else {

                console.error('UNKNOWN SIGNUP ERROR:', error);

            }

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
        <AuthContext.Provider value={{ user, token, login, signup, logout,loading }}>
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