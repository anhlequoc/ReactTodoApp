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
  app: {
    name: "Todo App",
    version: '1.0.0',
  },
  isRunning: true,
  user: {
    name: 'Anh Le',
    age: 99
  },
  // todos: { //firebase sử dụng object thay vì array để store unique items
  //   '123abcds': {
  //     text: 'film from web',
  //   }
  // }
});

//create new var store todos
var todosRef = firebaseRef.child('todos');
todosRef.on('child_added', (snapshot) => {
  console.log('child_added: ', snapshot.key, snapshot.val());
});

todosRef.push({text: 'todo 1'});
todosRef.push({text: 'todo 2'});
todosRef.push({text: 'todo 3'});
// var notesRef = firebaseRef.child('notes');
// notesRef.on('child_added', (snapshot) => { //child_added là event khi có bất kỳ thằng con nào của notes được add vào
//   console.log('child_added: ', snapshot.key, snapshot.val());
// });
//
// notesRef.on('child_changed', (snapshot) => { //child_changed là event khi có bất kỳ thằng con nào của notes được change
//   console.log('child_changed: ', snapshot.key, snapshot.val());
// });
//
// notesRef.on('child_removed', (snapshot) => { //child_removed là event khi có bất kỳ thằng con nào của notes được remove
//   console.log('child_removed: ', snapshot.key, snapshot.val());
// });
//
// var newNoteRef = notesRef.push({
//   text: 'waling!!!'
// });
//console.log('Todo ID is', newNoteRef.key);

//cach khac
// var newNoteRef = notesRef.push();
//
// newNoteRef.set({
//   text: 'walking'
// });


// set() completely wipes all of the data at the current reference that means if I were to call set again down below, the previous one will be clear
// firebaseRef.set({
//   appName: 'Todo Application'
// });

// firebaseRef.update({
//   isRunning: null
// });
// firebaseRef.child('user/age').remove();

//fetch the root of database
// firebaseRef.once('value').then((snapshot) => {
//   console.log('Got entire database', snapshot.val()); //val() returns object
// }, (e) => {
//   console.log('unable to fetch value', e);
//});//once() cho phép trigger and listen for an event, trong trường hợp này là "value"

//fetch a child of database
// firebaseRef.child('app').once('value').then((snapshot) => {
//   console.log('Got entire database',snapshot.key, snapshot.val());
// }, (e) => {
//   console.log('unable to fetch value', e);
// });

//listen for changes on firebase db - using "on" keyword
// có thể chỉ listen 1 số thằng trong db thôi, ví dụ firebaseRef.child('app').on(); thay vì listen toàn bộ
// var logData = (snapshot) => {
//   console.log('got value', snapshot.val());
// };
// firebaseRef.on('value', logData);
//
// //firebaseRef.off(); //turn off all listener
// firebaseRef.off(logData); //turn off listener - dùng cách chi tiết hơn dưới để tránh turn off all
//
// firebaseRef.update({isRunning: false});

//---
// var userLog = (snapshot) => {
//   console.log('got user update', snapshot.val());
// };
//
// firebaseRef.child('user').on('value', userLog);
// firebaseRef.child('user').update({name: 'Andy'});
//
// firebaseRef.child('app').update({name: 'Todo'});
