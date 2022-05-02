// TODO from second input of number, it doesn't go over one digit (impossible to write 20, it writes 2 then 0)

// * initialization
const previousNum = document.querySelector('.previousNum');
const currentNum = document.querySelector('.currentNum');
const clear = document.querySelector('.clear');
const plusminus = document.querySelector('.plusminus');
const percentage = document.querySelector('.percentage');
const division = document.querySelector('.division');
const multiplication = document.querySelector('.multiplication');
const subtraction = document.querySelector('.subtraction');
const addition = document.querySelector('.addition');
const decimal = document.querySelector('.decimal');
const equal = document.querySelector('.equal');
const allNumbers = document.querySelectorAll('.number');
const allOperators = document.querySelectorAll('.operator');
let operandA = '';
let operandB = '';
let result = '';
let calledOperator = '';

// * mathematical functions
function add(a, b) {
	return Number(a) + Number(b);
}
function subtract(a, b) {
	return a - b;
}
function multiply(a, b) {
	return a * b;
}
function divide(a, b) {
	return a / b;
}
// returns to original state
const clearAll = () => {
	previousNum.innerText = '';
	currentNum.innerText = '';
	operandA = '';
	operandB = '';
	calledOperator = '';
	clearOperators();
	console.clear();
}
// clears background color of operators
const clearOperators = () => {
	allOperators.forEach((op) => {
		op.style.background = '';
	});
};
function calledOperatorTransl(calledOperator) {
	console.log(`calledOperator is\n${calledOperator}`);
	if (calledOperator === '+') return add;
	if (calledOperator === '−') return subtract;
	if (calledOperator === '*') return multiply;
	if (calledOperator === '/') return divide;
}
// what happens when a number is clicked
const pressNum = (e) => {
	operandA += e.target.innerText; // ALWAYS ADDS TO operandA
	currentNum.innerText = operandA;
	giveMeConsole('pressednum');
}
// the function that the event callers call to actually invoke the mathematical functions and manage the flow of the calculator
const operatorJob = (e, operation, nextOp) => {
	if (!operandA || !operandB) { // if even one is empty
		operandB = operandA;
		if (result === '') {
			previousNum.innerText = operandB;
			operandB = operandA;
			operandA = '';
		} else {
			previousNum.innerText = result;
			operandB = result;
		}
		currentNum.innerHTML = "<span style='opacity:.5'>0</span>";
		result = '';
		giveMeConsole('!operandA || !operandB');
	} else { // if A and B are both filled
		result = operation(operandB, operandA);
		previousNum.innerText = result;
		currentNum.innerHTML = "<span style='opacity:.5'>0</span>";
		operandA = '';
		operandB = result;
		giveMeConsole('else of !operandA || !operandB');
	}
	if (previousNum.innerText.match(/\D/)) {
		previousNum.innerText = previousNum.innerText.slice(0,-2);
	}
	previousNum.innerText += ` ${nextOp}`;
	calledOperator = nextOp;
}

function giveMeConsole(msg = '') {
	let hours = (new Date()).getHours();
	let minutes = (new Date()).getMinutes();
	let seconds = (new Date()).getSeconds();
	let output = `${hours}:${minutes}:${seconds}\n`;
	if (msg) {output += `${msg}\n`};
	output += `operandA: ${operandA}\noperandB: ${operandB}\nresult: ${result}\ncalledOperator: ${calledOperator}`;
	console.log(output);
}

// * Event Listeners
allNumbers.forEach( e => {
	e.addEventListener('click', e => {
		pressNum(e);
	})
})
clear.addEventListener('click', e => {
	clearAll();
})
addition.addEventListener('click', e => {
	clearOperators();
	e.target.style.background = 'red';
	operatorJob(e, add, '+');
})
subtraction.addEventListener('click', e => {
	clearOperators();
	e.target.style.background = 'red';
	operatorJob(e, subtract, '−');
})