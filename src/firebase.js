// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg8CbIMpAZO42b2df4Lf9wka5LSHva5f8",
  authDomain: "team-7---household-budget.firebaseapp.com",
  projectId: "team-7---household-budget",
  storageBucket: "team-7---household-budget.firebasestorage.app",
  messagingSenderId: "105671786041",
  appId: "1:105671786041:web:4094e4384dd153de40d7e8",
  measurementId: "G-4Q7CLNHDC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);