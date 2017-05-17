var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {hashHistory} = require('react-router');


var actions = require('actions');
var store = require('configureStore').configure();
import firebase from 'app/firebase';
import router from 'app/router/';

firebase.auth().onAuthStateChanged((user) => {
	if (user) { //nếu có user log in
		hashHistory.push('/todos');
	} else { //nếu không có user log in thì về trang log in
		hashHistory.push('/');
	}
});
// store.subscribe( () => {
// 	var state = store.getState();
// 	console.log('New state', state);
// 	TodoAPI.setTodos(state.todos);
// });
//
// var inititalTodos = TodoAPI.getTodos();
// store.dispatch(actions.addTodos(inititalTodos));

store.dispatch(actions.startAddTodos());


// store.dispatch(actions.addTodo('try the redux on Todo app'));
// store.dispatch(actions.setSearchText('try'));
// store.dispatch(actions.toggleShowCompleted());

// Load foundation
//require('style!css!foundation-sites/dist/css/foundation.min.css'); - remove this line after adding 'sassLoader' obj in webpack.config
$(document).foundation();
//load app/styles/app.css
require('style!css!sass!applicationStyles');{/*load alias applicationStyles in webpack.config by using style loader, css loader and sass loaders*/}

ReactDOM.render(
	<Provider store={store}>
		{router}
	</Provider>,
	document.getElementById('app')
);
