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

firebase.database().ref().set({
  appName: "Todo App",  
});
