import React from 'react';

class BookShelfList extends React.Component {
  state = {}
   render() {
      return (
        <div className="bookshelf">
            <h2 className="bookshelf-title"> {this.props.shelf}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      this.props.books.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{
                                              width: 128,
                                              height: 174,
                                              backgroundImage: `url(${book.imageLinks.thumbnail})`
                                            }}>
                                            </div>
                                 {/* {console.log(book)} */}
                                        <div className="book-shelf-changer">
                            <select
                            value={book.shelf}
                            onChange={(event) => this.props.onChange(book,event.target.value)}
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

    )
  }
}

export default BookShelfList
