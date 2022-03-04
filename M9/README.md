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