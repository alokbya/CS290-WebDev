# Module 3 - Node, Express, and HTML

* Use `npm` to download packages for your application, don't write everything yourself
* `npm` is an __online repository__ for publishing Node.js packages
* `npm` is a command line utility that can install packages from the online repository and **manage the dependencies** we define for our projects

| Command  |  Description |
| -------- | ------------ |
|`npm init`| Creates a `package.json` file to initialize a Node.js application|
|`npm install <package>`|Installs the specified Node.js package|
|`npm start`|Starts a Node.js application|

## npm init
* This initializes a new Node.js application
    * Create a new directory (serving as root directory for the project)
        * This is also known as **project directory**, **app directory**, or **project root**
    * `cd` into the project directory
    * Run the command `npm init`
    * A series of questions will appear in the prompt
        * Pressing `enter` through each question will use the default values, this is generally okay for sample apps
    * A `package.json` will be created by `npm` which defines the properties of our Node.js app

## npm install
* The command `npm install <package>` will install a package for your project
* The package is downloaded and placed in the `node_modules` directory
* `npm install` looks at the __transitive__ dependency information of the package to be installed, and downloads all the other packages that the package depends on
* By default, this command updates `package.json` and adds the package in a property `dependencies` in this file
    * This behavior can be forced (updating `package.json`) by using the option `--save` in the `npm install <package>` command (i.e. `npm install express --save`)

    ## npm install with no arguments
    * If we simply run `npm install` without any arguments, and we are in the directory where `package.json` is located, `npm` reads `package.json`, downloads the packages listed there, and places them in the `node_modules` directory
    * This is common when someone has already created a `package.json` file with all the needed dependencies and provides this `package.json` file
        * In this case, we do not need to run `npm init` or `npm install <package>. We can simply run `npm install` to gather all dependencies

## package.json and package-lock.json
* `package.json` contains meta-data related to our application
* `package-lock.json` contains information about all the Node.js packages that were installed with the exact version of each package

## using require to import packages
``` javascript
    'use strict';
    const cities = require('cities');
    let myCity = cities.zip_lookup('78704');
    console.log(mycity);
```
* Import the package `cities`
* Call function `zip_lookup` which is defined in the `cities` package

### See `hello_express` directory for sample express server app

## Setting up routes
* **routing** refers to how an application is setup to map HTTP requests to resources (map HTTP requests to __endpoints__)
* **endpoint** refers to the combination of a URL with an HTTP method
    * Request to `/foo` with GET is a different endpoint than `/foo` with POST
* Routes are defined with the app API according to the following structure `app.method(URL, handler function)`
    ``` javascript
    app.get("/", (req, res) => {
        res.send("You are at the root (home) page!");
    });
    ```
* `req` refers to the request object (HTTP request)
* `res` refers to the response object (HTTP response)
    * Whenever the argument to `send` is a string, Express automatically sets the `Content-Type` header to `text/html` in the HTTP response

## npm start
* `npm start` is a standard way to start a Node.js application
* The command looks at the `start` property within the `scripts` property in `package.json`
* It runs whichever command is provided as the value of the `start` property
* This value can be modified to run the command `node server.js`
``` JSON
"scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node server.js"
      },
```

## Using nodemon for automatic restart of application
* **nodemon** automatically restarts a node app when it detects file changes in the directory
* To use, install **nodemon** using `npm install`
* Change the `start` command in `package.json` to use `nodemon` instead of `node`
``` JSON
"name": "hello_express",
	"version": "1.0.0",
	"description": "",
	"main": "server.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"start": "nodemon server.js"
	},
	"author": "",
	"license": "ISC",
	"dependencies": {
		"express": "^4.17.1",
		"nodemon": "^2.0.7"
	}
```

## Modules vs Packages
* Module consists of just one file
* Package is used to bundle one or more modules together
* These terms are often used interchangeably
* Don't worry about it

# HTML
``` HTML
<!DOCTYPE html>
<html lang="en">
  <head>
	<meta charset="utf-8">
	<title>Basic Structure of an HTML Document</title>
  </head>
  <body>
  </body>
</html>	
```
* `<!DOCTYPE html>` is the **document type declaration**, telling the browser that this is an HTML document
* `<html>` is the root element
    * This typically has a lang attribute to describe the language used on the majority of the page
* `<head>` element is used to specify metadata about the document
    * Called the __header__ of the document
    * Helps browser and bots understand what's on the page
    * `<link>` tag is where we can link to a CSS file
    * None of this info is really for the user, that goes in the `<body>` tag
* HTML tags are not case sensitive: `<BODY> == <body>`
    * Use lowercase tags anyway
* Always use single quotes or double quotes for attributes... don't mix and match
    * `<input type="checkbox" checked>`
        * This shows an attribute with a value (checkbox), and also one without (checked)

## Using Entities to display special characters in HTML Content
* Certain characters in HTML are reserved for special use
* `<` and `>` are used for elements, but we can display literal inequality symbols by using **entities**
* Entities are strings that begin with `&` and end with `;`
* They are provided to display reserved characters as well as characters that might be difficult to type out on a keyboard

Here are a few...

| Entity | Description |
| ------ | ----------- |
|`&lt;`|Displays `<`|
|`&gt;`|Displays `>`|
|`&amp;`|Displays `&`|
|`&quot;`|Displays `"`|

# HTML Tags

## Block-level vs. Inline Elements
* Block-level elements break up the flow on the content and are typically displayed by browsers with a new line both before and after the element
* Inline elements do not break the flow of content

## Section, article, div
* `div` is used to divide content
    * Should be used as a last resort when no other element makes sense
    * These are good for dividing content purely for stylistic reasons
    * It conveys no meaning and just generically divisions content
* `section` is used to make a thematic grouping of content
    * This is for a group of content that is all related but does not quite stand on its own
    * Usually the first child of a `section` will be a heading that describes what is in the section
    * If there isn't a good way to classify the content with a heading, maybe a `div` should be used
    * A `section` should only be used if all the content is related
* `article` is structurally the same as `section` 
    * All of its content should be related
    * The content should be able to stand on its own as a composition

##  Creating links through anchors
* Links are created with the __anchor__ element `<a></a>`
* The content between these tags should describe the link
* The `href` attribute defines the link URL, where the user will be taken when clicking on the link `<a href="https://github.com/alokbya">Check out my github!</a>`

    ### Links within a document
    * Add an `id` attribute to the element you want to link to
    * In the URL, add the value of the `id` attribute at the end, preceded by the hash symbol `#`
    `<a href=file://C:/Docs/myfile.html#middle-section>Go to the middle section</a>`
    * This goes to the element with the `id=middle-section`

## Images
* `img` tag is used to display images`<img src="cat.jpg" alt="picture of a cat">`
* There are no closing tags for images
* They are inline elements
* `alt` is not required but good to be used to describe image for accessability

# strong, b, em
## strong
* `strong` elements mark important stuff `<strong>I'm important</strong>`
* Some browsers display these elements as bold, but not always (they could be displayed as red, for instance)
* This tag is used for accessability

## b
* This makes text stylistically different from other text `<b>I'm different</b>`
* It does not give additional meaning to the text, just differently styled

## em
* This adds emphasis to a word `<p>Emphasize <em>this</em></p>`
* Often portrayed as __italic__
* It adds additional meaning to the word or phrase that

# Lists and tables
## Lists
* Unordered list `<ul>`
    * `<li>` are the list items, portrayed as __bullets__ in an unordered list
    ``` HTML
    <ul>
        <li>first item</li>
        <li>second item</li>
        <li>third item</li>
    </ul>
    ```
* Ordered list `<ol>`
    * The only difference between this and an __unordered__ list is that these list items will be numbered