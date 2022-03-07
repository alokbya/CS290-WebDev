import React, {useState} from 'react';

function EditExercisePage({exercise}) {
    
    const [name, setName] = useState(exercise.name);
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit, setUnit] = useState(exercise.unit);
    const [date, setDate] = useState(exercise.date);
    
    const editExercise = async (exercise) => {
        
        const updatedExercise = { name, reps, weight, unit, date };
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedExercise),
        });
        if (response.status === 200) {
            alert('Successfully edited exercise!');
        } else {
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }
    }

    return (
        <>
            <h1>Edit Exercise Page</h1>
            <label for="name">Name</label>
            <input 
                type="text"
                placeholder="Enter exercise name"
                value={name}
                id="name"
                onChange={e => setName(e.target.value)} 
            />
            <label for="reps">Reps</label>
            <input
                type="number"
                placeholder="Enter exercise set reps"
                value={reps}
                id="reps"
                onChange={e => setReps(e.target.value)}
            />
            <label for="weight">Weight</label>
            <input
                type="number"
                placeholder="Enter weight"
                value={weight}
                id="weight"
                onChange={e => setWeight(e.target.value)}
            />
            <label for="cars">Choose a car:</label>

            <select name="unit" id="unit" onClick={e => setUnit(e.target.value)}>
                <option value={unit}>lbs</option>
                <option value={unit}>kg</option>
            </select>
            <input
                type="string"
                id="date"
                placeholder="Enter exercise date"
                value={date}
                onChange={e => setDate(e.target.value)}
            />
            <button id="submit-exercise" onClick={editExercise}>Add</button>
        </>
    )
}

export default EditExercisePage;