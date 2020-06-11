const calc = document.querySelector(".js-calculator-keys"),
  dis = calc.querySelector(".js-view");

function operateCalc() {
  const displayedNum = dis.textContent,
    previousBtn = calc.dataset.previousBtn,
    operator = calc.dataset.operator;
  let firstNumber = calc.dataset.firstNumber,
    secondNumber = displayedNum;
  if (firstNumber) {
    if (previousBtn === "calculate") {
      firstNumber = displayedNum;
      secondNumber = calc.dataset.secondNumber;
    }
    dis.textContent = calculate(firstNumber, secondNumber, operator);
  }
  calc.dataset.secondNumber = secondNumber;
  calc.dataset.previousBtn = "calculate";
}

function clearCalc() {
  calc.dataset.firstNumber = "";
  calc.dataset.secondNumber = "";
  calc.dataset.operator = "";
  dis.textContent = 0;
  calc.dataset.previousBtn = "clear";
}

function calculate(firstNumber, secondNumber, operator) {
  let result = "";
  if (operator === "add") {
    result = parseInt(firstNumber, 10) + parseInt(secondNumber, 10);
  } else if (operator === "subtract") {
    result = parseInt(firstNumber, 10) - parseInt(secondNumber, 10);
  } else if (operator === "multiply") {
    result = parseInt(firstNumber, 10) * parseInt(secondNumber, 10);
  } else if (operator === "divide") {
    result = parseInt(firstNumber, 10) / parseInt(secondNumber, 10);
  }
  return result;
}

function setOperator(action) {
  const displayedNum = dis.textContent,
    previousBtn = calc.dataset.previousBtn,
    firstNumber = calc.dataset.firstNumber,
    operator = calc.dataset.operator,
    secondValue = displayedNum;
  if (
    firstNumber &&
    operator &&
    previousBtn !== "operator" &&
    previousBtn !== "calculate"
  ) {
    const calcValue = calculate(firstNumber, secondValue, operator);
    dis.textContent = calcValue;
    calc.dataset.firstNumber = calcValue;
  } else {
    calc.dataset.firstNumber = displayedNum;
  }
  calc.dataset.previousBtn = "operator";
  calc.dataset.operator = action;
}

function paintNumber(keyContent) {
  const displayedNum = dis.textContent,
    previousBtn = calc.dataset.previousBtn;
  if (
    displayedNum === "0" ||
    previousBtn === "operator" ||
    previousBtn === "calculate"
  ) {
    dis.textContent = keyContent;
  } else {
    dis.textContent = displayedNum + keyContent;
  }
  calc.dataset.previousBtn = "number";
}

function handleClick(e) {
  if (e.target.matches("button")) {
    const btn = e.target;
    const action = btn.dataset.action;
    const btnContent = btn.textContent;
    if (!action) {
      paintNumber(btnContent);
    } else if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      setOperator(action);
    } else if (action === "clear") {
      clearCalc();
    } else if (action === "calculate") {
      operateCalc();
    }
  }
}

function init() {
  calc.addEventListener("click", handleClick);
}

init();
