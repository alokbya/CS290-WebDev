# Module 4 - CSS, DOM and JavaScript in the Browser
**__Note__**: It is important to be mindful of the JavaScript __context__, as what is available in a browser is not not available when using Node. The different features available in each context should be kept in mind.

# Intro to CSS and Frontend Design

## Browser Viewport
* The first visible HTML element in a web page is the `<body>` element
* The `<body>` displays the contents of the browser's __**viewport**__, which is the portion of a browser's window/tab below the address and bookmark bar
    * It appears inside of the window frame
    * It (viewport) changes size depending on the device being used to view web pages

## Default HTML Styles
* The `<body>` default styles include:
    * Times New Roman font
    * 8 px of margin
    * 0 vertical height `vh`

Since HTML headings and the `<p>` element inherit the `<body>` style, their default fonts are also set to `Times New Roman`.

* The heading `<h1>` 
    * has a font size of `2em`
    * top and bottom margin of `0.67em`
    * font-weight of `bold`
    * Other headings `<h2>` through `<h6>` inherit these properties but decrease in size

* Some elements are empty 'blocks' with no dimensions. It's the job of designers/developers to give them dimension with placement, spacing, color, imagery, and font updates.
    * `<header>`
    * `<nav>`
    * `<main>`
    * `<section>`
    * `<article>`
    * `<aside>`
    * `<footer>`

## CSS Selectors and Syntax
A CSS selector is the element name used in an HTML tag.
* **Basic syntax for stylesheets requires the following**
    * Selectors are followed by a set of curly braces {}: `selector {}`
    * Inside the curly braces are pairs of properties separated from values with a colon: `selector {property:value}`
    * Multiple selectors are separated with commas but the last one in the list must not have a comma after it: 
    ``` CSS
    selector1, selector2, selector3 {   // no comma after last selector
        property: value;
    }
    ```
    * Values with multiple sub-values are separated with commas such as in a font-family list
    ``` CSS
    selector1 {
        font-family: 'Ubuntu', sans-serif;
        color: rgb(000, 000, 000);
    }
    ```
    * Single `'` or double-quotes `"` are allowed
    * Comments are wrapped with `/*` and `*/`

## 5 Ways to Incorporate Styles
* Usually an **external** CSS file is linked in the global head area of index.html `<link rel="stylesheet" href="App.css">`
* Other stylesheets for specific components can be linked after the global .css file, or **imported** in that global stylesheet `@import "component1.css"`
* It's also possible to embed styles directly in HTML and JS files though this is usually for one-off style changes and **not allowed in this course**

## CSS File Structure
At the top of an **external** CSS file, dependencies are usually imported (fonts, "normalize.css" CSS stylesheet, component-specific stylesheet files, and device-specific stylesheet files)
``` CSS
@font-face {
    font-family: 'FontName';
    src: url('FontName.woff2') format('woff2');
  }
  
  @import url(//fonts.googleapis.com/css?family=Font+Name);

  @import-normalize;

  @import "component1.css";
```
* **Google Fonts** is the most commonly-used web font service, with more than 1000 choices. Use of unique fonts support the brand of a site/app by differentiating it from others. Fonts can be served from a host or from the local server.

* **The Normalize.css** file is an open-source set of style rules that update browser selector defaults, so that new and old browsers can start with the same rule conventions, creating cross-browser consistency. It also corrects bugs and improves usability.

* @media queries are typically added to the bottom of the file to accommodate other devices such as tablets, laptops, desktop computers, printers, projectors, etc. These queries help developers improve a site/app's accessibility and responsiveness.
    ``` CSS
    @media all and (min-width: 600px) {
    /* override rules above */
    }
    @media all and (min-width: 1080px) {
    /* override rules above */
    }
    @media print {}
    ```
 * The `:root` controls the browser viewport (the <html> tag) but also allows rules for variables that can be reused in other rules, such as colors, sizes, borders, boxes, shadows, etc. Their syntax includes dashes and looks like this:
 ``` CSS
:root {
  --custom-color:orange;
  --custom-size:200%;
}
 ```

 * The `body {}` typically defines the page margin and padding around the perimeter of the viewport. By default, the content will be left-justified by `8px` from all four sizes of the viewport.

 * Rules for paragraphs and paragraph-level elements, which are inherited by headings, lists, figcaptions, and tables, are typically defined in the `body` section.
    
    * Once a font is defined, its default size must be defined, then the height of one line of text:
    ``` CSS
    body {
        color: var(--custom-color);
        font-family: 'Font Name', sans-serif;
        font-size: 1.2em;
        line-height: 1.15;
    }
    ```

* Font sizes can be declared with a variety of units of measurement:
    * **Pixels** `px`, which are the number of pixels tall
    * **Absolute and Relative keywords** such as small, medium and large, or smaller, larger
    * **Percentage** (%) of the parent's font-size.
    * **em, ex, or ch** units, which are based on the height of an "m" "x", or "0" zero in the font family. They are also relative to the parent element font-size.
    * **rem** (relative units) are dependent on the :root, html, or body font size.
    * **Viewport height and width** (vh and vw) are relative to the dimensions of the viewport, so that 1vw = 1% of viewport width and 1vh = 1% of viewport height

* If background (Links to an external site.) images, gradients, or single colors are required behind the text, then they are typically defined in the :root, html {}, or body{} as well. For example:
``` CSS
body { 
  background-attachment: fixed;
  background-image: url(img/grand-canyon.jpg);
  background-position: top left;
  background-repeat: no-repeat;
  background-size: cover;
  ...
}
```
* Once the body has defined the font treatment, most other selectors will inherit that same family, size color and line height.
* Some selectors such as **forms** `input, text area, select` and `button` __do not inherit__ the font, so should be repeated in a section of the file related to forms:
``` CSS
input, textarea, select, button { 
  font-family:'Font Name', sans-serif;
  font-size:1.2em;
  color:var(--custom-color);
  line-height:1.15;
}
```
* Other form selector rules can be defined as well, such as `fieldset, legend, label, meter` and `progress`.
* One way to change how default input types are displayed is by applying the attribute pseudo-class:
``` CSS
label input[type="checkbox"], 
label input[type="radio"] {
  display:inline!important; 
  min-width:15px;
}
```
* Typography is the next section of selectors to define

### Paragraph, lists, and headings should be styled!

* Table row and column spacing and borders need definition (for this class)
    * But, all parts can be styled as needed

### Tables
* Collapse borders to remove unnecessary lines
`table {border-collapse:collapse}`
* Captions don't inherit table styles, so it needs its own styles
``` CSS
caption {
    background-color: orange;
    border: 1px solid gray;
    color: white;
    font-weight: bold;
    padding: 1% 0;
}
```
* It's possible to set styles for the **three** sections of a table
* For simple tables, it's good to center all text in the table body
``` CSS
thead{}
tbody{text-align:center;}
tfoot{}
```
* It is the row `tr {}` along with its counterparts, the `th {}` and/or `td {}` that completes the rendering of a cell in a table.
* It is common that the row selector will be included when specifying changes to a column `tr td {border-bottom: 1px solid orange}`
* The **heading** rows/columns are bold and centered by default but you may want something more interesting such as a subtle background color and padding.
* **If your data is numerical, then align columns to the right**
``` CSS
tr th {
  background-color:lightgray;
  padding:1%;
  text-align:right;
}
```

## Customizing with classes and ids
* Only __one__ `id` can be used at a time
* Use a `class` to define a style that should be __repeated__ throughout the page
* Multiple classes can be applied to HTML elements

## The Cascade
* **Linked external** stylesheet, overruled by
* **Imported external** stylesheet, overruled by
* **Embedded/internal** document level style sheet, overruled by
* **Inline** style definition

## Reducing stylesheet load times
* Stylesheets can be 1000s of lines long which takes several seconds to load
* Most devs take steps to reduce load time with minimization, Critical, and Lazyload techniques
* [Learn more about optimization](https://pustelto.com/blog/optimizing-css-for-faster-page-loads/)

# CSS Methods
The 7 parts of the block model:
1. Outline
2. Margin
3. Border
4. Padding
5. Background
6. Content (such as text and images)
7. Line-height

## The block model
* Nearly all HTML elements display as an empty block
* The visual representation of **spacing** for these empty blocks is created by manipulating their:
    * outline
    * border
    * padding
    * content
    * background
    * line-height

* **Margin** is the space outside of the border
* **Outline** displays the outside edge of the margin when the block has the browser's focus
* **Border** is the frame between padding and margin
* **Padding** is the space between the content and the border
* **Background colors** display behind background images which display behind content
* **Content** are items such as text and images
* **Line-height** is the height of one line of content

* **Outline** is typically seen when an element such as an anchor or form input has `focus` via the mouse
    * Properties include `width`, `style` and `color`
    ``` CSS
    outline: 1px dotted blue;
    ```
* **Margin** is inside the outline, which allows devs to separate one element or block from another
  * To separate side-by-side elements (articles)
  ``` CSS
    article {margin: 0 2%;}
  ```
  * One value for all four sides `margin:2%`
  * Two values for top/bottom `margin: 0 2%`
  * Four values `margin: 0 2% 0 2%`
  * Margin can mix and match units of measurement (padding cannot)
  * Margin can use negative values
  * Centerint an element inside of another element may require use of `auto` value
    * To center an article in the middle of a section
    ``` CSS
    article {
        margin: 0 auto;
    }
    ```

* **Border** is the space that separates margin from padding
  * Borders have a solid style by default but have 0 width and color until otherwise specified
  * All three values need defined to render a border `border: 3px dotted red`
  * For specifying border on one side of block, `-side` suffix must be defined
  ``` CSS
    article {
        border-top: 4px dotted purple;
        border-right: 6px dashed red;
        border-bottom: 8px solid orange;
        border-left: 10px groove yellow;
    }
  ```

* **Padding** is the space between the border and the content
  * This padded area can include a background color and multiple background images which display behind the content
  * Padding can specify one, two or four values in clockwise order just like Margin
  * Padding doesn't allow for mixing of various units (stick to one!)
  * Headings, paragraphs, and other elements have padding by default
  * The __Normalize__ stylesheet sets padding to - so the developer can specify a more pleasing amount of spacing
  * Values are added to the width and/or height of a block
    * If an article's width is set to `400px` and `10px` of padding have been added to right and left, the total width will be `420px`
    * To **eliminate** this, the `box-sizing` property is added to elements that need it
    ``` CSS
    article {
        padding: 20px;
        width: 400px;
        box-sizing: border-box;
    }
    ```
    * Some elements already include `box-sizing` via the `Normalize.css` file
  * Content such as `text` inherits the `body {}` elements `margin`, `padding` and `line-height`
    * The `width` and `height` of the parent block will adjust based on the amount of content unless otherwise specified
  * Content sits on top of background colors and images

* **Line Height** property specifies the height of one line of content such as text or an image
  * It is necessary to improve readability of long passages of text
  * It allows verticle alignment in the middle of a parent block
  ``` CSS
    figure img {
        line-height: 1;
        vertical-align: middle;
    }
  ```

## Grids and Positioning
* **Float** allows one block to float right or left of another block
  * Requires specifying width and clear
  * Typically applied to aside and figure blocks within an article
  * Sometimes used to define two- or three-column page layouts
* **Columns** allows easy masonry-style gallery layout
  * May require `column-count`, `column-gap`, `column-fill`, etc
* **Position** using `absolute`, `relative`, `fixed` or `sticky` placement
  * `Fixed` and `sticky` are helpful for keeping menus at the top, bottom, or side when scrolling
* **Flex** defines how child blocks relate spatially to each other within a flexible/responsive parent block
  * The space is distributed evenly to fill available space or shrinks to prevent content from spilling out of the parent block
  * Has one-dimensional flow
  * Wrapping as at the will of the browser's viewport size
* **Grid** defines how a parent block is laid out in two-dimensions
  * __Then__ considers how child blocks are oriented within the parent grid's cells
  * This method often eliminates the need for media queries for complex layouts
  * Cells can be animated

## Color Value Options
* **Names** 256 pre-defined HTML colors which have names
  * Many represent overly-bright colors
* **Hexadecimal and Hexa** made up of 2-digit values for red, green and blue
  * Black is `#000000` or `#000`
  * White is `#ffffff` or `#fff`
  * Adjusting the RGB values will render up to 256^3 colors
  * Alpha channel allows transparency with an addition of two more digits `#RRGGBBAA`
* **RGB and RGBa** made up of 1, 2, or 3-digit values for red, green and blue
  * Black is rgb(0,0,0)
  * White is rgb(255,255,255)
  * Alpha channel allows transparency `rgba(215,63,9,0.8) // 80% transparency`
* **HSL and HSLa** is made up of values for `hue`, `saturation`, `luminosity/lightness` and `alpha transparency`
  * Once a single `hue` is chosen, the `brightness/saturation` and `tone` (addition of gray) can be defined for variations based on that same hue

### Example
``` CSS
/* Convert OSU's STRATOSPHERE blue color from RGB to HSL
RGB: 0-106-142
HLS: 195-100.0-27.8
*/

/* Define a variable for that color.*/
:root {
  --strat-blue: hsla(195, 100.0%, 27.8%, 1);
}

/* Use that color variable for the background, 
  add a 2px white border with 5px border radius,
  white text,
  and 3% padding inside the button.
*/
button {
 background: var(--strat-blue);
 border: 2px solid white;
 border-radius: 5px;
 color: white;
 padding: 2.5%;
}

/* Switch the colors when hovering. */
button:hover {
  background: white;
  color: var(--strat-blue);
  border: 2px solid var(--strat-blue);
  cursor: pointer;
}
```

## Special Selectors and Pseudo-Classes

### In Forms
* Modifying form tags increases usability
* Helps determine where user left off, what was completed, etc.
* `Autofocus` places cursor in first field for immediate typing
* Color change will help users realize they can begin typing
``` CSS
:focus {
    background-color: HoneyDew;
}
```
or
``` CSS
input:focus:outline-style {
    color: #CC0000;
}
```
* To help users understand whether their input meets the required `pattern` in an `<input type="password">`
``` HTML
<input type="password" 
  id="pwd" name="pwd" 
  size="12"
  minlength="8" maxlength="12"
  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}"
  title="Include 8 to 12 upper, lower, numbers, and characters" 
  placeholder="Include 8 to 12 upper, lower, numbers, and characters"
  autocomplete="current-password"
/>
```
* Changing the border color from gray to red when invalid and green when valid is common: 
``` CSS
input:invalid {
  border:3px solid red;
}
input:valid {
  border:2px solid green;
}
```
* When inputs have the mouse's focus and a color change is specified, the placeholder text may need updating to improve contrast (and ultimately better readability), so a text color change may be needed:
``` CSS
input::placeholder {
    color: darkgray;
}
```
See [Placeholder selectors](https://css-tricks.com/almanac/selectors/p/placeholder/)

* This method uses the `type="checkbox"` attribute as well as the adjacent sibling `label` and works well if the `label` tag is placed after the `input` tag in the HTML:
``` CSS
input[type=checkbox]:checked + label {
  color: green;
  font-style: italic;
} 
```
See [:checked selector](https://css-tricks.com/almanac/selectors/c/checked/)

* Complex forms, where one input relies on another, often uses the `:disabled` and `:enabled` attributes to keep parts of a form from being accessed until the user provides the necessary input
``` CSS
input:disabled {
  background: repeating-linear-gradient(142deg, #CCCCCC, #CCCCCC 4px, #999999 22px);
}
input:enabled {
  background: white;
}
```

### In Tables
* Align numerical data to the right (especially if currency)
* This is accomplished by singling out those 'child' columns with `:nth-child(#)`, like this, when the third column requires right-alignment:
``` CSS
th:nth-child(3),
td:nth-child(3) {text-align:right;}
```
* A large table of data will be easier to read if every other row is slightly different color
  * This is done by specifying odd/even rows:
  ``` CSS
    tr:nth-child(odd) {
    background-color:beige;
    }
  ```

  [Unicorn Validator](https://validator.w3.org/unicorn/)

# The Document Object Model (DOM)
* The model that a browser uses to render a web page
* To render the page, the browser parses the HTML document and creates a DOM tree from it
* Then the browser renders the page by rendering each node of the DOM tree
* The DOM gives a representation of a document as a logical tree of nodes
* The browser includes an API for interacting with this tree representation

## Introduction to Trees
### Nodes
* A **tree** is made up of nodes
* Each **node** has one parent
* A **node** can have unlimited children 
* If a **node** has no children, it's called a **leaf**
* Nodes that are children of the same parent are called **siblings**
* In a DOM tree, the order of siblings is significant as it determines which gets rendered first (and thus higher) in the page
  
### Root node
* Every tree has a single **root** node that doesn't have a parent node
* If we start from any node and continue to visit the parents of those nodes we end up at the root node
* The root node is the **ancestor** of every other node in the tree
* All other nodes are **descendants** of the root node

### Navigating a Tree
* If at a node in the tree, there are three primary ways of navigating to other nodes in the tree
  1. Up the tree: we can move up the parent node of the current node
     1. If at the root node, no more ascending is possible
  2. Down the tree: move down to a child node
     1. If at a leaf node, no more descending is possible
  3. Sideways in the tree: If nodes don't have a direct reference to siblings, we need to move up to the parent of the current node and then get a list of children

### No Cycles
* Trees cannot have **cycles**
  * If we are at node `x` and we navigate up the tree to `x's` parent then to `x's` parent's parent and so on we will never arrive back to `x`
    * Navigation will stop at the root node
  * If we are at a node `x` and we navigate downward we will eventually reach a leaf and will never __cycle__ back to `x`

## DOM Spec & Levels
* Versions of DOM are referred to as **levels**
* Documentation refers to **interfaces** of the DOM because it is language agnostic
  
## JavaScript and DOM
* When running in the browser, two global objects `window` and `document` are available to JS code
* `window` represents the browser window
* `document` represents the webpage currently loaded in this browser window
* `document` gives us an entry point into the DOM tree that the browser has built up after it parsed the webpage
* `document` is also available as a property of `window` i.e. `window.document`
* Properties `document.head` and `document.body` correspond to the `head` and `body` of the document
  
### Example 
``` HTML
<!doctype html>
<html>

<head>
  <title>My home page</title>
</head>
	
<body>
  <h1>My home page</h1>
  <p>Hello, I am Nauman and this is my home page.</p>
  <p>I am reading a JavaScript book. You can find it
    <a href="https://www.amazon.com/Modern-JavaScript-Impatient-Cay-Horstmann/dp/0136502148">here</a>.
  </p>
</body>
</html>


[document] -> [doctype]
|
[html] -> [head] -> [title] -> (MyHomePage)
|
[body] ->
|        |


```
The DOM tree includes nodes of the following type:
* Document: This node type is at the root of the DOM tree
* Document Type: This node corresponds to the `doctype` declaration in the HTML document and it is the first child of the Document node
* Element: All elements in the HTML document are represented by Element nodes
* Attribute: There is one attribute node in the tree which corresponds to the `href` attribute of the `a` element
* Text: Text nodes correspond to the text content in the HTML document
* __**Note**__: The DOM tree in the above figure does not include all nodes in the actual DOM tree. A complete DOM tree will also include additional text nodes, one for each whitespace or newline that occurs between the HTML elements. We have not shown these additional nodes because they do not impact how this HTML document is rendered.

## Traversing the Elements in a DOM Tree
Any node that has one more children haas the following...
* `firstElementChild`: Move down the tree to the first child node of type `element`
* `lastElementChild`: Just like `firstElementChild` but move to the last child node of type `element`
* `nextElementSibling`: Move sideways to the node which is both an element and a child of the same parent as the current node
* `previousElementSibling`: Move sideways to the node which is both an element and a child of the same parent as the current node, but is the previous child of the parent
* `children`: This contains all the children which are element nodes
* To move up the tree, use the property `parentNode`.
* For the attributes of an element node, the DOM API provides the methods `getAttribute(attributeName)` and `setAttribute(attributeName, value)`
* The property `attributes` returns all the attributes of an element

### Example
``` JavaScript
// rainbow.js calls different methods to traverse the DOM tree and change the background color of various elements as follows
// * the body element becomes red
// * the h1 heading becomes orange
// * the paragraph element "Hello, I am Nauman and this is my home page" becomes yellow
// * the anchor element becomes green

// a function is assigned to window.onload so that this function executes after everything in the web page has been loaded in the browser window

window.onload = function () {
  let currentNode = document.body;
  // start the debugger
  debugger;
  // The background of the body will be set to red
  currentNode.style.backgroundColor = 'red';

  // Go down the tree to the first element node, which is the h1 heading
  currentNode = currentNode.firstElementChild;
  currentNode.style.backgroundColor = 'orange';

  // Move sideways to the next sibling of h1, which is the p node with text "Hello,..."
  currentNode = currentNode.nextElementSibling;
  currentNode = style.backgroundColor = "yellow";

  // Move sideways to the next sibling which is the p node with 3 child nodes
  currentNode = currentNode.nextElementSibling;

  // Go down the tree to the first element child, which is the a element
  currentNode = currentNode.firstElementChild;
  currentNode.style.backgroundColor = 'green';

}
```
Corresponding html...
``` HTML
<!doctype html>
<html>

<head>
    <title>My home page</title>
    <!--script src="rainbow.js"></script-->
</head>

<body>
    <h1>My home page</h1>
    <p>Hello, I am Nauman and this is my home page.</p>
    <p>I am reading a JavaScript book. You can find it
        <a href="https://www.amazon.com/Modern-JavaScript-Impatient-Cay-Horstmann/dp/0136502148">here</a>.
    </p>
</body>

</html>
```

## Searching for Elements
It's generally more convenient to search for elements based on their class, id, or their type using CSS selectors.

* `getElementById` takes a `string` for the `id` of the element we are looking for and returns this element
* `getElementsByTagName` is defined on nodes of type `element`
  * Returns a collection of all descendant nodes with a particular tag name
  * i.e. `document.body.getElementsByTagName('div')` will return a collection of all `div` elements in the body of the document
* `getElementsByClassName` is available for nodes of type `element` and on the `document` node
  * It selects all descendant elements which have the provided class name
  * i.e. `document.body.getElementsByClassName('warning')` returns a collection of elements that uses the `warning` class
* `querySelector` is defined on the `document` node
  * It returns the first element which matches the CSS selector or selectors provided as an argument to the method

# Modifying the DOM Tree
This stuff will help with understanding high-level frameworks like React, Vue, and Angular...
## Commonly Used Properties of Nodes
* `textContent` is the most basic property of a node
  * This contains all of the text content in a node (lol)
  * It also contains the text content of this node's children in a string representation
  * Setting a node's `textContent` to an empty string will clear out all of its text and that of its child nodes
* `innerHTML` is the HTML markup of an `element` type node
Consider the following HTML element
``` HTML
<p id="book">I am reading a <b>JavaScript</b> book. You can find it <a href="https://www.amazon.com/Modern-JavaScript-Impatient-Cay-Horstmann/dp/0136502148">here</a>.
</p>
```
Logging the `textContent` and `innerHTML` of this p element as follows
``` JavaScript
let text = document.getElementById('book').textContent;
console.log(text);

let html = document.getElementById('book').innerHTML;
console.log(html);
```
Here's what is printed to the browser log
``` node
I am reading a JavaScript book. You can find it here.
I am reading a <b>JavaScript</b> book. You can find it <a href="https://www.amazon.com/Modern-JavaScript-Impatient-Cay-Horstmann/dp/0136502148">here</a>.
```
__**Note:** Using the property `innerHTML` to insert text into a webpage is a security risk. It is recommended that the insertion of plain text should be done using `textContent` and should not use `innerHTML`. [See explanation here](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations).__

* `style` property lets us change the style of the node
  * Represented as a JavaScript object
  * The property names and values correspond to the CSS property names and values of the styles associated with this node in the DOM
  * Property names with a dash, such as `background-color` are converted to camelCase: `myNode.style.backgroundColor = 'violet'`
* `className` gives us access to that elements' class name
  * This prop can hold multiple class names separated by spaces
  * To append an additional class, `newClass`, to `myElement`: `myElement.className += ' newClass'
    * Note the space in front of `newClass`-- it is so that the original class name(s) aren't replaced and only appended to
  
## Modifying the Structure of DOM Trees
* **Adding Nodes** is a two step process
  * First, create the node by calling the appropriate method on the `document` object
  * Second, we insert the new node at the desired position in the DOM tree
* **Creating Nodes** is done by using several methods on the `document` object that can create nodes of specific types
  * There is not __one__ general method to create nodes of different types
  * **Creating Text Nodes**: `document.createTextNode()` can be used to create new text nodes
    * In most cases we can simply add text content using the `textContent` property discussed earlier, rather than creating a text node
* **Creating Element Nodes**: `document.createElement()` can be used to create new elements
    * It takes one argument which is the name of the element we want to create and returns an element of that type
    * Initially the newly created element does not yet exist in the DOM tree, **it must be inserted**
* **Inserting Nodes**: There are many different methods to insert nodes in a DOM tree
    * A common way to insert is to use method `appendChild(newChild)` on a node
    * This will add the node `newChild` as the __last__ child of the node the method was called on
    ``` JavaScript
    let newPara = document.createElement('p');
    document.getElementById('bigDiv').appendChild(newPara);
    // appends element newPara as last child of element w/ id='bigDiv'
    ```
* **Removing Nodes**: to remove an element, we first need to get a reference to the element and its parent
    * On the parent node, we call the method `removeChild()` and pass it the node we want to remove __as an argument__

### Example
#### HTML
``` HTML
<!doctype html>
<!doctype html>
<html>

<head>
    <title>Creating Nodes</title>
    <script src="script.js"></script>
    <link href="style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <div id="listContainer"></div>
</body>

</html>
```
#### JavaScript
``` JavaScript
window.onload = function () {
    debugger;

    // Create a node for an unordered list
    let newList = document.createElement('ul');

    // Create nodes for list items and add these nodes to the list node
    for (let i = 0; i < 3; i++) {
        let newItem = document.createElement('li');
        newItem.textContent = 'I am Item ' + i;
        newList.appendChild(newItem);
    }

    // Add the list node to the DOM tree by appending it to the element with id listContainer
    document.getElementById('listContainer').appendChild(newList);

    newList.children[0].style.backgroundColor = 'red';
    newList.children[1].style.backgroundColor = 'green';
    newList.children[2].style.backgroundColor = 'violet';

    newList.children[1].className = 'bigger';
    newList.children[1].className += ' yellow';

    // Uncomment the following block of code to remove a child node
    // and see how the childElementCount goes down when a child
    // node is removed.
    /*
    console.log(newList.childElementCount);
    newList.removeChild(newList.children[1]);
    console.log(newList.childElementCount);
    */
}
```

# DOM Events
**Event driven programming.** 
* When the user takes an action, the browser dispatches an **event** based on the type of user action
* We can use JavaScript to register functions called **event handlers**
* When an event of a particular type occurs, the browser executes the event handler registered for that type of event
* We can program event handler functions so that they can:
    * Modify attributes of DOM nodes
    * Modify the DOM tree
    * Send HTTP requests to a web server
* This provides interactivity to our application

## Events & Event Handling
Event handling requires specifying 3 specific things:
1. What happened, i.e. what is the event of interest?
2. Where did this event occur, i.e. what is the element of interest
3. What to do, i.e. what JavaScript code to invoke when the event occurs on this element?

* An event can be something a user or browser does
* Check complete list of DOM events [W3 Schools](https://www.w3schools.com/jsref/dom_obj_event.asp)
* Mouse-related events, include:
    * `click` when the user clicks on an element
    * `dblclick` when the user double clicks on an element
    * `mousedown` when the user presses a mouse button on an element
    * `mouseup` when the user releases a mouse button over an element
* Keyboard-related events, include:
    * `keydown` when a user is pressing a key
    * `keypress` when a user has pressed the key
    * `keyup` when a user has released the key
* Focus-related events, include:
    * `blur` when an element loses focus
    * `focus` when an element gets focus
* Form-submission event, includes:
    * `submit` is raised when a form is submitted
* Input event
    * `input` is raised when an element gets user input
* Page-related events, include:
    * `load` raised for a page load
    * `unload` raised for a page unload
    * `pagehide` raised when the user moves away from a page
    * `pageshow` raised when the user navigates to a page
* Timer events...

### Registering an Event Handler
There are 2 ways to register an event handler to execute when an event occurs on the element
1. Register the JavaScript code inline, as the value of an attribute with the name of the event
    * This is not recommended since it mixes JS code with HTML elements
2. Register the JS code using the DOM API
    * There are 2 different syntax's for this
        1. Use the event handler property
            * The name of the event handler property for an event has `on` prepended to the name of that event
                * i.e., we register the `mouseClick` on the element `myElem` for the event `click` using the statement `myElem.onClick = mouseClick;`
        2. Call the `addEventListener` method
            * The statement `myElem.addEventListener('click', mouseClick);` registers the same handler using the `addEventListener` method
            * This is the most recommended way of registering event handlers
            * If we call this function multiple times for the same element, we can register multiple functions that will all be called to handle the event

### Removing an Event Handler
* Call the method `removeEventListener` on element whose handler you'd like to remove
    * Remove the `mouseclick` event handler for the `click` event from the element `myElem`:
        * `myElem.removeEventListener('click', mouseClick);`

## Event Object
* When an event is raised, the browser can pass an object corresponding to this event to our handler
    * We need to add an argument to our handler in its declaration
* This event object created by the browser has a very large number of properties and methods, including:
    * `type`: the type of the event (`click`, `mouseup`)
    * `timeStamp`: the time that the event was created
    * `target`: the element that dispatched the event
    * `currentTarget`: the element on which the event listener was registered
        * The difference between `target` and `currentTarget`...

## Load Events
* These events are called when a resource and all of its dependent resources have finished loading
* A common use case is when we want to manipulate a webpage as soon as it is loaded
    * `window.onLoad()`
* Don't use this method
    * The `load` event is raised only after everything in the page (including large images) has been loaded
* To have handler execute as soon as the page's DOM is parsed, use `DOMContentLoaded`
``` JavaScript
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
});
```

## Timers
* These are largely used for animations or for automatic page refreshes
* `setTimeout(myFunc, delay)` can be used to call another function after a specified number of milliseconds
    * We can pass args to the function being called by adding them after the delay time
    * `setTimeout(myFunc, 100)` will call `myFunc` after 100 ms
    * `setTimeout(myFunc, 100, arg1, arg2)` will call `myFunc(arg1, arg2)` after 100 ms
* `setInterval(myFunc, interval)` can be used to keep calling another function after an interval of the specified number of ms
    * This returns an `intervalID` that uniquely identifies this timer
    * Pass args similarly to `setTimeout`
* Cancel a timer at an interval by calling the function `clearInterval(intervalId)` with the intervalId of the timer

## Prevent Default Behavior
We can call the method preventDefault() on an event to prevent the default action for the event from taking place. An example use case is calling this method on a submit event to prevent the submission of a form if the form validation fails, as shown in the following code snippet.

``` JavaScript
let form = document.getElementById('myForm');
	
form.onsubmit = function(event) {
  // Validate the form. 
  if ( ...) {
    // If validation fails, prevent form submission
    event.preventDefault();
	
   // Show a message to the user
  	... 
  }
}
```

## Event Propagation
* The default behavior is that the event **bubbles up** the DOM tree until it gets to the root element
* Any event handlers defined for this event type along the path will be executed for this event
* This is called the **bubbling phase** 
* The event handler on any element can stop and event from bubbling up the DOM tree by calling `stopPropagation` on the event `event.stopPropagation`

Also...
* It is possible to define handlers which are executed on the DOM tree starting with the `html` element and going down the tree until the element on which the event occurred is reached
* This is called the **capturing phase** and the event is said to **trickle-down** the DOM tree
* Using `stopPropagation` stops an event from continuing

So...
* By default, event handlers are registered for the **bubbling phase**
* Registering event handlers for the capturing phase is a lot less common
