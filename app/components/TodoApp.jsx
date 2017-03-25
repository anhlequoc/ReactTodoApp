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
          text: 'walk the dog'
        },
        {
          id: uuid(),
          text: 'clean the yard'
        },
        {
          id: uuid(),
          text: 'test 3rd todo'
        },
        {
          id: uuid(),
          text: 'test 4th todo'
        }
      ]
    };
  },
  handleAddTodo: function(value) {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: uuid(),
          text: value
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
    var {todos} = this.state;

    return (
      <div>
        <TodoSearch onSearch={this.handleSearch} />
        <TodoList todos={todos} />
        <AddToDo onSetTodo={this.handleAddTodo} />
      </div>
    );
  }
});

module.exports = TodoApp;
