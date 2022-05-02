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
}
// clears background color of operators
const clearOperators = () => {
	allOperators.forEach((op) => {
		op.style.background = '';
	});
};
// what happens when a number is clicked
const pressNum = (e) => {
	operandA += Number(e.target.innerText);
	currentNum.innerText = operandA;
	// if (operandA && operandB && !result) {
	// 	operatorJob(e, calledOperator);
	// 	giveMeConsole('calling if in pressednum');
	// } else {
	// 	giveMeConsole('pressed num without if in pressednum');
	// }
}
// the function that the event callers call to actually invoke the mathematical functions and manage the flow of the calculator
const operatorJob = (e, operation) => {
	clearOperators();
	e.target.style.background = 'red';
	if (!result) {
		if (!operandA || !operandB ) { // if either one is empty
			operandB = operandA;
			operandA = '';
			giveMeConsole('empty inputs');
		} else { // if A and B are both filled
			result = operation(operandB, operandA);
			previousNum.innerText = operandA;
			operandA = '';
			operandB = '';
			giveMeConsole('present inputs');
		}
	}
	if (previousNum.innerText.match(/\D/)) {
		previousNum.innerText = previousNum.innerText.slice(0,-2);
	}
	previousNum.innerText += ` ${calledOperator}`
}

function giveMeConsole(msg = '') {
	let output;
	if (msg) {output = msg + '\n';}
	output += `operandA: ${operandA}
		\ninputB: ${operandB}
		\nresult: ${result}
		\ncalledOperation: ${calledOperator}`;
	console.log(output);
}

// * Event Listeners
equal.addEventListener('click', e => {
	if (calledOperator) {
		operatorJob(e, calledOperator);
		calledOperator = '';
		clearOperators();
	}
})
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










// division.addEventListener('click', e => {
// 	operatorJob(e, divide);
// })
// multiplication.addEventListener('click', e => {
// 	operatorJob(e, multiply);
// })
// // TODO
// percentage.addEventListener('click', e => {
// 	console.log('ciaone!');
// })
// decimal.addEventListener('click', e => {
// 	console.log('ciao');
// })
// // ! in alcuni casi diventa zero
// plusminus.addEventListener('click', () => {
// 	operandA = -operandA;
// 	display.innerText = operandA;
// 	console.log(`operandA: ${operandA}, operandB: ${operandB}`);
// })