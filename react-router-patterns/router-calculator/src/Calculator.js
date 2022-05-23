import React from "react";
import { useParams, useHistory } from "react-router-dom";

const Calculator = () => {
  const { operation, num1, num2 } = useParams();
  const history = useHistory();

  const NAME_TO_OPERATION = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
  };

  const NAME_TO_SYMBOL = {
    add: "+",
    subtract: "-",
    mulitply: "*",
    divide: "/",
  };

  function calculate(name, num1, num2) {
    if (!NAME_TO_OPERATION[name]) {
      history.push("/");
      return "invalid operator!";
    }

    return NAME_TO_OPERATION[name](+num1, +num2);
  }

  let result = calculate(operation, num1, num2);

  if (result === "invalid operator!")
    return (
      <div>
        <h1>Invalid url inputs!</h1>
      </div>
    );

  let symbol = NAME_TO_SYMBOL[operation];

  return (
    <div>
      <h1>React Router Calculator!</h1>
      <h3>Operation Name: {operation}</h3>
      <h3>
        {num1} {symbol} {num2} = {result}
      </h3>
    </div>
  );
};

export default Calculator;

// LESS GOOD FIRST IDEA FOR LOGIC
// let result;
// let operator;

// if (operation === "add") {
//   result = num1 + num2;
//   operator = "+";
// } else if (operation === "subtract") {
//   result = num1 - num2;
//   operator = "-";
// } else if (operation === "multiply") {
//   result = num1 * num2;
//   operator = "*";
// } else if (operation === "divide") {
//   result = num1 / num2;
//   operator = "/";
// } else {
//   result = "INVALID OPERATOR";
// }
