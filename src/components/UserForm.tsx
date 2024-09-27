import React, { useState } from 'react';

interface UserFormProps {
  onCreate: (user: { name: string; email: string; role: string; createdAt: string; updatedAt: string; }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user'); // Default role

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(), // Simple unique ID generator for example
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onCreate(newUser);
    setName(''); // Clear input
    setEmail(''); // Clear input
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Add New User</h2>
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
      <button type="submit" className="btn btn-primary">Add User</button>
    </form>
  );
};

export default UserForm;
