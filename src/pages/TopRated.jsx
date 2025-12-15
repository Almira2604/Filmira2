import React, { useEffect, useState } from 'react';
import GlobalApi from '../Services/GlobalApi';
import MovieCard from '../Components/MovieCard';
import { IoClose } from 'react-icons/io5';
import ReactPlayer from 'react-player';

function TopRated() {
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        GlobalApi.getTrendingMovies() // <- use getTrendingMovies() or getUpcomingMovies()
            .then(resp => {
                setTopRated(resp.data.results);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching top rated movies:', err);
                setError('Failed to load top rated movies');
                setLoading(false);
            });
    }, []);

    const playTrailer = (movieId) => {
        GlobalApi.getVideosByMediaId(movieId, 'movie')
            .then(resp => {
                const trailer = resp.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                if (trailer) setTrailerKey(trailer.key);
                else alert('Trailer not available');
            })
            .catch(err => console.error('Error fetching trailer:', err));
    };

    if (loading) return <div className="text-white p-4">Loading top rated movies...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    return (
        <div className="p-4 sm:p-6 md:p-8 relative">
            <h2 className="text-[20px] font-bold text-white mb-4">Top Rated</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {topRated.map((movie) => (
                    <div
                        key={movie.id}
                        className="cursor-pointer"
                        onClick={() => playTrailer(movie.id)}
                    >
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>

            {/* Trailer Modal */}
            {trailerKey && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="relative w-full max-w-3xl mx-4">
                        <IoClose
                            className="text-white text-[28px] absolute top-2 right-2 cursor-pointer"
                            onClick={() => setTrailerKey(null)}
                        />
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${trailerKey}`}
                            width="100%"
                            height="100%"
                            controls
                            playing
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default TopRated;

