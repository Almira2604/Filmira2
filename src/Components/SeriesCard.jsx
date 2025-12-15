import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function SeriesCard({ series, onSeriesClick }) {
  if (!series) return null;

  const imageUrl = series.poster_path
    ? IMAGE_BASE_URL + series.poster_path
    : series.backdrop_path
    ? IMAGE_BASE_URL + series.backdrop_path
    : "/no-image.png";

  return (
    <div
      onClick={() => onSeriesClick?.(series)}
      className="cursor-pointer"
    >
      <img
        src={imageUrl}
        alt={series.name || series.title || "No title"}
        className="lg:w-[200px] w-[120px] rounded-lg 
                   hover:border-[3px] border-gray-400 
                   hover:scale-105 transition-transform duration-150 ease-in-out 
                   object-cover"
      />
    </div>
  );
}

export default SeriesCard;
