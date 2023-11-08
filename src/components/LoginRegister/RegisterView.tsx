import React, { useEffect, useState } from 'react';
import '../LoginRegister/LoginRegistration.css';
import { useLocalState } from '../../utils/useLocalStorage';
import { useNavigate } from "react-router-dom";
import { postData } from '../../utils/fetchUtils';

export function RegisterView() {
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const clearJwt = () => {
    localStorage.removeItem('jwt');
    setJwt('')
  };

  function sendRegisterRequest() {

    console.log("sendRegisterRequest");
    clearJwt()

    if (!jwt) {
      console.log("I'm here!")
      const reqBody = {
        email: email,
        username: username,
        password: password
      };

      fetch('http://localhost:8080/auth/register', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(reqBody)
      }).then(res => res.json()).then(body => {
        console.log("body", body);
        // setJwt(body.token);
        fetch('http://localhost:8080/email/verification/send', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${body.token}`,
        },
        method: 'POST',
        body: JSON.stringify(reqBody)
      });
      alert("Verify your email!")
      navigate("/login")


        // navigate("/calendar");

      });
    }
    // if (jwt != "") {
    //   alert("You are logged in! Logging you out!")
    //   navigate("/login");
    // }
  }

  return (
    <div className='logingFormContainer'>
      <div className='logingFormContainer__loginForm'>
        <p className='loginForm__title'>email</p>
        <input className='loginForm__input' type='text' value={email} onChange={(e) => setEmail(e.target.value)}></input>
      </div>
      <div className='logingFormContainer__loginForm'>
        <p className='loginForm__title'>username</p>
        <input className='loginForm__input' type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
      </div>
      <div className='logingFormContainer__loginForm'>
        <p className='loginForm__title'>password</p>
        <input className='loginForm__input' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      <span></span>
      <div className='logingFormContainer__actionButtonsRow'>
        {/* <button className='googleLogin'>Sign with Google</button> */}
        <button className='loginButton' onClick={() => sendRegisterRequest()} >Register me</button>
      </div>
    </div>
  );
}