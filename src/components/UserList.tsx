import React, { useState } from 'react';

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
  const [isEditing, setIsEditing] = useState<number | null>(null); // Track editing user

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

          {/* Edit button to trigger edit mode */}
          <button onClick={() => setIsEditing(user.id)}>Edit</button>
          <button onClick={() => onDelete(user.id)}>Delete</button>

          {/* Show form if in edit mode */}
          {isEditing === user.id && (
            <div>
              <h3>Edit User</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Update the updatedAt field and pass edited user to onUpdate
                  const updatedUser = {
                    ...user,
                    updatedAt: new Date().toISOString(),
                  };
                  onUpdate(updatedUser);
                  setIsEditing(null); // Exit edit mode after updating
                }}
              >
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => onUpdate({ ...user, name: e.target.value })}
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => onUpdate({ ...user, email: e.target.value })}
                  placeholder="Email"
                />
                <select
                  value={user.role}
                  onChange={(e) => onUpdate({ ...user, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button type="submit">Save Changes</button>
              </form>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
