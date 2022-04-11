// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJy4Yk0Z68eFEmDMZuHO5-DxOmWXHl_bI",
  authDomain: "hawk-express-tracker.firebaseapp.com",
  databaseURL: "https://hawk-express-tracker-default-rtdb.firebaseio.com",
  projectId: "hawk-express-tracker",
  storageBucket: "hawk-express-tracker.appspot.com",
  messagingSenderId: "742081657848",
  appId: "1:742081657848:web:9b95bba45d47e92900340d",
  measurementId: "G-F5ZZNQ8PKX",
};

// Initialize Firebase
/*
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const auth = firebase.auth();
export const db = getFirestore(app);

*/

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
