// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCSNU_U6Zq76XYDfugyN8nuqqrqYg6Gu7g",
    authDomain: "nkwagon.firebaseapp.com",
    projectId: "nkwagon",
    storageBucket: "nkwagon.firebasestorage.app",
    messagingSenderId: "945093663342",
    appId: "1:945093663342:web:5e34badd3f19bd5768247f",
    measurementId: "G-JBFW2L17D0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth } 
