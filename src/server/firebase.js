import firebase from 'firebase';

import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyCW-KmO754uzFTDuic5VdAoFQS03Yez8y0",
    authDomain: "slack-clone-6ac72.firebaseapp.com",
    databaseURL: "https://slack-clone-6ac72-default-rtdb.firebaseio.com",
    projectId: "slack-clone-6ac72",
    storageBucket: "slack-clone-6ac72.appspot.com",
    messagingSenderId: "316102813977",
    appId: "1:316102813977:web:cc7765da09635f02b8fd88",
    measurementId: "G-Q246H9ESYJ"
};

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;