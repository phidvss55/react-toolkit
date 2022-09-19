// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDwOpFezbdLA0VbvtQL0Ad4iWD0hwerLQ",
  authDomain: "e-commerce-test-38aca.firebaseapp.com",
  projectId: "e-commerce-test-38aca",
  storageBucket: "e-commerce-test-38aca.appspot.com",
  messagingSenderId: "569613917444",
  appId: "1:569613917444:web:1a18d5b537573a26278451",
  measurementId: "G-YWZ2XJ331H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export default app;
