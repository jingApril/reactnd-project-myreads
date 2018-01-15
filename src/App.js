import React from 'react';
import {Route} from 'react-router-dom'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

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
		BooksAPI.update(newBook, shelf)
	}



	render() {

		return (
			<div className="app">
				<Route path='/search' render={({history}) => (
					<SearchPage

						onChange={(book, shelf) => {
							this.onChangeStatus(book, shelf)
							history.push('/')
						}}/>
				)}/>
				<Route exact path='/' render={() => (
					<BookShelf
						books={this.state.books}
						onChange={this.onChangeStatus}
					/>
				)}/>
			</div>
		)

	}

}

export default BooksApp
