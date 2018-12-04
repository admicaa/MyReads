import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'

class SearchBooks extends Component {
  state = {
    query: '',
    books: [],
  }

  componentDidMount() {
    this.timer = null;
  }

  searchBooks = (query) => {
    const { BooksShelf } = this.props;

    clearTimeout(this.timer);

    this.setState({
      query: query,
    });


    this.timer = setTimeout(() => {
      BooksAPI.search(query, 20).then((books) => {

        books.forEach((book) => {
          if (BooksShelf[book.id]) {
            book.shelf = BooksShelf[book.id];
          }
        });

        this.setState({ books: books });
      });
    }, 1000);
  }

  render() {
    const { moveBook } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.searchBooks(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <BookList books={this.state.books} moveBook={moveBook} />
        </div>
      </div>
    )
  }
}

export default SearchBooks