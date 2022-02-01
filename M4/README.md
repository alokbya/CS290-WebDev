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