import React from 'react';
import TVShowsGenreList from '../Components/TVShowsGenreList';
import TrendingTVShows from '../Components/TrendingTVShows';

export default function TvShows() {
  return (
    <div>
      <TrendingTVShows />
      <TVShowsGenreList />
    </div>
  );
}
