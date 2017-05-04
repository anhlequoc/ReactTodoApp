import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyA1k7gG4nKi6KZvhF-WGtcEYZzrCOwy9fo",
    authDomain: "react-todo-app-a405d.firebaseapp.com",
    databaseURL: "https://react-todo-app-a405d.firebaseio.com",
    projectId: "react-todo-app-a405d",
    storageBucket: "react-todo-app-a405d.appspot.com",
    messagingSenderId: "26738573418"
  };
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref(); // để đỡ phải viết nhiều firebase.database().ref()
firebaseRef.set({
  appName: "Todo App",
  isRunning: true,
  user: {
    name: 'Anh Le',
    age: 99
  }
});
// set() completely wipes all of the data at the current reference that means if I were to call set again down below, the previous one will be clear
// firebaseRef.set({
//   appName: 'Todo Application'
// });

firebaseRef.child('user').set({
  name: 'Andy'
});
