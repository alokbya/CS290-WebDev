import React from 'react';
import { useHistory } from 'react-router-dom';


function Exercise ({ exercise, deleteExercise, onEdit }) {

    return (
        <tr>
            <td class="name"> { exercise.name } </td>
            <td class="number"> { exercise.reps } </td>
            <td class="number"> { exercise.weight } </td>
            <td> { exercise.unit } </td>
            <td> { exercise.date } </td>
            <td onClick={() => onEdit(exercise)}> Edit </td>
            <td onClick={() => deleteExercise(exercise._id)}> Delete </td>
        </tr>
    );
}

export default Exercise;