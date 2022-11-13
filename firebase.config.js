import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {

    apiKey: "AIzaSyD4yPk_BGd3iLVEDqmQmV6mTqBY_CBbVXQ",
  
    authDomain: "intune-cbe3f.firebaseapp.com",
  
    projectId: "intune-cbe3f",
  
    storageBucket: "intune-cbe3f.appspot.com",
  
    messagingSenderId: "631113959498",
  
    appId: "1:631113959498:web:5f97f0bb4f37f63e9ebeb3",
  
    measurementId: "G-PNKJSZY3NF"
  
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { firebaseConfig, db, app };