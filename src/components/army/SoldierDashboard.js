// SoldierDashboard.tsx
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import styles from './SoldierDashboard.module.css';
const SoldierDashboard = () => {
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);
    useEffect(() => {
        socketRef.current = io('http://localhost:3000');
        const socket = socketRef.current;
        socket.on('connect', () => {
            setIsConnected(true);
            socket.emit('joinSoldier', "rifael");
        });
        socket.on('alertMessage', ({ user1, user2, text }) => {
            const newMessage = {
                user1,
                user2,
                text,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, newMessage]);
            const audio = new Audio('/alert-sound.mp3');
            audio.play().catch(() => { });
        });
        socket.on('disconnect', () => {
            setIsConnected(false);
        });
        return () => {
            socket.disconnect();
        };
    }, []);
    return (React.createElement("div", { className: styles.dashboard },
        React.createElement("header", { className: styles.header },
            React.createElement("h1", null, "Alert Messages Panel"),
            React.createElement("span", { className: isConnected ? styles.statusOnline : styles.statusOffline }, isConnected ? 'Connected' : 'Disconnected')),
        React.createElement("div", { className: styles.alertsContainer }, messages.map((message, index) => (React.createElement("div", { key: index, className: styles.alertCard },
            React.createElement("div", { className: styles.alertHeader },
                React.createElement("span", { className: styles.alertTime }, new Date(message.timestamp).toLocaleString()),
                React.createElement("div", { className: styles.alertBadge }, "New Alert")),
            React.createElement("div", { className: styles.alertContent },
                React.createElement("div", { className: styles.userInfo },
                    React.createElement("div", { className: styles.user },
                        React.createElement("strong", null, "Sender:"),
                        " ",
                        message.user1),
                    React.createElement("div", { className: styles.user },
                        React.createElement("strong", null, "Receiver:"),
                        " ",
                        message.user2)),
                React.createElement("div", { className: styles.messageText },
                    React.createElement("strong", null, "Message:"),
                    React.createElement("p", null, message.text))),
            React.createElement("div", { className: styles.actionButtons },
                React.createElement("button", { className: `${styles.button} ${styles.dangerButton}` }, "Mark as Dangerous"),
                React.createElement("button", { className: `${styles.button} ${styles.safeButton}` }, "Mark as Safe"))))))));
};
export default SoldierDashboard;
