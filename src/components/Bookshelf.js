import React, { Component } from 'react'
import WidgetBook from './WidgetBook'

class Bookshelf extends Component {

  render(){
    console.log('Props: ', this.props)
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.statusBook}</h2>
        <div className="bookshelf-books">
          {/*this.props.books.map( b => b.title)*/}
          <WidgetBook books={this.props.books}/>
        </div>
      </div>
    )
  }
}

export default Bookshelf
