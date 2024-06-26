import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage'
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: "",
  authDomain: "intune-cbe3f.firebaseapp.com",
  projectId: "intune-cbe3f",
  storageBucket: "intune-cbe3f.appspot.com",
  messagingSenderId: "631113959498",
  appId: "1:631113959498:web:5f97f0bb4f37f63e9ebeb3",
  measurementId: "G-PNKJSZY3NF",
  databaseURL: "https://intune-cbe3f-default-rtdb.firebaseio.com/",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage()

export { app, auth, db, storage };
