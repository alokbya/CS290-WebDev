import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function CreateExercisePage() {

    const [name, setName] = useState('');
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [unit, setUnit] = useState("lbs");
    const [date, setDate] = useState('03-08-2022');

    let history = useHistory();

    const createExercise = async () => {
        // fetch post    
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201) {
            alert('Successfully added the exercise!');
        } else {
            alert(`Failed to add movie, status code = ${response.status}`);
        }
        history.push('/');
    }

    return (
        <>
            <h1>Create Exercise</h1>
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
            <input
                type="radio"
                value="lbs"
                id="lbs"
                name="weight" 
                onChange={e => setUnit(e.target.value)}
            />
            <label for="lbs">lbs.</label>
            <input
                type="radio"
                id="kg"
                name="weight" 
                value="kg"
                onChange={e => setUnit(e.target.value)}
            />
            <label for="kg">kg</label>
            <input
                type="string"
                id="date"
                placeholder="Enter exercise date"
                value={date}
                onChange={e => setDate(e.target.value)}
            />
            <button id="submit-exercise" onClick={createExercise}>Add</button>
        </>
    )
}

export default CreateExercisePage;