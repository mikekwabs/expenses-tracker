// Import the functions/services you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage} from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
    //put your config here.
    apiKey: "AIzaSyCWaq44lJTuVkSoAH0H-P7X15Ha-eu1brQ",
    authDomain: "expense-trac-60ff5.firebaseapp.com",
    projectId: "expense-trac-60ff5",
    storageBucket: "expense-trac-60ff5.appspot.com",
    messagingSenderId: "566385427667",
    appId: "1:566385427667:web:fc386e1242cc208c52c026"
};

// Initialize firebase functions and export globally.
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
