import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './SelectUserChat.module.css';
import { fetchUsers } from '../../redux/slices/authSlice';
const SelectUserChat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.auth.users);
    const [searchTerm, setSearchTerm] = useState('');
    const currentUser = useSelector((state) => {
        console.log('Full auth state:', state.auth);
        console.log('Current user:', state.auth.user);
        return state.auth.user;
    });
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    const filteredUsers = Array.isArray(users) ? users.filter(user => user.id !== (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) &&
        typeof user.name === 'string' &&
        user.name.toLowerCase().includes((searchTerm || '').toLowerCase())) : [];
    const handleUserSelect = (selectedUser) => {
        const roomId = [currentUser === null || currentUser === void 0 ? void 0 : currentUser.name, selectedUser.name].sort().join('_');
        navigate(`/ChatRoom/${roomId}`, {
            state: {
                userName: currentUser === null || currentUser === void 0 ? void 0 : currentUser.name,
                name: selectedUser.name,
                imageBase64: selectedUser.imageBase64
            }
        });
    };
    console.log(filteredUsers);
    return (React.createElement("div", { className: styles.container },
        React.createElement("h2", { className: styles.title }, "Select User to Chat"),
        React.createElement("div", { className: styles.searchBox },
            React.createElement("input", { type: "text", placeholder: "Search users...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: styles.searchInput })),
        React.createElement("div", { className: styles.userList }, filteredUsers.length > 0 ? (filteredUsers.map((user) => (React.createElement("div", { key: user.id, className: styles.userItem },
            React.createElement("img", { src: user.imageBase64 ? user.imageBase64 : '', alt: user.name, className: styles.userAvatar }),
            React.createElement("span", { className: styles.userName }, user.name),
            React.createElement("button", { onClick: () => handleUserSelect(user), className: styles.chatButton }, "Chat"))))) : (React.createElement("div", { className: styles.emptyMessage }, searchTerm ? 'No users found' : 'Loading users...')))));
};
export default SelectUserChat;
