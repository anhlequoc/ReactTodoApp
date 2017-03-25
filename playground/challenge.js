var person = ['Andrew', 25];
var personTwo = ['Jen', 29];

function myFunc(name, age) {
  //console.log(array[0][0]);
  var greetings = "Hi " + name + ", you are " + age;
  console.log(greetings);
}

myFunc(...person);
myFunc(...personTwo);

var names = ["Mike", "Ben"];
var final = ["Anh",...names];

final.forEach(function(item) {
  console.log(item);
});
