var React = require('react');
var TodoList = require('TodoList');
var AddToDo = require('AddTodo');

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
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
  render: function() {
    var {todos} = this.state;

    return (
      <div>
        <TodoList todos={todos} />
        <AddToDo onSetTodo={this.handleAddTodo} />
      </div>
    );
  }
});

module.exports = TodoApp;
