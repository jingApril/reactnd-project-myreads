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

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({books})
		})
	}

	onChangeStatus = (book, shelf) => {
		let newBook = book
		newBook.shelf = shelf
		this.setState((prevState) => {
			books : (prevState.books.filter((b) => b.id !== newBook.id).concat(newBook))
		})
		BooksAPI.update(newBook, shelf).then(console.log(BooksAPI.getAll()))
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
				<Route render={() => (<BookList books={this.state.searchBooks} onChange={this.onChangeStatus}/>)}/>
			</div>
		</div>)
	}
}
export default SearchPage
