import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Router } from "react-router-dom";
import { CategoryProvider } from './utils/CategoryContext';

const root = document.getElementById('root') as HTMLElement;
ReactDOM.render(
    <BrowserRouter>
        <CategoryProvider>
            <App />
        </CategoryProvider>
    </BrowserRouter>,
    root);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
