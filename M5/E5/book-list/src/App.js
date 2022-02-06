import logo from './logo.svg';
import './App.css';
import books from './data/books.js'
import BookList from './BookList'

function App() {
  return (
    <div className="App">
      <BookList books={books}></BookList>
    </div>
  );
}

export default App;
