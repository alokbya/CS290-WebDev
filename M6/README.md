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