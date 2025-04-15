// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZYAmO3ZUAh5oxf0n0IP_xEUssn4dla7A",
  authDomain: "ai-trip-planner-fafba.firebaseapp.com",
  projectId: "ai-trip-planner-fafba",
  storageBucket: "ai-trip-planner-fafba.firebasestorage.app",
  messagingSenderId: "371713595977",
  appId: "1:371713595977:web:49180058cf93d7d6677d98",
  measurementId: "G-1RY1039GYZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);