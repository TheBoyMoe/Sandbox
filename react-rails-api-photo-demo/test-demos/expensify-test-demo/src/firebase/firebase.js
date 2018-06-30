import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCp_-a33zFQDI-yYW7VG6CNSLUE4aHSCc0',
  authDomain: 'expensify-demo-50d60.firebaseapp.com',
  databaseURL: 'https://expensify-demo-50d60.firebaseio.com',
  projectId: 'expensify-demo-50d60',
  storageBucket: 'expensify-demo-50d60.appspot.com',
  messagingSenderId: '302657365617'
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