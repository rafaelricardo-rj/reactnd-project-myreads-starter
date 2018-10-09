/*
  App.js Main class
  This is a fork of a project made by Udacity.com to their students.
  The original project is in https://github.com/udacity/reactnd-project-myreads-starter
  This fork is in https://github.com/rafaelricardo-rj/reactnd-project-myreads-starter and has
  been improved with more functions to test all the knowledge acquired in the course called
  Become a Professional React Developer. Link: https://eu.udacity.com/course/react-nanodegree--nd019

  The point is to create shelfs with Books that you have read, want to read or that you are currently reading
  This project is part of module 1 of course called Fundamentals of React. This part don't have Redux

  What are the improvement has been created?
  [ First Page (Main page) ]
  1 - Move a book from a shelf to another through of "select option"
  2 - Move a book from a shelf to another Dragging and drop the Book to other shelf
  3 - Move a batch of books from a shelf to another using checkbox
  4 - Link to go to the book details page
  5 - Counter of books per shelf
  [ Second Page (Search) ]
  1 - Start search after 3 characters typed minimum
  2 - On result of search, show a label on the book with the name of the shelf if it is already in your library
  3 - Move a book from a shelf to another through of "select option"
  4 - Add a new book to the library in specific shelf
  5 - Link to go to the book details page
  [ Third page (Details Book) ]
  1 - Show more informations of the book as Publisher, Page count, Published date, Author and Categorie
  2 - Button to redirect to a page where you can buy the book

  Components Created:
    1 - Bookshelf.js -> Bookshel represent a shelf with a specific status reading and implement an <ol> tag.
          Parameters:
            books         - Array with all books of same status reading. Eg: currentlyReading|wantToRead|read (Parameter Required)
            onChangeShelf - Function in App.js that make the change of a shelf to another (Parameter Required)
            statusBook    - This parameter define o name of shelf. It is an object. Eg: {"name": "currentlyReading", "viewName": "Currently Reading"} (Parameter Required)
    2 - WidgetBook.js -> WidgetBook represent a book with cover, title and options to move to other shelf. it implement as return an <li> tag.
          Parameters:
            book          - It is an Object that represent a book with all details (Parameter Required)
            onChangeShelf - Function in App.js that make the change of a shelf to another (Parameter Required)
            showStatus    - Boolean to show or not a label on the book warnning the status of reading: currentlyReading|wantToRead|read (Parameter Required)
            draggable     - Boolean to enable or not dragging the WidgetBook to another shelf. (Parameter Required)
            shelf         - Define the status of reading. It is an object. Eg: {"name": "currentlyReading", "viewName": "Currently Reading"} (Parameter NOT Required)
            bookMarked    - If WidgetBook is called from Bookshelf.js, it must be a function. In this case, it is a function
                            in Bookshelf.js called checkBoxAction. This function enable or not the checkbox to be marked
                            to change books in batch. If WidgetBook.js is called from Search.js component, it must be false as
                            the result of search can't creating WidgetBook with checkbox.
    3 - SearchBooks.js -> Render a <ol> with WidgetBook inside. this component use the API BooksApi to search Books
                          and return a list.
          Parameters: none.

    Author of implementations: Rafael Ricardo
    Email: rafael_rikardo@yahoo.com.br
*/
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

/*
  This method run after the component is mounted
*/
  componentDidMount(){
    this.loadBooks()
  }

/* Get all books from your library and split in status of reading */
  loadBooks = () => {
    BooksAPI.getAll().then((shelf) => { this.setState({
        allBooks: shelf.sort(sortBy('title')),
        shelfCR: shelf.filter((b) => b.shelf === "currentlyReading").sort(sortBy('title')),
        shelfWR: shelf.filter((b) => b.shelf === "wantToRead").sort(sortBy('title')),
        shelfR: shelf.filter((b)  => b.shelf === "read").sort(sortBy('title'))
      })
    })
  }
/*
  This method move the book to another shelf.
  After update the API, it remove the book from old shelf and add it to the new shelf.
  Then, check if the book is already in your library making a filter in the state allBooks.
  If it is in allBooks, then update the shelf, else, add the book to allBooks Array.
  This part is necessaire because the Component WidgetBook.js depend on that state(allBooks) updated

  @book:     Object
  @newShelf: String
*/
  changeBookShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf)
    this.removeBook(book)
    this.addBook(book, newShelf)

    let bookExist
    bookExist = this.state.allBooks.filter((b) => (b.id === book.id))
    if(bookExist.length > 0){
      this.state.allBooks.map((b) => {
        if(b.id === book.id){
          b.shelf = newShelf;
        }
        return null
      })
    } else {
      this.setState({ allBooks: this.state.allBooks.concat(book) })
    }
  }

/* Remove a book from a shelf
  @book: Object
*/
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

/* Add a book to a shelf
  @book:     Object
  @newShelf: String
*/
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
        <Route path="/search" render={() => (
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
