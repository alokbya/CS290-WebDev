# Assignment 4 - CSS, Events, React

Develop a web app as a Single Page Application (SPA) using React, React Router, React Router Dom, semantic HTML, and correlating CSS rules. The website will include the following 3 pages, incorporate component files, use React Router to display content in the `<main>` part of each page, and display global styles for page layout:

1. Home Page
2. Shopping List Page
3. Store List Page

## Data for the App
* We have provided you a zip file with starter code assignment4.zip  Download assignment4.zip 
* Instead of creating a new React app, download the zip file, unzip it into a directory and then `run npm install` in the directory where you  have unzipped the file.
* The zip file has the boiler-plate code for a React app with the following changes and additions
* The `package.json` file has been modified to include the dependencies `react-router-dom` (with version 5.x) and `react-icons`.
* The `App.js` file has been modified to import data from 2 data files that we have added.
* The data your app will use is in two files we have added: `items.js` and `stores.js`.
    * These files are in the directory src/data.
    * Don't change these files.
* The `App.js` file imports data from these data files into the variables items and stores.
    * Your app must get its data from these variables.
    * Do not change the part of `App.js` that imports these files.
* During testing, we may replace the two data files with a different set of test files with the same names.
    * The properties of the objects and the type of their values in the test files will match the properties of the objects in the files provided to you.
    * However, the values of these properties as well as the number of objects in the test files can be different from the files provided to you.

## Additional Files
* Use a separate file for each __page__ and __component__ you define
* Inside the `/src` folder, create a '/pages` folder and in this folder create three files for 3 pages of your app: HomePage.js, OrderPage.js, and StoresPage.js
* Inside the `/src` folder, create a `/components` folder and in this folder create one file per component you define, such as: 
    * Navigation
    * SelectQuantity
    * Grocery Row
    * Grocery Table
    * ZipSearch
    * StoreRow
    * StoreTable

## Global Design Features
* You need to add some semantic page layout tags in the `App.js` file such as `<header>`. Add the `<main>` and `<footer>` tags.
    * The `<header>` tag will include a heading level 1 `<h1>` tag to specify the app's name and a paragraph `<p>` that describes it (such as a short, catchy slogan)
    * The `<main>` tag will include the `<Route>` tags to import each page's content
    * The `<footer>` tag will includes the student's name in a copyright statement: ?? year first last.
* In the Navigation.js component file you made earlier, add global navigation for all three pages
    * The component will import `Link` from the React Router Dom
    * The function will include a `<nav>` tag with `<Link>`s to each of the three pages
    * The function's component tag will be imported and used in the `App.js` file, typically under the ending `</header>` tag

## 1. Home Page
* This page renders when the app starts up.
* In the `return` section of this page's function, add an `<article>` tag that includes:
    * a heading level 2 `<h2>` to introduce the page.
    * a paragraph `<p>` to tell users what to do.

## 2. Shopping List Page
* This page renders when a user clicks on the global navigational control.
* In the return section of this page's function, add an `<article>` tag that includes:
    * a heading level 2 `<h2>` to introduce the page.
    * a paragraph `<p>` to tell users what to do.
    * a `<table>` built with components that imports data from `items.js`. The HTML table will include:
        * A `<thead>` row that specifies these three columns for an item's:
            * Name
            * Price
            * Quantity
        * Rows of data that render in the `<tbody>`.
        * Each row of data must display the name, price and quantity of the item, and must be generated by another component.
    * Use the `map` function to create these row components. **There should be one row component for each item in `items`.**
    * Within each row, **the quantity value must use another component that provides a control via 2 icons to increment and decrement the quantity of the item in the row**.
        * The initial value of the quantity must be zero.
        * The user must not be able to set the quantity to less than 0 or greater than 10.
        * You can use Exercise Counter Component in Exploration - State and React Hooks as a starting point for this component.

## 3. Store List Page
* This page renders when a user clicks on the global navigational control.
* In the `return` section of this page's function, add an `<article>` tag that includes:
    * a heading level 2 `<h2>` to introduce the page.
    * a paragraph `<p>` to tell users what to do.
    * a  `<table>` that imports data from stores.js using a component file that includes:
        * A `<thead>` row which specifies these three columns:
            * City
            * State
            * Zip
        * Rows of data that render in the `<tbody>`.
        * Each row of data must be generated by another component.
        * Use the map function to create these row components. There should be one row component for each `store` in `stores`.
    * a `<form>` with `<fieldset>`, `<legend>`, and number `<input>` control for a user to enter their 5-digit zip code, and a `<button>` to submit the data. 
    * an `alert` (or other dynamic message) that displays the response message, which includes the data entered (rather than submitting the form).

## CSS
Update and add rules to the existing App.css file that resides in the /src folder. Note that specifying black, white, and Times New Roman font are not allowed (because they are already the defaults).

* Global page design:
    * Add a `body {}` rule in the first line of the `App.css` file that defines the `font-family`, `background-color`, `color`, `margin`, and `padding` for the app.
    * Add a `header {}` rule to give the site name and description some dimension and color.
    * Add a `nav a {}` rule to give the links some dimension and color.
        * (Optional) Change the default colors of the `nav a:hover {}` rule.
        * There is no need to update the `:visited` state.
    * Add a `main {}` rule to differentiate this section of the page from the header and footer sections.
    * (Optional) Add `h1 {}` and `h2 {}` rules to update the font-family and colors.
    * (Optional) Update existing App- rules with `color`, `border`, `background`, `margin`, and `padding`, as desired.
* Table
    * Add a `table {}` rule to collapse the borders.
    * Add `caption {}`, `tr th {}`, and `tr td {}` rules to update `borders`, `color`, and `padding`.
    * (Optional) Add rules for `thead {}` and `tbody {}`.
* Form
    * Add `fieldset {}`, `legend {}`, `label {}`, `input {}`, and `button{}` rules that include the same font-family as the` body {}` (because the form elements do not inherit it like the other rules do) and the same color choices as used in the `table`.
    * Add padding to the `input {}` and `button {}` rules, to improve accessibility.