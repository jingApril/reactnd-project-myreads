import React from 'react'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'

class SearchPage extends React.Component {
	static propTypes = {
	  books: PropTypes.array.isRequired,
	  onChange: PropTypes.func.isRequired
    }

	state = {
		query: '',
		books: [],
		searchBooks: []
	}

	constructor(props) {
		super(props);
		this.state = { searchBooks: [] };
    }

	updateQuery = (query) => {
		this.setState({query: query.trim()});
		this.searchBook(query);

	}

	clearQuery = () => {
		this.setState({query: ''})
	}

	searchBook = (query) => {
		BooksAPI.search(query,20).then((books) => {
			if (!books || books.error) {
				this.setState({searchBooks: []});
			} else {
			  this.setState({searchBooks : books})
			}
		})

	}

	render() {

		if(this.state.searchBooks !== []) {
			 this.state.searchBooks.map((bookonSearch) => {
			  this.props.books.map((bookonShelf) => {
					if(bookonShelf.id === bookonSearch.id)
					{
						bookonSearch.shelf= bookonShelf.shelf
						return bookonSearch
					}
				})
			})
		}
		return (
			<div className="search-books">
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
							onChange={this.props.onChange}
						/>
					)}/>

				</div>
			</div>
		)
	}

}

export default SearchPage
