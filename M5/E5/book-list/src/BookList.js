import React from 'react';
import Book from './Book'
import './Books.css';

function BookList({books})
{
    return(
        <div className="list-container">
            {books.map((book, i) => <Book book={book} key={i} />)}
        </div>
    );
}

export default BookList;