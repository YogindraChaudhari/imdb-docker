import { createSlice } from '@reduxjs/toolkit';

const loadWatchlistFromStorage = () => {
  const storedList = localStorage.getItem('moviesApp');
  return storedList ? JSON.parse(storedList) : [];
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    list: loadWatchlistFromStorage(),
    filteredGenre: 'All Genres',
    searchTerm: '',
  },
  reducers: {
    addToWatchlist: (state, action) => {
      state.list.push(action.payload);
      localStorage.setItem('moviesApp', JSON.stringify(state.list));
    },
    removeFromWatchlist: (state, action) => {
      state.list = state.list.filter((movie) => movie.id !== action.payload.id);
      localStorage.setItem('moviesApp', JSON.stringify(state.list));
    },
    setFilteredGenre: (state, action) => {
      state.filteredGenre = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    sortRatingAsc: (state) => {
      state.list.sort((a, b) => a.vote_average - b.vote_average);
    },
    sortRatingDesc: (state) => {
      state.list.sort((a, b) => b.vote_average - a.vote_average);
    },
    sortPopularityAsc: (state) => {
      state.list.sort((a, b) => a.popularity - b.popularity);
    },
    sortPopularityDesc: (state) => {
      state.list.sort((a, b) => b.popularity - a.popularity);
    },
  },
});

export const {
  addToWatchlist,
  removeFromWatchlist,
  setFilteredGenre,
  setSearchTerm,
  sortRatingAsc,
  sortRatingDesc,
  sortPopularityAsc,
  sortPopularityDesc,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;