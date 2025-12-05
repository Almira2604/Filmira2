import React, { useEffect, useState, useRef, useCallback } from 'react';
import GlobalApi from '../Services/GlobalApi';
import MovieCard from './MovieCard';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function SeriesBox({ genreId }) {
    const [seriesBox, setSeriesBox] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const elementRef = useRef(null);

    const getSeriesByGenreId = useCallback(() => {
        setLoading(true);
        GlobalApi.getSeriesByGenreId(genreId)
          .then(resp => {
            console.log('SeriesBox Data for genre', genreId, resp.data.results);
            setSeriesBox(resp.data.results);
            setLoading(false);
          })
          .catch(err => {
            console.error('SeriesBox API error:', err);
            setError('Failed to load series');
            setLoading(false);
          });
    }, [genreId]);

    useEffect(() => {
        getSeriesByGenreId();
    }, [getSeriesByGenreId]);

    const sliderRight = (element) => {
        if (element) element.scrollLeft += element.clientWidth;
    };

    const sliderLeft = (element) => {
        if (element) element.scrollLeft -= element.clientWidth;
    };

    if (loading) return <div className="text-white p-4">Loading series...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    return (
        <div className="relative">
            <IoIosArrowBack
                className="hidden md:block text-white text-[30px] absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={() => sliderLeft(elementRef.current)}
            />

            <div
                ref={elementRef}
                className="flex overflow-x-auto gap-4 sm:gap-6 md:gap-6 scrollbar-hide scroll-smooth rounded-lg p-2 sm:p-4 md:p-2 w-full"
            >
                {seriesBox.map((item, index) => (
                    <div key={index} className="flex-shrink-0">
                        <MovieCard movie={item} />
                    </div>
                ))}
            </div>

            <IoIosArrowForward
                className="hidden md:block text-white text-[30px] absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={() => sliderRight(elementRef.current)}
            />
        </div>
    );
}

export default SeriesBox;
