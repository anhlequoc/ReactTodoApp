var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

import {configure} from 'configureStore';
// var TodoList = require('TodoList');
import ConnectedTodoList, {TodoList} from 'TodoList'; //ConnectedTodoList là default, được pass vào connect function
import ConnectedTodo, {Todo} from 'Todo';
// var Todo = require('Todo');

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist();
  });

  it('should render one Todo component for each todo item', () => {
    var todos = [
      {
        id: 1,
        text: 'do 1',
        completed: false,
        completedAt: undefined,
        createdAt: 500
      },
      {
        id: 2,
        text: 'do 2',
        completed: false,
        completedAt: undefined,
        createdAt: 500
      }
    ];
    var store = configure({
      todos: todos
    });
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedTodoList/>
      </Provider>
    );
    var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
    var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo); //this function check how many component are rendered inside a separated component
    expect(todosComponents.length).toBe(todos.length);
  });

  it('should render message if no todo', () => {
    var todos = [];
    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
    var $el = $(ReactDOM.findDOMNode(todoList));

    expect($el.find('.container__message').length).toBe(1);
  });
});
