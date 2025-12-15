import React, { useEffect, useState, useRef } from "react";
import GlobalApi from "../Services/GlobalApi";
import MovieCard from "./MovieCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function TVShowBox({ genreId }) {
  const [tvShows, setTvShows] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const elementRef = useRef(null);

  useEffect(() => {
    GlobalApi.getSeriesByGenreId(genreId).then((resp) => {
      setTvShows(resp.data.results || []);
    });
  }, [genreId]);

  const handleShowClick = (show) => {
    GlobalApi.getVideosByMediaId(show.id, "tv").then((resp) => {
      const trailer =
        resp.data.results.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        ) || resp.data.results[0];

      setTrailerKey(trailer?.key || null);
    });
  };

  const scrollLeft = () => {
    elementRef.current.scrollLeft -= elementRef.current.clientWidth;
  };

  const scrollRight = () => {
    elementRef.current.scrollLeft += elementRef.current.clientWidth;
  };

  return (
    <div className="relative overflow-hidden">
      <IoIosArrowBack
        onClick={scrollLeft}
        className="hidden md:block text-white text-2xl absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
      />

      <div
        ref={elementRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth py-2"
      >
        {tvShows.map((show) => (
          <MovieCard
            key={show.id}
            movie={show}
            onMovieClick={handleShowClick}
          />
        ))}
      </div>

      <IoIosArrowForward
        onClick={scrollRight}
        className="hidden md:block text-white text-2xl absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
      />

      {/* Trailer Modal */}
      {trailerKey && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100]"
          onClick={() => setTrailerKey(null)}
        >
          <div
            className="w-full max-w-3xl aspect-video px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TVShowBox;
