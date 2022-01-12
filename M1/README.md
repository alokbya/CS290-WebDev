# Module 1: Introduction to Web Development

### List the core technologies used by the web (CLO 1)
* What is HTTP and what is its use?
* What is a URL and what is its use?
* What is HTML and what is its use?
* What is JavaScript and what is its use?
* What is CSS and what is its use?
### Explain some important terms used in web development (CLO 1)
* What is a client?
* What is a server?
How do a client and a server communicate over the web?
### Explain HTTP request and HTTP response (CLO 1)
* What are the different parts of an HTTP request?
* What is in a request line?
* What is the GET method used for?
* What is the use of request headers?
* What are the different parts of an HTTP response?
* What is in the status line?
* What is the use of response code?
* What is the use of response headers?
* What may be contained in a response body?
### Explain the different parts of a URL (CLO 1)
* What is a scheme?
* What are the server name and port?
* How does a URL specify which resource it wants from the server?
* What is the use of query parameters?

## Exploration — Introduction to the Web and Web Applications

### The Start of the Web
The World Wide Web project introduced 3 core technologies for building an information retrieval system.

1. **Hypertext Transfer Protocol** or **HTTP**:
A protocol that describes how to exchange messages. Specifically, its a protocol that describes the details of how:
* A program (client) can send a request (e.g. to retrieve a document) to 
* Another program (server) which sends back a response (e.g. containing the requested document) back to the client.
2. **Uniform Resource Locator** or **URL**:
A naming infrastructure to represent documents, or more formally resources, located on the web. We commonly call a URL a web address. 
* To request a document, a client uses the document's URL to send an HTTP request to that server hosts the requested document.
* Typically the client and server programs run on different machines. The URL can identify the server address, as well as the unique document required by the client via the URL naming infrastructure.
3. **Hypertext Markup Language** or **HTML**:
A markup language for describing documents that can be retrieved over the web.
* The term **hypertext** means text which contains links to other texts.
* HTML supports describing **hypermedia** documents, i.e., documents that contain text, other media (graphics, sound, video, etc.)
* A client interprets the HTML in a document it receives in the HTTP response from the server and displays the document.

A typical scenario for retrieving a document on the web will be as follows:
* The client is a web browser
* The user enters a URL in the browser
* The browser sends an HTTP request to the appropriate web server as identified by the URL
* The server receives the HTTP request and determines the document that has been requested
* The server sends back the document in an HTTP response to the browser
* The browser interprets the HTML document and displays its contents

## The Evolution of the Web
* CRUD
    * The web transformed into a utility that demanded the ability to modify information as well as retrieve it:
        * Create
        * Read
        * Update
        * Delete
* Server Side Programming and Web Servers
    * Web servers were created to support writing and running programs to process HTTP requests
    * To process a request, a programmay call other programs (e.g. a DB server to look up data)
        * A program may act as a server for the HTTP request from the web browser, while simultaneously acting as a client for the program (browser hits endpoint, which in turn calls several APIs)
        * In most web apps, the server program acts as a client to send requests to other servers, (e.g. database servers)
* CSS
    * CSS is a language used for describing the presentation of documents on the web while HTML continues to be used for describing the structure of the documents
    * Multiple webpages on a website can have the same look and feel by sharing CSS files, while the same webpage can have different presentation for different screen sizes by using a different CSS file based on the screen size
* JavaScript
    * The need for running programs in the browser to support full-blown apps with rich user interfaces and good performance that did not require round-trip communication to the server for every user interaction resulted in the development of **JavaScript** (JS) in 1995
    * JS can be executed by web browsers, and is a core technology for developing web apps, along with HTML and CSS
    * JS is used is used as a general purpose programming language and is also very popular for implementing server side programs
        * JS can be used for client-side programs (i.e., programs that run in the web browser) and for server-side programs (i.e., programs that run in the Web Server to to process HTTP requests from the client and send back HTTP responses to the client)
* Web Services
    * Eventually it was found that other applications can act as the end user for documents
    * This lead to the development of **web services**
    * Web services use URLs for resource identification and HTTP as the protocol for communication with the client
    * A difference from traditional web applications and web services is that the end user is likely another application, and that the response from a server to the webserver _client_ can be in different formats such as JSON or XML (easily interpreted)

## Summary
URL, HTTP, and HTML are three core technologies introduced by the World Wide Web project. Over time other technologies, particularly JavaScript and CSS have also become fundamental in building web applications.

# HTTP Request
The HTTP protocol specifies the format for a request from the client to the server for resource, and the format for a response from the server to reply to such a request from the client. 

For this communication to occur, a connection needs to be created between the client and the server. The connection between the client and server is established via TCP/IP protocol.

As an analogy with the telephone system, TCP/IP is the mechanism through which the telephone system establishes a phone connection between the caller and the receiver of the phone call. The HTTP protocol acts as the language between the caller and the receiver once the connection has been established.

Development of web apps occurs at the level of the HTTP protocol, which in networking terminology is called an appplication level protocol. Details of the underlying TCP/IP connection are hidden by the HTTP protocol.

### 3 Parts of a URL
1. Scheme or protocol
    * This identifies the protocol used to send the request `http`
2. Hostname
    * This is the name of the host/server machine on which the server program is running and with which the web client needs to establish a TCP/IP connection `www.example.com`
3. Name of the resource at the server
    * The server uses this to identify the specific resource that the client has requested `index.html`

### Hostnames and DNS
A hostname is a human readable string, insufficient to identify the machine on the Internet. Every machine on the Internet is identified by an **IP** (Internet Protocol address). The web client needs to get the IP of the server in order to establish a TCP/IP connection, which is done through the **DNS** (Domain Name System) to map the IP to a human readable address.

### 4 Parts of an HTTP Request
1. The request line
    * This is the first line in the request and has the following format: `Request-Method Resource HTTP/Version`
        * i.e. `GET /index.html HTTP/1.1`
    * The request line starts with the `Request-Method`
        * i.e. `GET` `POST`
    * Next, the request line contains the resource on the server that is being requested
        * i.e. `/index.html`
    * Finally, the request line specifies the version of HTTP protocol being used. Currently both version 1.1 and version 2.0 are in wide use, with version 2.0 gaining a larger share with time.
2. Request headers
    * The request line is followed by zero or more request headers
    * These headers are in the form of `name:value` pairs
    * The request headers are used to pass additional information to the server
        * i.e. `Accept` header tells the server about the types of data the client can handle
        * `* / *` means that the client accepts all types of data
        * To tell the server that the client can only handle HTML, the `Accept` header would be set to `text/html`
3. A blank line
4. An optional body
    * Since the HTTP method `GET` is used to retrieve a document, the body is empty for a `GET` request
    * When a client sends a `POST` request to send data to the server, the request body contains this data

# HTTP Response



Request headers are key value pairs that are sent to the server to give it more information about the request. The server can use these to decide how to respond. Accept headers tells the server about what kind of data the client can handle. 