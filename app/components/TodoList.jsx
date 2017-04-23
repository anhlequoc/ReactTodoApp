var React = require('react');
var {connect} = require('react-redux');
// var Todo = require('Todo');
import Todo from 'Todo';

export var TodoList = React.createClass({ //dung export de dung trong test file
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
          <Todo key={todo.id} {...todo}/> //... la spread obj, spread out all properties of each individual Todo component
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

export default connect(
  (state) => {
    return {
      todos: state.todos //todos is going to get set on the props for our component - TodoList
    };
  }
)(TodoList);
