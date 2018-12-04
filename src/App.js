import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import Bookshelf from './BooksShelf'
import * as myreadsConst from './myreadsConst'

class BooksApp extends React.Component {
  state = {
    books: [],
    booksToShelf: {}, // contains mapping of books id to its shelf
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let booksToShelf = {};
      books.forEach((book) => {
        booksToShelf[book.id] = book.shelf;
      });

      this.setState({
        books: books,
        booksToShelf: booksToShelf,
      });
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      this.setState((prevState) => {
        let state = prevState;

        if (shelf === myreadsConst.NO_BOOKSHELF) {
          state.books = state.books.filter((sbook) => { return sbook.id !== book.id });
          delete state.booksToShelf[book.id]

          return state;
        }

        if (!state.booksToShelf[book.id]) {
          book.shelf = shelf;
          state.books.push(book);
          state.booksToShelf[book.id] = shelf;

          return state;
        }


        state.books.forEach((prevBook) => {
          if (prevBook.id === book.id ) {
            prevBook.shelf = shelf;
          }
        });

        state.booksToShelf[book.id] = shelf;

        return state;
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Bookshelf books={this.state.books} moveBook={this.updateBook}/>
        )} />
        <Route path="/search" render={() => (
          <SearchBooks BooksShelf={this.state.booksToShelf} moveBook={this.updateBook} />
        )} />
      </div>
    )
  }
}

export default BooksApp