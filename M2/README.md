# JavaScript

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

