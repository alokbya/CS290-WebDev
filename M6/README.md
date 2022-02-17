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

There are two different syntaxes to specify exports from a module
1. **Using the export keyword in the declaration**
    1. We can specify exports by using the `export` keyword before the declaration of the function, class, or variable
    Example: model.mjs
    * Consider the following module
    * Only the function `readEntity()` and the variable `COUNTRY` will be available to the outside module
    * The function `createEntity`, the class `Entity` and the variable `STATE` will be inaccessible to code using this module
    ``` JavaScript
    function createEntity(x) {
        return new Entity(x);
    }

    export function readEntity() {
        return new Entity("This be the entity");
    }

    class Entity {
        constructor(name) {
            this.name = name;
        }
    }

    const STATE = 'TX';

    export const COUNTRY = 'USA'; 
    ```
2. **Using an export statement**
    * We can specify the names of the exported features using an `export` statement
    * The following code exports the exact same features as previous
    ``` JavaScript
    function createEntity(...){ ...}

    function readEntity(...){ ... }

    class Entity { ... }

    const STATE = 'TX';

    const COUNTRY = 'USA';

    export { readEntity, COUNTRY }
    ```

* Using the `export` statement provides one additional functionality: 
    * We can provide __different names__ for the exported features
    * The following `export` statement exports the function `readEntity` with the name `selectEntity`
    * Code using the module can only access this function using the name `selectEntity`
    ``` JavaScript
    export { readEntity as selectEntity, COUNTRY }
    ```

## Using import to Import Named Features
* We import named features from a module using the `import` statement along with the name of the features we want to import and the URL of the file containing the module
* Import 2 features from a file in the same directory like so:
``` JavaScript
import { readEntity, COUNTRY } from './model.mjs'
```

### Details of Import Functionality
* We can select which features we want to import (we don't need to import everything)
* We can import all __exported__ features into an object using `*`
    * For example `import * as Model from './model.mjs'` imports all features exported by this module file
    * We can use these features, then, by accessing them from this object, e.g. `Model.readEntity`
* We can rename imported features
    * This might help prevent a __name clash__
    ``` JavaScript
    // renaming imports
    import { readEntity, COUNTRY as DEFAULT_COUNTRY } from './model.mjs'
    ```

## Default Export and Import
### Default Export
* We can tag **at most** one function or class as `export default`
* This can be done in addition to exporting any additional number of features using the named export syntax
``` JavaScript
function createEntity(...){ ...}

export default function readEntity(...){ ... }

class Entity { ... }

const STATE = 'TX';

export const COUNTRY = 'USA';
```

### Default Import
* We import hte default export of a module
``` JavaScript
import readEntity from './model.mjs'`
```
* Importing the **default** export does not require using the curly braces `{}`
* Importing named export requires that we **do** surround the feature with curly braces
* We can choose the name with which we import the feature
    * If we wanted to use the name `selectEntity` for the default export from `model.mjs`:
    ``` JavaScript
    import selectEntity from './model.mjs'`
    ```
* We can import **both default and named exports** from a module in a single statement
``` JavaScript
import readEntity, {COUNTRY} from './model.mjs'
```

## ES Modules and strict mode
* An additional feature ES modules provide is that the entire contents of an ES module are **automatically in strict mode** 
* So, we no longer need to add `use strict` at the start of an ES module to enforce strict mode

## CommonJS Modules in Node using exports and require()
* Originally, importing modules followed the `CommonJS Module System` convention

### Importing Functionality using the Function require
* With CommonJS modules, we import features using the `require()` build-in function
* This function takes one argument which identifies the module or the local file we want to import into our code
    * To import a module, we provide its name and the module is loaded from the `node_modules` directory
    * To import a local file, we provide the path to the file

### Example: require
* Here we are importing the module named `cities` which will be loaded from the `node_modules` directory
``` JavaScript
'use strict';

const cities = require('cities');
let myCity = cities.zip_lookup('78704');
console.log(myCity);
```
* If we wanted to import a file named `model.js` which was in the same directory as the file which was importing it, we would use `require(./model.js)`

### Exporting Functionality Using the exports Object
* The function `require()` reads the module/file passed to it as an argument
* It executes this module/file and returns the `exports` object from the file
### Example: Using exports
``` JavaScript
function createEntity(...){ ...}

exports.readEntity =  function(...){ ... }

class Entity { ... }

const STATE = 'TX';

exports.country = 'USA';
```
* Let's say we import this file using the following: `const MyModel = require('./model.js')`
* This will cause `model.js` to be read and evaluated
* The `exports` object from `model.js` will be returned and it will be assigned to the variable `myModel`
* `myModel` will have two properties
    * `country` with the value `USA`
    * `readEntity` whose value will be the corresponding function defined in `model.js`: `{ country: "USA", readEntity: [Function] }`

## Using ES Modules with Node
* When running our own code on Node, we can write ES modules and Node will support these modules
* We can import both ES and CommonJS modules using the ES style `import` keyword
* To support ES module functionality, Node requires us to do either: 
1. Use the extension `.mjs` for files which want to export modules using the ES syntax, and for files which want to import modules using ES syntax
2. Use the extension `.js` for such files **and** also add a top level property "type" with the value "module" in the file `package.json`

### Example: Using import for express
We now rewrite our "Hello World" Express example from Module 3 using ES Module syntax in the following file `server.mjs`. Since the file is defined with the extension `.mjs`, Node will treat it as an ES Module. So instead of importing the express module using `require()`, we use `import` to import this module.

``` JavaScript
'use strict';

import express from 'express';

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
```
What if we tried to import the express module using `require()`? For example, if we use the following statement in our `server.mjs` file, what will happen?
``` JavaScript
const express = require('express');
```
This will cause an error because Node treats a file with the `.mjs` extension as an ES module and the function `require()` is not available in an ES module.

# Express Middleware
### Overview
* To define routes, we used the `app.METHOD` API
* To serve static files, we added the following statement to our server programs:
    * `app.use(express.static('public'));`
* When our server program needed to process forms, we added the following statement to our program
    * `app.use(express.urlencoded({extended: true}));`
This exploration will touch on what the `app.use()` API does, and how we can leverage it to add functionality to our server programs.

## What is Middleware
* A middleware is simply a function that Express applies to an HTTP request in our Express programs
* We can think of an Express program as a pipeline of middleware functions which are applied to an HTTP request
* Most middleware functions take three arguments
    * A request object
    * A response object
    * A `next()` function
* Another form of middleware functions, called Error-handling middleware, takes four arguments
    * An error object
    * A request object
    * A response object
    * A `next()` function
* Each middleware function in an Express ap is associated with a path (or route)
    * A middleware function applies to an HTTP request only if that function's path matches the URL of the request
* The middleware functions with routes matching a request's URL are applied in the exact order of how they appear in the code of our Express app, **thus setting up a pipeline of functions**
* A middleware function can make changes to the request and response objects passed to it as arguments
* A middleware function can pass the request to the next middleware function in the pipeline by calling the `next()` function that is provided to it as an argument
* The pipeline of middleware functions terminates when:
    * Either all the middleware functions matching the request have been applied to the request
    * Or, a middleware function does not call `next()` and thus does not pass the request to the next function in the pipeline
        * Typically, this is done by a middleware function which sends back the HTTP response

## app.METHOD
* When defined with two arguments `request` and `response` the route handler does not invoke middleware
* When defined with the additional `next` parameter (or any third param), we have access to the `next()` function
    * This allows us to invoke middleware (additional functions/route-handlers)
```JavaScript
// route handler 1
app.get("/", (req, res, next) => {
    console.log("/ endpoint");
    next(); // no other handlers with this endpoint, res.send() not present, so error thrown
});
// route handler 2
app.get("/abcd", (req, res, next) => {
    console.log("handling and passing to next");
    next(); // res.send() not defined, OK because passing request down middleware pipeline
});
// route handler 3
app.get("/abcd", (req, res, next) => {
    console.log("receiving req from above method, and not calling next");
    res.send("sending back request");
})

// order of route handlers matters!
// if handler 3 was implemented before handler 2, response would send back to user and handler 2 would not "see" request
```
### Calling next() and Sending the response
* If handler returns response and then calls `next()`
    * The next middleware function is invoked, but no responses will be returned to client (will be ignored)

### Not Calling next() and Not Sending Response
* If handler does not return response or call next()
    * Pipeline terminates and no other handlers (middleware) will be invoked
    * No response gets back to the client which leads to a client-side timeout and report of error, e.g. network error

## app.use()
* We can also use `app.use()` to implement middleware
* This is how we served static files (from `/public` directory): `app.use(express.static('public'));`
1. We are passing the return value from `express.static()` to `app.use()`
    * `express.static()` is not the middleware function
    * `express.static()` **__returns the middleware function__** to `app.use()`
2. The call to `app.use()` does not specify an argument for the path for which this middleware is applied
    * `app.use()` has default value of `/` for path argument
        * middleware registered with the default value can be applied to every request by the server program
    * We can register a middleware function using `app.use()` to apply only to specific paths by passing the desired path as an argument to `app.use()`
3. **The middleware function will apply to request regardless of the HTTP method** as long as the **path matches the URL** of the request

### Example: Defining and Registering our Own Middleware Function
```JavaScript
// The statements to register this function must appear before any other middleware that matches this URL
// Otherwise, this logging middleware will never be invoked because the pipeline will terminate before its execution
app.use('/abcd', (req, res, next) => {
    console.log(`URL = ${req.originalUrl}, method = ${req.method}`)
    next();
});
```

### Example: Using Named Middleware Functions
```JavaScript
// We can pass this method to any route handler to execute this middleware
const logUrls = (reqm res, next) => {
    console.log(`URL = ${req.originalUrl}, method = ${req.method}`);
    next();
}
```

* A route handler can be passed multiple middleware functions 
    * Each will be added to the pipeline of middleware for that route

```JavaScript
// logUrls will execute and call next()
// then the anonymous function will execute and send response to client
app.use('/xyz', logUrls, (req, res, next) => {
    res.send("Hello from xyz");
});
```

## Error-handling Middleware
* If middleware takes __four__ arguments, it becomes error-handling middleware
* Error-handling middlware should be place **after** all the route handlers and other non-error handling middleware
* The four parameters
    1. `error` object
    2. `request` object
    3. `response` object
    4. `next` function
* If the error-handling middleware does not call `next()`, **it should return a response**, otherwise the client will hand waiting for the response and **eventually timeout**
* If we don't call `next()` in the error-handling middleware, we still must declare the function with **four** arguments (otherwise it'll be treated like regular ol' middleware)

# Express API for HTTP
## Express API
* Route handlers and middleware functions in Express receive `request` and `response` objects as parameters

## The Request Object
* The API for the `request` object (Express) can be found [here](https://expressjs.com/en/api.html#req)
*  `req.query`
    * This object contains the body of the request as name-value pairs
    * The server needs to use middleware to parse the body in order to have the body of the HTTP request available as `req.body`
    * Most web apps support request bodies in the following two formats:
        1. The body can be sent by submitting a form using HTTP `POST`
            * The value of the header `Content-Type` will be `application/x-www-form-urlencoded`
            * Parse with `app.use(express.urlencoded({extended: true}));`
        2. The body can be sent as JSON
            * The value of the header `Content-Type` will be `application/json`
            * Parse with `app.use(express.json());`
* `req.headers`
    * This object contains all the request headers as key-value pairs
    * `Keys` are the header names and `Values` are header values
    * We can log all request headers with:
    ```JavaScript
    for (const property in req.headers) {
        console.log(`${property}: ${req.headers[property]}`);
    }
    ```

## The Response Object
* The API for the `response` object (Express) can be found [here](https://expressjs.com/en/api.html#res)
* `res.set(name, value)`
    * We can set response headers using this method
    * We typically don't manually set any headers, except perhaps `Content-Type`
* `res.type(type)`
    * A convenient method to set the `Content-Type` header instead of using `res.set`
    * By default, Express sets content type in `response` to `text/html`
    * We can set appropriate MIME type by using this method
* `res.status(code)`
    * By default, Express sets status code to `200`
    * If we want to set a different value, we can use this method
    * `res.status` **returns the response object**
        * This means we can chain calls `res.status(400).json({error: 'Must provide an id'});`
* `res.send(body)`
    * Calling this method sens the response to the client with the response body set to the specified argument
    * If we are sending back JSON in body, we should use `res.json`
* `res.json`
    * This method sends back JSON to the client
    * Sets `Content-Type` header to `application-json`
    * Using this method, we can send any JSON value as the response body
        * **Including JSON arrays!**
