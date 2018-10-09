/*
Bookshelf.js -> Bookshel represent a shelf with a specific status reading and implement an <ol> tag.
  Parameters:
    books         - Array with all books of same status reading. Eg: currentlyReading|wantToRead|read (Parameter Required)
    onChangeShelf - Function in App.js that make the change of a shelf to another (Parameter Required)
    statusBook    - This parameter define o name of shelf. It is an object.
                    Eg: {"name": "currentlyReading", "viewName": "Currently Reading"} (Parameter Required)
*/
import React, { Component } from 'react'
import WidgetBook from './WidgetBook'
import PropTypes from 'prop-types'

class Bookshelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    statusBook: PropTypes.object.isRequired
  }

  state = {
    classMoveButton: "hide"
  }

  componentWillMount = () => {
    this.checkBoxNewSet()
  }

  onDragOver = (ev) => {
    ev.preventDefault()
  }

  onDrop = (ev, shelf) => {
    let book = JSON.parse(ev.dataTransfer.getData("book"));
    /* It does not allowed to put a book in a shelf that this book already exist */
    if(shelf !== book.shelf){
        this.props.onChangeShelf(book, shelf)
    }
  }

/* Create a new Set() to storage the books checked during Drag and Drop event */
  checkBoxNewSet = () => { this.selectedCheckboxes = new Set() }

/*
  Check if the book already exist in the set, remove it or add
  @book: Object
*/
  checkBoxAction = book => {
    if (this.selectedCheckboxes.has(book)) {
      this.selectedCheckboxes.delete(book);
    } else {
      this.selectedCheckboxes.add(book);
    }
    this.showHideMoveButton()
  }

/* This method iterate the set applying a moving of shelf for each book. After that the set is clean up
  @newShelf: String
*/
  changeBookInBatchTo = (newShelf) => {
    for (const book of this.selectedCheckboxes) {
      this.props.onChangeShelf(book, newShelf)
    }
    this.selectedCheckboxes.clear()
    this.showHideMoveButton()
  }

/* This only show or hide a select options according if some book is checked(checkbox) or not*/
  showHideMoveButton = () => {
    this.selectedCheckboxes.size > 0 ? this.setState({ classMoveButton: "btn-group dropdown" }) : this.setState({ classMoveButton: "hide" })
  }

  render(){
    //console.log('Props: ', this.props)
    const { books, onChangeShelf, statusBook } = this.props
    return(
      <div className="bookshelf"
        onDragOver={(e)=>this.onDragOver(e)}
        onDrop={(e)=>{this.onDrop(e, `${statusBook.name}`)}}>

        <h2 className="bookshelf-title">{statusBook.viewName}: <span className="badge">{books.length}</span></h2>
        <small>Drag and drop a book to another shelf</small>
        <div className="bookshelf-books">
          {/*this.props.books.map( b => b.title)*/}
          <div className={this.state.classMoveButton}>
            <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Move to...<span className="sr-only"></span>
            </button>
            <div className="dropdown-menu">
              <a className={statusBook.name === "currentlyReading" ? "hide" : 'dropdown-item cursor-pointer'} onClick={() => this.changeBookInBatchTo('currentlyReading')}>Currently Reading</a>
              <a className={statusBook.name === "wantToRead" ? "hide" : 'dropdown-item cursor-pointer'} onClick={() => this.changeBookInBatchTo("wantToRead")}>Want to Read</a>
              <a className={statusBook.name === "read" ? "hide" : 'dropdown-item cursor-pointer'} onClick={() => this.changeBookInBatchTo("read")}>Read</a>
            </div>
          </div>
          <ol className="books-grid">

            {books.map((book) => (
              <WidgetBook key={book.id} book={book} onChangeShelf={onChangeShelf} showStatus={false} shelf={statusBook} bookMarked={this.checkBoxAction} draggable={true}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
