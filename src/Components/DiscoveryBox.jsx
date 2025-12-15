import React, { useEffect, useState, useRef, useCallback } from "react";
import GlobalApi from "../Services/GlobalApi";
import DiscoveryCard from "./DiscoveryCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function DiscoveryBox({ genreId, type }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null); // ✅ Trailer state
  const sliderRef = useRef(null);

  const fetchItems = useCallback(() => {
    setIsLoading(true);

    const fetchFn =
      type === "movie"
        ? GlobalApi.getMovieByGenreId
        : GlobalApi.getSeriesByGenreId;

    fetchFn(genreId)
      .then((resp) => {
        setItems(resp.data.results || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load content");
        setIsLoading(false);
      });
  }, [genreId, type]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleItemClick = (item) => {
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
    if (sliderRef.current) sliderRef.current.scrollLeft -= sliderRef.current.clientWidth;
  };

  const scrollRight = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft += sliderRef.current.clientWidth;
  };

  if (isLoading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Left Arrow */}
      <IoIosArrowBack
        className="hidden md:block text-white text-[30px] absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
        onClick={scrollLeft}
      />

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth p-2 w-full"
      >
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0">
            <DiscoveryCard movie={item} onClick={() => handleItemClick(item)} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <IoIosArrowForward
        className="hidden md:block text-white text-[30px] absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
        onClick={scrollRight}
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

export default DiscoveryBox;
