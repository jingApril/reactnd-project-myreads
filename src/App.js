import React from 'react';
import { Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

	state = {
		query: '',
		books: []
	}

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({books : books})
		})
	}

	onChangeStatus = (book, shelf) => {
		 let newBook = book
		 newBook.shelf = shelf
		 this.setState((state) => {
		   books: (state.books.filter((b) => b.id !== newBook.id).concat(newBook))
		 })
		 BooksAPI.update(newBook, shelf).then(console.log(BooksAPI.getAll()))
	 }


	render() {

		return (
			<div className="app">
				<Route  exact path='/' render={() => (
					<BookShelf
						books={this.state.books}
						onChange={this.onChangeStatus}
					/>
				)}/>
				<Route path='/search' render={({history}) => (
					<SearchPage
						books={this.state.books}
						onChange={(book, shelf) => {
							this.onChangeStatus(book, shelf)
							history.push('/')
						}}
					/>
				)}/>
			</div>
		)

	}

}

export default BooksApp
