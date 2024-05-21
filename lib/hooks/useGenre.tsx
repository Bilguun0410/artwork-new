import { useState } from 'react';
import axios from 'axios';

export function useGenre() {
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGenreById = async (id) => {
    setLoading(true); 
    setError(null); 

    try {
      const response = await axios.get(`http://localhost:4900/api/genres/${id}`); 
      setGenre(response.data);
    } catch (error) {
      console.error('Error fetching genre:', error);
      setError(error); 
    } finally {
      setLoading(false); 
    }
  };

  return { genre, loading, error, fetchGenreById };
}
