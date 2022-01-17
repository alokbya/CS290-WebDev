'use strict';
// Don't add or change anything above this comment.

// Name: Alaaddin Hiefield
// Class: CS290

/*
* Don't change the declaration of this function.
*/
const reducer1 = (previousValue, currentValue) => {
    //  Write your code here
    return (typeof previousValue == 'number' && previousValue != null ? previousValue : 0) + 
    (typeof currentValue == 'number' && currentValue != null ? currentValue : 0);
};

/*
* Don't change the declaration of this function.
*/
const reducer2 = (previousValue, currentValue) => {
    //  Write your code here
    if (typeof previousValue == 'number' && previousValue != null &&
        typeof currentValue == 'number' && currentValue != null) {return previousValue + currentValue;}
    throw new TypeError('Cannot reduce non-numerical values');
};


// Don't add or change anything below this comment.
module.exports = { reducer1, reducer2 };