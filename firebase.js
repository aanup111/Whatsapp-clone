import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBo_IJg79lhAZsH5L4RsOKs-c2aTjGzSe8",
    authDomain: "yess-96d85.firebaseapp.com",
    projectId: "yess-96d85",
    storageBucket: "yess-96d85.appspot.com",
    messagingSenderId: "519491733695",
    appId: "1:519491733695:web:23a0110080a0241a7b1e0a"
  };

  // if theres already a firebase app don't initialize or else initialize a new firebase app
const app = !firebase.apps.length 
? firebase.initializeApp(firebaseConfig)
: firebase.app();


const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider}; // allow access outside of the component