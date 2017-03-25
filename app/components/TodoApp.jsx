var React = require('react');
var TodoList = require('TodoList');
var AddToDo = require('AddTodo');
var TodoSearch = require('TodoSearch');

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      showCompleted: false,
      searchText: '',
      todos: [
        {
          id: 1,
          text: 'walk the dog'
        },
        {
          id: 2,
          text: 'clean the yard'
        },
        {
          id: 3,
          text: 'test 3rd todo'
        },
        {
          id: 4,
          text: 'test 4th todo'
        }
      ]
    };
  },
  handleAddTodo: function(value) {
    alert('new todo: ' + value);
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
