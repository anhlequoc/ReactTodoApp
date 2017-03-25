var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var AddTodo = require('AddTodo');

describe('AddTodo', () => {
  it('should exists', () => {
    expect(AddTodo).toExist();
  });

  it('should call onSetTodo() if valid todo is input', () => {
    var spy = expect.createSpy();
    var AddTodoForm = TestUtils.renderIntoDocument(<AddTodo onSetTodo={spy} />);
    var todoText = "sample task";
    var $el = $(ReactDOM.findDOMNode(AddTodoForm));

    AddTodoForm.refs.todoText.value = todoText;
    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toHaveBeenCalledWith(todoText);
  });

  it('should not call onSetTodo() if invalid data is input', () => {
    var spy = expect.createSpy();
    var AddTodoForm = TestUtils.renderIntoDocument(<AddTodo onSetTodo={spy} />);
    var $el = $(ReactDOM.findDOMNode(AddTodoForm));

    AddTodoForm.refs.todoText.value = "";
    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toNotHaveBeenCalled();
  });
});
