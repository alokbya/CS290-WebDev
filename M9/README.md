# React Component Lifecycle and More React Hooks
## Lifecycle of a React Component
There are three stages in the lifecycle of a React component:
* Initial display
  * **Stage: mounting**
* `setState()` called
  * **Stage: updating**
* Component being removed
  * **Stage: unmounting**

1. Mounting
   1. To display a component in a page, the React framework calls the `render()` method of this component
   2. After this, the React framework adds the component in the DOM tree
   3. Once this component has been added to the DOM tree, the component is said to be **mounted**
2. Updating
   1. A component that has been mounted and is being displayed in a page may be updated
      1. For example, if the component has a state and the method to set the state is called, the component will be updated
   2. Whenever the component is updated, the React framework calls its `render()` method
   3. After this, the React framework updates the DOM tree with the updated component
3. Unmounting
   1. When a React component is removed from the DOM tree, the component moves to the unmounting stage
      1. For example, when the browser displays a new page, the components in the old page will be removed from the DOM tree and unmounted
   2. The React framework removes the component from the DOM tree and destroys it
   3. The component is now said to have been unmounted


### When to Make Network Requests During the Component Lifecycle
#### **Displaying Data When A Page is First Displayed**
If data from a REST API needs to be displayed when a page is first loaded, this particular request to the REST API should be sent during the **__mounting stage.__**
#### **Displaying Data When A Component's State is Updated**
If we want to send an HTTP request when the state of the component is updated, then we need to send it during the **__updating stage__**

### `useEffect` Hook
> `useEffect` hook is used when we want the rendering of a component to have side effects. With this hook we can execute functionality when the component is first mounted or when the value of a particular variable changes.
> To use this hook, we import it from `react` and call it inside the body of our component.

`useEffect` takes the following parameters...
1. `effect`
   * A function (callback) which is a **required** parameter
   * By default, the React framework calls this function whenever this component is rendered, which as we saw, happens whenever a component is mounted or updated
2. `deps`
  * An array which is an optional parameter
  * If specified, the value of `deps` changes the default behavior of the `useEffects` hook
  * Instead of `effect` being called whenever the component is rendered, __the value of `deps` controls when the React framework actually calls `effect`__


### Example: CounterPage
``` JavaScript
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

function CounterPage() {
    const [count, setCount] = useState(0);
    const increment = () => setCount(count + 1);

    useEffect(() => {
        console.log('effect function called');
    });

    return (
        <>
            <h1>Counter Page</h1>
            <div>
                <span>{count}</span>
                <MdAdd onClick={increment} />
            </div>
            <Link className="App-link" to="/"> Go to the Home Page</Link>
        </>
    );
}

export default CounterPage;
```

> If we run the app, we'll see the message `effect function called` is logged when we first go to the Counter Page as well as whenever we click on the counter.

### Using deps to Control useEffect
> If we specify the parameter `deps` to `useEffects`, then React will call the function `effect` only when any of the values in the array passed to `deps` changes

#### Example: Passing a Variable in `deps`
> In our example, if we pass the array `[count]` to `useEffect`, then React will call `effect` only when the value of `count` changes

``` JavaScript
usesEffect(() => {
  console.log('effect function called';)
}, [count])
```
Specifying this parameter does not change the behavior much in this example because there is only one state variable. However, if there were multiple state variables, then we could pass only one of the variables to a useEffect hook and then the effect function would be called only when that variable changes, but not when any of the other variables change.

#### Example: Passing an Empty Array
* If we pass an empty array as the second parameter to `useEffect`, the `effect` function is called only on the initial render
* This means that the `effect` function will be called during the **mounting** stage, but never again during the lifecycle of the component
* This is an ideal use case for fetching data from a server during the initial rendering of a component

``` JavaScript
useEffect(() => {
  console.log('effect function called');
}, []);
```

### `useHistory` Hook
> In our examples, we using version 5 of `react-router-dom`. In version 6 of `react-router-dom` , the `useHistory` hook has been [replaced](https://reactrouter.com/docs/en/v6/upgrading/v5#use-usenavigate-instead-of-usehistory) by the `useNavigate` hook.
* The `useHistory` hook helps us to navigate between pages without requiring the user to click on a link
* To use this hook, we need to import it from the `react-router-dom` library
* We call the method `push` on this hook to specify the URL we want to navigate to

### Example: `useHistory` Hook
Consider a SPA with two pages:
1. Home Page
   1. This page has links to the Contact Page
2. Contact Page
   1. This pages has a form which asks the user to enter their name and has a "Submit" button
   2. When the user hits the "Submit" button, we want to display an alert and then automatically take the user back to the Home Page
  
We can implement the required functionality by importing the `useHistory` hook in the Contact Page. Then at the point we want to navigate to the Home Page, we call the method `history` on this hook and pass it the path `/`.

See Contact Page here...
``` JavaScript
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function ContactPage() {
    const [name, setName] = useState('');
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        alert(`Hello ${name}! Let's go to the Home Page`);
        history.push("/");
    };

    return (
        <>
            <h1>Contact Page</h1>
            <form>
                <fieldset>
                    <legend>Your Details</legend>
                    <label>Please enter your name
                        <input type="text" value={name}
                            onChange={e => setName(e.target.value)} />
                    </label>
                </fieldset>
                <button type="submit" onClick={submitHandler}>Submit</button>
            </form>
        </>
    );
}
export default ContactPage;
```
# Implementing a Full-Stack MERN App - Part 1
> This section focuses on building out the application in E9, [movies-ui](./movies-ui/).

1. Home Page
   1. When this page is first rendered, it displays all the movies currently stored in our MongoDB movie collection. **This is done by calling the REST API endpoint to get all the movies**
   2. Each movie is displayed with icons to delete or edit the movie
   3. Clicking on the icon for deleting the movie deletes the movie from the database. **This is done by calling the REST API endpoint to delete the movie**
   4. Clicking on the icon for editing the movie takes us to the Edit Movie page. The data for the selected movie is displayed in a form that is automatically filled in with this data
   5. This page has a link to the Add Movie Page
2. Add Movie Page
   1. This page provides controls to input data for a new movie. The controls allow the user to specify the new movie's title, year, and language
   2. Clicking on an 'Add' button adds the movie to the database. This is done by calling the REST API endpoint to create a movie
   3. After adding the movie, the user is automatically taken back to the Home Page
3. Edit Movie Page:
   1. This page has a form with controls to edit the data for a movie
   2. The form is automatically filled-in when the page is loaded
   3. Clicking on 'Save' button updates the movie in the database **This is done by calling a REST API endpoint to update a movie.**
   4. After saving the movie **the user is automatically taken to the home page.

``` Bash
App
---
    -> HomePage
        -> Movie List
            -> Movie
            -> Movie
            -> Movie...
    -> Add Movie Page
    -> Edit Movie Page
```

> Note, the MovieList component will have one child Movie component for each movie in the list of movies

* The `App` component has 3 child components: `HomePage`, `AddMoviePage`, and `EditMoviePage`
* The `HomePage` component has one child component, the `MovieList` component
* The `MovieList` component has `Movie` components as its children
* There will be one `Movie` component corresponding to each movie displayed in the HTML table. That `Movie` component will generate the HTML content for the corresponding row in the HTML table

## Using the React App's Development Build
> When we create a React app using `create-react-app` and run it using `npm start`, the app prints some messages to the command window after starting up

When creating the `movies-ui` app, the following will display in the console...
``` Bash
Compiled successfully!
  
You can now view movies-ui in the browser.
  
http://localhost:3000
  
Note that the development build is not optimized.
To create a production build, use npm run build.
```

* This is a **development** build
* Create-React-App (CRA) has a built-in Express web server for running a development build
* Since we implemented an SPA, the browser sends a requeset to this Express web server **only once** to load all the content for the React app
* After the initial loading, the browser doesn't make any requests to this Express web server
* For a full-stack MERN app, the React app in the web browser should now only make HTTP requests to the REST API server

## Simultaneously Running the React App Express Server and the REST API Express Server
* Make sure each is using different ports!
* Start Express server for the REST API on port `3000`
* In the React app, create a file named `.env`
  * This file should be in the same directory as the file `package.json`
* In this file add a line to specify the prot number on which the React app server should run
  * i.e., add line `PORT=8000` so the React app will run on port `8000`

Now we can run both the back, and front-end!

## Sending HTTP Requests from the React App to the REST API
* We need to [add a proxy property](https://create-react-app.dev/docs/proxying-api-requests-in-development/) at the top level of `package.json` of the React app to call the Express REST API (running on `localhost:3000`) from the React App (running on `localhost:8000`)
```
"proxy": http://localhost:3000,
```

## `fetch` API
> The `fetch` API allows JavaScript code running in browsers to make HTTP requests. 

The API consists of one method, [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) which takes up to two parameters as follows:

1. `resource` 
   1. This is a required parameter specifying the resource for which the HTTP request will be made
   2. The value of this parameter can be a string specifying the URL or it can be a [request object](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request). In our examples we will only use URLs.
   3. If the URL specified as a `resource` is a relative URL, then the HTTP request will be sent to the same server from which the file containing the code was downloaded.
2. `init`
   1. This is an optional parameter. If specified its value must be a JavaScript object specifying options that can configure various aspects of the request
   2. The complete list of options that can be specified in this object is available in the API doc. Here we highlight the options that we will use
      1. `method`
         1. The value of this property is a string and is used to specify the request method, e.g., `get`, `post`, etc.
      2. `headers`
         1. The value of this property is a JS object with headers specified as key-value paris
      3. `body`
         1. The value of this property is a string which corresponds to the body of the HTTP request

> The `fetch()` method returns a promise which resolves to a [response object](https://developer.mozilla.org/en-US/docs/Web/API/Response). Note, this `response` object is not the same as the Express response object. The `fetch` API is available in the browser and is completely independent of Express, which runs in the server.

## CRUD Operations from the React APP: Calling GET /movies to Display Movies on the Home Page
When a user goes to the Home Page of the React app, we want to display all the movies. We achieve this as follows...
* We implement a function `loadMovies()` which uses the `fetch()` method to send a request to the `GET /movies` endpoint in the REST API
* We call the function `loadMovies()` during the mounting of the Home Page (`useEffect()` hook)

``` JavaScript
const [movies, setMovies] = useState([]);
	
const loadMovies = async () => {
    const response = await fetch('/movies');
    const movies = await response.json();
    setMovies(movies);
}
	
useEffect(() => {
    loadMovies();
}, []);
```

* The `useEffect` hook calls the function `loadMovies()`
* The second parameter to `useEffect` is an empty array
  * This means that the `useEffect` hook will only be called when the component is being mounted
* In `loadMovies()` we use the `fetch` API to call the endpoint `/movies`
  * Since we do not specify an HTTP method in the call to `fetch`, the default HTTP method `GET` is used
* `loadMovies()` sets the value of the state variable `movies` to the body of the HTTP response
* Since a state variable has been updated, the component goes into the Updating stage, the `render()` method of the component is called and the list of movies is rendered on the page

### Why do we define a separate `loadMovies()` function?
In our code, the anonymous function being passed as the effect parameter of the `useEffect` hook simply calls the function `loadMovies`.

* It might seem that instead of defining the function `loadMovies` function, we could simply have added the code for this function in the anonymous function.
* But we cannot do that. The reason is that an asynchronous function cannot be passed as a parameter to `useEffect`.
* However, the function passed to `useEffect` is allowed to call an asynchronous function.
* This is why we need to define the function `loadMovies` instead of putting its code directly in the function passed to `useEffect`.

## CRUD Operations from the React App: Calling DELETE /movies to Delete a Movie on the Home Page
To delete a move, the function `onDeleteMovie()` is called when a user clicks the delete icon displayed next to a movie. This function sends an HTTP request to the endpoint `DELETE /movies` of the REST API.

``` JavaScript
const onDelete = async id => {
    const response = await fetch(`/movies/${id}`, { method: 'DELETE' });
    if (response.status === 204) {
	const getResponse = await fetch('/movies');
	const movies = await getResponse.json();
	setMovies(movies);
    } else {
	console.error(`Failed to delete movie with id = ${id}, status code = ${response.status}`)
    }
}
```
> Note that when calling `fetch()`, we pass it a second argument to set the HTTP method to `DELETE`. We also pass the `id` of the movie as a path parameter in the request URL.

## CRUD Operations from the React App: Calling CREATE /movies to Create a Movie on the Add Movie Page
To create a movie, we implement the function `addMovie()` which makes an HTTP request to the endpoint `POST /movies` of the REST API. This function is called from the Add Movie Page when a user clicks 'Add' on this page. Here is the code for this function.
``` JavaScript
  const addMovie = async () => {
      const newMovie = { title, year, language };
      const response = await fetch('/movies', {
          method: 'POST',
          body: JSON.stringify(newMovie),
          headers: {
              'Content-Type': 'application/json',
          },
      });
      if(response.status === 201){
          alert("Successfully added the movie!");
      } else {
          alert(`Failed to add movie, status code = ${response.status}`);
      }
      history.push("/");
  };
```
In this function we call `fetch` with two parameters using the second parameter to configure the request as follows:
* We set the value of the property `method` to `POST`
* The `POST /movies` endpoint which requires the request to send the data for the movie in the request body as JSON
* Sending JSON using `fetch()` requires setting the property `body` to a string representation of the JavaScript object we want to send
  * We call `JSON.stringify()` to convert the JavaScript object `movie` to a string
* We set the `Content-Type` header to `application/json` to indicate that the body is in JSON format

## CRUD Operations from the React App: Calling UPDATE /movies to Update a Movie on the Edit Movie Page
To update a movie, we implement the function `editMovie()` which makes an HTTP request to the endpoint `PUT /movies` of the REST API. We call this function from the Edit Movie Page when a user clicks 'Save' on this page. Here is the code for this function:

``` JavaScript
const editMovie = async () => {
    const response = await fetch(`/movies/${movieToEdit._id}`, {
        method: 'PUT',
        body: JSON.stringify({ title: title, year: year, language: language }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(response.status === 200){
         alert("Successfully edited the movie!");
    } else {
         alert(`Failed to edit movie, status code = ${response.status}`);
    }     history.push("/");
};
```
Other than the value of the property `method` being different, calling `fetch` to send an HTTP request to the endpoint `PUT /movies` is similar to calling `fetch` to send an HTTP request to the endpoint `POST /movies`

## Sharing State Between Components
