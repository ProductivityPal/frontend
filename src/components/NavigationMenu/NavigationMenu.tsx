import React from 'react';
import './NavigationMenu.css';
import logo from '../../images/logo.png';
import history from '../../images/history.png';

export function NavigationMenu() {
    return (
        <div> 
        <div className='menuContainer'>
            <img className="logo" src={logo} alt="logo" />
            <img className="logo" src={history} alt="logo" />
        </div>
         

        </div>);
}