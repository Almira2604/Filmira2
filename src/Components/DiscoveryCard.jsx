import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function DiscoveryCard({ movie }) {
  const imageUrl =
    movie.poster_path
      ? IMAGE_BASE_URL + movie.poster_path
      : movie.backdrop_path
      ? IMAGE_BASE_URL + movie.backdrop_path
      : "/no-image.png"; // fallback if no image

  return (
    <div className="cursor-pointer">
      <img
        src={imageUrl}
        alt={movie.title || movie.name}
        className="lg:w-[200px] w-[120px] rounded-lg hover:border-[3px] border-gray-400 hover:scale-105 transition-transform duration-150 ease-in-out object-cover"
      />
    </div>
  );
}

export default DiscoveryCard;




