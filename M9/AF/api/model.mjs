import mongoose from 'mongoose';

// identify db to connect
mongoose.connect(
    'mongodb://localhost:27017/exercises_db',
    { useNewUrlParser: true }
);

// connect to db
const db = mongoose.connection;

db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

// define schema
const exerciseSchema = mongoose.Schema({
    name : {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: Date, required: true}
});

// compile, generate model
const Exercise = mongoose.model("Exercise", exerciseSchema);

// methods

/*
    * Add
*/
const addExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise(name, reps, weight, unit, date);
    return exercise.save();
}

/*
    * Get all
*/