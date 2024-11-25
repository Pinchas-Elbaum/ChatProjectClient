import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from 'react-router-dom';
import styles from './ChatRoom.module.css';
import { useParams } from "react-router";
const ChatRoomCompo = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [roomId, setRoomId] = useState("");
    const params = useParams();
    const { state } = useLocation();
    const { userName, name } = state || {};
    const roomid = params.roomId;
    useEffect(() => {
        setRoomId(roomid);
        const data = localStorage.getItem(roomid);
        if (data) {
            const mess = JSON.parse(data);
            setMessages(mess);
        }
    }, [userName, name]);
    useEffect(() => {
        socketRef.current = io('http://localhost:3000');
        const socket = socketRef.current;
        socket.on('connect', () => {
            setIsConnected(true);
            socket.emit('join', { userName: userName, name: name });
            const roomName = [userName, name].sort().join("_");
            setRoomId(roomName);
        });
        socket.on('message', ({ user, text }) => {
            const newMessage = {
                user,
                text,
                timestamp: new Date(),
                isCurrentUser: user === userName
            };
            setMessages(prevMessages => {
                const updatedMessages = [...prevMessages, newMessage];
                const data = JSON.stringify(updatedMessages);
                localStorage.setItem(roomid, data);
                return updatedMessages;
            });
        });
        socket.on('userTyping', ({ user, isTyping }) => {
            if (user !== userName) {
                setIsTyping(isTyping);
            }
        });
        socket.on('disconnect', () => {
            setIsConnected(false);
        });
        return () => {
            socket.disconnect();
        };
    }, [userName, name]);
    useEffect(() => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const handleSendMessage = () => {
        if (message.trim() && socketRef.current) {
            socketRef.current.emit('sendMessage', {
                userName,
                roomid,
                message
            });
            setMessage('');
        }
    };
    const handleTyping = (e) => {
        var _a;
        setMessage(e.target.value);
        (_a = socketRef.current) === null || _a === void 0 ? void 0 : _a.emit('typing', {
            user: userName,
            isTyping: e.target.value.length > 0
        });
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    return (React.createElement("div", { className: styles.chatContainer },
        React.createElement("div", { className: styles.chatHeader },
            React.createElement("div", { className: styles.userInfo },
                state.imageBase64 && (React.createElement("img", { src: state.imageBase64, alt: name, className: styles.userAvatar })),
                React.createElement("div", { className: styles.userDetails },
                    React.createElement("span", { className: styles.userName }, name),
                    isConnected && React.createElement("span", { className: styles.onlineStatus }, "\u2022 online")))),
        React.createElement("div", { className: styles.messagesContainer },
            messages.map((msg, index) => (React.createElement("div", { key: index, className: `${styles.messageWrapper} ${msg.isCurrentUser ? styles.currentUser : styles.otherUser}` },
                React.createElement("div", { className: styles.message },
                    React.createElement("div", { className: styles.messageContent }, msg.text),
                    React.createElement("div", { className: styles.messageTime }, new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    })))))),
            isTyping && (React.createElement("div", { className: styles.typingIndicator },
                React.createElement("span", { className: styles.typingDots }, "\u2022\u2022\u2022"),
                name,
                " is typing...")),
            React.createElement("div", { ref: messagesEndRef })),
        React.createElement("div", { className: styles.inputContainer },
            React.createElement("input", { type: "text", value: message, onChange: handleTyping, onKeyPress: handleKeyPress, placeholder: "Type a message...", className: styles.messageInput }),
            React.createElement("button", { onClick: handleSendMessage, disabled: !message.trim(), className: styles.sendButton },
                React.createElement("span", null, message.trim() ? 'Send' : '✉')))));
};
export default ChatRoomCompo;
