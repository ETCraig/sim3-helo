import React from 'react';

import './Styles/Auth.css';

import Logo from './../assets/logo.png';

export default function Auth() {
    function Login() {
        let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
        let redirectUri = encodeURIComponent(`http://localhost:3300/auth/callback`);
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
    }
        return (
            <div className='Auth-App'>
                <div className='Auth-Content'>
                    <img className='Helo-Logo' src={Logo} alt='Helo-Logo' />
                    <h1 className='Title'>Helo</h1>
                    <button className='Login-Btn' onClick={Login}>Login / Register</button>
                </div>
            </div>
        );
    }