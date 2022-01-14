'use strict';
// function to imitate Array.filter() functionality

// function to 'filter' out odd values of an array
let myFilter = (p, arrayIn) => {
    const arrayOut = [];
    for (const element of arrayIn) {
        if(p(element)) arrayOut.push(element);
    }
    return arrayOut;
}

let arr1 = [2, 3, 4, 5, 6, 7, 8];

// returns true if val is an even number
let filterFunction = (val) => {
    return val % 2 === 0;
}

console.log(myFilter(filterFunction, arr1));