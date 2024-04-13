// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`
};


/*
const firebaseConfig = {
  apiKey: "AIzaSyCibX91X2rmndmKToYYjIMdNyeoTrnSLoE",
  authDomain: "offtimemaster.firebaseapp.com",
  projectId: "offtimemaster",
  storageBucket: "offtimemaster.appspot.com",
  messagingSenderId: "70962091523",
  appId: "1:70962091523:web:3e99c99fd72d43242c2036"
};
*/



// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db=getFirestore(app);
export const auth=getAuth(app);


