import express from 'express';
import * as exercises from '../models/exercise_model.mjs';
const router = express.Router();

/*
    * Create
*/
router.post("/", (req, res) => {
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
router.get("/", (req, res) => {
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
router.get("/:id", (req, res) => {
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
router.put("/:id", (req, res) => {
    // update by id
    exercises.updateExercise({_id: req.params.id}, req.body, {new: true})
        .then(exercise => {
            if(exercise !== null) {
                res.status(200).json(exercise);
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
router.delete("/:id", (req, res) => {
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

export { router };