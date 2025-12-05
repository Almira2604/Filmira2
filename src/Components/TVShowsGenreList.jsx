import React from 'react';
import GenreList from '../Constant/GenreList';  // Reusing same genre list for TV shows
import TVShowBox from './TVShowBox';

function TVShowsGenreList() {
  return (
    <div>
      {GenreList.genere.map((item, index) =>
        index <= 4 && (
          <div key={item.id} className="p-4 sm:p-6 md:p-8">
            <h2 className="text-[20px] font-bold text-white mb-4">{item.name}</h2>
            <TVShowBox genreId={item.id} index={index} />
          </div>
        )
      )}
    </div>
  );
}

export default TVShowsGenreList;
