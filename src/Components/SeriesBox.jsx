import React, { useEffect, useState, useRef, useCallback } from "react";
import GlobalApi from "../Services/GlobalApi";
import SeriesCard from "./SeriesCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function SeriesBox({ genreId }) {
  const [seriesList, setSeriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const sliderRef = useRef(null);

  const fetchSeries = useCallback(() => {
    setLoading(true);
    GlobalApi.getSeriesByGenreId(genreId)
      .then((resp) => {
        const results = resp.data.results || [];
        setSeriesList(results.filter(item => item));
        setLoading(false);
      })
      .catch((err) => {
        console.error("SeriesBox API error:", err);
        setError("Failed to load series");
        setLoading(false);
      });
  }, [genreId]);

  useEffect(() => {
    fetchSeries();
  }, [fetchSeries]);

  const scrollLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft -= sliderRef.current.clientWidth;
  };

  const scrollRight = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft += sliderRef.current.clientWidth;
  };

  const handleSeriesClick = (series) => {
    const mediaType = "tv"; // All series are TV

    GlobalApi.getVideosByMediaId(series.id, mediaType)
      .then((resp) => {
        const trailer =
          resp.data.results.find(
            (v) => v.site === "YouTube" && v.type === "Trailer"
          ) || resp.data.results[0];

        if (trailer) setTrailerKey(trailer.key);
        else setTrailerKey(null);
      })
      .catch(() => alert("Could not load trailer"));
  };

  if (loading) return <div className="text-white p-4">Loading series...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!seriesList.length) return <div className="text-gray-400 p-4">No series available.</div>;

  return (
    <div className="relative">
      <IoIosArrowBack
        className="hidden md:block text-white text-[30px] absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
        onClick={scrollLeft}
      />

      <div
        ref={sliderRef}
        className="flex overflow-x-auto gap-4 sm:gap-6 md:gap-6 scrollbar-hide scroll-smooth rounded-lg p-2 sm:p-4 md:p-2 w-full"
      >
        {seriesList.map((item) => (
          <div key={item.id} className="flex-shrink-0">
            <SeriesCard series={item} onSeriesClick={handleSeriesClick} />
          </div>
        ))}
      </div>

      <IoIosArrowForward
        className="hidden md:block text-white text-[30px] absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
        onClick={scrollRight}
      />

      {/* Trailer Modal */}
      {trailerKey && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4"
          onClick={() => setTrailerKey(null)}
        >
          <div
            className="relative w-full max-w-4xl h-auto aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white text-3xl hover:text-red-500 transition-colors"
              onClick={() => setTrailerKey(null)}
            >
              &times;
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-2xl"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeriesBox;

