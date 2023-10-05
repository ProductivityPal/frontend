import React from "react";
import template from '../images/register-template.png';
import loginImg from '../images/imgv2.png';
import './RegistrationPage.css';
import { LoginView } from "../components/Login/LoginView";

function LoginPage() {
    return (
        <div className="background">
        <center>
            <div className="loginContainer">

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