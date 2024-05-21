import { apiUrl } from '@/src/utils/utils';
import { useState } from 'react';

export const useDeleteArtist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteArtist = async (artistId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:4900/api/creators/${artistId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setLoading(false);
      return true;
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  return { deleteArtist, loading, error };
};
