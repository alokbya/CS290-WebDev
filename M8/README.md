# HTTP, Cookies, Sessions, REST API
# HTTP Methods and Headers
## HTTP Request Methods
### GET
* When we type a URL in a browser, the browser sends an HTTP GET request to the server
* GET requests should be used to read data from the server
* The GET method is analogous to the Read/Retrieve CRUD operation
* With a GET request **data is passed to the server via the URL path and the query string**
* It is not recommended to send a body with a GET request

### POST
* The POST method sends data to the server in the body of the request
* Many times POST is used when submitting forms
* A prescribed use of the POST method is for creating a new resource (a new document in a database)
* This means if an HTTP request being sent to the server to perform a create operation then the POST method should be used
* Th POST method corresponds to the Create CRUD operation

### PUT
* PUT is used for update operations
* A prescribed use of the PUT method si for HTTP requests in which a resource is completely replaced by the data in the HTTP request with the PUT method
* If we wanted to send an HTTP request to replace all the properties of a document to new values, the nit would be appropriate to use the PUT method
* PUT corresponds to the Update CRUD operation
* Data is send in the body of the request for HTTP requests that use the PUT method

### PATCH
* PATCH is used for **partial** updates of a resource, unlike PUT which is for a complete replacement of the source
* PATCH corresponds to the Update operation among the CRUD operations
* Support for PATCH is not universal and many web servers support partial updates using the PUT method

### DELETE
* DELETE is used to delete a resource
* DELETE corresponds to the Delete CRUD operation

### HEAD
* HEAD is not related to CRUD operations
* HEAD is similar to GET in that it requests a resource for retrieval
* The response to a request using the HEAD method does not include the resource, but only includes the status line and the HTTP response headers
* This is used by clients, such as browsers, to determine if the resource in their cache is still fresh or if they should issue a GET request for the resource

## HTTP Methods and Express Routes
**Endpoint** is used for the combination of a URL and HTTP method. Two requests that have the same URL but different HTTP methods are considered two different endpoints. 
* Express API provides `app.put`, `app.patch`, `app.delete`, as well as `app.get`, and `app.post` for the CRUD operations
* We can define multiple route handlers based on the HTTP method by adding routes that have the same value of the argument `path` but use a different HTTP method
* Express also provides a function `app.all` which handles requests based on the `path` arguments regardless of the HTTP method

Here is an example of a controller that uses HTTP methods instead of specific routes to manage CRUD operations.
``` JavaScript
app.post('/movies', (req, res) => {
  // Code for create operation
}
	
app.get('/movies', (req, res) => {
  // Code for read/retrieve operation
}
	
app.put('/movies', (req, res) => {
  // Code for update operation
}
	
app.delete('/movies', (req, res) => {
  // Code for delete operation
}
```

## HTTP Headers
[HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) are used by the client and server to pass additional information about the request or response.
* The headers consist of name-value pairs separated by a `:`
* The header names are case insensitive
* Some headers only used in requests
* Some headers only used in responses
* Some headers used in both requests and responses

## MIME Types
When an HTTP request contains a body, the server needs to know how to interpret the bytes sent by the client. Similarly, when an HTTP response contains body, the client needs to know how to interpret these bytes sent by the server. **This information is conveyed by using values from a standard called [Multipurpose Internet Mail Extensions or MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)**. MIME types are also called media types or Internet Media Types.
* Typical structure of a MIME type is the form `type/subtype`
* The type indicates a general category
  * Example types include `text` or `application` and `image`
* The subtype indicates the exact type of data within that category
  * For the `text` type, subtypes include:
    * `css` for CSS
    * `csv` for comma separated values
    * `javascript` for JS code
    * `html` for HTML
    * `plain` for plain text
  * For the `image` type
    * `jpeg`
    * `png`
  * For the `application` type
    * `json`
    * `pdf`
    * `xml`
    * `zip`

## Headers with MIME Types
### Accept Header
* `Accept` header is used in HTTP requests by a client to tell the server about the types of data the client can handle
* In general the value of `Accept` header is one or more MIME types separated by commas
  * The value `*/*` means the client can handle all types of data from the server
  * The value `type/*` means that the client can accept all subtypes of the `type`
    * For example: `text/*` means that the client can accept all subtypes of the `text` type
  * If the client is capable of handling multiple specific MIME types, it can tell the server about this by sending these MIME types in the `Accept` header separated by commas
    * For example, `Accept: application/json, text/html` indicates the client can handle HTML and JSON documents
  
### Content Type Header
* The `Content-type` header can be used in both HTTP requests and HTTP responses
* HTTP requests that contain a body, e.g. a POST or PUT request include this header to tell the server the MIME type of the body
* HTTP responses with a body include the `Content-type` header to tell the client the MIME type of the body in the response

### Content-Type `application/x-www-form-urlencoded`
* The most common MIME type for POST bodies is `application/x-www-form-urlencoded` which is used when we submit a form with its `action` set to `POST`
* This is also referred to as HTML form encoding or URL form encoding
* In this MIME type, the form data is encoded as key-value pairs
* The key and the value in a pair are separated by a `=`
  * Different key-value pairs are separated by `&`
* Any non-alphanumeric characters in keys or in values are **URL encoded**

## HTTP Status Codes
The first line of an HTTP response is the status line with the format `HTTP/Version Status-code Reason-phrase`. The status code indicates whether a specific HTTP request completed successfully or if it encountered an error or if some further action needs to be taken.
Status codes are a 3 digit number with the first digit defining the **category** of the response

### 100-188: Informational responses
* Status codes in this category indicate that the request was received and the server is continuing to process it
* You are unlikely to encounter informational response codes

### 200-299: Successful responses
* Status codes in this category indicate that the request was successfully processed by the server
* If a CRUD operation was successfully executed to process the request, the response code should be in the 200s
Some examples include...

|Code |Reason-Phrase |Notes |
|-----|--------------|------|
|200  |OK            |The request succeeded and the response body has the needed information.|
|201|Created|The request succeeded and a new resource was created. Typically the URL of the newly created resource is included in response header `Content-location`. Common with `post`.|
|204|No content|The request succeeded, but there is no content to return in the body. Common with `delete` or `put`.|

### 300-399
* The server sends back status codes in this category when the client needs to take additional action to complete the request
* These codes are mostly used for URL redirection
* For example, now most websites are configured to redirect requests that use `http` as the scheme in the URL to instead use a URL with `https` as the scheme.
  * The URL to use is in the response header `Location`
  * By default, browsers automatically follow the redirect and send a request for the `https`
Some examples include...


|Code|Reason-Phrase |Notes |
|----|--------------|------|
|301 |Moved Permanently|The resource has permanently moved. Follow the URI in the location header and in future send requests to that URI.|
|302|Found|The resource has temporarily moved. Follow the URI in the location header, but do not change the request URI in future requests|
|303|See Other|Server is redirecting to another resource whose URI is in the location header. For example, a resource was created and its URI is in the location header.|
|304|Not Modified|The resource has not modified. Essentially the server is telling the client to use the cached copy of the resource.|

### Example: Redirection
* Open your browser and “Dev Tools,” and go to the “Network” tab in “Dev Tools”
* Enter the URL http://oregonstate.edu/ in the browser.
* You will see a lot of network traffic logged in the “Network” tab.
* Towards the top you should see a response with status code 301 Moved Permanently.
* The Location header in this response has the value https://oregonstate.edu/.
* The URL in the browser is now https://oregonstate.edu/ because the browser automatically sent a request for this URL after receiving the response with 301 status code.

### 400-499: Client errors
* The server program sends back a response in this category when the request was not valid and the server program could not fulfill it
Some examples include...

|Code|Reason-Phrase|Notes|
|-|-|-|
|400|Bad Request|The server cannot process the request because of a client error. For example, when a request is missing some required parameter.|
|401|Unauthorized|The requested resource requires authentication, but the client is not authenticated. For example, the server does not know who is making the request.|
|403|Forbidden|The client is authenticated but is not authorized to access the requested resource. The server knows who is making the request, but the requestor does not have privileges to carry out the requested operation on the resource.|
|404|Not Found|The requested resource is not found on the server.|

### 500-599: Server errors
* When codes in this category are sent by a server when the request seemed valid, but the server fails to successfully process it.
* We should typically log such error responses in our server programs so that we can investigate them and fix the issues that caused the error
Some examples include...

|Code|Reason-Phrase|Notes|
|-|-|-|
|500|Internal Server Error|This error code is typically a result of a coding error. For example, if our code throws an exception, and we don't catch and handle it correctly, ti can get reported as a `500` status code by the Express server.|
|502|Bad Gateway|This error code is typically sent by the web server when it receives an invalid response from some other server, or a request it sent to another server times out. Misconfiguration can sometimes cause these errors.|
|503|Service Unavailable|This error code is sent by the server when it is not capable of handling a request. This might happen because the server is overloaded or it is down for maintenance.|

# HTTP Cookies & HTTP Sessions
Websites overcome the statelessness of the HTTP protocol by using HTTP cookies and HTTP sessions. This allows web apps to link different requests as coming from the same user.

## HTTP Cookies
* Also called **browser cookie, web cookie, or just cookie**
* Small piece of data created by a web server and sent to the user's web browser for storage
* The browser can send this HTTP cookie in later requests to this web server thus identifying who this request is coming from
* By linking together multiple requests from the same user, HTTP cookies allow web apps to overcome the stateless nature of the HTTP protocol

### Headers for Cookies
Cookies are name-value pairs.
* When the server wants the client to store a cookie, the server sends the cookie in the response header `Set-Cookie` containing the name-value pair for the cookie
* When a client wants to send cookies to a server, it sends them in the request header `Cookie` as name-value pairs
  * A request can contain multiple `Cookie` headers, one for each cookie the client is sending to the server

### Examining Cookies
To examine the cookies being sent in HTTP requests and HTTP responses, we can use the “Developer Tools” in our browser. One way to examine the cookies is by viewing the request and response for the headers `Cookie` and `Set-Cookie`. Browsers, such as Chrome, also provide tabs for viewing just the cookies. For example, in Chrome:

* Open the “Developer Tools” using “Control-Shift-I” or by using the browser menu
* Go to the tab “Network”, click on a request and then in the detailed panel, click on “Cookies”
* Both the request and the response cookies will be shown
* Request and response cookies when visiting the URL https://eecs.oregonstate.edu/ displayed by the Chrome web browser’s Developer Tools
  * Note that the cookies displayed to you might be different based your user preferences and prior history of visiting this website

### Cookies and Express
* We need to include the [cookie-parser middleware](http://expressjs.com/en/resources/middleware/cookie-parser.html) to use cookies in our Express app
* First install the package with `npm install cookie-parser`
* Import the package and use it, e.g., with the following statements
```JavaScript
import cookieParser from 'cookie-parser';
app.use(cookieParser());
```
We can then set, delete, and get cookies as follows:
#### **Setting a cookie**
* Call the method [cookie on the response object](http://expressjs.com/en/4x/api.html#res.cookie)
  * `res.cookie('language', 'English')` will set a cookie with the name `language` and value `English` on the response object
  * An additional param can be used, `options`, which is a JSON object to set certain properties on the cookie
  * Some important `options`:
    * `maxAge`: Specifies the time in milliseconds the client should keep the cookie before deleting it. Cookie will be deleted/destroyed on browser close **by default**
    * `path`: The path this cookie applies to
    * `secure`: `true` specifies this cookie will only be sent over a secure connection (HTTPS)
    * `signed`: `true` specifies that cookie should be signed

#### **Deleting a Cookie**
* Call the method [clearCookie on the response object](http://expressjs.com/en/4x/api.html#res.clearCookie)
  * `res.clearCookie('language')` will delete the cookie named `language`

#### **Getting the value of a cookie**
* We can get the value of a cookie sent from the client from the property [cookies](http://expressjs.com/en/4x/api.html#req.cookies) of the request object
* The property is of type object and a cookie, if send in the request, will be available with a property with the name of that cookie
* `req.cookies.language` will give the value of the cookie named `language` if that cookie was sent by the client
  * Otherwise we will get a value of `undefined`

### Signed Cookies
* Cookies are stored on the machine where the browser is installed
* The user has access to these and can modify their values
* To prevent tampering, we can use **signed cookies**
* If a cookie value has been tampered with, the `cookie-parser` will recognize this and the server will reject the value of the cookie
* To use signed cookies, we need to provide a **secret** to the **cookie parser middleware**
* The cookie parser middleware will then use this secret to sign the cookie

``` JavaScript
import cookieParser from 'cookie-parser`;
app.use(cookieParser('sOme4rAnDom$tringCangohere'));
```

#### **Setting a Signed Cookie**
* Once the cookie parser has been setup with a secret, we can create signed cookies by passing the option `{signed: true}` when setting the cookie:
``` JavaScript
res.cookie('favorite_icecream', 'mintChocolateChip', {signed: true});
```

#### **Getting a Signed Cookie**
* We can obtain signed cookies, by using the property `signedCookies` on the request object
``` JavaScript
const favoriteIcecream = req.signedCookies.favorite_icecream;
```

In the following example, the Home Page served to the user asks them to pick a preferred language and submit a form. The submission of the form is handled by the route `POST /` and its handler sets a cookie with name `language` and value of the language chosen by the user. When the user visits the route `GET /greetings`, the route handler gets the value of the preferred language from the cookie `language` and displays the greeting in the chosen language. The relevant parts of `server.mjs` file are shown below
``` JavaScript
import express from 'express';
import cookieParser from 'cookie-parser';

const COOKIE_SECRET = 'sOme4rAnDom$tringCangohere';

// Install cookie-pasrser middleware
app.use(cookieParser(COOKIE_SECRET))

...

/**
 * Actual web apps should use locale to determine the language preference.
 */
app.post('/', (req, res) => {
    // Get user's language preference
    let language = req.body.language;

    // Set cookie
    res.cookie('LANGUAGE', language);

    // Send link to greeting page
    res.send('<a href="/greeting">Click</a> to get your greeting');
});

/**
 * Actual web apps should use locale to determine the language preference.
 */
app.get('/greeting', (req, res) => {
    // Find the preferred language from the cookie and
    // display the greeting in that language
    const greeting = req.cookies.LANGUAGE === 'spanish'
        ? 'Hola Mundo!'
        : 'Hello World!';
    res.send(greeting);
});

/**
 * Send back info based on whether the request includes a 
 * signed cookie with name: favorite_icecream 
 * If the cookie isn't found on the request, add it to the response.
 */
app.get('/signedCookie', (req, res) => {
    let found = false;
    if (req.signedCookies.favorite_icecream !== undefined) {
        found = true;
    } else {
        // Add a signed cookie to the response
        res.cookie('favorite_icecream', 'mintchocolateChip', { signed: true });
    }
    const message = found ?
        `Your favorite icecream is ${req.signedCookies.favorite_icecream}`
        : `signedCookie was not found. We are setting it.`
    res.send(message)
}); 
```

## HTTP Sessions
* HTTP sessions are another abstraction store state
* Users might not like storage of lots of data (from cookies) on their machines
* A user can also delete cookies which means things like user preferences can be lost

So...
* Most websites store user info, including preferences, on the server side (e.g. database)
* When a user logs in, the site creates a session object on the server and sends a cookie with a unique id to the user
* When subsequent requests contain a cookie with this unique session ID, the site can link requests from this user and can store data relevant to this user's interaction with the website in the session object

### HTTP Sessions and Express
* To use sessions in Express apps, we can use [express-session middleware](https://www.npmjs.com/package/express-session)
* HTTP sessions are built on top of cookies, so in addition to installing `express-session` middleware, we also need to install `cookie-parser`
* We must include `express-session` middleware __**after**__ including the `cookie-parser` middleware:
``` JavaScript
// Sessions use cookie, so include the cookie parser middleware before the express session middleware
app.use(cookieParser('some cookie secret'))

app.use(expressSession({
    secret: 'some cookie secret',
    cookie: { maxAge: 3600000 }
}))
```

### Configuring an HTTP Session in Express
* The `express-session` middleware takes a configuration object as a parameter
  * Details fount [here](https://www.npmjs.com/package/express-session)
* `secret`: The string to be used to sign the cookie created for the session ID
* `cookie`: Options for the cookie to be created for the session ID
* `key`: The name of the cookie that will store the value of the unique session identifier.
  * If not specified, the default name is `connect.sid`

### Getting and Setting Session Values
* If we setup HTTP sessions in Express app
  * The request object has a property `session` of type `object`
* We can set properties on the `session` object to store data in the session and access these properties to get data from the session
``` JavaScript
req.session.language = 'English';
const langPreference = req.session.language;
```

#### **Notes***
* The primary difference between `session` and `cookie` is that the session object stores a `cookie` in the client browser which contains an `id` to then lookup information related to the `session` in an in-memory key-value store
* `cookies` are just a client-side key-value store

### Example: Storing and Getting Data from Session
The following example is a variation on the cookie example we discussed earlier in this exploration. In this example, we store the language preference sent in the HTTP request as a property on the HTTP session in the route handler for the endpoint `POST /`. The route handler for `GET /greeting` gets the value of the language preference from the session and displays the greeting in the preferred language of the user.

``` JavaScript
import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

...

const COOKIE_SECRET = 'sOme4rAnDom$tringCangohere';

// Sessions use cookie, so include the cookie parser middleware before the express session middleware
app.use(cookieParser(COOKIE_SECRET))

/*
* We are setting the age of the cookie to 60*60*1000 milliseconds or 1 hour
*/
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: COOKIE_SECRET,
    cookie: { maxAge: 3600000 }
}));

app.post('/', (req, res) => {
    // Set language preference on the session
    req.session.language = req.body.language;
    // Send link to greeting page
    res.send('<a href="/greeting">Click</a> to get your greeting');
})

app.get('/greeting', (req, res) => {
    // Find the preferred language from the session and
    // display the greeting in that language
    const greeting = req.session.language === 'spanish'
        ? 'Hola Mundo!'
        : 'Hello World!';
    res.send(greeting)
});
```

### Configuring Session Storage
By default, Express stores session objects in memory. This is called **memory store** and can be problematic for two reasons:
1. When the server goes down, session data is lost
2. When the site is scaled out (multiple servers), users may hit different servers during separate requests, in which case session memory will differ

* Because of this, lots of real world Express apps store session information in a database instead of memory
* This way, any of the multiple Express servers can get the session information by querying the db with the session ID cookie
* `express-session` middleware helps with this
  * It stores session data in any of the long list of supported databases found [here](https://www.npmjs.com/package/express-session#compatible-session-stores)
  * [Mongo information found here]()

# REST API
* React apps are SPAs (Single Page Application)
* SPAs download the HTML, CSS, JavaScript for a web app from the web server to the browser exactly once
* Once the app is loaded in the browser, the JS code makes changes to the DOM so that the user feels that they are navigating to a different page
* After the initial bundle of files has been downloaded, the web app communicates with the server for various data operations:
  * Create data
  * Fetch (retrieve) new data
  * Update data
  * Delete data
* Server responses are generally in JSON
* Server program exposes its functionality as an API which is accessible over HTTP and the SPA makes the calls on this API
* The term **web service** is used for an API that can be accessed using the HTTP protocol

### Collection and Resources
* A server manages collections of resources
* Example Movie App:
  * Resource: A movie
  * Collection: All the movies
* Example Photo App:
  * Resource: a photo
  * Collection: all the photos
* Most apps will have many collections

### Identify Collections & Resources via URLs
* Collections and resources are identified via unique URLs
* Example Movie App:
  * Collection of movies
    * http://localhost:3000/mobies
  * Movie with ID xyz123
    * http://localhost:3000/movies/xyz123
  * Each movie has a unique ID => Each movie has a unique URL

### CRUD Operations - Create
* A RESTful API supports CRUD operations via HTTP methods
* Create using POST
```
POST http://localhost:3000/movies HTTP/1.1
content-type: application/json
{
  "title": "Sorry to Bother You",
  "year": 2019,
  "language": "English"
}
```

### CRUD Operations - Read
* Read using GET
* Get all movies
```
GET http://localhost:3000/movies HTTP/1.1
```
* Get a particular movie
```
GET http://localhost:3000/movies/6516841354asd864 HTTP/1.1
```

### CRUD Operations - Update
* Update using PUT
```
PUT http://localhost:3000/movies/6516841354asd864 HTTP/1.1

content-type: application/json
{
  "title": "Sorry to Bother You",
  "year": 2018,
  "language": "English"
}
```

### CRUD Operations - Delete
* Delete using DELETE
```
DELETE http://localhost:3000/movies/6516841354asd864 HTTP/1.1
```

### Stateless Server
* Keep the Server stateless
* Each HTTP request happens in isolation
* The client must send all the information needed to process a request within the request itself
* The server cannot remember info from the previous request by a client to service a subsequent request from that client

### Example: Non-RESTful Service
* Example: a client wants to make two requests
  * First: Get movies for year 2018
  * Second: Get movies for the year 2019
* Example: Non-Restful Service
  * API support requests for movies in the "following" year
    * Without specifying which year they are referring to
  * First request: Get movies for 2018
    * Server stores 2018 in an HTTP session tied to this client
  * Next request: Get movies for following year
    * Server looks up the HTTP session
    * Finds out the previous request was for 2018
    * Responds by sending back the movies for 2019

### Implementing REST API Using Express
* We already know how to 
  * Add routes based on HTTP method => can implement CRUD operations
  * Access request body => for POST and PUT
  * Set response status codes
  * Set content-type on response
* How can the route handler access the value specified in a particular segment of the URL?
  * http://localhost:3000/movies/**6516841354asd864**
  * ROUTE PARAMETERS

### Route Parameters
* In path argument of a route
* Specify which parts of the URL path should be made available to the route handler
  * Example path argument: `/movies/:id`
* These parts of the URL are called **route parameters** 
  * Example: id is the route parameter
* Express populates an object req.params
  * With path arguments as properties of params
  * Corresponding part of the URL as value of the property

### Route Parameters: Example
* Route handler
``` JavaScript
app.get('/movies/:id', function (req, res) {
  const movieId = req.params.id;
});

// Example request: http://localhost:3000/movies/xyz123
// req.params = {"id": "xyz123"}
```

### Implementing Search
* In addition to CRUD operations, many REST APIs also support searching collections
* The search URL is typically supported via the GET method
* The exact pattern of the URL varies across implementations
* As an example our API can support searching over the movies collection via the URL `movies/search`
  * We can require that the properties by which to search the movies should be provided as query parameters
  * The request to search for and return movies in English that were released in 2020 would be implemented as follows: `http://localhost:3000/movies/search?year=2020&language=English`

More powerful search may be supported by allowing specification of operators such as the the Boolean and and or .

* Example: Our movie API can require a query parameter operator with the possible values and and or to specify the Boolean operation we want to perform when searching the movie collection based on the other query parameters specified on the properties of the movie documents-- thus:
  * to search for movies that are in English **and** were released in 2020, the request URL will be
`http://localhost:3000/movies/search?operator=and&year=2020&language=English `, and
  * to search for movies that are in English (regardless of the year of release) or were released in 2020 (regardless of the language), the URL  will be `http://localhost:3000/movies/search?operator=or&year=2020&language=English`

### Tools for Sending Requests with Different HTTP Methods
#### cURL
The `curl` command can be used to send HTTP requests to test a REST API. Using `curl` on Windows can be somewhat tedious because of the need to escape quotes in JSON objects.

Examples:

You can see example HTTP requests, sent with methods POST, GET, PUT and DELETE, using `curl` from a MacOS or Linux shell in this [file](https://canvas.oregonstate.edu/courses/1849583/files/90981564?wrap=1)
You can see example HTTP requests, sent with methods POST, GET, PUT and DELETE, using `curl` on WSL (Windows Subsystem for Linux) in this [file](https://canvas.oregonstate.edu/courses/1849583/files/90981565?wrap=1)

### Summary
* REST APIs are a popular architecture for implementing web services
* Concepts:
  * Collections and resources
  * Particular style of URLs
  * CRUD operations via specific HTTP methods
  * Stateless


# Implementing REST APIs Using Express
## Middleware
* REST APIs typically use the MIME type JSON
* Include the `express.json` middleware by adding the line `app.use(express.json())` __before__ the route handlers

## Create Using POST
1. Request
   1. The client requests creation of a resource by sending a request with the HTTP method `POST`
   2. The body of the request contains a JSON object with the properties of the new resource
2. Defining the route
   1. The route is defined using the Express method `app.post`
   2. The route handler gets the properties of the resource to be created from `req.body`
   3. The route handler calls the relevant method in the model layer to create the resource
   4. The model layer returns a promise that resolves to the newly created resource, including the unique ID of this resource
3. Response
   1. The response includes the newly created resource with all its properties including the unique ID
   2. **The status code is 201**

### Example: Create Using POST
> The route handler gets the values of the properties `title`, `year`, and `language` in the JSON object sent in the body of the request
> It calls the method `movies.createMovie()` in the model layer to create a new movie
> In the response, it sends the JSON object returned by `movies.createMovie()` and sets the status code to **201**

```JavaScript
app.post('/movies', (req, res) => {
    movies.createMovie(req.body.title, req.body.year, req.body.language)
        .then(movie => {
            res.status(201).json(movie);
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 400 in case of an error.
            // A better approach will be to examine the error and send an
            // error status code corresponding to the error.
            res.status(400).json({ Error: 'Request failed' });
        });
});
```

## Read Using GET
Consider the following cases:
1. Reading a single resource by its unique ID
2. Reading the whole collection
3. Reading a subset of the collection based on some criteria

> All these cases use the `GET` HTTP method

### Case 1: Reading a Single Resource by Its Unique ID
1. Request
   1. To read a specific resource, the client sends a request with the HTTP method `GET`
   2. The URL includes the ID of the resource, e.g., `http://localhost:3000/movies/60cfa8df411c4d66e8abcdbd`
2. Defining this route
   1. The route is defined using the Express method `app.get`
   2. The route handler gets the ID of the resource from `req.params`
   3. The route handler calls the relevant method in the model layer to find the resource by ID
   4. The model layer returns a promise that resolves to the resource if the resource is found
      1. Otherwise, the promise resolves to `null`
3. Response
   1. If the resource is found, it is sent in the body as JSON with the status code **200**
   2. If the resource is not found, the status code is **404**

### Example: Read Using Get
> Here is the route handler for `GET ` requests to the URL `/movies/:_id` in our example REST API
* The route handler gets the values of the path parameter `_id` from the request URL
* It calls the method `movies.findMovieById()` in the model layer to get the movie with this ID value
* In the response, it sends the JSON object returned by `movies.findMovieById()`
* If the model returns `null`, then the response is sent with the status code **404**

``` JavaScript
app.get('/movies/:_id', (req, res) => {
    const movieId = req.params._id;
    movies.findMovieById(movieId)
        .then(movie => { 
            if (movie !== null) {
                res.json(movie);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });

});
```

### Case 2 & 3: Reading the Collection or Reading a Subset of the Collection
* To read the whole collection, the URL will have just the name of the collection without an ID
* To read a subset of the collection based on some criteria, these criteria can be specified as query parameters to the collection URL

### Example: Reading the Collection or Reading a Subset of the Collection
> Here is the route handler for `GET` requests to the URL `/movies` in our example REST API
* This route handler can return either the whole collection or return just the movies for the year provided in the request URL as a query parameter
* The route handler looks to see if the query parameters include a parameter with the name `year`
  * If the parameter is found, the route handler creates a filter on the property `year` and the value from the query parameter
  * If this parameter is not found, the route handler creates an empty filter which is equivalent to not specifying any filter
* It calls the method `movies.findMovies()` in the model layer to query the collection
* In the response, it sends the JSON object returned by `movies.findMovies()`

``` JavaScript
app.get('/movies', (req, res) => {
    let filter = {};
    // Is there a query parameter named year? If so add a filter based on its value.
    if(req.query.year !== undefined){
        filter = { year: req.query.year };
    }
    movies.findMovies(filter, '', 0)
        .then(movies => {
            res.send(movies);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });

});
```

## Update Using PUT
1. Request
   1. To update a resource, the client sends a request with the HTTP method `PUT`
   2. The URL includes the ID of the resource, e.g., `http://localhost:3000/movies/60cfa8df411c4d66e8abcdbd`
   3. The body of the request contains a JSON object with all the non-ID properties to set on the resource
2. Defining the route
   1. The route is defined using the Express method `app.put`
   2. The route handler gets the ID of the resource from `req.params`
   3. The route handler gets the properties of the resource to be updated from the `req.body`
   4. The route handler calls the relevant method in the model layer to update the resource
   5. The model layer returns a promise that resolves to the number of documents that were updated
      1. If a resource with the specified ID exists, then this value is **1**, otherwise the value is **0**
3. Response
   1. If the resource is found, and updated, it is sent in the body as JSON with the status code **200**
   2. If the resource is not found, the status code is **404** 

### Example: Update Using PUT
> Here is the route handler for `PUT` requests to the URL `/movies/:_id` in our example REST API

* This route handler gets the values of the path parameter `_id` from the request URL
* The route handler gets the values of the properties `title`, `year`, and `language` from the JSON object sent in the body of the request
* It calls the method `movies.replaceMovie()` in the model layer to update the movie
* In the response, it sends the JSON object returned by `movies.replaceMovie()`

``` JavaScript
app.put('/movies/:_id', (req, res) => {
    movies.replaceMovie(req.params._id, req.body.title, req.body.year, req.body.language)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, title: req.body.title, year: req.body.year, language: req.body.language })
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});
```

## Delete Using DELETE
1. Request
   1. To delete a resource, the client sends a request with the HTTP method `DELETE`
   2. The URL includes the ID of the resource to delete, e.g., `http://localhost:3000/movies/60cfa8df411c4d66e8abcdbd`
2. Defining the route
   1. The route is defined using the Express method `app.delete`
   2. The route handler gets the ID of the resource from `req.params`
   3. The route handler calls the relevant method in the model layer to delete the resource
   4. The method in the model layer returns a promise that resolves to the count of deleted resources
      1. This value is **1** if a resource with the given ID existed, otherwise **0**
3. Response
   1. If the resource was found and deleted, the response status code is **204**, indicating it was deleted successfully
   2. If the resource was not found, the response status code is **404**

### Example: Delete Using DELETE
> Here is the route handler for `DELETE` requests to the URL `/movies/:_id` in our example REST API
* This route handler gets the values of the path parameter `_id` from the request URL
* It calls the method `movies.deleteById()` in the model layer to update this movie
* In the response, it sends either status code **204** if a resource was deleted by the call to `movies.deleteById()` or status code **404** if the resource was not found

``` JavaScript
app.delete('/movies/:_id', (req, res) => {
    movies.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});
```