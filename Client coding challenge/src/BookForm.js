import React from 'react';

const URL = "https://www.googleapis.com/books/v1/volumes?q=";

function handleSubmit(event) {
    event.preventDefault();
    const result = document.querySelector('.result');
    const settings = {
        method: 'GET'
    }
    let value = document.querySelector('#form').value;
    fetch(`${URL}${value}`, settings)
    .then(result => {
        return result.json();
    })
    .then( data => {
        console.log(data.items);
        result.innerHTML = '';
        // loopear para conseguir los datos que necesito
        if( data.totalItems > 0){
        for(let i = 0; i < 10; i++){
            result.innerHTML += `<h1> ${data.items[i].volumeInfo.title} </h1>`
            result.innerHTML += `<p> ${data.items[i].volumeInfo.authors} </p>`
            result.innerHTML += `<img src="${data.items[i].volumeInfo.imageLinks.thumbnail}"/>`
            result.innerHTML += `<p> ${data.items[i].searchInfo.textSnippet} </p>`
        }
            //result.innerHTML += `<h1> ${books.items.volumeInfo.title} </h1>`
        //result.innerHTML += `<h1> ${data.items[0].volumeInfo.title} </h1>` 
    } else {
        result.innerHTML = '';
        result.innerHTML += `<div> there are no matches with your search </div>`
    }
    })
    .catch( err => {
        console.log( err)
    })
  }

function BookForm( props ){
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Search a book</label>
                <input type="text" id="form"></input>
                <button type='submit'>Go!</button>
            </form>
            <div className="result">

            </div>
        </div>
    );
}

export default BookForm;