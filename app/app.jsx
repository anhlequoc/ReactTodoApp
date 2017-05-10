var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApp = require('TodoApp');

var actions = require('actions');
var store = require('configureStore').configure();
var TodoAPI = require('TodoAPI');

store.subscribe( () => {
	var state = store.getState();
	console.log('New state', state);
	TodoAPI.setTodos(state.todos);
});

var inititalTodos = TodoAPI.getTodos();
store.dispatch(actions.addTodos(inititalTodos));

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
		<TodoApp />
	</Provider>,
	document.getElementById('app')
);
