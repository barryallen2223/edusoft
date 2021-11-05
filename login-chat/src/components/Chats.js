import React, {useRef, useState, useEffect} from 'react';

import axios from 'axios';
import { useHistory } from 'react-router-dom';
import{ChatEngine} from 'react-chat-engine'
import { useAuth } from '../context/AuthContext';
import {auth} from '../firebase'



const Chats = () => {
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async() => {
        await auth.signOut();
        history.push('/')
    }

    async function getFile(url){
        let response = await fetch(url);
        let data = await response.blob();
        return new File([data], "userphoto.jpg", {type: 'image/jpeg'});
    }

    useEffect(()=>{
        if(!user){
            history.push('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me/', { 
            headers:{
                "project-id": "7bc3c56d-fdaf-4a01-95a9-7da9d46801ec",
                "user-name" : user.email,
                "user-secret": user.uid,

            }}
            )
            .then(()=>{
                setLoading(false);
            })
            .catch(()=>{
                let formdata = new FormData();
                formdata.append('email', user.email);
                formdata.append('username', user.email);
                formdata.append('secret', user.uid);

                getFile(user.photoURL)
                    .then((avatar)=>{
                        formdata.append('avatar', avatar, avatar.name)

                        axios.post('https://api.chatengine.io/users/', formdata, {headers:{"private-key":"c53391f7-9e4c-41f2-8ab2-65430146716c"}})
                    })
                    .then(()=> setLoading(false))
                    .catch((error)=> console.log(error))
            })
    }, [user, history]);



    if(!user|| loading) return 'loading';
    return(
        <div className="chats-page">
            <div className="nav-bar">
            <div className="logo-tab">
                Educhat
            </div>
            <div onClick={handleLogout} className="logout-tab">
                Logout
            </div>
            </div>
            <ChatEngine
            hegiht = "calc(100vh-66px)"
            projectID="7bc3c56d-fdaf-4a01-95a9-7da9d46801ec"
            userName={user.email}
            userSecret={user.uid}
            ></ChatEngine>
        </div>
    )
}
export default Chats;