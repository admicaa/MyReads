import React from 'react'
import PropTypes from 'prop-types'
import * as myreadsConst from './myreadsConst'

function BookList(props) {
  const { books, moveBook } = props;

  return (
    <ol className="books-grid">
      {books&&books.length===0?(
        <h1>No books Found</h1>
      ):''}
      { books.map((book) => (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              

                <img className="book-cover" src={book.imageLinks?book.imageLinks.thumbnail:''} alt={book.title} />
              
              <div className="book-shelf-changer">
                <select value={book.shelf || myreadsConst.NO_BOOKSHELF} onChange={(event) => { moveBook(book, event.target.value); }}>
                  <option  disabled>Move to...</option>
                  <option value={myreadsConst.BOOKSHELF_CURRENTLY_READING}>Currently Reading</option>
                  <option value={myreadsConst.BOOKSHELF_WANT_TO_READ}>Want to Read</option>
                  <option value={myreadsConst.BOOKSHELF_READ}>Read</option>
                  <option value={myreadsConst.NO_BOOKSHELF}>None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{ book.title }</div>
            {book.authors ? (
                book.authors.map((author) => (
                  <div key={author} className="book-authors">{author}</div>
                ))
              ) : ''
            }
            
          </div>
        </li>
      ))}
    </ol>
  );
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired,
};

export default BookList