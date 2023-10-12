import React from 'react';
import { useNavigate } from "react-router-dom";
import './NavigationMenu.css';
import logo from '../../images/logo.png';
import history from '../../images/history.png';
import settings from '../../images/settings_icon.svg';
import calendar from '../../images/calendar_icon.png';
import logout from '../../images/off_icon2.png';

export function NavigationMenu() {
    const navigate = useNavigate();

    function logoutUser() {
        localStorage.removeItem('jwt'); 
        navigate("/login");
    }

    return (
        <div className='menuContainer'>
            <div className='menuContainer_options'>
                <img className="logo" src={calendar} alt="Calendar view" onClick={() => {navigate("/calendar")}}/>
                <img className="logo" src={history} alt="Statistics and history" />
                <img className='logo' src={settings} alt="Settings" onClick={() => {navigate("/settings")}}/>
            </div>
            <img className="logo" src={logout} alt="Logout" onClick={() => {logoutUser()}} />
        </div>);
}