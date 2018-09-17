import React, { Component } from 'react'
//import WidgetBookOptionSelect from './WidgetBookOptionSelect'

class WidgetBook extends Component {

  render(){
    //console.log('Props: ', this.props)
    return(
      <ol className="books-grid">
        {this.props.books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                <div className="book-shelf-changer">
                  {/* select here */}
                  <select>
                    <option value="move">Choose an Option</option>
                    <option value="currentlyReading" disabled={book.shelf === "currentlyReading" ? "disabled" : ''}>Currently Reading</option>
                    <option value="wantToRead" disabled={book.shelf === "wantToRead" ? "disabled" : ''}>Want to Read</option>
                    <option value="read" disabled={book.shelf === "read" ? "disabled" : ''}>Read</option>
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
