import React from 'react';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BookShelfList from './BookShelfList'
import * as BooksAPI from './BooksAPI'

class BookShelf extends React.Component {


  state = {
    query: '',
    books: [],
    searchBooks: []
  }

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({books})
      })
  }


   onChangeStatus = (book, shelf) => {
    let prevBooks = this.state.books
    let newBook = book
    newBook.shelf = shelf
    this.setState((prevState) => {
      books: (prevBooks.filter((b) => b.id !== newBook.id).concat(newBook))
    })
    console.log(this.state)
    BooksAPI.update(newBook.id, shelf).then(console.log(BooksAPI.getAll()))
  }

  render() {
    return(

      <div className="list-books">
          <div className="list-books-title">
              <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
              <div>
                  <Route render={() => (
                      <BookShelfList
                          shelf="Currently Reading"
                          books={this.state.books.filter((book) => book.shelf === 'currentlyReading')}
                          onChange={this.onChangeStatus}
                      />
                  )}/>
                  <Route render={() => (
                      <BookShelfList
                          shelf="Want to Read"
                          books={this.state.books.filter((book) => book.shelf === 'wantToRead')}
                            onChange={this.onChangeStatus}
                        />
                  )}/>
                  <Route render={() => (
                      <BookShelfList
                          shelf="Read"
                          books={this.state.books.filter((book) => book.shelf === 'read')}
                          onChange={this.onChangeStatus}
                      />
                  )}/>
              </div>
          </div>
          <div className="open-search">
              <Link to='/search'>
                Add a book
              </Link>
          </div>
      </div>
    )
}
}
export default BookShelf
