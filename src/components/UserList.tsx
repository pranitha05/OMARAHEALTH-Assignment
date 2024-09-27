import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string; // Added createdAt
  updatedAt: string; // Added updatedAt
}

interface UserListProps {
  users: User[];
  onDelete: (id: number) => void;
  onUpdate: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete, onUpdate }) => {
  if (!users || users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} - {user.email} ({user.role})<br />
          Created At: {new Date(user.createdAt).toLocaleString()}<br />
          Updated At: {new Date(user.updatedAt).toLocaleString()}<br />
          <button onClick={() => onUpdate(user)}>Edit</button>
          <button onClick={() => onDelete(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
