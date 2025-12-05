import React, { useEffect, useState, useRef, useCallback } from 'react'
import GlobalApi from '../Services/GlobalApi'
import MovieCard from './MovieCard'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function MovieBox({ genereId }) {
    const [movieBox, setMovieBox] = useState([])
    const [trailerKey, setTrailerKey] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const elementRef = useRef(null);

    const getMovieByGenreId = useCallback(() => {
        setIsLoading(true);
        GlobalApi.getMovieByGenreId(genereId).then(resp => {
            setMovieBox(resp.data.results)
            setIsLoading(false);
        }).catch(err => {
            console.error('Error fetching movies:', err);
            setError('Failed to load movies');
            setIsLoading(false);
        });
    }, [genereId]);

    useEffect(() => {
        getMovieByGenreId();
    }, [getMovieByGenreId])

    const handleMovieClick = (movie) => {
        const mediaType = movie.title ? 'movie' : 'tv';

        GlobalApi.getVideosByMediaId(movie.id, mediaType)
            .then(resp => {
                const trailer = resp.data.results.find(
                    video => video.site === "YouTube" && video.type === "Trailer"
                ) || resp.data.results[0];

                if (trailer) {
                    setTrailerKey(trailer.key);
                } else {
                    alert(`No trailer found for ${movie.title || movie.name}.`);
                    setTrailerKey(null);
                }
            })
            .catch(err => {
                console.error("Error fetching video:", err);
                alert("Could not fetch trailer due to an API error.");
            });
    }

    const sliderRight = (element) => {
        if (element) element.scrollLeft += element.clientWidth;
    }

    const sliderLeft = (element) => {
        if (element) element.scrollLeft -= element.clientWidth;
    }

    if (isLoading) return <div className="text-white p-4">Loading movies...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    return (
        <div className="relative">
            <IoIosArrowBack
                className="hidden md:block text-white text-[30px] absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={() => sliderLeft(elementRef.current)}
            />

            <div
                ref={elementRef}
                className="flex overflow-x-auto gap-4 sm:gap-6 md:gap-4 scrollbar-hide scroll-smooth rounded-lg p-2 sm:p-4 md:p-2 w-full max-w-full"
            >

                {movieBox.map((item, index) => (
                    <div key={index} className="flex-shrink-0">
                        <MovieCard
                            movie={item}
                            onMovieClick={handleMovieClick}
                        />
                    </div>
                ))}
            </div>

            <IoIosArrowForward
                className="hidden md:block text-white text-[30px] absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={() => sliderRight(elementRef.current)}
            />

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
                            title="Movie Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg shadow-2xl"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MovieBox
