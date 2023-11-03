import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Router } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = document.getElementById('root') as HTMLElement;
ReactDOM.render(
<BrowserRouter>
    <GoogleOAuthProvider clientId="575910711403-5rej3jgg9qgkpjd1t6jn03arcudv4qq9.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>;
</BrowserRouter>,
 root);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
