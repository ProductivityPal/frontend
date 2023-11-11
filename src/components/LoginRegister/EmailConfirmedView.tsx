import React, { useEffect, useState } from 'react';
import './LoginRegistration.css';
import '../../styles/styles.css'
import {Navigate, useParams} from "react-router-dom";
import { useLocalState } from '../../utils/useLocalStorage';
import { useNavigate } from "react-router-dom";
import loginImg from '../../images/imgv2.png';
import {fetchData} from "../../utils/fetchUtils";
import {Task} from "../../types/Task";

export function EmailConfirmedView() {
    const [jwt, setJwt] = useLocalState('', 'jwt');
    const [validUrl, setValidUrl] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    const clearJwt = () => {
        localStorage.removeItem('jwt');
        navigate("/login")
    };

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:3000/email/verification/verify?email=${params.email}&code=${params.code}`
                await fetchData<Task[]>(url);
                setValidUrl(true);

            } catch (err){
                console.log(err)
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [params]);


    return (
        <div className="loginBackground">
            <center>
                <div className="loginContainer">
                    <img className="loginContainer__image" src={loginImg} alt="loginImg">
                    </img>
                    <div className="loginContainer__loginBox">
                        <div className='logingFormContainer'>
                            <div className='logingFormContainer__loginForm'>
                                <p className='loginForm__title logged' >Your account has been verified! Please Log in</p>
                            </div>
                            <div className='logingFormContainer__actionButtonsRow'>
                                <button className='loginButton' onClick={() => { clearJwt() }} >Login me</button>
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </div>

    );
}