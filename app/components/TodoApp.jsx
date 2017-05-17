import React from 'react';
import * as Redux from 'react-redux';

// var TodoList = require('TodoList');
import TodoList from 'TodoList';
// var AddToDo = require('AddTodo');
import AddToDo from 'AddTodo';
// var TodoSearch = require('TodoSearch');
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';

export var TodoApp = React.createClass({
  onLogout (e) {
    var {dispatch} = this.props;
    e.preventDefault();

    dispatch(actions.startLogout());
  },
  render () {
    return (
      <div>
        <div className="page-actions">
          <a href="#" onClick={this.onLogout}>Logout</a>
        </div>

        <h1 className="page-title">Todo App</h1>

        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
              <TodoSearch/>
              <TodoList/> {/*Since we have access to the store from the children there's no need to pass the data down from TodoApp - meaning TodoList has no property, the Todo component will dispatch action of toggling todo by itself*/}
              <AddToDo/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Redux.connect()(TodoApp);
