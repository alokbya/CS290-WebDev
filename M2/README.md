# JavaScript - Variables, Data Types and Simple Functions

## Running JavaScript

### Browser Console
* Open browser and navigate to dev tools
* Open console in browser
* Enter `console.log("hello, world")`
* Console should read `$ hello, world`

### Node.js
* Install Node (v14 for this class)
* Create file `hello_world.js`
    * File should contain single line `console.log("hello, world");`
* Open command prompt/terminal/PowerShell
* Run `node hello_world.js` making sure to include the correct path to the JS file
* Console should read `$ hello, world`

### Node REPL
* Type `node` in prompt/terminal/PowerShell
* REPL should start
* Enter code `console.log("hello, world");`
* `hello, world` should immediately appear below

### Loading file in Node REPL
* Start REPL by using `node` command
* Enter `.load hello_world.js` to load previously created file
* Line of code from file should appear in REPL, and then run the code
* `hello, world` should display below the code within the REPL

## 5 Golden Rules 
### Rules to follow to avoid the bad parts of JavaScript
1. Declare variables with `let` or `const`, not `var`
2. Use strict mode
3. Know your types and avoid automatic type conversion
4. Understand prototypes, but use modern syntax for classes, constructors, and methods
5. Don't use `this` outside constructors or methods

### Other good guidelines
* Only use booleans `true` and `false` for conditions

## Variable declarations
If defining variable with `const` we are assuming the variable will never change. Once defined, a `const` variable cannot be changed again: `Uncaught TypeError: Assignment to constant variable`.
If variable might change types, use `let`.
`const` and `let` use block scope, whereas `var` or not using a declarative word for the variable (`x = 10`) will give the variable global scope. This can be mitigated with the use of `use strict` in the JS file.

Including the `'use script';` in our JS program (i.e. at top of JS file), will disallow undefined variable types.
```
// this needs to be the first non-comment line in the JS file
'use strict';

// not allowed
bar = 10;

// allowed
let bar = 10;
```
You can use strict mode in the REPL by starting node with `node --use-strict`.
If you do not initialize a variable it defaults to `undefined`. `let x; // x is 'undefined'`

## Types
* number
* boolean (true, false)
* string
* symbol
* special values: `undefined` and `null`
* object

Non-object types are collectively called _primitive types_.

## Declaring functions
``` javascript
function myFunction(arg1, arg2)
{
    // body of the function
    return "My args are " + arg1 + " " + arg2;
}
```
* Don't specify return type
* Don't specify arg types
* A function without a return statement returns `undefined` (special value)

## Naming identifiers (conventions)
Names of variables and functions should start with a letter and should contain letters and digits. JavaScript also allows `_` and `$` in identifier names. General convention is to use `camelCase`, instead of `snake_case`, so we **will not** use `_` in identifiers. Additionally `$` is conventionally used in libraries and tools, so we will not use that either.

## Numbers
JavaScript has one number type which is double-precision floating-point numbers. For some arithmetic operations, JavaScript automatically converts strings to numbers. Instead of relying on this conversion, we should follow _**Golden rule 3**: Know your types and avoid automatic type conversion_.
We should use functions provided by JavaScript to explicitly do the conversion:
* `parseFloat()` and `parseInt()` to convert a string to a number
* `toString()` to convert a number to a string
* `Math.trunc()` to discard the fractional part of the number
* `Math.round()` to round _up_ the number to the nearest integer

There is also a special number value `NaN` which is a constant denoting that the expected number value is _not a number_
* `0/0` evaluates to `NaN`
* parsing a string that doesn't contain a number (`parseInt('')` returns `NaN`)

# JavaScript - Objects, Arrays and JSON
A JavaScript object is a set of name-value pairs. The names of these pairs are also called properties of the object. We can create (or add), read, update and delete properties of the object.

* Create and Update
    * Adding or updating a property is done using the `.` operator on the variable in an assignment statement.
        * For example, `s1.price = 10` will set the value of the `price` property of the object `s1` to `10`. If the property `price` already existed, its value will be updated. If the property price didn't exist, it will be added.
* Read
    * A property is read using a `.` operator as well.
        * For example, `s1.price` will read the `price` property of the object `s1`
    * Another way to read a property of an object is using the bracket operator `[]`
        * For example, `s1["price"]` will read the `price` property of the object `s1`
    * Reading a non-existent property of an object returns the value `undefined`.
* Delete
    * A property is deleted using the `delete` operator.

A `const` variable of object type cannot be reassigned to another value. However, we can modify the properties of the object.

## Get names of all properties of an object
Use `Object.keys()` and pass in the object to get an array of its key names. `console.log(Object.keys(s1)) // ['company', 'symbol', 'price']`.

## Arrays
In JavaScript, arrays are objects whose keys (property names) are the strings '0', '1', '2', etc. JavaScript requires that the properties of an object must be of string data type. This is why the property names of an array are string values rather than the numbers 0, 1, 2, etc.

* We can access array indices using a zero based index as a string or integer `[0], ['0']`
* The values of an array can be of any JavaScript type, even an object
* Accessing the element at in index where there is no element returns the value `undefined`
* `Array.isArray()` can be used to determine if the value of a variable is an array or not
* A `const` variable of array type cannot be reassigned to another value, but its elements can be modified (i.e. changed, added, removed)
* `myArray.length` returns number of elements in array `myArray`
* `myArray.push(element)` appends `element` to `myArray`
* `myArray.pop()` removes the last element of `myArray`
* `myArray.includes(element)` return `true` if `element` exists within `myArray`, and `false` otherwise

## JSON
* `JSON.stringify(obj)` converts an object or value (`obj`) to a JSON string
* `JSON.parse(strObj)` converts a JSON string `strObj` into a JavaScript object or value

* The names of properties of a string in JSON format are delimited by double quotes
* The string values of a string JSON object are delimited by double quotes
* Array elements of a string JSON object are seperated by commas

## `typeof` Operator

`typeof` is an operator to determine the type of a value
``` javascript
> typeof 42
 'number'
 > typeof '42'
  'string'
```

## Booleans
* `0`, `NaN`, `null`, `undefined` and empty string `''` are all converted to `false`
* Use `true` and `false` explicitly, instead

## Strict equality operators
The 2 strict equality operators are
* `===` to check whether the 2 operands are strictly equal
* `!==` to check whether the 2 operands are not strictly equal

With strict equality operators
* Operands of different type are never equal
    * `42 === '42' // false`
* Booleans are equal when their values are the same
* Number operands are equal when their values are equal
    * `42 === 42.0 // true`
    * `42 === 42.1 // false`
    * `NaN` is not equal to `NaN`
        * Use `Number.isNaN(x)` to determine if variable has the value `NaN`
* String operands are equal when their values are equal
* A `null` value is equal to another `null` value and an `undefined` is equal to an `undefined` value, but `null` and `undefined` are not equal to each other
* Objects are equal only when both operands refer to the **same** object
    * Arrays are objects, so this applies to arrays as well

## Loose equality operators
The loose equality operators are
* `==` to check whether 2 operands are loosely equal
* `!=` to check whether 2 operands are not loosely equal

These operators can compare operands of different type by automatically converting them to a common type.
For example, `42 == 42` evaluates to `true`. `[] == ''` also evaluates to `true`.

## Comparison testing
* `<`, `<=`, `>` and `>=` should only be used with **numbers** _or_ **strings**, not both
* If needed, convert the operand explicitly

# JavaScript - Functions and Functional Programming
Functions in JavaScript are __"first-class"__ values, meaning we can
* Assign functions to variables
* Define functions that receive other functions as arguments
* Define functions that return functions

