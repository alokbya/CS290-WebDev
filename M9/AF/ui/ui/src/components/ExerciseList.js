import React from 'react';
import Exercise from './Exercise';

function ExerciseList ({ exercises, deleteExercise, setExerciseToEdit, onEdit }) {
    
    return (
        <>
            <table id="exercises">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise, i) => <Exercise exercise={exercise}
                        key={i}
                        deleteExercise={deleteExercise}
                        onEdit={onEdit} />)}
                    {/* <Exercise exercise={testExercise}/> */}
                </tbody>
            </table>
        </>
    );
}

export default ExerciseList;