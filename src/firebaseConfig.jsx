// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBECl-PzvpxuuvPAu0rYluKipBAEP3yUKs",
  authDomain: "app-demo-aleek.firebaseapp.com",
  projectId: "app-demo-aleek",
  storageBucket: "app-demo-aleek.firebasestorage.app",
  messagingSenderId: "412637555152",
  appId: "1:412637555152:web:8f8f50e58752293a8431d5",
  measurementId: "G-NZPVY5DBX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

