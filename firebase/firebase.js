// Import the functions/services you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage} from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
    //put your config here.
    apiKey: "AIzaSyDYk-oQschDPDgJsLutPffTvamPj0dBvnk",
  authDomain: "expense-tracking-5a9ab.firebaseapp.com",
  projectId: "expense-tracking-5a9ab",
  storageBucket: "expense-tracking-5a9ab.appspot.com",
  messagingSenderId: "257547417292",
  appId: "1:257547417292:web:a0d4568c6d9021c7ccb469"
};

// Initialize firebase functions and export globally.
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
