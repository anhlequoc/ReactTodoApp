var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
  render: function() {
    var {todos} = this.props;
    var renderTodos = () => {
      if(todos.length === 0) {
        return (
          <p className="container__message">Nothing To Do</p>
        );
      }
      return todos.map((todo) => {
        {/*moi <Todo /> component can co 1 unique key prop dung de quan ly tung component rieng biet*/}
        return (
          <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/> //... la spread obj, spread out all properties of each individual Todo component
        );
      });
    };
    return (
        <div>
          {renderTodos()}
        </div>
    );
  }
});

module.exports = TodoList;
