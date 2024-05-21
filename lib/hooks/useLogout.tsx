import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const useLogout = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const logout = async () => {
      setLoading(true);
      setError(null);
    
      try {
        // Clear the token from localStorage
        localStorage.removeItem('token');
        
        // Clear the token from the Axios headers
        axios.defaults.headers.common['Authorization'] = '';
    
      } catch (e) {
        setError(e.message || 'Logout failed');
      } finally {
        setLoading(false);
      }
    };
    
    return {
      loading,
      error,
      logout
    };
};

export default useLogout;
