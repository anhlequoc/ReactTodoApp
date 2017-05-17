import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'app/firebase/';

var requireLogin = (nextState, replace, next) => { //khi đang ở trình duyệt, chưa login mà cố tình gõ đường link đến app todos thì sẽ redirect về trang log in
	if (!firebase.auth().currentUser) { //firebase.auth().currentUser null if there is no user logged in
		replace ('/');
	}
	next();//call next() to tell react router that middle ware is done
};

var redirectIfLoggedIn = (nextState, replace, next) => {
	if (firebase.auth().currentUser) {
		replace ('/todos');
	}
	next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
    </Route>
  </Router>
);
