import React, { useEffect, useState } from 'react';
import './LoginView.css';
import { Navigate } from "react-router-dom";
import { useLocalState } from '../../utils/useLocalStorage';
import { useNavigate } from "react-router-dom";

export function LoginView() {
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function sendLoginRequest() {
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
        <button className='loginButton' onClick={() => { sendLoginRequest() }} >Login me</button>
      </div>
    </div>
  );
}