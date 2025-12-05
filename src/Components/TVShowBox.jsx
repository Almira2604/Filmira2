import React, { useEffect, useState, useRef } from 'react';
import GlobalApi from '../Services/GlobalApi';
import MovieCard from './MovieCard';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function TVShowBox({ genreId }) {
    const [tvShowBox, setTvShowBox] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const elementRef = useRef(null);

    useEffect(() => {
        getTVShowsByGenreId();
    }, [genreId]);

    const getTVShowsByGenreId = () => {
        setLoading(true);
        GlobalApi.getSeriesByGenreId(genreId)
            .then(resp => {
                setTvShowBox(resp.data.results);
                setLoading(false);
            })
            .catch(err => {
                console.error('TVShowBox API error:', err);
                setError('Failed to load TV shows');
                setLoading(false);
            });
    };

    const sliderRight = (element) => {
        if (element) element.scrollLeft += element.clientWidth;
    };

    const sliderLeft = (element) => {
        if (element) element.scrollLeft -= element.clientWidth;
    };

    if (loading) return <div className="text-white p-4">Loading TV shows...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    return (
        <div className="relative">
            <IoIosArrowBack
                className="hidden md:block text-white text-[30px] absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={() => sliderLeft(elementRef.current)}
            />

            <div
                ref={elementRef}
                className="flex overflow-x-auto gap-4 sm:gap-6 md:gap-8 scrollbar-hide scroll-smooth rounded-lg p-2 sm:p-4"
            >
                {tvShowBox.map((item, index) => (
                    <MovieCard key={index} movie={item} />
                ))}
            </div>

            <IoIosArrowForward
                className="hidden md:block text-white text-[30px] absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={() => sliderRight(elementRef.current)}
            />
        </div>
    );
}

export default TVShowBox;
