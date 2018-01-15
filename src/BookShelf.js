import React from 'react';
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import BookShelfList from './BookShelfList'

class BookShelf extends React.Component {

	state = {
		query: '',
		books: [],
		searchBooks: []
	}

	render() {
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<Route render={() => (
							<BookShelfList shelf="Currently Reading"
								books={this.props.books.filter((book) => book.shelf === 'currentlyReading')} onChange={this.props.onChange}
							/>
						)}/>
						<Route render={() => (
							<BookShelfList shelf="Want to Read"
								books={this.props.books.filter((book) => book.shelf === 'wantToRead')} onChange={this.props.onChange}
							/>
						)}/>
						<Route render={() => (
							<BookShelfList shelf="Read"
								books={this.props.books.filter((book) => book.shelf === 'read')} onChange={this.props.onChange}
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
