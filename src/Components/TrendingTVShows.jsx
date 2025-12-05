import React, { useEffect, useState, useRef } from 'react';
import GlobalApi from '../Services/GlobalApi';
import MovieCard from './MovieCard';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function TrendingTVShows() {
    const [trendingShows, setTrendingShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const elementRef = useRef(null);

    useEffect(() => {
        fetchTrendingShows();
    }, []);

    const fetchTrendingShows = () => {
        setLoading(true);
        GlobalApi.getTrendingTVShows()
          .then(resp => {
            console.log('TrendingTVShows data', resp.data.results);
            setTrendingShows(resp.data.results);
            setLoading(false);
          })
          .catch(err => {
            console.error('TrendingTVShows API error:', err);
            setError('Failed to load trending shows');
            setLoading(false);
          });
    };

    const sliderRight = (element) => {
        if (element) element.scrollLeft += element.clientWidth;
    };

    const sliderLeft = (element) => {
        if (element) element.scrollLeft -= element.clientWidth;
    };

    if (loading) return <div className="text-white p-4">Loading trending shows...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h2 className="text-[20px] font-bold text-white mb-4">Trending TV Shows</h2>
            <div className="relative">
                <IoIosArrowBack
                    className="hidden md:block text-white text-[30px] absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                    onClick={() => sliderLeft(elementRef.current)}
                />

                <div
                    ref={elementRef}
                    className="flex overflow-x-auto gap-4 sm:gap-6 md:gap-8 scrollbar-hide scroll-smooth rounded-lg p-2 sm:p-4"
                >
                    {trendingShows.map((show, index) => (
                        <div key={index} className="flex-shrink-0">
                            <MovieCard movie={show} />
                        </div>
                    ))}
                </div>

                <IoIosArrowForward
                    className="hidden md:block text-white text-[30px] absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                    onClick={() => sliderRight(elementRef.current)}
                />
            </div>
        </div>
    );
}

export default TrendingTVShows;
