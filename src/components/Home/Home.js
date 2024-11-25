import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Home.module.css";
const Home = () => {
    const navigate = useNavigate();
    return (React.createElement("div", { className: styles["home-container"] },
        React.createElement("div", { className: styles["button-container"] },
            React.createElement("button", { onClick: () => navigate('/HomePage'), className: `${styles.button} ${styles.terrorist}` }, "Enter as Terrorist"),
            React.createElement("button", { onClick: () => navigate('/HomeArmy'), className: `${styles.button} ${styles.army}` }, "Enter as Army"))));
};
export default Home;
