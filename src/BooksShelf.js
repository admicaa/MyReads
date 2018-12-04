import React from 'react'
import { Link } from 'react-router-dom'
import BookList from './BookList'
import * as myreadsConst from './myreadsConst'
import PropTypes from 'prop-types'


function Bookshelf(props) {
  const { books, moveBook } = props;

  let shelfBooks = {
    [myreadsConst.BOOKSHELF_CURRENTLY_READING]: books.filter((book) => { return book.shelf === myreadsConst.BOOKSHELF_CURRENTLY_READING}),
    [myreadsConst.BOOKSHELF_WANT_TO_READ]: books.filter((book) => { return book.shelf === myreadsConst.BOOKSHELF_WANT_TO_READ}),
    [myreadsConst.BOOKSHELF_READ]: books.filter((book) => { return book.shelf === myreadsConst.BOOKSHELF_READ}),
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <BookList books={shelfBooks[myreadsConst.BOOKSHELF_CURRENTLY_READING]} moveBook={moveBook} />
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <BookList books={shelfBooks[myreadsConst.BOOKSHELF_WANT_TO_READ]} moveBook={moveBook} />
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <BookList books={shelfBooks[myreadsConst.BOOKSHELF_READ]} moveBook={moveBook} />
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired,
}


export default Bookshelf