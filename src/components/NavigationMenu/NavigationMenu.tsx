import React from 'react';
import { useNavigate } from "react-router-dom";
import './NavigationMenu.css';
import logo from '../../images/logo.png';
import history from '../../images/history.png';
import settings from '../../images/settings_icon.svg';
import logout from '../../images/off2_icon.png';

export function NavigationMenu() {
    const navigate = useNavigate();

    function logoutUser() {
        localStorage.removeItem('jwt'); 
        navigate("/login");
    }

    return (
        <div className='menuContainer'>
            <div className='menuContainer_options'>
                <img className="logo" src={logo} alt="ProductivityPal logo" />
                <img className="logo" src={history} alt="Statistics and history" />
            </div>
            <img className="logo" src={logout} alt="Logout" onClick={() => {logoutUser()}} />
        </div>);
}