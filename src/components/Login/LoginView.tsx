import React from 'react';
import './LoginView.css';

export function LoginView() {
    function sendLoginRequest() {
    }

    return (
        <div className='loginView'>
            <div className='loginForm'>
                <p className='formTitle'>email</p>
                <input className='formInput' type='text'></input>
            </div>
            <div className='loginForm'>
                <p className='formTitle'>password</p>
                <input className='formInput' type='password'></input>
            </div>
            <div className='actionButtonsRow'>
                <button className='googleLogin'>Sign with Google</button>
                <button className='loginButton' onClick={() => sendLoginRequest} >Login me</button>
            </div>
        </div>
    );
}