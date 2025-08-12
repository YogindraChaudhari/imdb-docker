import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import LoadingSpinner from "./LoadingSpinner";
import {
  fetchPopularMovies,
  fetchTrendingShows,
  fetchNewMovies,
  fetchNewShows,
  setCurrentPage,
  searchMovies,
} from "../store/slices/moviesSlice";
import SearchBar from "./SearchBar";

function Movies({ category = "popular", title = "Movies" }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    list,
    popularMovies,
    trendingShows,
    newMovies,
    newShows,
    status,
    currentPage,
    searchQuery,
  } = useSelector((state) => state.movies);

  // Determine which list to display based on category
  const getMovieList = () => {
    if (location.pathname === "/search" && searchQuery) {
      return list;
    }

    switch (category) {
      case "popular":
        return popularMovies;
      case "trendingShows":
        return trendingShows;
      case "newMovies":
        return newMovies;
      case "newShows":
        return newShows;
      default:
        return popularMovies;
    }
  };

  // Get the appropriate fetch action based on category
  const getFetchAction = () => {
    switch (category) {
      case "popular":
        return fetchPopularMovies;
      case "trendingShows":
        return fetchTrendingShows;
      case "newMovies":
        return fetchNewMovies;
      case "newShows":
        return fetchNewShows;
      default:
        return fetchPopularMovies;
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      dispatch(setCurrentPage(newPage));
      if (location.pathname === "/search" && searchQuery) {
        dispatch(searchMovies({ query: searchQuery, page: newPage }));
      } else {
        dispatch(getFetchAction()(newPage));
      }
    }
  };

  const handleNext = () => {
    const newPage = currentPage + 1;
    dispatch(setCurrentPage(newPage));
    if (location.pathname === "/search" && searchQuery) {
      dispatch(searchMovies({ query: searchQuery, page: newPage }));
    } else {
      dispatch(getFetchAction()(newPage));
    }
  };

  useEffect(() => {
    // If we're on the search page and have a query, fetch search results
    if (location.pathname === "/search" && searchQuery) {
      dispatch(searchMovies({ query: searchQuery, page: currentPage }));
    } else {
      dispatch(getFetchAction()(currentPage));
    }
  }, [dispatch, currentPage, category, location.pathname]);

  const displayList = getMovieList();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "failed") {
    return (
      <div className="text-center p-8 text-red-500">
        Failed to load content. Please try again.
      </div>
    );
  }

  if (displayList.length === 0 && status === "succeeded") {
    return (
      <div className="text-center p-8">
        No content found. Try a different search or category.
      </div>
    );
  }

  // Determine title to display
  const getDisplayTitle = () => {
    if (location.pathname === "/search" && searchQuery) {
      return `SEARCH RESULTS FOR "${searchQuery.toUpperCase()}"`;
    }

    switch (category) {
      case "popular":
        return "TRENDING MOVIES";
      case "trendingShows":
        return "TRENDING TV SHOWS";
      case "newMovies":
        return "NEW RELEASES - MOVIES";
      case "newShows":
        return "NEW RELEASES - TV SHOWS";
      default:
        return title.toUpperCase();
    }
  };

  return (
    <div className="p-5">
      <SearchBar />
      <div className="text-2xl m-5 font-bold text-center">
        {getDisplayTitle()}
      </div>

      <div className="flex flex-row flex-wrap justify-around gap-12">
        {displayList.map((item) => (
          <MovieCard
            key={item.id}
            movieObj={item}
            poster_path={item.poster_path}
            name={
              item.original_title ||
              item.title ||
              item.name ||
              item.original_name
            }
          />
        ))}
      </div>
      <Pagination
        pageNo={currentPage}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  );
}

export default Movies;
