import React from 'react'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Bookshelf from './components/Bookshelf'
import SearchBooks from './components/SearchBooks'
import BookDetails from './BookDetails'
import './App.css'

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    shelfCR: [],
    shelfWR: [],
    shelfR:  [],
    statusReading: [
      {"name": "currentlyReading", "viewName": "Currently Reading"},
      {"name": "wantToRead", "viewName": "Want to Read"},
      {"name": "read", "viewName": "Read"}
    ],
    querySearch: '',
    showingBooks: []
  }

  componentDidMount(){
    /*BooksAPI.getAll().then((books) => { this.setState({ books: books }) })*/
    this.loadBooks()
    //this.setState({ showingBooks: BooksAPI.search('And')} )
  }

  loadBooks = () => {
    BooksAPI.getAll().then((shelf) => { this.setState({
        allBooks: shelf.sort(sortBy('title')),
        shelfCR: shelf.filter((b) => b.shelf === "currentlyReading").sort(sortBy('title')),
        shelfWR: shelf.filter((b) => b.shelf === "wantToRead").sort(sortBy('title')),
        shelfR: shelf.filter((b)  => b.shelf === "read").sort(sortBy('title'))
      })
    })
  }

  changeBookShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf)
    this.removeBook(book)
    this.addBook(book, newShelf)
    this.state.allBooks.map((b) => {
      if(b.id === book.id){
        b.shelf = newShelf;
      }
    })
  }

  removeBook = (book) => {
    switch (book.shelf) {
      case "currentlyReading":this.setState((state) => ({ shelfCR: state.shelfCR.filter((b) => b.id !== book.id) }))
        break;
      case "wantToRead":this.setState((state) => ({ shelfWR: state.shelfWR.filter((b) => b.id !== book.id) }))
        break;
      case "read":this.setState((state) => ({ shelfR: state.shelfR.filter((b) => b.id !== book.id) }))
        break;
      default:
    }
  }

  addBook = (book, newShelf) => {
    book.shelf = newShelf
    switch (book.shelf) {
      case "currentlyReading":this.setState((state) => ({ shelfCR: state.shelfCR.concat([book]).sort(sortBy('title')) }))
        break;
      case "wantToRead":this.setState((state) => ({ shelfWR: state.shelfWR.concat([book]).sort(sortBy('title')) }))
        break;
      case "read":this.setState((state) => ({ shelfR: state.shelfR.concat([book]).sort(sortBy('title')) }))
        break;
      default:
    }
  }

  render() {

    return (
      <div className="app">
        <Route exact path="/book_details/:idBook" component={BookDetails} />
        <Route path="/search" render={({ history }) => (
            <SearchBooks onChangeShelf={this.changeBookShelf} allbooks={this.state.allBooks} />
        )}/>
        <Route exact path="/" render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {/*<Bookshelf books={this.state.books} />*/}
              <Bookshelf books={this.state.shelfCR} statusBook={this.state.statusReading[0]} onChangeShelf={this.changeBookShelf}/>
              <Bookshelf books={this.state.shelfWR} statusBook={this.state.statusReading[1]} onChangeShelf={this.changeBookShelf}/>
              <Bookshelf books={this.state.shelfR} statusBook={this.state.statusReading[2]} onChangeShelf={this.changeBookShelf}/>
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
