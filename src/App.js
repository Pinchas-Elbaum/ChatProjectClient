import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Page';
import CommanderDashboard from './components/army/CommanderDashboard';
import SekectUserChat from './components/chat/SekectUserChat';
import ChatRoomCompo from './components/chat/ChatRoom';
import HomeArmy from './components/army/LinkArmy';
import Home from './components/Home/Home';
import SoldierDashboard from './components/army/SoldierDashboard';
function App() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Router, null,
            React.createElement(Routes, null,
                React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
                React.createElement(Route, { path: "/HomePage", element: React.createElement(HomePage, null) }),
                React.createElement(Route, { path: "/HomeArmy", element: React.createElement(HomeArmy, null) }),
                React.createElement(Route, { path: "/Login", element: React.createElement(Login, null) }),
                React.createElement(Route, { path: "/Register", element: React.createElement(Register, null) }),
                React.createElement(Route, { path: "/Commander", element: React.createElement(CommanderDashboard, null) }),
                React.createElement(Route, { path: "/SekectUserChat", element: React.createElement(SekectUserChat, null) }),
                React.createElement(Route, { path: "/ChatRoom/:roomId", element: React.createElement(ChatRoomCompo, null) }),
                React.createElement(Route, { path: "/soldier", element: React.createElement(SoldierDashboard, null) })))));
}
export default App;
