import React, { useEffect, useState, useRef, useCallback } from "react";
import GlobalApi from "../Services/GlobalApi";
import ComingSoonCard from "./ComingSoonCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function ComingSoonBox({ genreId, type, endpoint }) {
  const [items, setItems] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const sliderRef = useRef(null);

  const fetchItems = useCallback(() => {
    const fetchFn =
      endpoint === "getUpcomingMovies"
        ? () => GlobalApi.getUpcomingMovies()
        : () => GlobalApi.getComingSoonByGenreId(genreId, type);

    fetchFn().then((res) => {
      setItems(res.data.results || []);
    });
  }, [genreId, type, endpoint]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleMovieClick = (item) => {
    const mediaType = item.title ? "movie" : "tv";

    GlobalApi.getVideosByMediaId(item.id, mediaType).then((res) => {
      const trailer =
        res.data.results.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        ) || res.data.results[0];

      setTrailerKey(trailer?.key || null);
    });
  };

  const scrollLeft = () => {
    sliderRef.current.scrollLeft -= sliderRef.current.clientWidth;
  };

  const scrollRight = () => {
    sliderRef.current.scrollLeft += sliderRef.current.clientWidth;
  };

  return (
    <div className="relative overflow-hidden max-w-full">
      {/* Left Arrow */}
      <IoIosArrowBack
        onClick={scrollLeft}
        className="hidden md:block text-white text-2xl absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
      />

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-3 overflow-x-auto scroll-smooth py-1 px-1 scrollbar-hide"
      >
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0">
            <ComingSoonCard
              movie={item}
              onMovieClick={handleMovieClick}
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
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

export default ComingSoonBox;





