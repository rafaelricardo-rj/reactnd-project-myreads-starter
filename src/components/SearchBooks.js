import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import WidgetBook from './WidgetBook'

class SearchBooks extends React.Component {
  state = {
    resultBooks: [],
    querySearch: ''
  }

componentWillMount = () => {

}

updateQuery = (query) => {

  this.setState({ querySearch: query });
  if(this.state.querySearch.length >= 2 ){
    BooksAPI.search(this.state.querySearch).then((books) => {
      this.setState({ resultBooks: books })
    })
  }
}

clearQuery = () => {
  this.setState({ querySearch: '' })
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

  showingBooks.map((b) => {
    allbooks.map((ab) => {
      if(ab.id === b.id){ b.shelf = ab.shelf }
    })
  })

  showingBooks.sort(sortBy('title'))

  return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className='close-search'>Close</Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input onChange={(event) => this.updateQuery(event.target.value)} value={this.state.querySearch} type="text" placeholder="Search by title or author"/>

        </div>
      </div>
      <div className="search-books-results">
        {showingBooks.length > 0 && (

          <ol className="books-grid">
            {showingBooks.map((book) => (

              //checkBook = this.props.allBooks.filter((b) => {b.id === book.id})
              //  checkBook ? console.log(checkBook) : console.log('nof')
              <WidgetBook key={book.id} book={book} onChangeShelf={this.props.onChangeShelf} shelf={{}} showStatus={true} bookMarked={false} draggable={false}/>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
}

export default SearchBooks
