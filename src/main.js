import { createRoot } from 'react-dom/client';
import './index.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
createRoot(document.getElementById('root')).render(React.createElement(Provider, { store: store },
    React.createElement(App, null)));
