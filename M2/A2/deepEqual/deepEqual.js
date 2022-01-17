'use strict';
// Don't add or change anything above this comment.

/*
* Don't change the declaration of this function.
*/
function deepEqual(val1, val2) {
    
    // if primitive, check strict equality
    if (val1 === val2)  {return true;}

    // check if both arguments are objects
    if (typeof val1 == "object" && val1 != null
    && typeof val2 == "object" && val2 != null) {

        // if both are arrays, verify they have the same values at same indices
        if (Array.isArray(val1) && Array.isArray(val2)) {
            for (let i = 0; i < val1.length; i++) {
                if (!deepEqual(val1[i], val2[i])) {return false;}
            }
            return true;
            // if one is array and the other is not, they are not deep equal
        } else if (Array.isArray(val1) && !Array.isArray(val2) ||
                    !Array.isArray(val1) && Array.isArray(val2)) {
            return false;
        } else {
            // if both are objects check if they have the same properties
            const val1K = Object.keys(val1);
            const val2K = Object.keys(val2);

            // if different lengths, return false
            if (val1K.length !== val2K.length) {return false;}

            // check for same keys, and if same, check values
            for (let i = 0; i < val1K.length; i++) {
                if (!val2K.includes(val1K[i])) {return false;}
                if (!deepEqual(val2[val1K[i]], val1[val1K[i]])) {return false;}
            }
            return true;
        }
    } 
    return false;   
}
// Don't add or change anything below this comment.
module.exports = deepEqual;