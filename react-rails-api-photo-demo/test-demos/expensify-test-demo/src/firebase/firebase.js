import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

// firebase's set() method returns a promise
firebase.initializeApp(config);
const database = firebase.database();

export { firebase, database as default };
 
// firebase.database().ref().set({
//   name: 'Expensify App'
// })
//   .then(res => console.log('result:', res)) // returns undefined
//   .catch(err => console.log('Firebase Error:', err)); 