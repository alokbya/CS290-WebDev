'use strict';

let o1 = {name: "alaa", age: 28};
let o2 = {name: "alaa", age: 28};
let o3 = {name: "adam", age: 23};
let o4 = {age: 28, name: "alaa"};


// determine if two objects are deep equal
function de(val1, val2) {

    // if primitive, check strict equality
    if (val1 === val2)  {return true;}

    // check if both arguments are objects
    if (typeof val1 == "object" && val1 != null
    && typeof val2 == "object && val2 != null") {

        // if both are arrays, verify they have the same values at same indices
        if (Array.isArray(val1) && Array.isArray(val2)) {
            // if both are arrays
            for (let i = 0; i < val1.length; i++) {
                if (!de(val1, val2)) {return false;}                    // if element i in val1 is not deep equal to element i in val2, false
            }
            return true;
        } else {
            // if both are objects check if they have the same properties
            const val1K = Object.keys(val1);
            const val2K = Object.keys(val2);

            // if different lengths, return false
            if (val1K.length !== val2K.length) {return false;}

            // check for same keys, and if same, check values
            for (let i = 0; i < val1K.length; i++) {
                if (!val2K.includes(val1K[i])) {return false;}
                if (!val2[val1K[i]] !== val1K[i]) {return false;}
            }
            return true;
        }
    } 
    return false;    
}

