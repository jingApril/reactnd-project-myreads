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

	onChangeStatus = (book, shelf) => {
		let newBook = book
		newBook.shelf = shelf
		this.setState((prevState) => {
			books : (prevState.books.filter((b) => b.id !== newBook.id).concat(newBook))
		})
		BooksAPI.update(newBook, shelf)
	}

	searchBook = (query) => {

		BooksAPI.search(query,20).then((books) => {
			if (!books || books.error) {
				this.setState({searchBooks: []});
			} else {
			   this.setState({ searchBooks : books})

			books.map((bookonSearch) => this.props.books.map( => (bookonShelf)
					    {
						 if(bookonShelf.id === bookonSearchk.id)
						 {
						 bookonShelf.shelf = bookonSearch.shelf
						 }
				        return bookonShelf
			           }
			 ))

			}
		})
   }

	render() {
		const BooksOnShelf= this.props.books
	    const BooksFromSearch= this.state.searchBooks


        {console.log(BooksFromSearch)}
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
