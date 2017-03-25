var React = require('react');
{/*
  Todo:
    - add AddTodo form
    - write test: spies function that it will or will not called depending on passed value is valid or invalid
*/}

var AddTodo = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var todoContent = this.refs.todoText.value;
    //console.log(todoContent);
    if (todoContent.length > 0) {
      this.refs.todoText.value = "";
      this.props.onSetTodo(todoContent);
    } else {
      this.refs.todoText.focus(); {/*focus vao field de add todo*/}
    }
  },
  render: function() {
    return (
      <div>
        <form className="addtodo-form" ref="form" onSubmit={this.handleSubmit}>
          <input type="text" ref="todoText" placeholder="enter your todo"></input>
          <button className="button expanded">ADD TODO</button>
        </form>
      </div>
    );
  }
});

module.exports = AddTodo;
