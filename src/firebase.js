// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIYHAg7-mfhmetIL-TxYa8xijJnlD4lC0",
  authDomain: "nil-dd3a9.firebaseapp.com",
  projectId: "nil-dd3a9",
  storageBucket: "nil-dd3a9.appspot.com",
  messagingSenderId: "1005302987732",
  appId: "1:1005302987732:web:08faf0377a84cfa3fef441"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider();
export default app;