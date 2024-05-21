import { apiUrl } from '@/src/utils/utils';
import { useState } from 'react';

export const useUpdateArtist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateArtist = async (artistId, args) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Props:', args);
      const response = await fetch(`http://localhost:4900/api/creators/${artistId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
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

  return { updateArtist, loading, error };
};
