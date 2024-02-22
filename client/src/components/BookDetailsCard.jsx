/**
 * See and edit a Book's details
 * @param {Book} book - The Book being displayed
 * @param {function} updateBookDetails - Callback to update the Book
 */

import "../styles/BookDetailsCard.css"
import { useState } from "react"

export default function BookDetailsCard({book, updateBookDetails}) {
    
    // Are we editing currently?
    // If we aren't, disable the inputs and style them properly
    const [editing, setEditing] = useState(false)
    
    // This should probably be added to the editButtonCallback function
    const submitBookDetails = () => {
        let newBookDetails;

        // collect new details from the input values

        updateBookDetails(newBookDetails);
    }

    const editButtonCallback = () => {
        setEditing(!editing)
        
        // change editing state (done above), then submit the new details (do below)
        // ____
    }

    return (
        <div className={`bookDetailsCard ` + (editing ? `currentlyEditing` : ``)}>
            <label htmlFor="title">Title</label>
            <br></br>
            <input type="text" id="title" value={book.title}></input>
            <br></br>
            <br></br>
            <label htmlFor="author">Author</label>
            <br></br>
            <input type="text" id="author" value={book.author}></input>
            <br></br>
            <br></br>
            <label htmlFor="pages">Pages</label>
            <br></br>
            <input type="text" id="pages" value={book.pages}></input>
            <br></br>
            <br></br>
            <label htmlFor="genre">Genre</label>
            <br></br>
            <input type="text" id="genre" value={book.genre}></input>
            <br></br>
            <br></br>
            <button onClick={editButtonCallback}>{editing ? "Edit Book Details" : "Submit Edits"}</button>
        </div>
    )
}