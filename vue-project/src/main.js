import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import firebase from 'firebase'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBA-1cozsZBiiUFIIVJKA2NSRzayWkYlkU",
  authDomain: "hiaryai-25160.firebaseapp.com",
  projectId: "hiaryai-25160",
  storageBucket: "hiaryai-25160.firebasestorage.app",
  messagingSenderId: "533489870447",
  appId: "1:533489870447:web:3936b0ed984a0fc3278f9a",
  measurementId: "G-0BP3G8YG7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createApp(App).mount('#app')
