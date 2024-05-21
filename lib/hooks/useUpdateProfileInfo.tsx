import { apiUrl } from '@/src/utils/utils';
import { useState } from 'react';

export const useUpdateProfileInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfileInfo = async (userId, args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:4900/api/user/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args), // Include userId in the request body
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  return { updateProfileInfo, loading, error };
};
