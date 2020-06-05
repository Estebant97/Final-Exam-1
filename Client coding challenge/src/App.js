import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

const URL = "https://www.googleapis.com/books/v1/volumes?q=";

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      //books = [],
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let value = document.querySelector('#form').value;
    console.log(value);
  }

  render(){

    const books = this.props;
    return(
      <div>
        <BookForm/>
      </div>
    )
  }

}

export default App;
