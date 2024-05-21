import { apiUrl } from '@/src/utils/utils';
import { useState } from 'react';

export const useDeleteArtwork = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteArtwork = async (artworkId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:4900/api/artworks/${artworkId}`, {
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

  return { deleteArtwork, loading, error };
};
