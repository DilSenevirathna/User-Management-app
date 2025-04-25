// src/UserManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User Management.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newUser , setNewUser ] = useState({ firstName: '', lastName: '', email: '' });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [editingUser , setEditingUser ] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('https://dummyjson.com/users');
            setUsers(response.data.users);
        };
        fetchUsers();
    }, []);

    const handleAddUser  = () => {
        if (editingUser ) {
            // Update existing user
            setUsers(users.map(user => (user.id === editingUser .id ? { ...editingUser , ...newUser  } : user)));
            setEditingUser (null);
        } else {
            // Add new user
            setUsers([...users, { ...newUser , id: users.length + 1 }]);
        }
        setNewUser ({ firstName: '', lastName: '', email: '' });
    };

    const handleDeleteUser  = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const handleEditUser  = (user) => {
        setNewUser ({ firstName: user.firstName, lastName: user.lastName, email: user.email });
        setEditingUser (user);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLogin = () => {
        if (username === 'user' && password === 'password') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid credentials');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <div className="user-management">
            {isAuthenticated ? (
                <>
                    <h1>User Management</h1>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="user-form">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={newUser .firstName}
                            onChange={(e) => setNewUser ({ ...newUser , firstName: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={newUser .lastName}
                            onChange={(e) => setNewUser ({ ...newUser , lastName: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newUser .email}
                            onChange={(e) => setNewUser ({ ...newUser , email: e.target.value })}
                        />
                        <button onClick={handleAddUser }>
                            {editingUser  ? 'Update User' : 'Add User'}
                        </button>
                    </div>
                    <ul>
                        {filteredUsers.map(user => (
                            <li key={user.id}>
                                {user.firstName} {user.lastName} - {user.email}
                                <div className="button-group">
                                    <button className="edit" onClick={() => handleEditUser (user)}>Edit</button>
                                    <button className="delete" onClick={() => handleDeleteUser (user.id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <div className="login-form">
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
            <footer className="footer">
                <p>&copy; 2025 User Management System by Dilmi Senevirathna. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default UserManagement;