import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {UserProvider} from "./context/UserContext";

ReactDOM.render(
    <UserProvider>
        <App/>
    </UserProvider>,
    document.getElementById('root')
);


reportWebVitals();
