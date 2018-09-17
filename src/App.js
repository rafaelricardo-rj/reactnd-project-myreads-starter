import React from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Bookshelf from './components/Bookshelf'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:   [],
    shelfCR: [],
    shelfWR: [],
    shelfR:  [],
    statusReading: [
      "Currently Reading",
      "Want to Read",
      "Read"
    ]
  }

  componentDidMount(){
    //BooksAPI.getAll().then((books) => { this.setState({ books: books }) })
    BooksAPI.getAll().then((shelf) => { this.setState({
        shelfCR: shelf.filter((b) => b.shelf === "currentlyReading"),
        shelfWR: shelf.filter((b) => b.shelf === "wantToRead"),
        shelfR: shelf.filter((b) => b.shelf === "read")
      })
    })
  }

  render() {
    return (
      <div className="app">
        {/*console.log(this.state.books.map((book) => this.state.books[1].shelf)[0])*/}
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>
        <Route exact path="/" render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf books={this.state.shelfCR} statusBook={this.state.statusReading[0]}/>
              <Bookshelf books={this.state.shelfWR} statusBook={this.state.statusReading[1]}/>
              <Bookshelf books={this.state.shelfR} statusBook={this.state.statusReading[2]}/>
            </div>
          </div>
          <div className="open-search">
            <Link
              to="/search"
              className='add-contact'>
              Add a book
            </Link>
          </div>
        </div>
      )}/>

      </div>
    )
  }
}

export default BooksApp
