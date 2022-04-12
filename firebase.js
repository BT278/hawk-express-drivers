import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJy4Yk0Z68eFEmDMZuHO5-DxOmWXHl_bI",
  authDomain: "hawk-express-tracker.firebaseapp.com",
  databaseURL: "https://hawk-express-tracker-default-rtdb.firebaseio.com",
  projectId: "hawk-express-tracker",
  storageBucket: "hawk-express-tracker.appspot.com",
  messagingSenderId: "742081657848",
  appId: "1:742081657848:web:9b95bba45d47e92900340d",
  measurementId: "G-F5ZZNQ8PKX"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);