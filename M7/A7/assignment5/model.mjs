// Import dependencies
import mongoose from 'mongoose';

// Identify and connect to db @ localhost:port, person_db database
mongoose.connect(
    'mongodb://localhost:27017/persons_db',
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;

// Log opened connection status
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

// Define Person schema
const personSchema = mongoose.Schema({
    name : {type: String, required: true},
    age : {type: Number, required: true},
    email : {type: String, required: true},
    phoneNumber : {type : Number, required: false}
});

// Compile, generate model Person from personSchema
const Person = mongoose.model("Person", personSchema);

// Create person
const createPerson = async (name, age, email, phoneNumber) => {
    const person = new Person({name: name, age: age, email: email, phoneNumber: phoneNumber});
    return person.save();
}

// Find person
const findPerson = async (filter, projection, limit) => {
    // Generate query object
    const query = Person.find();

    // Check for filters
    if (Object.keys(filter).length > 0) {
        query.and(filter);
    }

    // Execute query
    return query.exec();
}

// Update person
const updatePerson = async (conditions, update, options) => {
    return await Person.findOneAndUpdate(conditions, update, options);
}

// Delete person by unique id
const deletePersonById = async (_id) => {
    return await Person.deleteOne({_id: _id});
}

// Delete person(s) by various conditions (criteria)
const deletePersons = async (conditions) => {
    return await Person.deleteMany(conditions);
}

// Export module functions for external use
export {createPerson, findPerson, updatePerson, deletePersonById, deletePersons};