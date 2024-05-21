import { useEffect, useState } from 'react';

export const useUserDetail = (userId) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchUserDetail = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  fetchUserDetail();

  return () => {
  };
  }, [userId])

  return { user, loading, error };
};
