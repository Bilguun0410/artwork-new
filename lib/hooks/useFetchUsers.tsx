import { useState } from 'react';

export const useFetchUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, fetchUsers };
};

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (userId, userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};
