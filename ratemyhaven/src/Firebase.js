import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyBg-q-sIfGZ9dVmNzg1v6iqaaJKrKCQjMg",
    authDomain: "ratemyhaven.firebaseapp.com",
    projectId: "ratemyhaven",
    storageBucket: "ratemyhaven.appspot.com",
    messagingSenderId: "754890276608",
    appId: "1:754890276608:web:251e344257cb222616bde5",
    measurementId: "G-VR7ZS11C6Z"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db =  firebaseApp.firestore();
 const auth= firebase.auth()
 export{db, auth}
 export default firebase;