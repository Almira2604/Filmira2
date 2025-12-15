import React, { useEffect, useState } from 'react';
import GlobalApi from '../Services/GlobalApi';

function Download() {
    const [downloads, setDownloads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        GlobalApi.getDownloadableMovies()
            .then(resp => {
                setDownloads(resp.data.results);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load downloadable movies');
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-white p-4">Loading downloads...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h2 className="text-[20px] font-bold text-white mb-4">Download Movies</h2>
            <div className="space-y-4">
                {downloads.map((movie, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
                        <div className="flex items-center gap-4">
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="w-16 rounded-md" />
                            <div>
                                <h3 className="text-white font-semibold">{movie.title}</h3>
                                <p className="text-gray-400 text-sm">{movie.quality || '1080p'}</p>
                            </div>
                        </div>
                        <button className="bg-red-600 text-white lg:px-4 px-[2px] py-2 rounded-md hover:bg-red-500">
                            Download
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Download;
