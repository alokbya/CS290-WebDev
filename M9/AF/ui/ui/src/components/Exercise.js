import React from 'react';
import { useHistory } from 'react-router-dom';


function Exercise ({ exercise, deleteExercise, onEdit }) {

    return (
        <tr>
            <td> { exercise.name } </td>
            <td> { exercise.reps } </td>
            <td> { exercise.weight } </td>
            <td> { exercise.unit } </td>
            <td> { exercise.date } </td>
            <td onClick={() => onEdit(exercise)}> Edit </td>
            <td onClick={() => deleteExercise(exercise._id)}> Delete </td>
        </tr>
    );
}

export default Exercise;