// TODO from second input of number, it doesn't go over one digit (impossible to write 20, it writes 2 then 0)

// * initialization
const previousNum = document.querySelector('.previousNum');
const currentNum = document.querySelector('.currentNum');
const clear = document.querySelector('.clear');
const plusminus = document.querySelector('.plusminus');
const back = document.querySelector('.back');
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
function calledOperatorTransl(calledOperator, a, b) {
	if (calledOperator === '+') {
		return Number(a) + Number(b);
	}
	if (calledOperator === '−' || calledOperator === '-') {
		return a - b;
	}
	if (calledOperator === '*') {
		return a * b;
	}
	if (calledOperator === '/') {
		return a / b;
	}
}

// returns to original state
function clearAll() {
	previousNum.innerText = '';
	currentNum.innerText = '';
	operandA = '';
	operandB = '';
	result = '';
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

// what happens when a number is clicked
const pressNum = (e) => {
	// ALWAYS ADDS TO operandA
	e.type === 'keydown' ? operandA += e.key : operandA += e.target.innerText;
	if (operandA.length < 10) currentNum.innerText = operandA;
	giveMeConsole('pressednum');
}
// the function that the event callers call to actually invoke the mathematical functions and manage the flow of the calculator
const operatorJob = (nextOp) => {
	if (!operandA || !operandB) { // if even one is empty
		operandB = operandA;
		if (result === '') {
			previousNum.innerText = operandB;
			operandB = operandA;
			operandA = '';
		} else {
			previousNum.innerText = result;
			console.log(result);
			operandB = result;
		}
		currentNum.innerHTML = "<span style='opacity:.5'>0</span>";
		giveMeConsole('!operandA || !operandB');
	} else { // if A and B are both filled
		result = calledOperatorTransl(calledOperator, operandB, operandA).toFixed(2);
		previousNum.innerText = result;
		currentNum.innerHTML = "<span style='opacity:.5'>0</span>";
		operandA = '';
		operandB = result;
		giveMeConsole('else of !operandA || !operandB');
	}
	if (nextOp === '=') {
		currentNum.innerText = result.substring(0,11);
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
clear.addEventListener('click', () => {
	clearAll();
})
equal.addEventListener('click', () => {
	clearOperators();
	operatorJob('=');
	previousNum.innerHTML = "<span style='opacity:0'>0</span>";
})
addition.addEventListener('click', e => {
	clearOperators();
	e.target.style.background = 'red';
	operatorJob('+');
})
subtraction.addEventListener('click', e => {
	clearOperators();
	e.target.style.background = 'red';
	operatorJob('−');
})
division.addEventListener('click', e => {
	clearOperators();
	e.target.style.background = 'red';
	operatorJob('/');
})
multiplication.addEventListener('click', e => {
	clearOperators();
	e.target.style.background = 'red';
	operatorJob('*');
})
back.addEventListener('click', () => {
	operandA = operandA.slice(0,-1);;
	currentNum.innerText = operandA;
})
decimal.addEventListener('click', () => {
	if (!operandA.includes('.')) operandA += '.';
	currentNum.innerText = operandA;
})
plusminus.addEventListener('click', () => {
	operandA = -operandA;
	currentNum.innerText = operandA;
})
// Keyboards use
document.addEventListener('keydown', (e) => {
	console.log(e);
	if (e.key >= 0 || e.key <= 9) pressNum(e);
	if (e.key === '.' && !operandA.includes('.')) decimal.click();
	if (e.key === 'Backspace') back.click();
	if (e.key === '+') addition.click();
	if (e.key === '-') subtraction.click();
	if (e.key === '/') division.click();
	if (e.key === '*') multiplication.click();
	if (e.key === 'Enter') equal.click();
});