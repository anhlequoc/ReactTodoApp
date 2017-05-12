var React = require('react');
var {connect} = require('react-redux');
// var Todo = require('Todo');
import Todo from 'Todo';
var TodoAPI = require('TodoAPI');

export var TodoList = React.createClass({ //dung export de dung trong test file
  render: function() {
    var {todos, showCompleted, searchText} = this.props;
    console.log(this.props);
    console.log('keyword: ', searchText);
    var renderTodos = () => {
      var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
      if(filteredTodos.length === 0) {
        return (
          <p className="container__message">Nothing To Do</p>
        );
      }
      return filteredTodos.map((todo) => {
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
    // console.log(state);
    return state;
  }
)(TodoList);
