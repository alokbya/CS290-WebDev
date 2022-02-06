# Module 5 - Intro to React
## What is React?
* React is a framework for writing front-end applications
* React was created by FB but is now open source and actively maintained
* React apps are written in JS, with additional React syntax
* Apps in React are based around the concept of components which are reusable units of UI
* React creates a component tree from the components in our app and maps it to the real DOM tree that a browser renders
* When writing a React app, we modify the component, rather than directly modifying the DOM tree
* The React framework then efficiently updates the real DOM to minimize the amount of rendering the browser has to do

## React: A High-Level View
Important concepts:
1. We build pages with components, instead of HTML
    * We build React apps by writing components that are reusable units of UI
        * A page displayed to the user consists of a set of nested components
    * For example, if we wanted to display a list of books, instead of writing HTML directly, we would:
        * Create a component called "Book" to model a book in this list
        * Create another component "BookList" which contains a list of "Book" components
        * Add the "BookList" component in a page
2. Components are functions that return React elements. React converts these React elements to DOM nodes:
    * We write components using JSX, which is a special syntax of HTML+JS
    * We can use React components in our apps just as we use HTML tags
    * Browsers don't understand JSX and React components, but React framework libraries convert components into HTML and JS-- then build a DOM tree that browsers can render
3. We update pages by changing state, not by directly changing HTML
    * To update a page, the code written by the React dev does not directly change the HTML for the page
    * Instead, our code changes the React **state** variables
    * Based on this change to state variables, React automatically renders the relevant parts of the DOM tree
4. We build Single Page Applications (SPAs) rather than apps with multiple HTML pages
    * In traditional web apps, when we navigate from one page to another, we send a request to the server and get back an HTML document
        * This comes with a new JS environment
        * Possible also comes with different static assets and CSS
    * With SPAs, the HTML, CSS, and JS for a web app are sent from the web server to the browser exactly once
        * Once the web app is loaded into the browser, then the JS code makes changes to the DOM so that the user feels that they are navigating to a different page
    * The web app still communicates with the server for various data operations, e.g., to fetch new data, or to update, create, and delete data
        * Updates to the DOM tree are the responsibility of the client-side code and no longer are the concern of the server application

## Creating a React App
* React apps have a specific structure
* While we can set up an app from scratch, React comes with a useful app generator that writes the boiler plate code for us
* `npx create-react-app my-app-name --use-npm`
* Note, `npx` is a tool that comes with `npm`
* Note, use the `--use-npm` flag for this course, so that we don't use `yarn` by default

## Directory Structure and Important Files
* `create-react-app` creates 3 directories within the top level directory
    1. `node-modules`
        * This directory is similar to what we saw in our apps using Node.js and contains the Node modules that the app depends on
        * Recall that a `package.json` files lists these dependencies and we can find that file at the top level directory
    2. `public`
        * This directory is similar to the `public` directory we saw in Express apps an is used to serve static content
        * It contains the `index.html` which is displayed when a user visits the app
        * If we look at the `body` element in `index.html` we will see that it contains just one `div` element `<div id="root"></div>`
        * The React framework renders the app by replacing this `div` element with the app content
    3. `src`
        * This directory contains the code for our React app
        * The two most important files in this directory are `index.js` and `App.js`

### index.js
``` JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```
* There are two important packages that all React apps use
    * `react`
    * `react-dom`
* These are imported in the first two lines of this file
* From `react-dom` we use the function `ReactDOM.render()` which creates and renders the app
    * This function takes two arguments
        * The first arg is the root component of our React component tree, this case the App component
        * The second arg specifies where in the DOM tree this component should be placed
            * We see that our `App` component will replace the `div` element with ID `root` in our `index.html` file
* When writing our own app, we typically do not make any changes to `index.js`
* Instead, our changes start with `App.js` which is also imported by `index.js`

### App.js
``` JavaScript
import logo from './logo.svg';
import './App.css';

function App() {
return (
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
</div>
);
}

export default App;
```
* This file defines a component
* The function `ReactDOM.render()` in the `index.js` file calls this function `App`
    * Then, converts the content returned by it to HTML
    * Then, replaces the `div` element in `index.html` with this HTML

# React Components & JSX
## Object Destructuring

Consider an object `book` with two properties `title` and `price`. We can assign the value of these two properties to 2 variables `title` and `price` with two assignment statements as follows:

``` JavaScript
const book = { "title" : "Modern JavaScript", "price": 21.99};
const title = book.title;
const price = book.price;
console.log(`${title}, ${price}`);
```

**__Object destructuring expressions allow us to assign the members of an object to multiple variables in just one expression.__**

There are 2 cases to consider for object destructuring...

### Declaring Variables and Assigning Values in One Expression
``` JavaScript
const book = { "title": "Modern JavaScript", "price": 21.99};
const {title, price} = book;
console.log(title + ', ' + price);
```
* We declare two variables `title`, `price`, and assign them values of the corresponding properties of `book`
* To assign variables that have different names than the properties they are accessing, a different syntax must be used
``` JavaScript
const book = { "title": "Modern JavaScript", "price": 21.99};
const {title: a, price: b} = book;
console.log(a + ', ' + b);
```

### Declaring Variables and Assigning Values Separately
If the variables have already been declared, then assigning values to the variables using object destructuring requires enclosing the expression within `()`
``` JavaScript
const book = { "title" : "Modern JavaScript", "price": 21.99};
let title, price;
({title, price} = book);
console.log(title + ', ' + price);
```
* Note, we cannot use `const` in this case, because the variables must be assigned after instantiation

## Array Destructuring
Array destructuring allows us to use one expression to assign the value of multiple elements in an array to multiple variables. In the following example, we destructure the array `vals` to assign the element at index 0 to the variable `a`, the element at index `1` to the variable `b` and the element at index `2` to the variable `c` using just one expression.
``` JavaScript
const vals = [1, 2, 3];
const [a, b, c] = vals;
console.log(a);       // 1
console.log(b);       // 2
console.log(c);       // 3
```
``` JavaScript
const vals = [1, 2, 3, 4, 5];
const [a, b, ... rest] = vals;
console.log(a);       // 1
console.log(b);       // 2
console.log(rest);    // [3, 4, 5]
```

## JSX
* JSX is a combo of JS and XML
* JSX allows us to define new components, which we can then use as tags along with existing HTML tags
* With JSX, every tag **must be closed**
* We can embed JS expressions in JSX and use these to pass JS values to components
* JS expressions we can use in JSX include:
    * primitives
    * arrays
    * objects
    * functions
* Other than string literals, all other types of expressions need to be surrounded by `{}` in JSX

### Example: Hello World
Below is the modified `App` component which was created initially by `create-react-app` to print "Hello, Alaaddin", and the time.
``` JavaScript
import './App.css';

function App() {
  const name = "Alaaddin";
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello {name}!
        </p>
        <p>
          The current time is {Date()}
        </p>
      </header>
    </div>
  );
}

export default App;
```
* This example defines a React component named `App`
    * Recall React components are functions that return JSX
* This component is imported into the file `index.js` and is rendered by the browser

A couple things to note...

* Property name is `className` rather than `class`
    * HTML elements have an attribute `class`
        * `class` is a reserved word in JavaScript
        * JSX uses `className` instead, to avoid trouble
* JavaScript expressions are wrapped in curly braces `{}`
    * The `App` component has two JavaScript expressions, `{name}` and `{Date()}`
    * We **cannot use statements**, such as `if` or `for` within the curly braces

## Defining Components
* We aim to define simple components in React
* This leads to __modular__ code as well as __reusability__
* Component should live in file with same name
    * `<Greeting />` should be defined in `Greeting.js`
* Component file `Greeting.js` should `import React from 'react';` at the top of the file
* Component function should return a single element
    * Multiple elements can be nested within the returned element
    * If the return element contains multiple lines, the return element must be wrapped in parenthesis `()`
    * Any passed in arguments should be done through the conventional `props` argument
    * The component should be exported at the bottom of the component file with `export default Greeting`, using the component name
    * You can use **object destructuring** for the `props` variable (this is common practice)
    ``` JavaScript
    import React from 'react';

    function Greeting(props)  // can also be function Greeting({name, time}) for 'object destructuring' approach
    {
        return (
            <div>
                <p> Hello {props.name}! // {name} when using object destructuring
                <p> The current time is {props.time}</p>  // {time} when using object destructuring
            </div>
        )
    }
    export default Greeting;  // make this function available outside this file (Greeting.js)
    ```
* To use the component in another file, i.e. `App.js`
    * The component must be imported at the top of the file: `import Greeting from ./Greeting'`
    * The component argument must be defined
    * The component must have a closing brace `<Greeting name={name}/>`
        * Where `name` is defined in the `App.js` file, above the call for the `Greeting` component
    
### React Fragments
* React doesn't allow two or more sibling elements as a component
* In the previous example, we needed to wrap the two `<p>` elements in a `<div>` element so that the component would not return two elements
* Adding the `div` element leads to unnecessary tags
* React supports the notion of **React fragments** for these situations
* A React fragment is enclosed in the tag `<React.Fragment>`
    * You can also simply use the empty tag `<>`
* The React fragment can contain multiple sibling elements
This is how the above `Greeting` component looks with **React fragments**
``` JavaScript
function Greeting(props)  // can also be function Greeting({name, time}) for 'object destructuring' approach
    {
        return (
            <>  // React fragment
                <p> Hello {props.name}! // {name} when using object destructuring
                <p> The current time is {props.time}</p>  // {time} when using object destructuring
            </>
        )
    }
```

### Example: Book and BookList Components
Here is an example using React to create a webpage that displays a collection of books
``` JavaScript
App Component
props: name, time, books // passes 2 props (name, time) to Greeting, passes 1 prop (books : arraylist) to BookList
child components: Greeting, Booklist
parent components: n/a
```
``` JavaScript
Greeting Component
props: name, time
child components: n/a
parent components: App
```
``` JavaScript
// Creates as many Book components as there are books in the array list "books"
// Passes one book object from the books array to each of the Book components
BookList Component
props: books
child components: Book
parent components: App
```
``` JavaScript
Book Component
props: book
child components: n/a
parent components: BookList
```

Checkout the React app [here](./E5/book-list/src/App.js)

#### Note
* We use map instead of a `for` loop because `for` cannot be used within `{}`, and also because it is more clear 
* We should write __small__ components that encapsulate **one** part of the user interface
* Components should largely be made up of other components

# State & React Hooks
State variables in a React app hold data that when changed can cause the DOM tree displayed in the browser to be updated.

* In React we do not write code to directly update the DOM tree
* Instead, we change the value of state variables and the React framework then makes the needed changes to the DOM
* React apps use state for many things, including:
    * Giving visual feedback based on user actions
        * Showing and hiding items in a shopping cart
        * Changing the icon when a bookmark is added or removed from an item
        * Modifying a selected menu item
    * Updating the page based on data retrieval, i.e.
        * From a file
        * From a database
        * From a web service
    * Updating the page based on a timer
    
### Example Bookmark Component
* The concept and use of state will be demonstrated by creating a new component named `Bookmark` within the `book-list` React app
* The `Bookmark` component will provide functionality to bookmark items displayed in an app
* By using this component the `book-list` app will now have the following functionality:
    * Each book will now display an icon
    * The icon displayed for a book will be one of two icons
        * The choice determined by whether the book is currently bookmarked or not
    * Initially, all books will not be bookmarked and will show the corresponding icon
    * When someone clicks the icon, the icon will change:
        * If the book is currently not bookmarked, then the click adds a bookmark and the icon changes to the bookmark icon
        * If the book is currently bookmarked, then the clicks removes the bookmark and the icon changes to one that indicates the book is not bookmarked

``` JavaScript
// Bookmark component - Bookmark.js
import React, { useState } from 'react';
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';

function Bookmark() {
  const [isBookmarked, setBookmarked] = useState(false);
  const toggleBookmark = () => setBookmarked(!isBookmarked);
  return (
    <>
      {isBookmarked
	? <MdBookmark onClick={toggleBookmark} />
	: <MdBookmarkBorder onClick={toggleBookmark} />
      }
    </>
  );
}

export default Bookmark;
```
* We save this component in a file `Bookmark.js` in the `src` directory within the `book-list` directory
* Need to install [React Icons library](https://react-icons.github.io/react-icons/)
* Need to use the bookmark icons (search for 'bookmark' on react-icons site)

## Using React Icons
* We are using two icons from the react-icons library
    * `MdBookmark` which displays the selected bookmark
    * `MdBookmarkBorder` which displays the border of a bookmark, i.e. __unselected bookmark__
* To use these we must install the library `react-icons` `npm i react-icons --save`
* In the file of our `Bookmark` component, we import the React components for these icons `import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';`

## Create State Variables
* State helps us hook up functionality to our components
* For React to update the UI/state variable, we must use the function that is returned by `setState()`
    * The initial value is set for the state variable by passing the variable into `setState`
    * `[isBookmarked, setBookmarked] = setState(false)` sets `isBookmarked` to `false`, initially

We create state variables using the function `useState()`. This function is available in the `react` library and we import it using the following statement:

`import React, { useState } from 'react';`
The function `useState` takes one argument, which is the initial value of the `state` variable, and returns an array:

* The first element in the array is the state variable that models the state of our component
* The second element in the array is a function that takes one argument and sets the state variable to this argument 
    * We must use this function to update the value of the state variable. Otherwise, React will not automatically render this component even when its state variable changes.

* We call useState as follows in our example component Bookmark:
`const [isBookmarked, setBookmarked] = useState(false);`

In this statement we are using array destructuring to destructure the array returned by useState:

* The first element, i.e., the `state` variable, is assigned to the variable `isBookmarked`.
* The second element, i.e., the `state` update function, is assigned to the variable `setBookmarked`.

If we think about the `state` of the component `Bookmark`, we see that we can model it as a Boolean value since at any given time it has one of two values:

* It is bookmarked. We model this as the value true.
* It is not bookmarked. We model this as the value false.

Since on initial display we want all books to be `unbookmarked`, we pass the value `false` to `useState` which means that the initial value of `isBookmarked` is set to `false`.

## Changing the State Variable
As stated earlier, we want the following behavior for our component:

* When someone clicks the icon, the icon will change:
    * If the book is currently not bookmarked, then the click adds a bookmark and the icon changes to the bookmark icon.
    * If the book is currently bookmarked, then the clicks removes the bookmark and the icon changes to the one that indicates the book is not bookmarked.
* We can achieve this by changing the state of the variable isBookmarked on a click as follows:

    * If `isBookmarked` is `false`, then it should be set to `true`.
    * If `isBookmarked` is `true`, then it should be set to `false`.

* The following function `toggleBookmark` has this functionality:

`const toggleBookmark = () => setBookmarked(!isBookmarked);`

Let's understand this statement

* We are defining a function `toggleBookmark` using a function expression which is to the right of the = sign
* The function doesn't take any arguments which is indicated by the empty parenthesis `()`.
* The function is defined using the arrow syntax.
* The function body consists of only one expression, so do not need to enclose the body in `{}` and don't need a `return` statement.
* Note that this function does not directly update the value of the variable `isBookmarked`. Instead it calls `setBookmarked` with the **new value** to set for the state variable `isBookmarked`. The call to `setBookmarked` triggers a re-rendering of the component by the **React** framework.

## Handling events
In order to invoke `toggleBookmark` on a user click on the icon displayed by Bookmark, we need to register it as an **event handler**. In the component `Bookmark`, we register it as the handler for click events on the components `MdBookmark` and `MdBookmarkBorder` as follows:

``` JavaScript
  <MdBookmark onClick={toggleBookmark} />
  <MdBookmarkBorder onClick={toggleBookmark} />
```

* Event handling in React is fairly similar to regular HTML and JavaScript. 
    * We register event handler code using properties that are based on the name of the event. 
    * However, there are a few differences worth noting from regular HTML and JavaScript as listed below:
        * Name of property is in camelCase
        * In React the name of the property to register a handler for an event uses camelCase
        * In regular HTML the property name is all lower case
        * To register a handler for the click event on an element, in React the property name is onClick, whereas in regular HTML it is onclick, i.e., `onClick={} versus onclick=""`.

        * Use curly braces to insert the function or the function name
        * In React, the event handler is registered using a JSX expression. So we need to wrap it inside `{}`.
        * Do not put parentheses after the function given as the value of the event handler
        * In React, the `JSX` expression is evaluated before the value of the property is passed to the component
        * **If we put parentheses after the function, then the function will be executed and its return value will be passed as the value of the handler, rather than the function itself!**

## Hooks
The `useState` function is part of a React feature called **Hooks** which was introduced in React version 16.8 released in February 2019. React Hooks are code logics that are used to connect functionality to our components. Most importantly, the functionality in a React Hook can cause a component to be re-rendered. React provides many other Hooks out-of-the box. In addition, React support defining Custom Hooks. We are going to study and use additional Hooks later in the course.

# Routing & Forms
**Investigating how to write SPAs using the React Router and how to build forms in React Apps**

## SPAs and React
* HTML, CSS, JS are sent from the server exactly once in SPAs
* When the user navigates to another page in the app, the client-side code makes changes to the DOM so that the user feels that a new page has been loaded into the browser
* We can use the `React Router` library to create SPAs
* React Router supports defining routes in our React app (we can define how to map URLs to resources)
* When the user clicks a link in the app, the React app already loaded in the browser uses the `React Router` library to map this request to a new component and renders a different DOM tree completely within the browser -- without ever sending the request to a server

### Versions of React Router
* Use version `5.x` for this class
* Version `6.x` includes breaking changes from the previous version
* See [Upgrading from V5](https://reactrouter.com/docs/en/v6/upgrading/v5) for more info about these updates
* See [React Router Overview](https://reactrouterdotcom.fly.dev/docs/en/v6/getting-started/overview) to see sample code that uses version 6
* run `npm install react-router-dom@5` to specify version 5
* You can change the version of a package used by your app by using `npm install package-name@version`
* For example, we can update the app with the `package.json` file to use version 5 of React Router by
    * Shutting down the app
    * Running `npm install react-router-dom@5`

### Using BrowserRouter and Route Components
``` JavaScript
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/contact">
            <ContactPage />
          </Route>
        </header>
      </Router>
    </div>
  );
}

export default App;
```

* The `exact` appended to `<Route path="/">` specifies that the route must exactly match `/` to return the HomePage
    * This is needed because the pattern `/` also matches `/about` and `/contact`


### Link Component
* The `<Link>` component is used to specify the path to go to (react route) when the item is clicked 
``` JavaScript
<Link to="/">Go to the Home page</Link>
```

* To create a SPA, we must also use the Link component provided by the React Router
* The Link component has a property named to whose value is a URL
* When we click that URL, the browser navigates to the page corresponding to that URL
* This behavior may seem exactly the same as the behavior of the a element in HTML
    * However, there is one important difference between the Link component and the a element: 
        * When we click the URL in an a element, if the URL corresponds to a new page (rather to an anchor in the same page)
        * Then a request is sent to the server
        * The new page is received in the response and is then rendered in the browser
* When we click the URL in a Link component, the React app changes the DOM tree entirely on the client-side, i.e., in the browser, without needing to talk to the server
* The browser shows the new URL as the address of the page
    * The page has not been loaded from the server
    * The React app has simply updated the DOM tree in the page!

``` JavaScript
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
       <Link to="/about"> Go to the About Page</Link>
       <Link to="/contact"> Go to the Contact Page</Link>
    </>
  );
}

export default HomePage;
```

* The first `Link` component has a hyperlink to the `About` Page with the URL `/about`, while the second Link component has a hyperlink to the `Contact` Page with the URL `/contact`
* To verify that our app is now really working as a SPA, start the app and go to the Home Page
* Now open the browser’s Developer Tools and go to the Network tab
* If we click on either of the two links, we will see that:
    * The URL in the browser is updated based on the hyperlink we clicked.
    * The page corresponding to that URL is rendered in the browser.
    * There is no network traffic, i.e., the browser does not send any request in order to display the new page.

## Forms
* Building forms in React apps is somewhat similar to building forms using pure HTML
* All HTML tags related to forms are available for use in JSX
* We need to use React state variables in order to manage the values entered in the form by the user
    * So, we need to use the `useState` Hook

``` JavaScript
import './App.css';
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <fieldset>
            <legend>Your Details</legend>
            <label>Please enter your name
              <input type="text" value={name}
                onChange={e => setName(e.target.value)} />
            </label>
          </fieldset>
          <button onClick={e => {
            setName(e.target.value);
            alert(`Your name is ${name}`);
            e.preventDefault();
          }}>Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
```

* In order to manage the value the user enters in the `input` element, we define a state variable `name`
* To set the value of `name`, we use `setName` which is the function returned by `useState`
* Whenever the text in the `input` element changes, the `change` event is raised
* In the handler for this event, we call`setName` with the current value of the `input` element
    * We obtain the current value via the property `e.target.value`
    * Here `e` is the event raised when the text changes and it is the argument to the event handler
    * `e.target` is the element on which the event was raised, i.e., the `input` element
    * `e.target.value` is the current value of this element
* When the user hits the "Submit" button, we create an alert and display the value entered by the user
* Note the use of `e.preventDefault()` in the handler for the submit button
    * The default behavior for the form submission is sending a `GET` request to the current URL in the browser
    * If we do not prevent the default behavior an HTTP request would have been sent to this URL