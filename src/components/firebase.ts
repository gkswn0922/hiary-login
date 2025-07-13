// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBA-1cozsZBiiUFIIVJKA2NSRzayWkYlkU",
  authDomain: "hiaryai-25160.firebaseapp.com",
  projectId: "hiaryai-25160",
  storageBucket: "hiaryai-25160.firebasestorage.app",
  messagingSenderId: "533489870447",
  appId: "1:533489870447:web:3936b0ed984a0fc3278f9a",
  measurementId: "G-0BP3G8YG7Z"
  // 기타 설정들
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider }; 