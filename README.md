### Comments about new resources made by Rafael Ricardo

This is a fork of a project made by Udacity.com to their students.
The original project is in https://github.com/udacity/reactnd-project-myreads-starter
This fork is in https://github.com/rafaelricardo-rj/reactnd-project-myreads-starter and has
been improved with more functions to test all the knowledge acquired in the course called
Become a Professional React Developer. Link: https://eu.udacity.com/course/react-nanodegree--nd019

The point is to create shelfs with Books that you have read, want to read or that you are currently reading
This project is part of module 1 of course called Fundamentals of React. This part don't have Redux

What are the improvement has been created?

* [ First Page (Main page) ]
+ 1 - Move a book from a shelf to another through of "select option"
+ 2 - Move a book from a shelf to another Dragging and drop the Book to other shelf
+ 3 - Move a batch of books from a shelf to another using checkbox
+ 4 - Link to go to the book details page
+ 5 - Counter of books per shelf
* [ Second Page (Search) ]
+ 1 - Start search after 3 characters typed minimum
+ 2 - On result of search, show a label on the book with the name of the shelf if it is already in your library
+ 3 - Move a book from a shelf to another through of "select option"
+ 4 - Add a new book to the library in specific shelf
+ 5 - Link to go to the book details page
* [ Third page (Details Book) ]
+ 1 - Show more informations of the book as Publisher, Page count, Published date, Author and Categorie
+ 2 - Button to redirect to a page where you can buy the book

* Components Created:
  + 1 - Bookshelf.js -> Bookshel represent a shelf with a specific status reading and implement an "ol" tag.
        * Parameters:
          + books         - Array with all books of same status reading. Eg: currentlyReading|wantToRead|read (Parameter   Required)
          + onChangeShelf - Function in App.js that make the change of a shelf to another (Parameter Required)
          + statusBook    - This parameter define o name of shelf. It is an object. Eg: {"name": "currentlyReading", "viewName": "Currently Reading"} (Parameter Required)
  + 2 - WidgetBook.js -> WidgetBook represent a book with cover, title and options to move to other shelf. it implement as return an <li> tag.
        * Parameters:
          + book          - It is an Object that represent a book with all details (Parameter Required)
          + onChangeShelf - Function in App.js that make the change of a shelf to another (Parameter Required)
          + showStatus    - Boolean to show or not a label on the book warnning the status of reading: currentlyReading|wantToRead|read (Parameter Required)
          + draggable     - Boolean to enable or not dragging the WidgetBook to another shelf. (Parameter Required)
          + shelf         - Define the status of reading. It is an object. Eg: {"name": "currentlyReading", "viewName": "Currently Reading"} (Parameter NOT Required)
          + bookMarked    - If WidgetBook is called from Bookshelf.js, it must be a function. In this case, it is a      function in Bookshelf.js called checkBoxAction. This function enable or not the checkbox to be marked to change books in batch. If WidgetBook.js is called from Search.js component, it must be false as the result of search can't creating WidgetBook with checkbox.
  + 3 - SearchBooks.js -> Render a <ol> with WidgetBook inside. this component use the API BooksApi to search Books and    return a list.
        * Parameters: none.

  * Author of implementations: Rafael Ricardo
  * Email: rafael_rikardo@yahoo.com.br

(ORIGINAL README.MD UDACITY BELOW)
# MyReads Project

This is the starter template for the final assessment project for Udacity's React Fundamentals course. The goal of this template is to save you time by providing a static example of the CSS and HTML markup that may be used, but without any of the React code that is needed to complete the project. If you choose to start with this template, your job will be to add interactivity to the app by refactoring the static code in this template.

Of course, you are free to start this project from scratch if you wish! Just be sure to use [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap the project.

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
