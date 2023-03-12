// Import the functions/services you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage} from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzTDvIFXvk4mrH1KNb6qjkgx86z3dw27Q",
  authDomain: "expenses-monitor-a5bef.firebaseapp.com",
  projectId: "expenses-monitor-a5bef",
  storageBucket: "expenses-monitor-a5bef.appspot.com",
  messagingSenderId: "665863736227",
  appId: "1:665863736227:web:573d9f9cedd068a37ca816",
  measurementId: "G-Z2GVGYMDB2"
};

// Initialize firebase functions and export globally.
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
