var expect = require('expect');
var df = require('deep-freeze-strict'); //deep-freeze giúp check reducer có phải là pure function không?
var moment = require('moment');

var reducers = require('reducers');

describe('Reducers:', () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'test'
      };
      var res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toEqual(action.searchText);
    });
  });

  // test that the showCompleted status gets flipped
  describe('showCompletedReducer', () => {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var res = reducers.showCompletedReducer(df(false), df(action));

      expect(res).toEqual(true);
    });
  });

  describe('todosReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        text: 'test todo'
      };
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0].text).toEqual(action.text);
    });

    it('should toggle complete status of todo', () => {
      var todos = [
        {
          id: 123,
          text: 'sample todo',
          completed: true,
          createdAt: moment().unix(), //return timestamp
          completedAt: moment().unix() + 3
        }
      ];
      var action = {
        type: 'TOGGLE_TODO',
        id: 123
      };
      var res = reducers.todosReducer(df(todos), df(action));      
      expect(res[0].completed).toEqual(!todos[0].completed);
      expect(res[0].completedAt).toEqual(undefined);
    });
  });
});
