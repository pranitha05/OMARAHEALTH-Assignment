import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Analytics from './components/Analytics';

const App = () => {
  const [users, setUsers] = useState([]); // State to hold the list of users
  const [editingUser, setEditingUser] = useState(null); // State for the user being edited
  const [searchTerm, setSearchTerm] = useState(''); // State for search functionality

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data); // Ensure the response is an array
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreateUser = async (user) => {
    try {
      const response = await axios.post('http://localhost:3001/users', user);
      setUsers([...users, response.data]); // Add new user to the state
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await axios.put(`http://localhost:3001/users/${updatedUser.id}`, updatedUser);
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user))); // Update user in the state
      setEditingUser(null); // Clear the form after updating
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      setUsers(users.filter(user => user.id !== id)); // Remove the user from the state
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user); // Set the user to be edited
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">OMARAHEALTH Admin Panel</h1>
      <UserForm 
        onCreate={handleCreateUser} 
        onUpdate={handleUpdateUser} 
        editingUser={editingUser} // Pass the user to be edited
      />
      <UserList 
        users={users} 
        onDelete={handleDeleteUser} 
        onUpdate={handleEditUser} // Set the user to be edited
      />
      <Analytics users={users} />
    </div>
  );
};

export default App;
