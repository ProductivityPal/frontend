import React from "react";
import template from '../images/register-template.png';
import loginImg from '../images/imgv2.png';
import './RegistrationPage.css';
import { LoginView } from "../components/Login/LoginView";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    return (
        <div className="background">
            <center>
                <div className="loginContainer">
                    <div>
                        <button className='textButton' onClick={() => { navigate("/register") }}>Don't have an account? Register!</button>
                    </div>

                    <img className="template" src={loginImg} alt="loginImg">
                    </img>
                    <div className="loginBox">
                        <LoginView></LoginView>
                    </div>


                </div>

            </center>
        </div>

    );
}

export default LoginPage;