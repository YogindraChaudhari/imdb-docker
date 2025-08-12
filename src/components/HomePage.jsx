import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner";
import SearchBar from "./SearchBar";
import HorizontalMovieList from "./HorizontalMovieList";
import LoadingSpinner from "./LoadingSpinner";
import {
  fetchPopularMovies,
  fetchTrendingShows,
  fetchNewMovies,
  fetchNewShows,
} from "../store/slices/moviesSlice";

function HomePage() {
  const dispatch = useDispatch();
  const { popularMovies, trendingShows, newMovies, newShows, status } =
    useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchPopularMovies(1));
    dispatch(fetchTrendingShows(1));
    dispatch(fetchNewMovies(1));
    dispatch(fetchNewShows(1));
  }, [dispatch]);

  if (status === "failed") {
    return (
      <div className="text-center p-8 text-red-500">
        Failed to load content. Please try again.
      </div>
    );
  }

  const isLoading = status === "loading";

  return (
    <div>
      <Banner />
      <SearchBar />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <HorizontalMovieList
            title="Trending Movies"
            movies={popularMovies}
            path="/trending-movies"
            loading={isLoading}
          />

          <HorizontalMovieList
            title="Trending Shows"
            movies={trendingShows}
            path="/trending-shows"
            loading={isLoading}
          />

          <HorizontalMovieList
            title="New Movies"
            movies={newMovies}
            path="/new-movies"
            loading={isLoading}
          />

          <HorizontalMovieList
            title="New Shows"
            movies={newShows}
            path="/new-shows"
            loading={isLoading}
          />
        </>
      )}
    </div>
  );
}

export default HomePage;
