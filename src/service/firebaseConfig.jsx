// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOvxceLNJUwg4Ek6uPshR0le_rmg_ji1M",
  authDomain: "react-projects-ac291.firebaseapp.com",
  projectId: "react-projects-ac291",
  storageBucket: "react-projects-ac291.appspot.com",
  messagingSenderId: "948060717920",
  appId: "1:948060717920:web:3ceb5670c45f75d08ad405",
  measurementId: "G-4T6RLBQN58"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);