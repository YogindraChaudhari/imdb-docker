import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopular",
  async (pageNo = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNo}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTrendingShows = createAsyncThunk(
  "movies/fetchTrendingShows",
  async (pageNo = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${pageNo}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchNewMovies = createAsyncThunk(
  "movies/fetchNewMovies",
  async (pageNo = 1, { rejectWithValue }) => {
    try {
      // Get movies from the last 90 days
      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setDate(today.getDate() - 90);

      const formattedToday = today.toISOString().split("T")[0];
      const formattedThreeMonthsAgo = threeMonthsAgo
        .toISOString()
        .split("T")[0];

      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${pageNo}&primary_release_date.gte=${formattedThreeMonthsAgo}&primary_release_date.lte=${formattedToday}&sort_by=release_date.desc`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchNewShows = createAsyncThunk(
  "movies/fetchNewShows",
  async (pageNo = 1, { rejectWithValue }) => {
    try {
      // Get TV shows from the last 90 days
      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setDate(today.getDate() - 90);

      const formattedToday = today.toISOString().split("T")[0];
      const formattedThreeMonthsAgo = threeMonthsAgo
        .toISOString()
        .split("T")[0];

      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${pageNo}&first_air_date.gte=${formattedThreeMonthsAgo}&first_air_date.lte=${formattedToday}&sort_by=first_air_date.desc`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchMovies = createAsyncThunk(
  "movies/search",
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`
      );
      return {
        data: response.data,
        query,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    // General search results
    list: [],

    // Specific category lists
    popularMovies: [],
    trendingShows: [],
    newMovies: [],
    newShows: [],

    // UI states
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentPage: 1,
    totalPages: 0,
    searchQuery: "",
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchQuery = "";
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Popular Movies
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popularMovies = action.payload.results;
        // If this is the main view (not searching)
        if (!state.searchQuery) {
          state.list = action.payload.results;
          state.totalPages = action.payload.total_pages;
          state.currentPage = action.payload.page;
        }
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      })

      // Trending Shows
      .addCase(fetchTrendingShows.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrendingShows.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trendingShows = action.payload.results;
      })
      .addCase(fetchTrendingShows.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      })

      // New Movies
      .addCase(fetchNewMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newMovies = action.payload.results;
      })
      .addCase(fetchNewMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      })

      // New Shows
      .addCase(fetchNewShows.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewShows.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newShows = action.payload.results;
      })
      .addCase(fetchNewShows.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      })

      // Search
      .addCase(searchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.data.results;
        state.totalPages = action.payload.data.total_pages;
        state.currentPage = action.payload.data.page;
        state.searchQuery = action.payload.query;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setCurrentPage, clearSearchResults } = moviesSlice.actions;
export default moviesSlice.reducer;
