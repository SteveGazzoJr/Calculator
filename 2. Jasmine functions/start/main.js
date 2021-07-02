function calculate(inputValue) {
  const expression = /\+|\-|\*|\//;
  const numbers = inputValue.split(expression);
  const numberA = Number.parseInt(numbers[0]);
  const numberB = Number.parseInt(numbers[1]);
  const operation = inputValue.match(expression);

  if (operation === null) {
    updateResult("badOperator");
    return;
  }

  if (isNaN(numberA) || isNaN(numberB)) {
    updateResult("badInput");
    return;
  }

  const calculator = new Calculator();
  calculator.add(numberA);

  let result;
  switch (operation[0]) {
    case "+":
      result = calculator.add(numberB);
      break;
    case "-":
      result = calculator.subtract(numberB);
      break;
    case "*":
      result = calculator.multiply(numberB);
      break;
    case "/":
      result = calculator.divide(numberB);
      break;
  }

  updateResult(result);
}

function updateResult(result) {
  const element = document.getElementById("result");
  if (element) {
    element.innerText = result;
  }
}
//this leverages a weird feature of JS where two instances of NaN are never equal despite being technically the same value
//thus, we test to see if value breaks identity, and if it does then value must be NaN
function isNaN(value) {
  const n = Number(value);
  return n !== n;
}
