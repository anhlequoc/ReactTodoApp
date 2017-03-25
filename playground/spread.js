function add(a, b) {
  return a + b;
}

console.log(add(3, 1));

//the spread operator are very useful when you want to call a function with a set of argument but those arguments are in an array
var toAdd = [9, "a5",3,4];
//add(toAdd[0], toAdd[1]);
console.log(add(...toAdd));
