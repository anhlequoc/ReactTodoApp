var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

export class Todo extends React.Component { //export module này để dùng trong file test
  render () {
    var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
    var todoClassName = completed ? 'todo todo-completed' : 'todo';
    var renderDate = () => {
      var message = "Created ";
      var timestamp = createdAt;

      if(completed) {
        message = "Completed ";
        timestamp = completedAt;
      }

      return message + moment.unix(timestamp).format('MMM Do YYYY @ hh:mm A');
    };

    return (
        <div className={todoClassName} onClick={() => {
            //this.props.onToggle(id);
            dispatch(actions.startToggleTodo(id, !completed));
          }}>
          <div>
            <input type="checkbox" checked={completed} />
          </div>
          <div>
            <p>{text}</p>
            <p className="todo__subtext">{renderDate()}</p>
          </div>
        </div>
    );
  }
}

export default connect()(Todo);//khi dùng var someVar = require() -> someVar sẽ là default
