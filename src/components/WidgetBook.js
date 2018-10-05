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
    showStatus: PropTypes.bool.isRequired
  }

  componentDidMount(){
    if(this.props.book.shelf){
        this.enableDisableChangeShelf(this.props.book)
        if(this.state.showLabelStatus){ this.setState({ currentStatusReading: this.props.book.shelf }) }
    }

    //this.enableDisableChangeShelf({"shelf": this.props.shelf.name})
    //this.enableDisableChangeShelf(this.props.shelf)
    //console.log({"book": [{"shelf": this.props.shelf.name}]});
  }
  onDragStart = (ev, book) => {
    //console.log('dragstart', book)
    ev.dataTransfer.setData('book', JSON.stringify(book))
  }

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

  changeShelf = (book, newShelf) => {
      this.props.onChangeShelf(book, newShelf)
      book.shelf = newShelf
      this.enableDisableChangeShelf(book)
      this.setState({currentStatusReading: newShelf})
  }

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
            {/*this.enableDisableChangeShelf(book)*/}

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

                    {/*<option onClick={ () => teste() } value="none">None</option>*/}
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
