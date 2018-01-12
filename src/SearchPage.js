import React from 'react';
import { Route } from 'react-router-dom'
import {Link} from 'react-router-dom'
import BooksAPI from './BooksAPI'
import BookList from './BookList'
import PropTypes from 'prop-types'

class SearchPage extends React.Component {

	static propTypes = {
		books: PropTypes.array.isRequired
	}
	state = {
		query: '',
		books: []
	}

	searchQuery = (query) => {
       this.setState({ query: query });
       this.searchBook(query);
    }

	clearQuery = () => {
		this.setState({query: ''})
	}

	searchBook = (query) => {
		BooksAPI.search(query, 20).then((books) => {
			if (!books || books.error) {
				this.setState({books})
			} else {
				this.setState({books: []});
			}
		});
	}

	render() {
        { console.log(this.state.books) }

		return (<div className="search-books">
			<div className="search-books-bar">

				<Link to='/' className="close-search">
					Close
				</Link>

				<div className="search-books-input-wrapper">
					<input type="text" placeholder="Search by title or author"
						value={this.state.query}
						onChange={(event) => this.searchQuery(event.target.value)}
					/>
				</div>
			</div>
			<div className="search-books-results">

				<Route render={() => (
					<BookList
						books={this.state.books}
						onChange={this.props.onChangeStatus}
					/>
				)}
				/>

			</div>
		</div>)
	}
}
export default SearchPage
