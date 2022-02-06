import React from 'react';
import './Books.css';
import Bookmark from './Bookmark';

function Book ({book})
{
    return (
        <div className="list-item">
            <h3>{book.title}</h3>
            <p>Price: {book.price}</p>
            <Bookmark/>
        </div>
    );
}

export default Book;