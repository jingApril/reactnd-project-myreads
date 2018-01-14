import React from 'react';
import {Route} from 'react-router-dom'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {}

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  render() {

    return (
        <div className="app">
          <Route path='/search' render={({history}) => (
              <SearchPage onChange={() => {
                //this.onChangeStatus(book,status)
                history.push('/')
              }}/>
          )}/>

          <Route  path='/' render={() => (
            <BookShelf />
          )}/>
       </div>
    )

 }

}

export default BooksApp
