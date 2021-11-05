import firebase from "firebase/app";
import 'firebase/auth';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyD74NElkvicR5XZZZlIKe_AjoPX4MsFHxk",
    authDomain: "chat-c06dd.firebaseapp.com",
    projectId: "chat-c06dd",
    storageBucket: "chat-c06dd.appspot.com",
    messagingSenderId: "900466450912",
    appId: "1:900466450912:web:f1e8d4c0c8f698f3c68b85"
  }).auth();