import moment from 'moment';
import firebase, {firebaseRef} from 'app/firebase/';

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText: searchText
  };
};


export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED',
  };
};


export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo: todo
  };
};

export var startAddTodo = (text) => {
  return (dispatch, getState) => { //return a function that dispatch some action after data is saved in firebase
    var todo = {
      text: text,
      completed: false,
      createdAt: moment().unix(), //return timestamp
      completedAt: null //null vì set vào firebase
    };
    var todoRef = firebaseRef.child('todos').push(todo); //save to firebase db

    return todoRef.then(() => { //khi add todo done ở firebase thì thực hiện hàm này, dispatch addTodo action ở trên và làm browser re-render component cho todo mới
      //khi firebase db update -> dispatch action để update view
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));
    });
  };
};

export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos: todos
  };
};

export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id: id,
    updates: updates
  };
};

export var startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    var todoRef = firebaseRef.child('todos/' + id); //ES6 template string: firebaseRef.child(`todos/$(id)`);
    var updates = {
      completed: completed,
      compeltedAt: completed ? moment().unix(): null
    };

    return todoRef.update(updates).then(() => {
      dispatch(updateTodo(id, updates));
    });
  };
};
