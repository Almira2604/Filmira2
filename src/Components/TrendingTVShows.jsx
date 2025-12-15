import React, { useEffect, useState, useRef } from 'react';
import GlobalApi from '../Services/GlobalApi';
import MovieCard from './MovieCard';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function TrendingTVShows() {
    const [trendingShows, setTrendingShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        fetchTrendingShows();
    }, []);

    const fetchTrendingShows = () => {
        setLoading(true);
        GlobalApi.getTrendingTVShows()
          .then(resp => {
            setTrendingShows(resp.data.results);
            setLoading(false);
          })
          .catch(err => {
            console.error('TrendingTVShows API error:', err);
            setError('Failed to load trending shows');
            setLoading(false);
          });
    };

    const handleShowClick = (item) => {
        const mediaType = item.name ? "tv" : "movie"; // TV shows have 'name'

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

    if (loading) return <div className="text-white p-4">Loading trending shows...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h2 className="text-[20px] font-bold text-white mb-4">Trending TV Shows</h2>
            <div className="relative">
                {/* Left Arrow */}
                <IoIosArrowBack
                    className="hidden md:block text-white text-[30px] absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                    onClick={scrollLeft}
                />

                {/* Slider */}
                <div
                    ref={sliderRef}
                    className="flex overflow-x-auto gap-4 sm:gap-6 md:gap-8 scrollbar-hide scroll-smooth rounded-lg p-2 sm:p-4"
                >
                    {trendingShows.map((show) => (
                        <div key={show.id} className="flex-shrink-0">
                            <MovieCard movie={show} onClick={() => handleShowClick(show)} />
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <IoIosArrowForward
                    className="hidden md:block text-white text-[30px] absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                    onClick={scrollRight}
                />
            </div>

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

export default TrendingTVShows;
