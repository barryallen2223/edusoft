import React, { useState } from 'react';
import { GoogleOutlined, MailOutlined} from '@ant-design/icons';
import "firebase/app"

import { auth } from '../firebase';
import firebase from 'firebase/app';
const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submit = async ()=>{
         auth.signInWithEmailAndPassword(email, password);
    }
    return(
        <div id = "login-page">
            <div id = "login-card">
                <h2>Edusoft</h2>
                <div className="login-button email">
                    <MailOutlined /> Sign with Email
                    <br/> <br/>
                    <div>
                        <label htmlFor="email"> Correo </label> 
                        <input type="email" id="email" onChange={(ev)=> setEmail(ev.target.value)}/>
                        <br/>
                        <label htmlFor="password">Clave </label> 
                        <input type="password" id="Clave" onChange={(ev)=> setPassword(ev.target.value)}/>
                        <br/> <br/>
                        <button id="button" onClick={submit}> iniciar sesion</button>
                    </div>

                    
                </div>
                <br/> <br/>
                <div className="login-button google"
                onClick = {() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
                    <GoogleOutlined /> Sign with Google
                </div>

            </div>
        </div>
    );
}

export default Login;