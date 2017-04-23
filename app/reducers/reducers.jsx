var uuid = require('node-uuid');
var moment = require('moment');

export var searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  }
};

export var showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    default:
      return state;
  }
};

export var todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: uuid(),
          text: action.text,
          completed: false,
          createdAt: moment().unix(), //return timestamp
          completedAt: undefined
        }
      ];
    case 'TOGGLE_TODO':
      /* solution here
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? moment().unix() : undefined
          };
        }
      }) */

      var updatedTodos = state.map((todo) => { // dùng updatedTodos để tránh thay đỏi arr state (tranh lỗi update pure function, báo bởi deep-freeze-strict)
        if(todo.id === action.id) {
          var nextCompleted = !todo.completed;
          return {
            ...todo,
            completed: nextCompleted,
            completedAt: nextCompleted ? moment().unix() : undefined
          };
        } else {
            return todo;
        }
      });
      return updatedTodos;
    default:
      return state;
  }
};
