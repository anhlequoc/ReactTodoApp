var expect = require('expect');
var df = require('deep-freeze-strict'); //deep-freeze giúp check reducer có phải là pure function không?

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
});
