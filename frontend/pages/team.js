import React, { useState, useEffect } from 'react';
import { getUsers } from "@/services/api";
import UserCard from '../components/userCard';
import Link from 'next/link';

const Team = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(currentPage);
        setUsers(data.filter(user => !user.available)); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleAddToTeam = async (selectedUser) => {
    try {
      // Your addToTeam logic here
      await addToTeam(selectedUser);
  
      // Update the state to remove the added user from the list
      setUsers((prevUsers) => prevUsers.filter(user => user._id !== selectedUser._id));
    } catch (error) {
      console.error('Error adding user to the team:', error);
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">User List</h1>
      <div className="flex flex-wrap -mx-2">
        {users.map((user) => (
          <UserCard key={user._id} user={user} onAddToTeam={handleAddToTeam} />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handlePrevPage}
        >
          Previous Page
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleNextPage}
        >
          Next Page
        </button>
      </div>
      <div className="mt-4 text-center">
      <Link href="/">
          <p className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 inline-block">
            Go to Home
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Team;
