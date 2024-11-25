import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LinkArmy.module.css';
const HomeArmy = () => {
    const navigate = useNavigate();
    return (React.createElement("div", { className: styles['home-container'] },
        React.createElement("div", { className: styles['button-container'] },
            React.createElement("button", { onClick: () => navigate('/soldier'), className: styles.btn }, "Soldier Dashboard"),
            React.createElement("button", { onClick: () => navigate('/commander'), className: styles.btn }, "Commander Dashboard"))));
};
export default HomeArmy;
