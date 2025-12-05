import React from 'react';
import GenreList from '../Constant/GenreList';
import MovieBox from './MovieBox';

function GenreMovieList() {

  return (
    <div>
      {GenreList.genere.map((item, index) =>
        index <= 4 && (
          <div key={item.id} className="p-4 sm:p-6 md:p-8 px-4 sm:px-8 md:px-16">
            <h2 className="text-[20px] font-bold text-white mb-4">{item.name}</h2>

            <MovieBox genereId={item.id} index={index} />
          </div>
        )
      )}
    </div>
  );
}

export default GenreMovieList;
