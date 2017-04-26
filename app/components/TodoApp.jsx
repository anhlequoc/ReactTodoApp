var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

// var TodoList = require('TodoList');
import TodoList from 'TodoList';
// var AddToDo = require('AddTodo');
import AddToDo from 'AddTodo';
// var TodoSearch = require('TodoSearch');
import TodoSearch from 'TodoSearch';
var TodoAPI = require('TodoAPI');

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      showCompleted: false,
      searchText: '',
      todos: TodoAPI.getTodos()
    };
  },
  componentDidUpdate: function () {
    TodoAPI.setTodos(this.state.todos); //save todos to localStorage
  },
  handleAddTodo: function(value) {
    //uuid() generate a unique ID based on time stamp
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: uuid(),
          text: value,
          completed: false,
          createdAt: moment().unix(), //return timestamp
          completedAt: undefined
        }
      ]
    });
  },
  handleSearch: function(showCompleted, searchText) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    });
  },
  render: function() {
    var {todos, showCompleted, searchText} = this.state;
    var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

    return (
      <div>
        <h1 className="page-title">Todo App</h1>

        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
              <TodoSearch onSearch={this.handleSearch} />
              <TodoList/> {/*Since we have access to the store from the children there's no need to pass the data down from TodoApp - meaning TodoList has no property, the Todo component will dispatch action of toggling todo by itself*/}
              <AddToDo onSetTodo={this.handleAddTodo} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;
