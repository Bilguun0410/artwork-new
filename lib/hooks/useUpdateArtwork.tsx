import { apiUrl } from '@/src/utils/utils';
import { useState } from 'react';

export const useUpdateArtwork = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateArtwork = async (artworkId, args) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Props:', args);
      const response = await fetch(`http://localhost:4900/api/artworks/${artworkId}`, {
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

  return { updateArtwork, loading, error };
};
