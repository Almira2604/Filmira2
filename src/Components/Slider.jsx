import React, { useEffect, useState, useRef } from "react";
import GlobalApi from "../Services/GlobalApi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function Slider() {
  const [movieList, setMovieList] = useState([]);
  const elementRef = useRef();
  const intervalRef = useRef(null);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = () => {
    GlobalApi.getTrendingMovies().then((resp) => {
      setMovieList(resp.data.results || []);
    }).catch((err) => {
      console.error("Failed to fetch trending movies:", err);
      setMovieList([]);
    });
  };

  const scrollTo = (element, left) => {
    try {
      element.scrollTo({ left, behavior: "smooth" });
    } catch {
      element.scrollLeft = left;
    }
  };

  const sliderRight = (element) => {
    if (!element) return;

    const currentLeft = element.scrollLeft;
    const viewWidth = element.clientWidth;
    const maxScroll = element.scrollWidth - viewWidth;

    if (currentLeft + viewWidth >= element.scrollWidth - 1 || currentLeft >= maxScroll - 1) {
      scrollTo(element, 0);
    } else {
      scrollTo(element, currentLeft + viewWidth);
    }
  };

  const sliderLeft = (element) => {
    if (!element) return;

    const currentLeft = element.scrollLeft;
    const viewWidth = element.clientWidth;
    const maxScroll = element.scrollWidth - viewWidth;

    if (currentLeft <= 0 + 1) {
      scrollTo(element, maxScroll >= 0 ? maxScroll : 0);
    } else {
      scrollTo(element, Math.max(0, currentLeft - viewWidth));
    }
  };

  useEffect(() => {
    const element = elementRef.current;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!element || movieList.length === 0) return;

    intervalRef.current = setInterval(() => {
      const el = elementRef.current;
      if (!el) return;
      if (el.scrollWidth <= el.clientWidth) return;

      sliderRight(el);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [movieList.length, sliderRight]);

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    const el = elementRef.current;
    if (!el || movieList.length === 0) return;
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => sliderRight(el), 3000);
  };

  return (
    <div className="relative overflow-hidden w-full">
      <IoIosArrowBack
        className="hidden md:block text-white text-2xl lg:text-3xl absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 cursor-pointer z-10 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
        onClick={() => sliderLeft(elementRef.current)}
      />

      <IoIosArrowForward
        className="hidden md:block text-white text-2xl lg:text-3xl absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
        onClick={() => sliderRight(elementRef.current)}
      />

      <div
        ref={elementRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory w-full max-w-full"
      >
        {movieList.map((item, index) => {
          const imgPath = item.backdrop_path || item.poster_path || "";
          return (
            <div key={index} className="relative w-full flex-shrink-0 snap-start px-2 md:px-3">
              <img
                src={imgPath ? IMAGE_BASE_URL + imgPath : ""}
                alt={item.title || item.name || "Movie"}
                className="w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[330px] object-cover rounded-lg bg-gray-800"
              />

              <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 text-white text-sm sm:text-base rounded max-w-[85%] truncate">
                {item.title || item.name || "Untitled"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Slider;
