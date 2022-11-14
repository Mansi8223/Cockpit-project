import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBW4ovgDTi0Vad-bOWo_Pc0yqr9UjsEfnE",
    authDomain: "cockpit-c1046.firebaseapp.com",
    projectId: "cockpit-c1046",
    storageBucket: "cockpit-c1046.appspot.com",
    messagingSenderId: "984506795781",
    appId: "1:984506795781:web:146513c5615b0dc750d96c",
    measurementId: "G-GZZR2N0GXR"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  export default firebase;