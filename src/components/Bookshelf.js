import React, { Component } from 'react'
import WidgetBook from './WidgetBook'

class Bookshelf extends Component {

  onDragOver = (ev) => {
    ev.preventDefault()
  }

  onDrop = (ev, shelf) => {
    let book = ev.dataTransfer.getData("book");
    this.props.onChangeShelf(JSON.parse(book), shelf)
  }

  render(){
    //console.log('Props: ', this.props)
    const { books, onChangeShelf, statusBook } = this.props
    return(
      <div className="bookshelf"
        onDragOver={(e)=>this.onDragOver(e)}
        onDrop={(e)=>{this.onDrop(e, `${statusBook.name}`)}}>

        <h2 className="bookshelf-title">{statusBook.viewName}</h2>
        <div className="bookshelf-books">
          {/*this.props.books.map( b => b.title)*/}
          <WidgetBook books={books} onChangeShelf={onChangeShelf} shelf={statusBook}/>
        </div>
      </div>
    )
  }
}

export default Bookshelf
