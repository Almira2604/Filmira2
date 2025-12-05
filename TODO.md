# TODO: Fix API Performance and Movie Card Overflow Issues

## Overflow Fixes
- [x] Fix MovieBox.jsx: Add flex-shrink-0 to MovieCard wrapper (already has elementRef)
- [x] Fix TrendingTVShows.jsx: Add flex-shrink-0 to MovieCard wrapper
- [x] Fix SeriesBox.jsx: Add elementRef and flex-shrink-0
- [x] Fix TVShowBox.jsx: Add elementRef and flex-shrink-0
- [ ] Check and fix SeriesGenreList.jsx and TVShowsGenreList.jsx if needed

## API Performance Fixes
- [x] Add loading states and error handling to MovieBox.jsx
- [x] Implement simple caching in GlobalApi.jsx to reduce redundant API calls
- [x] Add loading states to other components if missing (SeriesBox, TVShowBox, etc.)

## Testing
- [x] Test slider functionality after fixes
- [x] Test API loading times
