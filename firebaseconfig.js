// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/auth";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAXkROyFN7YQdxg5ie_pKMpzKXX3pTiQ4M",
  authDomain: "asdeporte-a5525.firebaseapp.com",
  projectId: "asdeporte-a5525",
  storageBucket: "asdeporte-a5525.appspot.com",
  messagingSenderId: "63937575564",
  appId: "1:63937575564:web:dab0473a1260f56a4219a9",
  measurementId: "G-FJM6XYTC5Z",
};

const fire = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const auth = fire.auth();
const db = fire.firestore()

export { auth, db };
