import firebase from 'firebase/compat/app'
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
// // import  'firebase/compat/auth';
// // import 'firebase/firestore';
// // import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
    apiKey: "AIzaSyD3gkPxabKPUNWWjC9AS-2rRI1s2bpUg_0",
    authDomain: "simple-notes-firebase-28ebc.firebaseapp.com",
    projectId: "simple-notes-firebase-28ebc",
    storageBucket: "simple-notes-firebase-28ebc.appspot.com",
    messagingSenderId: "942715549620",
    appId: "1:942715549620:web:42f62414fb328e474024e1",
    measurementId: "G-K7H08SQ6R7"
  };

  // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
  const app = initializeApp(firebaseConfig);
  export const database = getDatabase(app);
//   const analytics = getAnalytics(app);

export default firebase;