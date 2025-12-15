import React from 'react';
import SeriesBox from './SeriesBox';
import TvGenreList from '../Constant/TvGenreList';

function SeriesGenreList() {
  return (
    <div>
      {TvGenreList.genere.map((item, index) =>
        index <= 4 && (
          <div key={item.id} className="p-4 sm:p-6 md:p-8">
            <h2 className="text-[20px] font-bold text-white mb-4">{item.name}</h2>
            <SeriesBox genreId={item.id} />
          </div>
        )
      )}
    </div>
  );
}

export default SeriesGenreList;






