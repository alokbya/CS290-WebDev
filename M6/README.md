# More JavaScript and Express
* Motivation for async programming techniques
* Writing async code
* JavaScript modules
* Middleware in Express

# Asynchronous Programming: Motivation
* By default, JS code runs synchronously in a single thread
    * Synchronous: Each function runs to completion before any other code is executed in the program
        * i.e. when one function `X` calls another function `Y`, nothing happens in `X` until the function `Y` completes is execution and returns
    * Single Threaded: Only one line of code can be executed at any given time
* In JS, each line of code can potentially block the entire program
* Asynchronous functions are non-blocking
* As soon as an asynchronous function is called, the next line of code in the calling function can be executed
    * For example, consider a function `X` calls an asynchronous function `Z`. As soon as `Z` is called, the next line in `X` can be executed and `X` does not have to wait for `Z` to complete
    * The asynchronous function `Z` is executed by the JavaScript engine separate from the main thread executing the function `X`

# Writing Asynchronous Code
* Promises
* Async/Await

## Promises
* Promises were introduced to make it easier to write async code
* A `promise` is a JS object that represents the result of an async operation whose results __may not be available as yet__
    * The async function returns a `promise` object
    * The initial state of this `promise` is `pending`
        * It does not yet have a result
    * When the async function successfully finishes, it fills in the `promise` object with the result
        * It sets the `promise` object state to `fulfilled`
            * The `promise` is now said to have been **fulfilled**
            * The `promise` is said to have __**resolved**__ to this result value
        * When the async function fails due to an error, it will not produce a value
        * In this case the state of the `promise` is set to `rejected`
            * The `promise` is said to have been **__rejected__**
        * Once the state of the `promise` object is set to either `fulfilled` or `rejected`, it is said to have been **settled**

## Obtaining Promise Results
* When we call a function which returns a promise, we provide functions that will be executed when the promise settles
    * Using the `then()` method on the promise, we provide a function that will be called when the promise returns a result
        * If the function provided to `then()` returns another promise, we can process its results by calling the `then()` method again
    * Using the `catch()` method on the promise, we provide a function that will be called when the promise fails, i.e. it is rejected

* Modern client-side JS code typically uses the Fetch API instead of using `XMLHttpRequest`
* With the Fetch API, we make an HTTP request by calling the function `fetch()`
    * The function `fetch()` has one required parameter identifying the resource for which an HTTP request would be sent
    * By default, `fetch()` sends a request with the GET method
    * An additional parameter can be added to configure the request
        * We can use this additional parameter to send a request with:
            * A different HTTP method, such as `POST`
            * (set) request headers
            * Send a request body
    * `fetch()` returns a `promise`
        * If the request is successful, i.e., a response is received, the promise is fulfilled and the value of the promise is resolved to the HTTP response
        * If the HTTP request fails, e.g., due to network issues or a malformed URL, then the promise is rejected and an error is returned
        ``` JavaScript
        function getData(url) {
            return fetch(url)
                .then(response => response.text())      // line 1
                .then(data => addData(data))            // line 2
                .catch(error => console.error(error));  // line 3
        }
        ```
        * In line 1 of the function we call `fetch()` which returns a promise
        * In line 2 we call the `then()` method on this returned promise
            * We pass one parameter to the method `then()`
            * This parameter is the function that will be invoked when the promise is fulfilled
            * The fulfilled promise will resolve to a response object
            * Our function will receive this response object as its argument
            * Our function calls the method `text()` on the response object
            * The method `response.text()` returns another promise
        * In line 3 we call the `then()` method on the promise returned by `response.text()`
            * The fulfilled promise will resolve to a text object (`response.text()`)
            * Our function will receive this text object as its argument and will call the function `addData()` passing it the text object
            * `addData()` which is a synchronous function adds this text to the DOM tree
        * In line 4 we call the `catch()` method
            * If either of the two promises, i.e., the one returned by `fetch()` or the one returned by `response.text()` is rejected, the code jumps to catch the function we have passed to the `catch()` method will be called
            * This function receives the error object as an argument and just logs the error

## await/async
### await
* the `await` keyword takes a promise and waits for the promise to be settled
* If the promise is fulfilled, the resolved value is returned
* If the promise is rejected, an exception is thrown with the rejection value of the promise

### await must be used in an async function, or a top-level module
* Inside an async function, the __next__ line will not be run until the awaited function has resolved the returned promise
* Only then will the execution continue
* This will still appear asynchronous because when the __async__ function is called, it immediately returns and the next line is executed

``` JavaScript
async function foo() {                  // await keyword can exist in this ASYNC function
    
    try{
        var x = await getX();           // execution within this function will not progress until x has received a value
        var y = await getY();           // once x has received a value, this line will execute
        console.log("fetched data");
    } catch (error) {
        console.error(error);           // this catch block will catch exceptions thrown during the awaited calls
    }
    
}

foo();
console.log("fetching data");

// terminal will read:
// "fetching data"
// "fetched data"
```
## Return Values from async Functions
* An async function is executed asynchronously which means that the call to the async function **returns immediatly**
* An async function always returns a promise
* If the calling function wants to use the value returned by the async function there are 2 options:
    * Call the `then()` method on the returned promise to get the result
    * use the `await` keyword when calling the function and wait for the promise to settle
        * Since the `await` keyword can only be used in an async function, this means that we will need to add the async keyword to the calling function as well!


[Promises in 10 minutes](https://www.youtube.com/watch?v=DHvZLI7Db8E)
[async and await](https://www.youtube.com/watch?v=V_Kr9OSfDeU)

# Modules in JavaScript
## ES Modules using Export and Import Keywords
Modules are known as:
* ES Modules
* ES6 Modules
* ECMA Modules

ES Modules are defined in files which have either the `.js` extension or the `.mjs` extension.
* The standard recommends the `.mjs` extension

## Using export to Export Named Features
* Functions, classes, or variables must be explicitly exported using the keyword `export` to be available outside of the module
* Such exports are called **named exports**
* **Everything else** is inaccessible to code outside the module
* Only features defined at the top level of the module can be exported
* Local functions, classes or variables cannot be exported
* There are two different syntaxes to specify exports from a module
    * Using the export keyword in the declaration
        * We can specify exports by using the `export` keyword before the declaration of the function, class, or variable 