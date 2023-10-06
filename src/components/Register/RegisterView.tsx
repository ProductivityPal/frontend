import React, { useEffect, useState } from 'react';
import '../Login/LoginView.css';
import { useLocalState } from '../../utils/useLocalStorage';
import { useNavigate } from "react-router-dom";

export function RegisterView() {
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const clearJwt = () => {
    localStorage.removeItem('jwt'); 
  };

  function sendRegisterRequest() {
    console.log("sendRegisterRequest");
    clearJwt()

    if (!jwt) {
      console.log("I'm here!")
      const reqBody = {
        email: email,
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
        setJwt(body.token);
        navigate("/calendar");

      });
    }
    if (jwt != "") {
      alert("You are logged in! Logging you out!")
      navigate("/login");
    }
  }

  return (
    <div className='loginView'>
      <div className='loginForm'>
        <p className='formTitle'>email</p>
        <input className='formInput' type='text' value={email} onChange={(e) => setEmail(e.target.value)}></input>
      </div>
      <div className='loginForm'>
        <p className='formTitle'>password</p>
        <input className='formInput' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      <div className='actionButtonsRow'>
        <button className='googleLogin'>Sign with Google</button>
        <button className='loginButton' onClick={() => sendRegisterRequest()} >Register me</button>
      </div>
    </div>
  );
}