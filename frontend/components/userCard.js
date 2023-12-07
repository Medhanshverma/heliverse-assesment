import React, { useState } from 'react';

const UserCard = ({ user, onAddToTeam, onRemoveFromTeam }) => {
  const [isAvailable, setIsAvailable] = useState(user.available);

  const handleAddToTeam = async () => {
    try {
      console.log('Button Clicked');
      
      if (isAvailable) {
        onAddToTeam(user);
        console.log('Adding to Team:', user);
        await updateUserAvailability(user._id, false);
        setIsAvailable(false);
      } else {
        onAddToTeam(user._id);
        console.log('Removing from Team:', user);
        await updateUserAvailability(user._id, true);
        setIsAvailable(true);
      }
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };
  const API_BASE_URL = 'http://localhost:5000/api';

  
  const updateUserAvailability = async (userId, availability) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ available: availability }),
      });
  
      if (!response.ok) {
        throw new Error('Error updating user availability');
      }
    } catch (error) {
      throw new Error('Error updating user availability');
    }
  };
  

  return (
    <div className="flex-shrink-0 w-1/5 mx-9 my-2">
      <div className="flex flex-col items-center border-2 border-spacing-2 border-red-200 p-4 rounded-md bg-white">
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="w-20 h-20 object-cover rounded-full mb-4"
        />
        <p className="text-lg font-semibold mb-2">
          {`${user.first_name} ${user.last_name}`}
        </p>
        <p className="text-sm text-gray-500 mb-2">{`Gender: ${user.gender}`}</p>
        <p className="text-sm text-gray-500 mb-2">{`Email: ${user.email}`}</p>
        <p className="text-sm text-gray-500 mb-2">{`${
          isAvailable ? 'Available' : 'Not Available'
        }`}</p>
        <button
          className={`${
            isAvailable ? 'bg-blue-500' : 'bg-red-500'
          } text-white px-4 py-2 rounded-md`}
          onClick={handleAddToTeam}
        >
          {isAvailable ? 'Add to Team' : 'Remove from Team'}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
