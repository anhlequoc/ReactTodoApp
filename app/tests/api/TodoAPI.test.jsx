var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
  //beforeEach la ham cua mocha, chay truoc khi thuc hien moi ham test
  beforeEach(() => {
    localStorage.removeItem('todos');
  });

  it('should exist', () => {
    expect(TodoAPI).toExist();
  });

  // describe('setTodos', () => { //không dùng với firebase
  //   it('should set valid todos array', () => {
  //     var todos = [
  //       {
  //           id: 32,
  //           text: 'test todo',
  //           completed: false
  //       }
  //     ];
  //
  //     TodoAPI.setTodos(todos);
  //     var actualTodos = JSON.parse(localStorage.getItem('todos'));
  //
  //     expect(actualTodos).toEqual(todos);//toEqual dung cho Object
  //   });
  //
  //   it('should not set invalid todo array', () => {
  //     var badTodos = {a: 'b'};
  //     TodoAPI.setTodos(badTodos);
  //
  //     expect(localStorage.getItem('todos')).toBe(null);
  //   });
  // });

  // describe('getTodos', () => { //không dùng với firebase
  //   it ('should return empty array for bad localStorage data', () => {
  //     var actualTodos = TodoAPI.getTodos();
  //     expect(actualTodos).toEqual([]);
  //   });
  //
  //   it('should return todos if vakid array in localStorage', () => {
  //     var todos = [
  //       {
  //           id: 32,
  //           text: 'test todo',
  //           completed: false
  //       }
  //     ];
  //
  //     localStorage.setItem('todos', JSON.stringify(todos));
  //     var actualTodos = TodoAPI.getTodos();
  //     expect(actualTodos).toEqual(todos);
  //   });
  // });

  describe('filterTodos', () => {
    var todos = [
      {
        id: 1,
        text: 'test data 1',
        completed: true
      },
      {
        id: 2,
        text: 'Some test data 2',
        completed: false
      },
      {
        id: 3,
        text: 'test data 3',
        completed: true
      }
    ];

    it('should return all items if showCompleted is true', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3);
    });

    it('should return not completed todos if showCompleted is false', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, false, '');
      expect(filteredTodos.length).toBe(1);
    });

    it('should sort by completed status', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos[0].completed).toBe(false); //dua thang false len dau
    });

    //filter searchText
    it('should filter todos by searchText', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, 'some');
      expect(filteredTodos.length).toBe(1);
    });

    it('should return all todos if searchText is empty', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3);
    });
  });
});
