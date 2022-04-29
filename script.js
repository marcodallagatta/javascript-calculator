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
	})}
const multiply = (...args) => {
	return args.reduce((total, current) => {
		if (typeof current === 'number') { total *= current; };
		return total;
	})}
const divide = (...args) => {
	return args.reduce((total, current) => {
		if (typeof current === 'number') { total /= current; };
		return total;
	})}

console.log(add(2,5,false,-2,'banana',true));
console.log(subtract(2,5,7));
console.log(multiply(2,5,10,true,-5));
console.log(divide(2,4,0.5));