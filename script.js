const add = (...args) => {
	return args.reduce((total, current) => {
		// using typeof instead of isNaN to avoid boolean converting to numbers
		if (typeof current === 'number') { total += current };
		return total;
	})
}
const subtract = (...args) => {
	return args.reduce((total, current) => {
		if (typeof current === 'number') { total -= current; };
		return total;
	})
}
const multiply = (...args) => {
	return args.reduce((total, current) => {
		if (typeof current === 'number') { total *= current; };
		return total;
	})
}
const divide = (...args) => {
	return args.reduce((total, current) => {
		if (typeof current === 'number') { total /= current; };
		return total;
	})
}

const operate = (operation, ...args) => {
	return operation(...args);
}


console.log(operate(add,		2, 5, 2));
console.log(operate(subtract,	2, 5, 7));
console.log(operate(multiply,	2, 5, 10));
console.log(operate(divide,		2, 4, 0.5));