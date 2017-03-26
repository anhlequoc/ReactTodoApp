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

  describe('setTodos', () => {
    it('should set valid todos array', () => {
      var todos = [
        {
            id: 32,
            text: 'test todo',
            completed: false
        }
      ];

      TodoAPI.setTodos(todos);
      var actualTodos = JSON.parse(localStorage.getItem('todos'));

      expect(actualTodos).toEqual(todos);//toEqual dung cho Object
    });

    it('should not set invalid todo array', () => {
      var badTodos = {a: 'b'};
      TodoAPI.setTodos(badTodos);

      expect(localStorage.getItem('todos')).toBe(null);
    });
  });

  describe('getTodos', () => {
    it ('should return empty array for bad localStorage data', () => {
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([]);
    });

    it('should return todos if vakid array in localStorage', () => {
      var todos = [
        {
            id: 32,
            text: 'test todo',
            completed: false
        }
      ];

      localStorage.setItem('todos', JSON.stringify(todos));
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual(todos);
    });
  });
});
