import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BookDetails extends React.Component {

  state = {
    book: [],
    stars: []
  }

componentDidMount () {
  BooksAPI.get(this.props.match.params.idBook).then((book) => {
    this.setState({ book: book })
    this.rating()
  })
}

rating = () => {
  for (let i = 0; i < this.state.book.averageRating; i++){
    this.setState({ stars: this.state.stars.concat({ "id": i, "img": <img src={require("./icons/if_star_299040.png")} alt={'star number '+ i} />}) })
  }
}

render(){
  const { book, stars } = this.state
  return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className='close-search'>Close</Link>
        <div className="search-books-input-wrapper vcenter">

        </div>
      </div>
      <div className="search-books-results">
        <div className="container">
          <div className="row justify-content-sm-center"><h4>{book.title}</h4></div>
          <div className="row justify-content-sm-center">
            <div className="col-sm-auto">
              <img className="align-self-center img-thumbnail" src={book.imageLinks ? book.imageLinks.thumbnail : 'https://morpheudoidao.com.br/no_pic_thin.jpg'} alt={book.title} />
              <div className="row align-self-center">
                <ol className="stars align-self-center">
                  {stars.map((s) => (
                    <li key={s.id}>{s.img}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="col-sm-8 pl-0">
              Authors: <label style={{color: "#2966D1"}}>{book.authors}</label>
              <br />
              Publisher: <label style={{color: "#808080"}}>{book.publisher}</label>
              <br />
              {book.description}
              <br />
              <br />
              <div className="table-responsive">
                <table className="table">
                  <tbody>
                  <tr><td width="30%">Categories</td><td align="left">{book.categories}</td></tr>
                  <tr><td width="30%">Published Date</td><td align="left">{book.publishedDate}</td></tr>
                  <tr><td width="30%">Page Count</td><td align="left">{book.pageCount}</td></tr>
                  <tr>
                    <td colSpan="2" align="center">
                      <a href={book.infoLink} className="btn btn-outline-primary" target="_blank" style={{width: "100px"}}>Buy</a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
}

export default BookDetails
