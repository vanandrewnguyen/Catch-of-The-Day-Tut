// Data base from firebase

import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBjsfA0yS03nduw2CspiBQtxI8e4bRBs1w",
    authDomain: "catch-of-the-day-van.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-van-default-rtdb.firebaseio.com",
    projectId: "catch-of-the-day-van",
    storageBucket: "catch-of-the-day-van.appspot.com",
    messagingSenderId: "336570073445",
    appId: "1:336570073445:web:324b712b2cffdee3dda18c",
    measurementId: "G-GJVWG0M78F"
});

const base = Rebase.createClass(firebaseApp.database());

// Named export not default
export { firebaseApp };

// default export
export default base;
