import React, { useState } from 'react'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'
import ReviewDateFilter from './ReviewDateFilter'
import ReviewFilter from './ReviewFilter'
import { subDays, isWithinInterval } from 'date-fns'
import '../styles/ReviewList.css'

const wasReviewCreatedInTimeFrame = (reviewDate, daysAgo) => {
  const start = subDays(new Date(), daysAgo)
  const end = new Date()

  // Set the hours for the start and end to encompass the entire day
  start.setHours(0, 0, 0, 0)
  end.setHours(23, 59, 59, 999)

  return isWithinInterval(reviewDate, { start, end })
}

const ReviewsList = ({ reviews: initialReviews, bookid }) => {
  const [reviews, setReviews] = useState(
    Array.isArray(initialReviews) ? initialReviews : []
  )
  const [filter, setFilter] = useState(null)
  const [dateFilter, setDateFilter] = useState('')

  const addReply = (reviewToUpdate, replyText) => {
    setReviews(
      reviews.map((review) => {
        if (review === reviewToUpdate) {
          const updatedReplies = Array.isArray(review.replies)
            ? [...review.replies, replyText]
            : [replyText]
          return { ...review, replies: updatedReplies }
        }
        return review
      })
    )
  }

  const addReview = (newReview) => {
    setReviews([...reviews, newReview])
  }

  // Function to check if the review was created exactly days ago
  // Function to check if the review was created exactly days ago
  const applyDateFilter = (review, dateFilter) => {
    const reviewDate = new Date(review.review_date)

    switch (dateFilter) {
      case '1':
        return wasReviewCreatedInTimeFrame(reviewDate, 1)
      case '7':
        return wasReviewCreatedInTimeFrame(reviewDate, 7)
      case '30':
        return wasReviewCreatedInTimeFrame(reviewDate, 30)
      default:
        return true // If no date filter is set, show all reviews
    }
  }

  const filteredReviews = reviews
    .filter((review) => !filter || review.rating === filter) // Apply rating filter if set
    .filter((review) => applyDateFilter(review, dateFilter)) // Apply date filter

  return (
    <div className='reviews-container'>
      <ReviewForm addReview={addReview} bookid={bookid} />
      <div
        style={{
          display: 'flex',
          justifycontent: 'flex-end',
          marginbottom: '20px',
          alignitems: 'right'
        }}
      >
        <ReviewFilter setFilter={setFilter} />
        <ReviewDateFilter setDateFilter={setDateFilter} />
      </div>
      {filteredReviews.map((review, index) => (
        <ReviewCard key={index} review={review} addReply={addReply} />
      ))}
    </div>
  )
}

export default ReviewsList
