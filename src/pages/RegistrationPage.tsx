import React from "react";
import template from '../images/register-template.png';
import loginImg from '../images/imgv2.png';
import './RegistrationPage.css';
import { RegisterView } from "../components/Register/RegisterView";

function RegistrationPage() {
    return (
        <div className="background">
        <center>
            <div className="loginContainer">
                <img className="template" src={loginImg} alt="loginImg">

                </img>
                <div className="loginBox">
                    <RegisterView></RegisterView>
                </div>


            </div>
            
        </center>
        </div>

    );
}

export default RegistrationPage;