/*
WidgetBook.js -> WidgetBook represent a book with cover, title and options to move to other shelf. it implement as return an <li> tag.
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
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class WidgetBook extends Component {

  state = {
    optSendToCR: false,
    optSendToWR: false,
    optSendToR: false,
    currentStatusReading: '',
    checkBox: false,
    showLabelStatus: this.props.showStatus
  }
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    showStatus: PropTypes.bool.isRequired,
    draggable: PropTypes.bool.isRequired
  }

/* Execute after component is mounted. Verify if the shelf parameter is declared
  in the book object, if yes, then enable/disable the buttons to move from shelf and show the label of current shelf*/
  componentDidMount(){
    if(this.props.book.shelf){
        this.enableDisableChangeShelf(this.props.book)
        if(this.state.showLabelStatus){ this.setState({ currentStatusReading: this.props.book.shelf }) }
    }
  }
  /*
  Drag event.
  @ev: event
  @book: Object
  */
  onDragStart = (ev, book) => {
    //console.log('dragstart', book)
    ev.dataTransfer.setData('book', JSON.stringify(book))
  }

/* Enable/disable options in select according to the current shelf of Book object */
  enableDisableChangeShelf = (book) => {
    //console.log(book);
    if(book.shelf){
      switch (book.shelf) {
        case 'currentlyReading':this.setState({ optSendToCR: true, optSendToWR: false, optSendToR: false })
          break;
          case 'wantToRead':this.setState({ optSendToCR: false, optSendToWR: true, optSendToR: false })
            break;
          case 'read':this.setState({ optSendToCR: false, optSendToWR: false, optSendToR: true })
            break;
        default:

      }
    }
  }

/*
  Move the book to other shelf bu before, check if this book has a shelf, if not, add one with the new shelf name
  @book: Object
  @newShelf: String
*/
  changeShelf = (book, newShelf) => {
    if(book.shelf){
      this.props.onChangeShelf(book, newShelf)
    } else {
      book.shelf = newShelf
      this.props.onChangeShelf(book, newShelf)
    }
      this.enableDisableChangeShelf(book)
      this.setState({currentStatusReading: newShelf})
  }

/* Change Checkbox status and add the book selected in the Set() storage function(bookMarked) in App.js */
  toggleCheckboxChange = () => {
    const { bookMarked, book } = this.props

    this.setState(({ checkBox }) => (
      {
        checkBox: !checkBox,
      }
    ))

    bookMarked(book)
  }

  render(){
    //console.log('Props: ', this.props)
    const { book, bookMarked, draggable } = this.props
    return(
          <li key={book.id}
            draggable={draggable}
            onDragStart={(e) => this.onDragStart(e, book)}
            >
            <div className="statusReading-search">{this.state.currentStatusReading}</div>
            <div className="book">
              <div className="book-top">
                {bookMarked !== false && (
                  <div className="chkMoveBook">
                    <label>
                      <input
                        type="checkbox"
                        value={book.id}
                        checked={this.state.checkBox}
                        onChange={this.toggleCheckboxChange}
                        className={book.shelf}
                      />
                    </label>Select
                  </div>
                )}
                <div className={`${draggable ? "book-cover cursor-grab" : "book-cover"}`} style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : require('../icons/no_pic_thin.jpg')}")` }}></div>
                <div className="book-shelf-changer">
                  {/* select here */}
                  <select>
                    <option value="move">Choose an Option</option>
                    <option onClick={ () => this.changeShelf(book, "currentlyReading") } value="currentlyReading" disabled={this.state.optSendToCR}>Currently Reading</option>
                    <option onClick={ () => this.changeShelf(book, "wantToRead") } value="wantToRead" disabled={this.state.optSendToWR}>Want to Read</option>
                    <option onClick={ () => this.changeShelf(book, "read") } value="read" disabled={this.state.optSendToR}>Read</option>
                  </select>
                </div>
              </div>
              <div className="book-title">
                {book.title}&nbsp;
                <Link
                  to= {`book_details/${book.id}`}
                  title="Click to see more details">
                  [...]
                </Link>
              </div>
              <div className="book-authors">{book.subtitle}</div>
            </div>
          </li>
    )
  }
}

export default WidgetBook
