import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Analytics from './components/Analytics';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data); // Ensure this is an array
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreateUser = async (user) => {
    const response = await axios.post('http://localhost:3001/users', user);
    setUsers([...users, response.data]);
  };

  const handleUpdateUser = async (updatedUser) => {
    await axios.put(`http://localhost:3001/users/${updatedUser.id}`, updatedUser);
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(`http://localhost:3001/users/${id}`);
    setUsers(users.filter(user => user.id !== id));
  };

  // Logging the users to see if they're being set correctly
  console.log(users);

  return (
    <div className="container mt-5">
      <h1 className="text-center">OMARAHEALTH Admin Panel</h1>
      <UserForm onCreate={handleCreateUser} />
      <UserList users={users} onDelete={handleDeleteUser} onUpdate={handleUpdateUser} />
      <Analytics users={users} />
    </div>
  );
};

export default App;
