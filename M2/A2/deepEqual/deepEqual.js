'use strict';
// Don't add or change anything above this comment.

/*
* Don't change the declaration of this function.
*/
function deepEqual(val1, val2) {
    // case 1 & 2: 2 primitives, strictly equal, or not strictly equal
    if (val1 === val2) {return true;}

    // case 3: 1 obj vs 1 primitive => not equal
    if (typeof val1 == )
}

function isObject(val1, val2) {
    // val 1 is object, return 1
    if (typeof val1 === "object" && typeof val2 !== "object") {return 1;}
    // val 2 is object, return 2
    if (typeof val1 !== "object" && typeof val2 === "object") {return 2;}
    // val 1 and val 2 are objects
    if (typeof val1 === "object" && typeof val2 === "object") {return 0;}
    // neither are objects
    if (typeof val1 !== "object" && typeof val2 !== "object") {return -1;}
    
}

// Don't add or change anything below this comment.
module.exports = deepEqual;