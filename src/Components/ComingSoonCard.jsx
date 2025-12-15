import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function ComingSoonCard({ movie, onMovieClick }) {
  const imageUrl = movie.poster_path
    ? IMAGE_BASE_URL + movie.poster_path
    : movie.backdrop_path
    ? IMAGE_BASE_URL + movie.backdrop_path
    : "/no-image.png";

  return (
    <div
      className="cursor-pointer"
      onClick={() => onMovieClick(movie)}
    >
      <img
        src={imageUrl}
        alt={movie.title || movie.name}
        className="w-[110px] md:w-[160px] rounded-md object-cover
                   hover:scale-105 transition-transform"
      />
    </div>
  );
}

export default ComingSoonCard;

