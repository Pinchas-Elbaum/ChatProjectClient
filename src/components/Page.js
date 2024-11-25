import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Page.module.css';
const HomePage = () => {
    const navigate = useNavigate();
    return (React.createElement("div", { className: styles['home-container'] },
        React.createElement("div", { className: styles['button-container'] },
            React.createElement("button", { onClick: () => navigate('/login'), className: styles.btn }, "Login"),
            React.createElement("button", { onClick: () => navigate('/register'), className: styles.btn }, "Register"))));
};
export default HomePage;
