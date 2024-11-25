var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Login.tsx:
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/slices/authSlice';
import styles from './Login.module.css';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector((state) => state.auth);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const result = yield dispatch(loginUser({
                name: name,
                password
            })).unwrap();
            if (result.success) {
                navigate('/SekectUserChat');
            }
        }
        catch (error) {
            console.error('Login failed:', error);
        }
    });
    return (React.createElement("div", { className: styles.loginContainer },
        React.createElement("div", { className: styles.loginBox },
            React.createElement("h2", { className: styles.title }, "Login"),
            error && (React.createElement("div", { className: styles.error }, error)),
            React.createElement("form", { onSubmit: handleSubmit },
                React.createElement("div", { className: styles.formGroup },
                    React.createElement("label", { className: styles.label }, "Username:"),
                    React.createElement("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), placeholder: "Enter username", className: styles.input, required: true })),
                React.createElement("div", { className: styles.formGroup },
                    React.createElement("label", { className: styles.label }, "Password:"),
                    React.createElement("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter password", className: styles.input, required: true })),
                React.createElement("button", { type: "submit", className: styles.button }, "Login")))));
};
export default Login;
