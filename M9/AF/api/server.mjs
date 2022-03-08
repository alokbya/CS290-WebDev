import * as exercises from './model.mjs';
import express from 'express';
const app = express();
const PORT = 3000;

// MIDDLEWARE

/*
    * Parse requests into JSON
*/
app.use(express.json()) 


// Validate session id for authentication


// CONTROLLER

/*
    * Create
*/
app.post("/exercises", (req, res) => {
    exercises.addExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit === "kg" ? "kg" : "lbs",
        req.body.date)
        .then(exercise => {
            res.status(201).json(exercise)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `${error}`});
        });
});

/*
    * Read all
*/
app.get("/exercises", (req, res) => {
    const filter = {};
    exercises.getExercise(filter, '', 0)
        .then(exercise => {
            if(exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({Error : `Document not found: ${error}`})
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `${error}`});
        });
});

/*
    * Read by id
*/
app.get("/exercises/:id", (req, res) => {
    const filter = {_id: req.params.id};
    exercises.getExercise(filter, '', 0)
        .then(exercise => {
            if(exercise !== null && exercise.length > 0) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({Error : "Document not found"})
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `${error}`});
        });
});

/*
    * Update by id
*/
app.put("/exercises/:id", (req, res) => {
    // update by id
    console.log(req.params.id);
    console.log(JSON.stringify(req.body));
    exercises.updateExercise({_id: req.params.id}, req.body, {new: true})
        .then(exercise => {
            if(exercise !== null) {
                res.status(200).json({ modifiedCount: 1 });
            } else {
                res.status(404).json({Error: "Document not found"});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `${error}`});
        })

});

/*
    * Delete by id
*/
app.delete("/exercises/:id", (req, res) => {
    exercises.deleteExerciseById({_id: req.params.id})
        .then(exercise => {
            if(exercise.deletedCount > 0) {
                res.status(204).json(exercise);
            } else {
                res.status(404).json({Error: "Document not found"});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `${error}`});
        });
});

/*
    * Listen for incoming requests on PORT
*/
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});