let currentInput = "";
let previousInput = "";
let operator = "";
let shouldResetScreen = false;

const container = document.querySelector(".container");
const inputScreen = document.querySelector(".inputScreen");
const resultScreen = document.querySelector(".resultScreen");

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('digit')) {
        appendDigit(e.target.textContent);
    } else if (e.target.classList.contains('operator')) {
        chooseOperator(e.target.textContent);
    } else if (e.target.id === 'equal') {
        evaluate();
    } else if (e.target.id === 'backspace') {
        backspace();
    } else if (e.target.id === 'clear') {
        clear();
    }
    updateDisplay();
});

function appendDigit(digit) {
    if (shouldResetScreen) resetScreen();
    currentInput += digit;
}

function chooseOperator(op) {
    if (currentInput === "") return;
    if (previousInput !== "") evaluate();
    operator = op;
    previousInput = currentInput;
    currentInput = "";
}

function evaluate() {
    if (previousInput === "" || currentInput === "" || operator === "") return;
    currentInput = operate(operator, previousInput, currentInput);
    operator = "";
    previousInput = "";
    shouldResetScreen = true;
}

function operate(op, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (op) {
        case "+":
            return (num1 + num2).toString();
        case "-":
            return (num1 - num2).toString();
        case "*":
            return (num1 * num2).toString();
        case "/":
            return (num1 / num2).toString();
        default:
            return "ERROR";
    }
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
}

function clear() {
    currentInput = "";
    previousInput = "";
    operator = "";
    shouldResetScreen = false;
}

function resetScreen() {
    currentInput = "";
    shouldResetScreen = false;
}

function updateDisplay() {
    inputScreen.textContent = previousInput + operator + currentInput;
    resultScreen.textContent = currentInput || "0";

}
