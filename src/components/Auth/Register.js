var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Register.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/slices/authSlice';
import styles from './Register.module.css';
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector((state) => state.auth);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [imageFile, setImageFile] = useState('');
    const handleImageChange = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageFile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const result = yield dispatch(registerUser({ name: name, password, imageBase64: imageFile })).unwrap();
            if (result) {
                navigate('/login');
            }
        }
        catch (error) {
            console.error('Registration failed:', error);
        }
    });
    return (React.createElement("div", { className: styles.container },
        React.createElement("div", { className: styles.formWrapper },
            React.createElement("h2", { className: styles.title }, "Register"),
            error && React.createElement("div", { className: styles.error }, error),
            React.createElement("form", { onSubmit: handleSubmit, className: styles.form },
                React.createElement("div", { className: styles.inputGroup },
                    React.createElement("label", { className: styles.label }, "Username:"),
                    React.createElement("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), className: styles.input, required: true })),
                React.createElement("div", { className: styles.inputGroup },
                    React.createElement("label", { className: styles.label }, "Password:"),
                    React.createElement("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: styles.input, required: true })),
                React.createElement("div", { className: styles.inputGroup },
                    React.createElement("label", { className: styles.label }, "Profile Image:"),
                    React.createElement("input", { type: "file", accept: "image/*", onChange: handleImageChange, className: styles.input })),
                imageFile && (React.createElement("img", { src: imageFile, alt: "Preview", style: { width: '100px', height: '100px', objectFit: 'cover' } })),
                React.createElement("button", { type: "submit", className: styles.button }, "Register")))));
};
export default Register;
