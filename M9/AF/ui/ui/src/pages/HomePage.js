import React from 'react';
import ExerciseList from '../components/ExerciseList';

import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

function HomePage({setExerciseToEdit, loggedIn}) {
    // initially sets exercises to UNDEFINED if default value is not used
    // this throws an exception when trying to map over exercises obj in ExerciseList
    const [exercises, setExercises] = useState([]);

    const history = useHistory();

    const getExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    }

    const deleteExercise = async (id) => {
        const response = await fetch(`/exercises/${id}`, {
            method: 'DELETE',
        });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
            console.error(`Failed to delete exercise with id = ${id}, status code = ${response.status}`);
        }
    }

    const onEdit = (exercise) => {
        setExerciseToEdit(exercise)
        history.push('/edit-exercise');
    }

    useEffect(() => {
        if (!loggedIn) {
            history.push('/login');
        }
        else {
            getExercises();    
        }
    }, []);

    return (
        <>
            <ExerciseList exercises={exercises} 
            deleteExercise={deleteExercise}
            onEdit={onEdit} />
        </>
    );    
}

export default HomePage;