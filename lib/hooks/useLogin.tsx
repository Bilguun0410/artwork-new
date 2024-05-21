import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const useLogin = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState(typeof window !== 'undefined' ? localStorage.getItem('token') : null); // Initialize token from localStorage if in the browser
    
    const login = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        
        try {
            const response = await axios.post('http://localhost:4900/api/login', { username, password }, {
                headers: { Authorization: `Bearer ${token}` } // Include token in request header
            })
            setSuccess(true);
            setToken(response.data.token);
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', response.data.token);  // Store the token in localStorage if in the browser
            }
        } catch (e) {
            setError(e.response ? e.response.data.error : 'Login failed');
        } finally {
            setLoading(false);
        }
    };
    
    return {
        username,
        setUsername,
        password,
        setPassword,
        loading,
        error,
        success,
        token,
        login
    };
};

export default useLogin;
