import React, { Component } from 'react'

class WidgetBook extends Component {

  render(){
    //console.log('Props: ', this.props)
    const { books, onChangeShelf, shelf } = this.props
    return(
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                <div className="book-shelf-changer">
                  {/* select here */}
                  <select>
                    <option value="move">Choose an Option</option>
                    <option onClick={ () => onChangeShelf(book, "currentlyReading") } value="currentlyReading" disabled={shelf === "Currently Reading" ? "disabled" : ''}>Currently Reading</option>
                    <option onClick={ () => onChangeShelf(book, "wantToRead") } value="wantToRead" disabled={shelf === "Want to Read" ? "disabled" : ''}>Want to Read</option>
                    <option onClick={ () => onChangeShelf(book, "read") } value="read" disabled={shelf === "Read" ? "disabled" : ''}>Read</option>
                    {/*<option value="none">None</option>*/}
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.subtitle}</div>
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default WidgetBook
