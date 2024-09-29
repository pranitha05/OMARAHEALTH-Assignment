import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UserFormProps {
  onCreate: (user: Omit<User, 'id'>) => void; // Used for creating new users
  onUpdate: (user: User) => void;            // Used for editing existing users
  editingUser?: User | null;                 // Optional: Pass the user to edit
}

const UserForm: React.FC<UserFormProps> = ({ onCreate, onUpdate, editingUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user'); // Default role for new users

  // Populate form fields when editing a user
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setRole(editingUser.role);
    } else {
      setName('');
      setEmail('');
      setRole('user');
    }
  }, [editingUser]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingUser) {
      // If editing, update the existing user
      const updatedUser = {
        ...editingUser,
        name,
        email,
        role,
        updatedAt: new Date().toISOString(),
      };
      onUpdate(updatedUser);
    } else {
      // If creating, create a new user
      const newUser = {
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onCreate(newUser); // Pass the new user to the parent component
    }

    // Clear form fields after submission
    setName('');
    setEmail('');
    setRole('user');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
      <div className="mb-2">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-control"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        {editingUser ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;
