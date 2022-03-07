import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage'
import EditExercisePage from './pages/EditExercisePage';

function App() {
  const history = useHistory();  
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <Route path="/" exact>
          <HomePage setExerciseToEdit={setExerciseToEdit}/>
        </Route>
        <Route path="/create-exercise">
          <CreateExercisePage />
        </Route>
        <Route path="/edit-exercise">
          <EditExercisePage exercise={exerciseToEdit}/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
