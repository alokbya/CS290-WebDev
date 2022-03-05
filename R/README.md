# Additional Resources

## Using the React App's Production Build
When we run the development build, the messages printed to the console include the message `To create a production build, use npm run build.`
* If we run the command `npm run build`, CRA will create a directory named `build`
* Inside that directory, CRA will create a bundle for the React app which is optimized for production use
* We can copy the contents of the `build` directory to the `public` folder of our REST API
* Then if we include the static middleware in our REST API, both the React app and the REST API will be served by the same Express server

For example if we are running our server on the local machine at port `3000`, and go to the URL `http://localhost:3000/`, our React app will be downloaded to the browser and requests made from our React app will go to the REST API also running on the URL `http://localhost:3000/`


## Using a Hosting Service
Another option to deploy MERN apps is to use the platform of a cloud hosting company. Currently many real-world web apps are deployed on the cloud, using the commercial offerings of vendors such as Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP), and Heroku. However, the free trial offers by vendors typically do not include support for MongoDB.

One alternative to paying the cloud vendor for the use of MongoDB is to run the web service on the platform of the cloud vendor but use MongoDB's Atlas service to host the MongoDB server. This may require some configuration to allow network communication between the web service running on the cloud vendor's machines and the MongoDB Atlas server.

Another alternative to paying for the use of MongoDB is provided by the three biggest cloud vendors, AWS, Azure and GCP. These vendors have their own document-oriented DBMS and the use of that DBMS is likely to be included in the free trial offer. The vendors provide Node packages similar to Mongoose to connect to their own DBMS product to an app written with Node. A well-written app, with a clean separation between the Model, View and Controller layers, should not require a large code change to switch to a different document-oriented DBMS. The change will mostly be in the Model layer, with some possible changes in the interface between the Controller and the Model. In particular, the View, i.e., the React app, should not be impacted at all due because the React app communicates with the REST API whose specification should not change when the DBMS is changed.


## Valuable Links?
* The deployment of React apps created using CRA is discussed [here](https://create-react-app.dev/docs/deployment/)
* Guide to deploying a [Node app on AWS](https://aws.amazon.com/getting-started/hands-on/deploy-nodejs-web-app/) using AWS’s DynamoDB DBMS.
* Guide to deploying a [Node app on Azure](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-nodejs-application) using Azure’s Cosmos DB DBMS.
* Guide to deploying a [Node app on GCP](https://cloud.google.com/appengine/docs/standard/nodejs/using-cloud-datastore) using GCP’s Cloud Datastore DBMS.
* The Official React website has discussions of [lifting up state](https://reactjs.org/docs/lifting-state-up.html) and of [top-down data flow](https://reactjs.org/docs/state-and-lifecycle.html#the-data-flows-down). Unfortunately, like many other docs on that website, some of the examples in the discussion of lifting up state make use of older class-based components.
* The [React Redux website](https://react-redux.js.org/introduction/getting-started) has a lot of useful information about the project.
* Another good source to learn about Redux is the [free tutorial](https://egghead.io/courses/fundamentals-of-redux-course-from-dan-abramov-bd5cc86) provided by Dan Abramov who is the creator of the Redux project.
* Discussion of [useContext hook](https://reactjs.org/docs/hooks-reference.html#usecontext) on the Official React website.
* Here is a well-written [blog post](https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/) comparing the use of Redux and useContext hook.