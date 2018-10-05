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
    if(shelf !== book.shelf){
        this.props.onChangeShelf(book, shelf)
    }
  }

  checkBoxNewSet = () => { this.selectedCheckboxes = new Set() }

  checkBoxAction = book => {
    if (this.selectedCheckboxes.has(book)) {
      this.selectedCheckboxes.delete(book);
    } else {
      this.selectedCheckboxes.add(book);
    }
    this.showHideMoveButton()
  }

  changeBookInBatchToCurrenTlyReading = () => {
    for (const book of this.selectedCheckboxes) {
      this.props.onChangeShelf(book, 'currentlyReading')
    }
    this.selectedCheckboxes.clear()
    this.showHideMoveButton()
  }

  changeBookInBatchToWantToRead = () => {
    for (const book of this.selectedCheckboxes) {
      this.props.onChangeShelf(book, 'wantToRead')
    }
    this.selectedCheckboxes.clear()
    this.showHideMoveButton()
  }

  changeBookInBatchToRead = () => {
    for (const book of this.selectedCheckboxes) {
      this.props.onChangeShelf(book, 'read')
    }
    this.selectedCheckboxes.clear()
    this.showHideMoveButton()
  }

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
              <a className={statusBook.name === "currentlyReading" ? "hide" : 'dropdown-item cursor-pointer'} onClick={this.changeBookInBatchToCurrenTlyReading}>Currently Reading</a>
              <a className={statusBook.name === "wantToRead" ? "hide" : 'dropdown-item cursor-pointer'} onClick={this.changeBookInBatchToWantToRead}>Want to Read</a>
              <a className={statusBook.name === "read" ? "hide" : 'dropdown-item cursor-pointer'} onClick={this.changeBookInBatchToRead}>Read</a>
            </div>
          </div>
          <ol className="books-grid">

            {books.map((book) => (
              <WidgetBook key={book.id} book={book} onChangeShelf={onChangeShelf} showStatus={false} shelf={statusBook} bookMarked={this.checkBoxAction} draggable={true}/>
            ))}
          </ol>
        {/*<PanelOptions
            shelf={statusBook.name}
            changeBook={this.changeBookInBatch}
            bookMarked={this.checkBoxAction}
            books={books}
            bookToCR={this.changeBookInBatchToCurrenTlyReady}
            bookToWR={this.changeBookInBatchToWantToReady}
            bookToR={this.changeBookInBatchToRead}
            />*/}
          {/*<WidgetBook books={books} onChangeShelf={onChangeShelf} shelf={statusBook} bookMarked={this.checkBoxAction} draggable={true}/>*/}
        </div>
      </div>
    )
  }
}

export default Bookshelf
