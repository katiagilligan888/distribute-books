// Holds all configuration and instantiates Firebase here 

import firebase from 'firebase'; 
import 'firebase/auth'; 

const config = {
    apiKey: "AIzaSyBhgVqnbsjscNtOngQ1Yuw8XgIPrSPesaM",
    authDomain: "distribute-books.firebaseapp.com",
    databaseURL: "https://distribute-books.firebaseio.com",
    projectId: "distribute-books",
    storageBucket: "distribute-books.appspot.com",
    messagingSenderId: "836909167291"
  };

  // Initialization of Auth Object
  
  if(!firebase.apps.length){
      firebase.initializeApp(config)
  }

  const db = firebase.firestore();
  const auth = firebase.auth(); 
  
  export {
      db,
      auth, 
  }