# Persistence Using MongoDB and Mongoose

# Introduction to Database Management
## Types of Database Management Systems
* A **database** is an organized collection of data
* A **database management system** (DBMS) is the software used to manage databases
* __Database__ is sometimes used for DBMS
* DBMS supports efficient CRUD operations on large volumes of data
* DBMS provides concurrent executions of CRUD operations for a large number of users
### 1. What abstractions does the DBMS provide for modeling data?
|Relational DBMS|Document DBMS|
| ------------- | ----------- |
|Table|Collection|
|Row|Document|
|Column|Property|

#### Relational
* **Relational DBMS** are the most common types of DBMS in current use 
    * Oracle
    * SQL Server
    * PostgreSQL
    * MySQL, etc.
* Commercial relational DBMSs appeared around the early 1980's and have dominated DBMS markets since the late 1980's
* In a relational DBMS, data is organized as **tables**
* The **columns** of a table define the data type of the data that can be stored in that table
* The **rows** of a table store the actual values corresponding to that column
* Relational DBMS tech is very mature with decades of research and development
* Over the years, standards have been defined for relational technology
    * If you have written apps using one of the relational DBMSs, there is a smooth learning curve for writing apps for another relational DBMS

#### Document
* **Document-oriented DBMS** are comparatively new, having gained popularity starting around 2005
    * MongoDB
    * Amazon's DocumentDB (DynamoDB)
    * Couchbase
    * Google Firestore
* In a **document DBMS** data is stored as a **document** in a format such as JSON or XML
* Documents that are somewhat similar are added to the same **collection**
* A document corresponds to a row in a relational DBMS, while a collection corresponds to a table
* A **property** of a document corresponds to a column in a table
* Most document DBMS do not require that the data type of properties should match across the different documents stored in the same collection
* There are not many widely used standards for document DBMS
    * Switching from one to another can yield a steep learning curve

### 2. What language or API does the DBMS provide for CRUD operations on the data?
* Relational DBMS use SQL, which doesn't significantly differ across flavors and provides functionality for:
    * All CRUD operations on tables
    * Creating table
    * Updating table
    * Dropping table
* Document DBMS use **NoSQL** (just doesn't use SQL, for philosophical reasons...)
    * Some actually can be used with SQL, but can vary a lot
    * Generally uses functions provided by the DBMS for CRUD operations

## Choosing a DBMS
* This is an extremely important architectural decision: choosing a type of DBMS, and then a specific DBMS within that type
* Must consider
    * Scale and performance of app
    * Maintenance and availability requirements
    * Geographical distribution of users
    * Other stuff, too

* MongoDB uses BSON format to store documents (binary form of JSON)
* The MongoDB API exposes the documents as JSON and the JSON format makes it very easy to use MongoDB in Node programs

## Installing MongoDB
* [Here are the instructions](https://docs.mongodb.com/manual/installation/)
    * Use MongoDB 5 Community Edition
* Once installed
    * Run MongoDB as a macOS service `brew services start mongodb-community@5.0`
    * Stop MongoDB service `brew services stop mongodb-community@5.0`
    * Run manually as background process (M1) `mongod --config /opt/homebrew/etc/mongod.conf --fork`
* Connect and Use MongoDB
    * `mongosh`
    * Make sure security/privacy settings (developer cannot be identified) are resolved in `System Preferences > Security and Privacy > General`
* Run MongoDb
    * Run MongoDB as a **macOs** service `brew services start mongodb-community@5.0`
    * Stob MongoDB service `brew services stop mongodb-community@5.0`
    
### Useful Commands
* `show dbs`: List all databases in the MongoDB server
* `use db_name`: Use the database `db_name`. Substitute `db_name` with the name of the database you want to connect to. **If the database does not exist, it will be created.**
* `show collections`: List all the collections in the current database

### JavaScript API
* [Cheat sheet](https://developer.mongodb.com/quickstart/cheat-sheet/)
* `db.getCollectionNames()`: List all the collections in the current database
* `db.createCollection(...)`: Create a new collection

[CRUD cheat sheet](https://www.mongodb.com/developer/quickstart/cheat-sheet/#crud)
* Note that you need to replace `coll` in the name of these functions with the name of your collection

* `db.coll.insert(...)`: Create a document in the collection `coll`. The argument is a JSON object. MongoDB creates and associates a unique object ID value with each document. This value is stored in the property `_id`
* `db.coll.findOne()`: Returns a single document at random from `coll`
* `db.coll.findOne(...)`: Return a single document from `coll` based on the criteria passed in the argument
* `db.coll.find()`: Return all documents from `coll` that match the criteria passed in the argument. If the number of documents exceeds 20, then batches of up to 20 documents are returned. Type `it` to get the next batch
* `db.coll.update({"_id": ObjectId("123")}, {...})`: Update the document with object ID `123`
* `db.coll.remove({"_id": ObjectId("123")})`: Delete the document with object ID `123`
* `db.coll.remove({...})` Delete all documents matching the criteria passed in the argument

# Using Mongoose for MongoDB
* Mongoose is a tool which provides a __syntactic__ layer between data in the database and objects in a Node app
* MVC pattern is used both for conceptually decomposing an app into different layers, as well as for organizing the code for easier maintainability

## The MVC Pattern
* MVC = Model-View-Controller
* Invented in the context of the OO language SmallTalk in 1970s
Widely used for designing applications with GUI
    * Regardless of programming language
    * Regardless of application type, i.e., web app, desktop app, mobil apps
* Decouple functionality related to the UI of an application from the code that actually does the work

### Model
* Layer of app that manages app's data
* Executes CRUD operations on the DBMS
* In the apps developed using languages with support for OOP, the model will include:
    * Classes in the apps that represent the data in the database
    * Code that maps the data in the database to these classes and maps the classes to the data in the database
* In MongoDB data is represented as documents
* Model layer responsible for
    * Mapping from MongoDB documents to objects in Node
    * Also mapping the node objects to MongoDB documents
* Sometimes the term **models** is used to refer to just the classes that represent the data in the database

### View
* The UI of the app
* Displays data from the app
* Web apps: view rendered in HTML, CSS
    * We are using React for this...
* Desktop apps: view rendered using a UI toolkit for the app platform
* View does not directly interact with model
* Instead, sends information about a suer's interaction to the controller
* There can be multiple views for the same underlying model
    * E.g., a web app, desktop app, mobil app, even JSON
* Note that sometimes the term **views** is used to refer to the rendered displays of data. For example, different pages in a web app may be referred to as views of the web app.

## Controller
* Layer of app that connects view to model
* Controller handlers requests from the view layer
* Determines how to process the request
    * Decides how to involve the view and model layer in processing the request
    * Including how the view and model might be updated due to the request
* In an Express app, the controller layer is implemented by the route handlers
* The route handlers
    * Receive requests
    * Call functions to perform CRUD operations on the model layer
    * Send back responses that update the view

## Using Mongoose to Connect to MongoDB
* Mongoose is used in the **model** layer of a web app
* It is an object-document mapper (ODM) that maps between classes and objects in our JavaScript code and the documents stored in MongoDB
* To use Mongoose, install the `mongoose` npm package
* If we are using `mongoose`, we don't need the `mongodb` npm package

To add some structure to our code, instead of putting all the code in one file, we will create the following 2 files, one contains the model layer and the other contains the controller layer:

*`movies_model.mjs`
    * This file contains the model layer
    * It uses Mongoose to connect to MongoDB
    * It contains the 4 functions implementing the CRUD operations and exports these functions to make them available for use outside this file
* `movies_controller.mjs`
    * This file includes our Express code and implements route handlers
    * It imports `movies_model.mjs` and the route handlers call the relevant functions in `movies_model.mjs`

### Connecting to MongoDB
``` JavaScript
// imports the mongoose package, connects to a MongoDB server running locally at port 27017, and uses the database named movie_db
import mongoose from 'mongoose';

mongoose.connect(
    "mongodb://localhost:27017/movies_db",      // connect to mongodb @ localhost:27017 and use movies_db
    { useNewUrlParser: true } 
);

const db = mongoose.connection;                 

// Do something when db is opened
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
})

// Tell mongoose to create indexes, which helps with faster querying
mongoose.set('useCreateIndex', true);
```

## Schemas and Models
* Schemas and models are the main concepts for mapping between documents in MongoDB and objects in our JavaScript code

### Schema
* Define schema by calling `Schema` method on `mongoose` object
* Schema represents the properties of a collection in MongoDB
* For each property, we specify the data type
* Data types (formerly called schema types) include `String`, `Number`, `Boolean`, `Date`, `Array`, `Map`, among others
* We can specify certain constraints on individual properties, called **schema type options***
    * We can declare that specifying the value of a prop is optional
    * We can declare a prop is required
        * Meaning every document must include a value for that property, otherwise Mongoose will not save the document to MongoDB

### Example: Schema Definition
* Here we define a schema for MongoDB document to represent movies
* The schema has three properties, `title`, `year`, and `language`, all required
``` JavaScript
const movieSchema = mongoose.Schema({
	title: { type: String, required: true },
	year: { type: Number, required: true },
	language: { type: String, required: true }
});
```

### Mongoose Model
In Mongoose, the model is a JS class which represents documents of a particular collection
* Mongoose generates this JavaScript class for us
* To do this, we need to call the method `model` on the `mongoose` object passing it two parameters
    * The name fo the JS class that Mongoose will generate
    * The schema which Mongoose will use to generate this class
* Once the model class is generate, if we want we can add more methods to this class
* We can use the model to create documents by using JSs build-in support for OOP (we can create documents by calling the class constructor with the `new` keyword)

### Example: Creating Documents Using the Model Class
* When we call the function `mongoose.model()`, Mongoose generates a class named `Movie`
    * This class corresponds to the `movieSchema` we defined earlier
    * Objects of the class `Movie` have the properties `title`, `year` and `language` corresponding to the props of the schema `movieSchema`
* We then create an object of this class by calling the constructor with the keyword `new`

``` JavaScript
const Movie = mongoose.model("Movie", movieSchema);
const movie = new Movie({ title: "Fargo", year: 1996, language: "English" });
```

# Using Mongoose to Implement CRUD operations
* To perform CRUD operations, Mongoose provides a large number of static methods on the model class generated by Mongoose for a schema
* Check out the methods [here](https://mongoosejs.com/docs/api/model.html)

## Implementing the CRUD Operation
### Create
* To create a document, we can use the method `save`, found in docs [here](https://mongoosejs.com/docs/api.html#document_Document-save).
* Unlike many other CRUD methods which are static, `save` is called on an instance of the modle class
* The method returns a promise which is fulfilled and resolves to the document that was saved
* By default, a unique ID with a string value is automatically assigned a newly created document and is available as the property `_id`
### Example: Save
The following function creates a new doc in the collection `movies` with the specified value of `title`, `year`, `language`.
``` JavaScript
  createMovie = async (title, year, language) => {
      // Call the constructor to create an instance of the model class Movie
      const movie = new Movie({ title: title, year: year, language: language });
      // Call save to persist this object as a document in MongoDB
      return movie.save();
  }
```
### Retrieve Documents
For retrieving documents, Mongoose provides several static methods on the model class.
### Retrieve Documents Using `find`
* `find` method can be used to retrieve all the documents in a collection or retrieve a subset of documents in a collection, or retrieve a subset of documents that match specific criteria
* Calling `find` does not execute a retrieval operation
  * Instead, calling this method returns a `Query` object
  * Then, calling the method `exec` on the `Query` object actually executes the retrieval operation on MongoDB
* [find](https://mongoosejs.com/docs/api.html#model_Model.find) takes the following optional parameters:
  * `filter`
    * This param is used to match documents
    * Mongoose converts the filter into a bool condition that checks this condition on each document
    * If the condition evals to false for a doc, then it will not be included in the result
    * If this param is not provided, it defaults to an empty condition which evals to true for every document in the collection
  * `projection`
    * A space-separated list of the properties of the doc which we want to be included in the result
    * If it is not provided, all the props of the doc are included
  * `options`
    * This param allows further tailoring of what the result should look like
  
Instead of passing all of the params at once to the `find` method, an alt coding pattern is to call the `find` method to create a `Query` obj and then call various methods on the `Query` obj to specify additional filters, projection and options

### Example: `find`
``` JavaScript
  findMovies = async (filter, projection, limit) => {
      const query = Movie.find(filter)
          .select(projection)
          .limit(limit);
      return query.exec();
  }
```
We call this function as follows to retrieve: 
* Docs where the value of year == 2018
* Including only the prop `title` of these docs in the result
* Limiting the num of documents in the result to a max of 5 docs
``` JavaScript
  findMovies({ year: 2018 }, 'title', 5)  
```
Here's how this works:
* We call `find` with the value of `filter` param set to `{year: 2018}`
  * This returns a `Query` object
  * Only docs with the value of 2018 for the prop `year` will match the query
  * If we wanted all docs to match the query, we would have passed an empty object, i.e., `{}`
  * Not that the `Query` object also has other methods that can be used to build up a filter
  * It is also possible to create complex conditions using bool operators such as AND, OR, NOT, etc.
* We call the `select` method on the `Query` object to specify which properties to include in the result
  * We call the method with the value `title` telling the query to only include the property `title` in the result
  * Note that the `_id` prop is always automatically included in the result
  * To include multiple props in the result, we specify these props separated by a space
    * For example, to include the props `title`, and `year` in the result, we will call `select` with the value `title year`
  * To include all props in the result, we can either not call the `select` method on the query object, or call it with an empty string, i.e., `''`
* We call the `limit` method on the `Query` object to specify the max number of documents we want in the result
  * To include all docs matching the filtering criteria, we can either not call the `limit` method on the query object or call it with the value `0`

### Other Methods for Retrieval
Other useful methods for retrieval include:
* `findOne`
  * This method creates a query which when executed will return at most one document
  * We can set filters and projections on the query similar to those for `find`
* `findById`
  * This method is just a handy way of calling `findOne` when we want to find a doc by its ID

### Update
* Consider whether a method completely replaces the doc with values provided or just updates a subset of these properties
* When updating one or more props of a doc, and we know the values of all the other props that will remain unchanged, we can use the method [replaceOne](https://mongoosejs.com/docs/api/model.html#model_Model.replaceOne)

### Example: Updating using replaceOne
Here we update all 3 props: `title`, `year`, `languages` of the existing document with the specified ID with values provided as the other parameters
``` JavaScript
 replaceMovie = async (id, title, year, language) => {
      const result = await Movie.replaceOne({ _id: id }, { title: title, year: year, language: language });
      return result.modifiedCount;  // returns number of modified docs?
  }
```

### Delete
Lots of different methods can delete documents. If we know the ID, use [deleteOne](https://mongoosejs.com/docs/api/model.html#model_Model.deleteOne)
### Example: deleteOne
The function `deleteById` shown below calls the Mongoose method `deleteOne` to delete the doc whose ID value is specified as the parameter `id`
``` JavaScript
  deleteById = async (id) => {
      const result = await Movie.deleteOne({ _id: id });.
      return result.deletedCount;
  }
```
## Calling the Model from the Controller
* To call the CRUD operations defined in the Model layer (above), we need to add the controller layer. In Express apps, the route handlers are the controllers.
* We add 4 route handlers, one for each of the 4 CRUD operations
* For now we use a simple approach of adding route handlers with the URLs `create`, `retrieve`, `update`, `delete` with the `GET` HTTP method
* The params we need to pass to functions in our models layer are provided as query params in the HTTP request to the corresponding route handler

# Advanced Operations Using Mongoose
Now, we are looking at creating more advanced filters that can be used in querying collections, as well as the details of some Mongoose methods for updating data.
## Boolean Operators for Complex Conditions
* Mongo supports specifying conditions using many different bool operators such as AND, OR, NOR, etc.

### Filtering Documents Using AND
* We can require that the result of a query contains only those docs matched by all of the specified conditions, by calling the [and method on a query](https://mongoosejs.com/docs/api.html#query_Query-and) with an **array containing all the filters we want to apply to the document**
    * Note if the array is empty then all docs will match the query

Example: and
``` JavaScript
let filters = [{year:2004}, {language: 'English'}];
```
We can use these filters to return the matching documents as follows:
``` JavaScript
const findMoviesUsingAnd = async (filters) => {
    const query = Movie.find();
    if(filters.length > 0){
      query.and(filters);
    }
    return query.exec();
}
```
In the previous exploration, to retrieve documents we had called `Movie.find()` with **an object** to get back a `Query` object.

* When we passed an empty object to `Movie.find()`, the query returns all the documents in the collection.
* When we passed a non-empty object, e.g., `{year: 2018}`, to the query then the documents matching that one filter were returned.

Contrast this with the above example where we call `Movie.find()` without an argument to get a `Query` object.

* If the argument filters is a non-empty array, then we pass this **non-empty array of filter objects** to the method `query.and()` and then execute the query to get those documents that **match all the filters** in that array AND-ed together.
* If the argument filters is an empty array, we don't call `query.and()` and simply execute the query which will return all the documents in the collection.

### Filtering Documents using OR
* We can require that a query result only contains documents that match **any of the specified conditions** (instead of **all** specified conditions), with an array containing all filters to be applied on the documents.
  * If array is empty, all docs will match the query

Example: or
* Consider we want to find all movies that were released in 2004 or for which the language was English
``` JavaScript
let filters = [{ year: 2004}, {language: 'English'}]
```
* We can call use these filters to return the matching documents as follows:

``` JavaScript
const findMoviesUsingOr = async (filters) => {
    const query = Movie.find();
    if(filters.length > 0){
      query.or(filters);
    }
    return query.exec();
}
```

## Updating Existing Documents
* To update a document without first querying for it (to verify it exists), we can use `updateOne`, or `findOneAndUpdate`, as opposed to `replaceOne` described earlier (which demands we already have access to this document)

### findOneAndUpdate
* We can see it takes three params: conditions `object`, update `object`, and options `object`. Docs found [here](https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate)
* `conditions`
  * This param is of type object and is used to match documents
  * If multiple docs match the condition, then one matching doc is picked at random
  * To match a document with multiple conditions AND-ed together, specify all the conditions as properties of this object:
  * Examples:
    * To match a document using the value of `_id` we can use the following condition
      * `let condition = {"_id": document_id};`
    * To match a document whose prop `year` has the value 2008 and the prop `language` has the value English...
      * `let conditions = {"year": 2008, "language": "English"};`
* `update`
  * This param is of type object and contains the updates that we would like to make to the document
  * To update a prop of this document, specify it as a property of this object
  * To update multiple properties of the document, specify each of these properties of this object
  * Any property that is not specified in this object is left **unchanged** 
  * Examples
    * To update only the prop `year` of a doc to the value 2019, while leaving all other props unchanged, we specify the following value for the `update` param
      * `let update = {"year": 2019};`
    * To update the prop `year` of a doc to the value 2019 and the prop `language` to the value Punjabi, while leaving other props unchanged, we specify the following value for the `update` param
      * `let update = {"year": 2019, "language": "Punjabi"};`
* `options`
  * The `options` param allows us to specify special conditions
  * An example case of this would be if we wanted to return the updated document to the user after the query
    * For this we could specify the `new` options in our query as follows:
      * `let options = {new: true};`

This function returns a promise
* If no doc was found matching the `conditions` arg, then the value of the promise resolves to **null**
* If a doc was found matching the `conditions` arg, then the promise resolves to that document