import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarFilled } from '@fortawesome/free-solid-svg-icons'
import '../styles/ReviewForm.css' // Make sure you have the correct path to your CSS file
import Cookies from 'universal-cookie'
import axios from 'axios'
import { API_URL } from '../proxy'

// Define the genres or tags for the dropdown
const genres = [
  'Action',
  'Romance',
  'Horror',
  'Sci-Fi',
  'Fantasy',
  'Mystery',
  'Thriller',
  'Biography'
]

const ReviewForm = ({ addReview, bookid }) => {
  const [reviewTitle, setReviewTitle] = useState('')
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [userid, setUserId] = useState('')

  useEffect(() => {
    const cookies = new Cookies()
    const userIdFromCookie = cookies.get('userID') // Read the userid cookie
    if (userIdFromCookie) {
      setUserId(userIdFromCookie) // Set the user ID state if the cookie exists
    }
  }, [])

  const toggleGenre = (genre) => {
    if (selectedTags.includes(genre)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== genre))
    } else {
      setSelectedTags([...selectedTags, genre])
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    const currentDate = new Date()
    const dateString = currentDate.toISOString().slice(0, 10)

    const newReview = {
      reviewTitle: reviewTitle,
      bookid: bookid,
      userid: userid,
      rating,
      comment: reviewText,
      reviewDate: dateString,
      tags: selectedTags
    }
    try {
      const response = await axios.post(`${API_URL}/reviews/new`, newReview)

      // Assuming your addReview prop updates the parent state
      addReview(response.data)

      addReview(newReview)
      setReviewTitle('')
      setRating(0)
      setReviewText('')
      setSelectedTags([])
    } catch (error) {
      // Handle errors, such as showing an error message to the user
      console.error('Failed to submit review', error)
    }
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <input
          className='review-input'
          type='text'
          placeholder='Review Title'
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
          required
        />

        <div className='rating'>
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={index < rating ? faStarFilled : faStarEmpty}
              className='star'
              onClick={() => setRating(index + 1)}
            />
          ))}
        </div>

        <textarea
          className='review-input'
          placeholder='Enter your review'
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />

        <div className='genre-buttons'>
          {genres.map((genre, index) => (
            <button
              key={index}
              type='button'
              className={`genre-button ${selectedTags.includes(genre) ? 'selected' : ''}`}
              onClick={() => toggleGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        <button type='submit' className='submit-btn'>
          Submit Review
        </button>
      </form>
    </div>
  )
}

export default ReviewForm
