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
