import { useState } from 'react';
import axios from 'axios';

const useRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const register = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post('http://localhost:4900/api/register', { username, password });
      setSuccess(true);
    } catch (e) {
      setError(e.response ? e.response.data.error : 'Registration failed');
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
    register,
  };
};

export default useRegister;
