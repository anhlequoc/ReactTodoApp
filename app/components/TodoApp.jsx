var React = require('react');
var TodoList = require('TodoList');
var AddToDo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var uuid = require('node-uuid');

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      showCompleted: false,
      searchText: '',
      todos: [
        {
          id: uuid(),
          text: 'walk the dog',
          completed: false
        },
        {
          id: uuid(),
          text: 'clean the yard',
          completed: true
        },
        {
          id: uuid(),
          text: 'test 3rd todo',
          completed: true
        },
        {
          id: uuid(),
          text: 'test 4th todo',
          completed: false
        }
      ]
    };
  },
  handleAddTodo: function(value) {
    //uuid() generate a unique ID based on time stamp
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: uuid(),
          text: value,
          completed: false
        }
      ]
    });
  },
  handleToggle: function(id) {
    var updatedTodos = this.state.todos.map((todo) => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }

      return todo;
    });

    this.setState({
      todos: updatedTodos
    });
  },
  handleSearch: function(showCompleted, searchText) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    });
  },
  render: function() {
    var {todos} = this.state;

    return (
      <div>
        <TodoSearch onSearch={this.handleSearch} />
        <TodoList todos={todos} onToggle={this.handleToggle}/>
        <AddToDo onSetTodo={this.handleAddTodo} />
      </div>
    );
  }
});

module.exports = TodoApp;
