//{/*API for integrating wiht localStorage*/}
var $ = require('jquery');

module.exports = {
  setTodos: function (todos) {
    if ($.isArray(todos)) { //check xem todos co phai la array khong
      localStorage.setItem('todos', JSON.stringify(todos)); //convert array to string because localStorage can not stores object or array
      return todos;
    }
  },
  getTodos: function () {
    var stringTodos = localStorage.getItem('todos');
    var todos = [];

    //vi convert JSON sang array co the loi nen dua vao try catch de manage
    try {
      todos = JSON.parse(stringTodos);
    } catch (e) {
      //de blank, neu parse stringTodos bi loi, thi todos la mang rong nhu khai bao o line 13
    }

    return $.isArray(todos) ? todos : [];
    // if ($.isArray(todos)) {
    //   return todos;
    // } else {
    //   return [];
    // }
  }
};
