import { createSelector } from "reselect";

export const selectRecentMovies = state =>
  state.movies?.recentMovies?.results ?? [];

export const selectFirstRecentMovies = createSelector(
  [selectRecentMovies],
  (results) => results.slice(0, 5)
);
