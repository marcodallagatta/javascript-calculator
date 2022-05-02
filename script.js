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
	if (operandA && operandB) {
		operatorJob(e, calledOperatorTransl(calledOperator));
		giveMeConsole('pressednum with all variables');
	} else {
		// giveMeConsole('pressed num without if in pressednum');
	}
}
// the function that the event callers call to actually invoke the mathematical functions and manage the flow of the calculator
const operatorJob = (e, operation) => {
	// clearOperators();
	// e.target.style.background = 'red';
	if (!operandA || !operandB) { // if either one is empty
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
		// previousNum.innerText = operandA;
		operandA = '';
		operandB = result;
		giveMeConsole('else of !operandA || !operandB');
	}
	if (previousNum.innerText.match(/\D/)) {
		previousNum.innerText = previousNum.innerText.slice(0,-2);
	}
	previousNum.innerText += ` ${calledOperator}`
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
	calledOperator = '+';
	operatorJob(e, add);
})
subtraction.addEventListener('click', e => {
	calledOperator = '−';
	operatorJob(e, subtract);
})