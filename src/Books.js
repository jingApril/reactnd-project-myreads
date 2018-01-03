import React from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'

class Books extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired
    }
    state = {
        query: ''
    }
    updateQuery = (query) => {
        this.setState({query: query.trim()})
    }
    clearQuery = () => {
        this.setState({query: ''})
    }

    render() {

        const {books} = this.props
        const {query} = this.state

        let showingBooks
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingBooks = books.filter((contact) => match.test(contact.name))
        } else {
            showingBooks = books
        }
        return (
          <ol className="books-grid">
            {
                showingBooks.map((item) => (
                    <li key={item.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{
                                        width: 128,
                                        height: 174,
                                        backgroundImage: `url(${item.imageLinks})`
                                    }}></div>
                                    {console.log(item)}
                                <div className="book-shelf-changer">
                                    <select>
                                        <option value="none" disabled="disabled">Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{item.title}</div>
                            <div className="book-authors">{item.authors}</div>
                        </div>
                    </li>
                ))
            }            
        </ol>
      )
    }
}
export default Books
