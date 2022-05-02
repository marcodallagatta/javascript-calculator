equal.addEventListener('click', e => {
	if (result) {
		operatorJob(e, calledOperator);
		calledOperator = '';
		clearOperators();
	}
})

division.addEventListener('click', e => {
	operatorJob(e, divide);
})
multiplication.addEventListener('click', e => {
	operatorJob(e, multiply);
})
// TODO
percentage.addEventListener('click', e => {
	console.log('ciaone!');
})
decimal.addEventListener('click', e => {
	console.log('ciao');
})
// ! in alcuni casi diventa zero
plusminus.addEventListener('click', () => {
	operandA = -operandA;
	display.innerText = operandA;
	console.log(`operandA: ${operandA}, operandB: ${operandB}`);
})