import React from 'react'
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

// New prop: onMovieClick
function MovieCard({ movie, onMovieClick }) {
  return (
    <div
      // Call the passed-in handler when clicked, sending the movie object
      onClick={() => onMovieClick(movie)}
      className='cursor-pointer' // Indicate interactivity
    >
      <img
        src={IMAGE_BASE_URL + movie.poster_path}
        className='lg:w-[200px] w-[120px] rounded-lg hover:border-[3px] border-gray-400 hover:scale-105 transition-transform duration-150 ease-in-out cursor-pointer object-cover'
      />
    </div>
  )
}

export default MovieCard
