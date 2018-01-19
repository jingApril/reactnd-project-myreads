import React from 'react';
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
//import BookShelfList from './BookShelfList'


const BookShelfList = (props) => {

  return (
      <div className="bookshelf">
          <h2 className="bookshelf-title">{props.shelf}</h2>
          <div className="bookshelf-books">
              <ol className="books-grid">
                  {
                      props.books.map((book) => (
                          <li key={book.id}>
                              <div className="book">
                                  <div className="book-top">
                                      <div className="book-cover" style={{
                                          width: 128,
                                          height: 174,
                                          backgroundImage: `url(${book.imageLinks.thumbnail})`
                                      }}>
                                      </div>
                                      <div className="book-shelf-changer">
                                          {/* {console.log(book)} */}
                                          <select
                                              value={book.shelf}
                                              onChange={(event) => props.onChange(book, event.target.value)}
                                          >
                                              <option value="none" disabled="disabled">Move to...</option>
                                              <option value="currentlyReading">Currently Reading</option>
                                              <option value="wantToRead">Want to Read</option>
                                              <option value="read">Read</option>
                                              <option value="none">None</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div className="book-title">{book.title}</div>
                                  <div className="book-authors">{book.authors}</div>
                              </div>
                          </li>
                      ))
                  }
              </ol>
          </div>
      </div>
  );
}


const BookShelf = (props) => {
  return (
	  <div className="list-books">
		  <div className="list-books-title">
			  <h1>MyReads</h1>
		  </div>
		  <div className="list-books-content">
			  <div>
				  <Route render={() => (
					  <BookShelfList shelf="Currently Reading"
						  books={props.books.filter((book) => book.shelf === 'currentlyReading')} onChange={props.onChange}
					  />
				  )}/>
				  <Route render={() => (
					  <BookShelfList shelf="Want to Read"
						  books={props.books.filter((book) => book.shelf === 'wantToRead')} onChange={props.onChange}
					  />
				  )}/>
				  <Route render={() => (
					  <BookShelfList shelf="Read"
						  books={props.books.filter((book) => book.shelf === 'read')} onChange={props.onChange}
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
  );
}


export default BookShelf
