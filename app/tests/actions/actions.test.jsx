import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase/';
var actions = require('actions');

var createMockStore = configureMockStore([thunk]); //pass an array of middle ware

describe('Actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'some search text'
    };
    var res = actions.setSearchText(action.searchText);

    expect(res).toEqual(action);
  });

  it('should generate toggle show completetd todo action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    var res = actions.toggleShowCompleted();

    expect(res).toEqual(action);
  });

  it('should generate add todo action', () => {
    var action = {
      type: 'ADD_TODO',
      todo: {
        id: 'abc123',
        text: 'test text',
        completed: false,
        createdAt: 0
      }
    };
    var res = actions.addTodo(action.todo);

    expect(res).toEqual(action);
  });

  it('should generate addTodos action object', () => {
    var todos = [{
      id: '111',
      text: 'test todo',
      completed: false,
      completedAt: undefined,
      createAt: 33000
    }];

    var action = {
      type: 'ADD_TODOS',
      todos: todos
    };

    var res = actions.addTodos(todos);
    expect(res).toEqual(action);
  });

  it('should generate update todo action', () => {
    var action = {
      type: 'UPDATE_TODO',
      id: '123',
      updates: {completed: false}
    };
    var res = actions.updateTodo(action.id, action.updates);

    expect(res).toEqual(action);
  });

  it('should generate login action object', () => {
    const action = {
      type: "LOGIN",
      uid: '1233456'
    };
    const res = actions.login(action.uid);
    expect(res).toEqual(action);
  });

  it('should generate logout action object', () => {
    const action = {
      type: 'LOGOUT'
    };
    const res = actions.logout();
    expect(res).toEqual(action);
  });

  describe('Tests with firebase todos', () => {
    var testTodoRef;
    var uid;
    var todosRef;

    beforeEach((done) => {  //beforeEach handler is variable inside mocha
      var credential = firebase.auth.GithubAuthProvider.credential(process.env.GITHUB_ACCESS_TOKEN);

      firebase.auth().signInWithCredential(credential).then((user) => {
        uid = user.uid;
        todosRef = firebaseRef.child(`users/$(uid)/todos`);

        return todosRef.remove();
      }).then(() => {
        testTodoRef = todosRef.push();
        return testTodoRef.set({
          text: 'Something to do',
          completed: false,
          createdAt: 23123456,
        });
      })
      .then(() => done())
      .catch(done);
    });

    afterEach((done) => {  //variable inside mocha
      todosRef.remove().then(() => done());
    });

    it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startToggleTodo(testTodoRef.key, true); //testTodoRef.key is todo id

      store.dispatch(action).then(() => {
        const mockActions = store.getActions(); //getActions là fn của configureMockstore

        expect(mockActions[0]).toInclude({ // dùng toInclude() do có cái updates.completedAt không thể trigger được đúng thời điểm
          type: 'UPDATE_TODO',
          id: testTodoRef.key //bỏ updates đi
        });
        expect(mockActions[0].updates).toInclude({
          completed: true
        });
        expect(mockActions[0].updates.completedAt).toExist();

        done();
      }, done);
    });

    it('should populate todos and dispatch ADD_TODOS', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startAddTodos();

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0].type).toEqual('ADD_TODOS');
        expect(mockActions[0].todos.length).toEqual(1);
        expect(mockActions[0].todos[0].text).toEqual('Something to do');

        done();
      }, done);
    });

    //asynchronous test
    it('should create todo and dispatch ADD_TODO', (done) => {
      const store = createMockStore({auth: {uid}});
      const todoText = 'My todo item';

      store.dispatch(actions.startAddTodo(todoText)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toInclude({
          type: 'ADD_TODO'
        });
        expect(actions[0].todo).toInclude({
          text: todoText
        });
        done(); //hàm này để xác nhận test done, nếu không có sẽ gặp lỗi error timeout vì karma chờ test finish forever
      }).catch(done);
    });
  });
});
