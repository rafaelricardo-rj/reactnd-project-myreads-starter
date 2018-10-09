/*
SearchBooks.js -> Render a <ol> with WidgetBook inside. this component use the API BooksApi to search Books
                  and return a list.
      Parameters: none.
*/
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import WidgetBook from './WidgetBook'

class SearchBooks extends React.Component {
  state = {
    resultBooks: [],
    querySearch: ''
  }

  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    allbooks: PropTypes.array.isRequired
  }

/*
  Refresh the query search after 3 characters typed and save the result in the State: resultBooks.
  @query: String
*/
updateQuery = (query) => {
  this.setState({ querySearch: query });
  if(this.state.querySearch.length >= 2 ){
    BooksAPI.search(this.state.querySearch).then((books) => {
      this.setState({ resultBooks: books })
    })
  }
}

render(){

  const { resultBooks, querySearch } = this.state
  const { allbooks, onChangeShelf } = this.props
  let showingBooks = []

  if(resultBooks.error === 'empty query'){
    console.log("Book not found");
  } else if(resultBooks.length > 0){
    const match = new RegExp(escapeRegExp(querySearch), 'i')
    showingBooks = resultBooks.filter((resultBooks) => match.test(resultBooks.title))
  }

/* this part check wich books  from result is already in your library,
   if it is true, add a parameter called "shelf" with the currently status reading.
   This part is necessaire to the WidgetBook component to know what books must have label
   with name of their status and enable/disabe Buttons to move it corretly between shelfs*/
  showingBooks.map((b) => (
    allbooks.map((ab) => {
      if(ab.id === b.id){ b.shelf = ab.shelf }
      return null
    })
  ))

  showingBooks.sort(sortBy('title'))

  return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className='close-search'>Close</Link>
        <div className="search-books-input-wrapper">
          <input onChange={(event) => this.updateQuery(event.target.value)} value={this.state.querySearch} type="text" placeholder="Search by title or author"/>
        </div>
      </div>
      <div className="search-books-results">
        {showingBooks.length > 0 && (
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <WidgetBook key={book.id} book={book} onChangeShelf={onChangeShelf} shelf={{}} showStatus={true} bookMarked={false} draggable={false}/>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
}

export default SearchBooks
