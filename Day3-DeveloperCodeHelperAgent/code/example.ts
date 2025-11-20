// ✅ All bugs fixed

// multiply function correctly multiples its arguments
function multiply(a: number, b: number) {
  return a * b;
}

// greet defaults to "World" if no argument provided
function greet(name: string = "World") {
  return "Hello " + name;
}
console.log(greet()); // outputs Hello World

// add simply sums two numbers
function add(a: number, b: number) {
  return a + b;
}

// getNumber returns 5
function getNumber() {
  let x = 5;
  return x;
}
console.log(getNumber()); // outputs 5
