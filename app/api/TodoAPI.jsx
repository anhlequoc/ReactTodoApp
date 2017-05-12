//{/*API for integrating wiht localStorage*/}
var $ = require('jquery');

module.exports = {
  // setTodos: function (todos) {
  //   if ($.isArray(todos)) { //check xem todos co phai la array khong
  //     localStorage.setItem('todos', JSON.stringify(todos)); //convert array to string because localStorage can not stores object or array
  //     return todos;
  //   }
  // },
  // getTodos: function () {
  //   var stringTodos = localStorage.getItem('todos');
  //   var todos = [];
  //
  //   //vi convert JSON sang array co the loi nen dua vao try catch de manage
  //   try {
  //     todos = JSON.parse(stringTodos);
  //   } catch (e) {
  //     //de blank, neu parse stringTodos bi loi, thi todos la mang rong nhu khai bao o line 13
  //   }
  //
  //   return $.isArray(todos) ? todos : [];
  //   // if ($.isArray(todos)) {
  //   //   return todos;
  //   // } else {
  //   //   return [];
  //   // }
  // }, //không dùng với firebase

  filterTodos: function(todos, showCompleted, searchText) {
    var filteredTodos = todos;

    // filter by showCompleted
    filteredTodos = filteredTodos.filter((todo) => { //dung callback
      return !todo.completed || showCompleted;
    });

    // filter by searchText
    filteredTodos = filteredTodos.filter((todo) => {
      //return true: item ở trong array, return false: item bị loại khỏi array
      if (searchText === undefined || searchText.length === 0) {
        return true;
      } else if (todo.text.toLowerCase().indexOf(searchText) !== -1) { // -1 tức không có trong string.indexOf
        return true;
      } else {return false;}

      /* solution
        return searchText.length === 0 || todo.text.toLowerCase().indexOf(searchText) > -1;

      */
    });

    // Sort todos with non-completed first
    filteredTodos.sort((a, b) => {
      if (a.completed === false && b.completed === true) {
        return -1; // -1 la a truoc b
      } else if (a.completed === true && b.completed === false) {
        return 1; // 1 la a sau b
      } else {
        return 0;
      }
    });

    return filteredTodos;
  }
};
