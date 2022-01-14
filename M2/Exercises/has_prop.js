'use strict';
// simple function to determine if obj contains property (prop)

let hasProp = (obj, prop) => {
    return Object.keys(obj).includes(prop);
}
console.log(hasProp({a: 1, b: 2}, 'a'));