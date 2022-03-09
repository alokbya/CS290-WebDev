import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
// Import pages
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage'
// Import components
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  const history = useHistory();  
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <header>
        <h1>Exercise Tracker</h1>
        </header>
        <Navigation />
        <main>
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit}/>
          </Route>
          <Route path="/create-exercise">
            <CreateExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exercise={exerciseToEdit}/>
          </Route>
        </main>
        <footer>
          <Footer/>
        </footer>
      </Router>
    </div>
  );
}

export default App;
