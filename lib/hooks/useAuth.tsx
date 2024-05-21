import { useEffect, useState } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('/api/current-user', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
            Pragma: 'no-cache',
            Expires: '0',
          },
        });

        if (response.status === 304) {
          console.log('Not modified');
          return;
        }

        setCurrentUser(response.data.currentUser);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching current user:', error);
        setLoading(false);
      }
    };

    fetchCurrentUser();

    return () => {
    };
  }, []);

  return { currentUser, loading };
};

export default useAuth;