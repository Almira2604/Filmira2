import React from 'react';
import SeriesGenreList from '../Components/SeriesGenreList';

function Series() {
  return (
    <div className="p-4 sm:p-6 md:p-6">
      <h2 className="text-[20px] font-bold text-white mb-4">Series</h2>
      <SeriesGenreList />
    </div>
  );
}

export default Series;
