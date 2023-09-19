// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtkL1TpebqdXxRJeicR22q0hsNjmKR-rk",
  authDomain: "laptop-49fff.firebaseapp.com",
  projectId: "laptop-49fff",
  storageBucket: "laptop-49fff.appspot.com",
  messagingSenderId: "1004055869155",
  appId: "1:1004055869155:web:1d220d55860dedd024b7d6",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
