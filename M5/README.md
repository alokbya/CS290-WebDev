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