import React from 'react';
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'

class SearchPage extends React.Component {
	state = {
		query: '',
		books: [],
		searchBooks: []
	}
	
	updateQuery = (query) => {
		this.setState({query: query.trim()});
		this.searchBook(query);

	}

	clearQuery = () => {
		this.setState({query: ''})
	}
	searchBook = (query) => {
		BooksAPI.search(query, 20).then((books) => {
			if (!books || books.error) {
				this.setState({searchBooks: []});
			} else {
				this.setState({searchBooks: books});
			}
		});
	}

	render() {

		return (<div className="search-books">
			<div className="search-books-bar">
				<Link to='/' className="close-search">
					Close
				</Link>
				<div className="search-books-input-wrapper">
					<input type="text" placeholder="Search by title or author"
						value={this.state.query}
						onChange={(event) => this.updateQuery(event.target.value)}
					/>
				</div>
			</div>
			<div className="search-books-results">
				<Route render={() => (
					<BookList
						books={this.state.searchBooks}
						onChange={this.props.onChangeStatus}
					/>
				)}/>
			</div>
		</div>)
	}
}
export default SearchPage
