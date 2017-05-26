var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
{/*
  Todo:
    - add AddTodo form
    - write test: spies function that it will or will not called depending on passed value is valid or invalid
*/}

export class AddTodo extends React.Component {
  handleSubmit (e) {
    e.preventDefault();
    var {dispatch} = this.props;
    var todoContent = this.refs.todoText.value;
    //console.log(todoContent);
    if (todoContent.length > 0) {
      this.refs.todoText.value = "";
      // this.props.onSetTodo(todoContent);
      dispatch(actions.startAddTodo(todoContent));
    } else {
      this.refs.todoText.focus(); {/*focus vao field de add todo*/}
    }
  }
  render () {
    return (
      <div className="container__footer">
        <form className="addtodo-form" ref="form" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="todoText" placeholder="enter your todo"></input>
          <button className="button expanded">ADD TODO</button>
        </form>
      </div>
    );
  }
}

export default connect()(AddTodo);
