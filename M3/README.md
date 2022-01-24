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
* Definition list `<dl>`
    ``` HTML
    <dl>
        <dt>Name</dt>
        <dd>Godzilla</dd>
        <dt>Born</dt>
        <dd>1952</dd>
    </dl>
    ```
    * These are used for descriptive tables, and can be used kind of like an Excel sheet

## Tables
``` HTML
<table>
    <caption>Characteristics with positive and negative sides</caption>
    <thead>
      <tr>
        <th>Characteristic</th>
        <th>Negative</th>
        <th>Positive</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Mood</td>
        <td>Sad</td>
        <td>Happy</td>
      </tr>
      <tr>
        <td>Grade</td>
        <td>Failing</td>
        <td>Passing</td>
      </tr>
    </tbody>
  </table>
```
* `table` element opens and closes the table
    * Everything related to the table will be nested within these tags
* `caption` is the title and description of the table
* `thead` is the table header
    * These would be rows that don't contain actual data, but instead contain things like labels signifying the data that will be in those columns
    * The rows in this section would typically contain `th` elements
* `tbody` is the body of the table and contains the rows that actually have data in them rather than descriptive rows that would be in the header
    * The rows in this section typically contain `td` elements
* `tr` is a row of the table
    * Contains either `td` elements (data cells) or `th` elements (header cells)
* `td` is a data cell
    * Contains actual data
    * To span multiple columns, use the `colspan` attribute
* `th` is a header cell
    * This signifies what is in the column below, or the row beside it

### Example Table
[See table here](https://replit.com/@alokbya/m333#index.html)

# Linking HTML Documents and Serving Static Content
* __Routing__ means to map HTTP requests to endpoints, where __endpoints__ refer to the combination ofa URL with an HTTP method

## Absolute vs. Relative URLs
* **Absolute URL** is a complete URL to a resource including the protocol and the domain name
    * The URL `https://module3.cs290.com/index.html` and `https://module3.cs290.com/contacts.html` are both absolute URLs
* **Relative URL** points to a location relative to the file in which we use that URL
    1. **Same directory**: We can specify a relative URL to a file in the same directory by using just the name of that file or by adding `./` before the name of the file. Using only the name of the file is the preferred syntax, i.e.
        * In the file `index.html`, the URLs `contacts.html` and `./contacts.html` both refer to the file `contacts.html` located in the root directory
        * In the file `list.html` in the directory `product/`, the URLs `contacts.html` and `./contacts.html` both refer to hte file `contacts.html` in the directory `product/`
    2. **Moving down the child directories**: We can specify relative URLs for files down the directory structure using the names of the directories and files separated by a `/`
        * Access `logo.png` in the `images/` folder via `./images/logo.png`
    3. **Moving up the parent directories**: use `..` to go up a level
        * `../images/logo.png` can be accessed from within another folder in the root directory (if `images` is also in the root directory)

## The link element
* `<link>`, along with `<a href=>` and `<img src=>` is another way to use URLs in HTML
* This specifies a relationship between a document and an external resource
* The `href` attribute is used to specify the URL of the external resource
* The `rel` attribute, which stands for __relationship__, is used to specify the relationship between the external resource and the HTML document
* Two commonly used values of `rel` are `stylesheet` to link stylesheets (CSS), and `icon` to link a website's icon
```<link href="style.css" rel="stylesheet"/>```

## The script element
* Add JavaScript code to an HTML document using the `script` element
* We can embed JavaScript between the open and closed `<script>` tags
* We can also use the `<script src="app.js">` tag to specify a JavaScript file URL

## Serving Static Files from a Web Application
* The `express` module provides a method `static` that we can use to serve static files
    * It has one required parameter named `root`
    * The value of `root` specifies the directory from which static files will be served
* It is common to create a directory `public` in the root directory and place the static files underneath this directory
* We can then enable serving static files from the `public` directory by adding the following line of code:
``` javascript
    app.use(express.static('public'));
```
* The URL in the request should not include `public`
* The URL https://module3.cs290.com/index.html will map to the file index.html in the directory public
* The URL https://module3.cs290.com/contacts.html will map to the file contacts.html in the directory public
* The URL https://module3.cs290.com/images/logo.png will map to the file logo.png in the directory public/images

# HTML Forms
* HTML forms enable web apps to collect information from the user
* Any time you are creating a new account at Amazon, logging into OSU's website, or uploading a file you are using HTML forms
## Here is an example form
``` HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Module 3: Form</title>
</head>

<body>
    <form action="http://localhost:3000/review" method="GET">
        <!-- The fieldset element is used to group several controls and labels within a web form.-->
        <fieldset>
            <!-- The legend element is used to add a caption for the content of its parent fieldset.-->
            <legend>Your Details:</legend>
            <label>Name:
                <input type="text" name="name" size="30" maxlength="100" required="required">
            </label>
            <br />
            <label>Email:
                <input type="email" name="email" size="30" maxlength="100">
            </label>
            <br />
        </fieldset>
        <br />
        <fieldset>
            <legend>Your Review:</legend>
            <p>
                <label for="hear-about">How did you hear about us?</label>
                <select name="referrer" id="hear-about">
                    <option value="google">Google</option>
                    <option value="friend">Friend</option>
                    <option value="advert">Advert</option>
                    <option value="other">Other</option>
                </select>
            </p>
            <p>Would you visit again?
                <br />
                <input type="radio" name="rating" id="yes" value="yes">
                <label for="yes">Yes</label>
                <input type="radio" name="rating" id="no" value="no">
                <label for="no">No</label>
                <input type="radio" name="rating" id="maybe" value="maybe">
                <label for="maybe">Maybe</label>
            </p>
            <p>
                <label for="comments">Comments:</label>
                <br />
                <textarea rows="4" cols="40" name="comments" id="comments"></textarea>
            </p>
            <label>
                <input type="checkbox" name="subscribe" checked="checked" />Sign me up for email updates</label>
            <br />
        </fieldset>
        <br />
        <!-- We can use the button element or the input element to display the button -->
        <!--input type="submit" value="Submit review" /-->
        <button type="submit">Submit review</button>
    </form>
</body>

</html>
```

* We add a form to an HTML document using a `form` tag that must have an opening and closing tag
* We can put any other element within form tags, except other forms
* Forms almost always include `input` elements
* Multiline text input uses the `textarea` tag

## Form attributes
* The `form` tag has two very important attributes
    * `action` specifies where the request from the form should be sent
        * When the form is submitted the browser will package up all the contents of the form and send it to the URL specified in the action
        * If the `action` attribute is missing, the form is submitted to the same URL from which it was downloaded
    * `method` specifies the HTTP method to be used in the HTTP request send when the form is submitted
        * The value of the attribute is case insensitive
        * If this attribute is omitted, it defaults to `GET`
        * The typical values are `GET` or `POST`

## Inputs
* `input` tag is most commonly used to gather data within a form
* The `type` attribute determines how text is displayed, used, and which other attributes may be used 
* A `name` attribute is important to have for each `<input>` tag
    * The `name` attribute is used by the server to determine which part of the form each part of the data is associated with

See [MDN's Input Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) for other input types

## Check boxes and radio buttons
* **[Check boxes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)** need both a `name` and `value`, just like other inputs
* Server will only know about the check box if it is checked
* **Radio buttons** are similar to check boxes in that the server will only know of their existence (and values) if values are set
    * Every radio button that has the same name will be in a radio button group
    * Within the radio button group, only one radio button can be selected

## GET and POST
* GET and POST are the only options for sending form data to the server
### GET
* GET request sends the data as key value pairs as parts of the URL
* In the example form above, if the `method` attribute is set to`GET` the URL will be as follows
```
http://localhost:3000/review?name=Nauman+Chaudhry&email=chaudhrn%40oregonstate.edu&referrer=friend&rating=yes&comments=Testing+the+form&subscribe=on
```
* The `?` indicates the start of the query string
* The string is composed of key-value pairs
    * `=` is between a key and its corresponding value
    * `&` separates key-value pairs from one another
    * Keys correspond to the `name` attributes of the `input` elements in the form
    * Values are **URL encoded** for transmission to the server (noticeable with spaces, emails, etc)

### POST
* POST request sends the same data as GET, but sends in the body of the request instead of part of the URL
* This means you can't tell what data (if any) was sent via POST request by looking at the URL
* It will still arrive at the server as part of a query string in the same format as a GET query string, so it'll have key value pairs separated by `&ampl;` symbols

### GET vs POST
* The location of the query string: URL vs request body is the main difference between POST and GET
* Must not use GET for sensitive data (such as passwords), even with `https` protocol
* Many web servers log the URL of http requests, and putting sensitive data in the URL with GET requests can result in that data being saved in log files
* Browsers sometimes set a limit for query string length (can be problematic with GET requests)
* In general, GET is used for retrieving data from the server
* POST is generally used to make changes on the server (push data to server)
* For now, submit forms using POST

## Processing Form Submission using Express
* This requires adding a route for the URL and HTTP method specified in the form
* Express then provides the data submitted in the form as a JSON object to our route handler function

### Get requests
* Data submitted is available as a JSON object as the `query` property of the request object provided to the route handler function
``` JavaScript
app.get("/review", (req, res) => {
    console.log(req.query);
    res.send(req.query);
});
```

### POST requests
``` JavaScript
app.post("/review", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
```
* To get the data as a JSON object in the `body` property, we need to add the following statement to parse the data in the HTTP body
``` JavaScript
// middleware to allow the request info for POST to live in body
// needs to be before any defined routes
app.use(express.urlencoded({
    extended: true
}));
```