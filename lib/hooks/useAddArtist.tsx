import { apiUrl } from '@/src/utils/utils';
import { useState } from 'react';

export const useAddArtist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addArtist = async (arg) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:4900/api/creators`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
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

  return { addArtist, loading, error };
};
