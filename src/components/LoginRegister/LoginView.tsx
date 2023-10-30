import React, { useEffect, useState } from 'react';
import './LoginRegistration.css';
import '../../styles/styles.css'
import { Navigate } from "react-router-dom";
import { useLocalState } from '../../utils/useLocalStorage';
import { useNavigate } from "react-router-dom";

export function LoginView() {
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [calendarId, setCalendarId] = useLocalState('6')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const clearJwt = () => {
    localStorage.removeItem('jwt'); 
  };

  function sendLoginRequest() {
    clearJwt();

    console.log("sendLoginRequest", jwt, typeof jwt);
    if (!jwt) {
      const reqBody = {
        email: email,
        password: password
      };
      console.log(reqBody)
      fetch('http://localhost:8080/auth/authenticate', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(reqBody)
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(body => {
        console.log("body", body);
        setJwt(body.token);
        navigate("/calendar");
      }).catch(err => {
        console.log("err", err);
      });
    }

    // TODO: Fix
    if (jwt != "") {
      navigate("/calendar");
    }
  }

  return (
    <div className='logingFormContainer'>
      <div className='logingFormContainer__loginForm'>
        <p className='loginForm__title'>email</p>
        <input className='loginForm__input' type='text' value={email} onChange={(e) => setEmail(e.target.value)}></input>
      </div>
      <div className='logingFormContainer__loginForm'>
        <p className='loginForm__title'>password</p>
        <input className='loginForm__input' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      <div className='logingFormContainer__actionButtonsRow'>
        <button className='googleLogin'>Sign with Google</button>
        <button className='loginButton' onClick={() => { sendLoginRequest() }} >Login me</button>
      </div>
    </div>
  );
}