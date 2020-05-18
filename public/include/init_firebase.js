
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBveio8IuFGOMymSnwNgAWqc14BVliUwHY",
    authDomain: "trackboard-d41a2.firebaseapp.com",
    databaseURL: "https://trackboard-d41a2.firebaseio.com",
    projectId: "trackboard-d41a2",
    storageBucket: "trackboard-d41a2.appspot.com",
    messagingSenderId: "880705427344",
    appId: "1:880705427344:web:43e253a149143cc9218515",
    measurementId: "G-5GLK0MX33D",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var st = firebase.storage();
  var db = firebase.firestore();