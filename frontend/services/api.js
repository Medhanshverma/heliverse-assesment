import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';


export const getUsers = async (page = 1) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};


export const removeFromTeam = async (userId) => {
  try {
    // Fetch the user by ID to get the current availability
    const currentUser = await getUserById(userId);

    // Invert the availability
    const updatedAvailability = !currentUser.available;

    // Make the PUT request to update the availability
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ available: updatedAvailability }),
    });

    if (!response.ok) {
      throw new Error('Error updating user availability');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};


  
