import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import watchlistReducer from './slices/watchlistSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    watchlist: watchlistReducer,
    ui: uiReducer,
  },
});