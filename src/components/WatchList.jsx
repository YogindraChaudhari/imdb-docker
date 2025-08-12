import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import genreids from "../utils/genre";
import { Filter, Star, ChevronUp, ChevronDown, Search, X } from "lucide-react";
import {
  removeFromWatchlist,
  setFilteredGenre,
  setSearchTerm,
  sortRatingAsc,
  sortRatingDesc,
  sortPopularityAsc,
  sortPopularityDesc,
} from "../store/slices/watchlistSlice.js";
import MovieDetailsModal from "./MovieDetailsModal.jsx";

function WatchList() {
  const [isGenreMenuOpen, setIsGenreMenuOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const dispatch = useDispatch();
  const {
    list: watchlist,
    filteredGenre,
    searchTerm,
  } = useSelector((state) => state.watchlist);
  const [genreList, setGenreList] = useState(["All Genres"]);

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    temp = new Set(temp);
    setGenreList(["All Genres", ...temp]);
  }, [watchlist]);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleFilter = (genre) => {
    dispatch(setFilteredGenre(genre));
  };

  const handleRemoveFromWatchList = (movieObj) => {
    dispatch(removeFromWatchlist(movieObj));
  };

  const filteredMovies = watchlist
    .filter(
      (movieObj) =>
        filteredGenre === "All Genres" ||
        genreids[movieObj.genre_ids[0]] === filteredGenre
    )
    .filter((movieObj) =>
      (movieObj.title || movieObj.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container mx-auto px-4 py-6 dark:bg-dark-background dark:text-dark-text transition-colors">
      <h1 className="text-2xl font-bold mb-6 text-center">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-gray-500 dark:text-gray-400 mb-4">
            Your watchlist is empty
          </div>
          <a
            href="/"
            className="px-6 py-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition-colors"
          >
            Browse Movies And Series
          </a>
        </div>
      ) : (
        <>
          {/* Mobile filter button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="w-full flex items-center justify-center gap-2 p-3 bg-gray-00 dark:bg-gray-800 rounded-lg text-yellow-500 dark:text-yellow-400"
            >
              <Filter size={18} />
              <span>Filter & Search</span>
            </button>
          </div>

          {/* Mobile filters slide-in panel */}
          {isMobileFiltersOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
              <div className="absolute right-0 top-0 h-full w-4/5 max-w-md bg-white dark:bg-gray-900 shadow-lg p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button onClick={() => setIsMobileFiltersOpen(false)}>
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>

                {/* Genre Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Genre
                  </label>
                  <div className="space-y-2">
                    {genreList.map((genre) => (
                      <div
                        key={genre}
                        onClick={() => {
                          handleFilter(genre);
                        }}
                        className={`p-3 cursor-pointer rounded-md ${
                          filteredGenre === genre
                            ? "bg-yellow-400 text-white dark:bg-yellow-500"
                            : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                        } transition-colors`}
                      >
                        {genre}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Search in mobile view */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Search
                  </label>
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden pl-3">
                    <Search
                      size={18}
                      className="text-gray-500 dark:text-gray-400"
                    />
                    <input
                      onChange={handleSearch}
                      value={searchTerm}
                      type="text"
                      placeholder="Search Movies"
                      className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* Sorting in mobile view */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Sort by
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => dispatch(sortRatingDesc())}
                      className="w-full p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-left"
                    >
                      Rating (High to Low)
                    </button>
                    <button
                      onClick={() => dispatch(sortRatingAsc())}
                      className="w-full p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-left"
                    >
                      Rating (Low to High)
                    </button>
                    <button
                      onClick={() => dispatch(sortPopularityDesc())}
                      className="w-full p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-left"
                    >
                      Popularity (High to Low)
                    </button>
                    <button
                      onClick={() => dispatch(sortPopularityAsc())}
                      className="w-full p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-left"
                    >
                      Popularity (Low to High)
                    </button>
                  </div>
                </div>

                {/* Apply button */}
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full py-3 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Desktop filters - hidden on mobile */}
          <div className="hidden lg:grid grid-cols-2 gap-4 mb-6">
            {/* Genre Filter with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsGenreMenuOpen(!isGenreMenuOpen)}
                className="flex items-center justify-between w-full p-3 
                  bg-gray-100 dark:bg-gray-800 rounded-lg 
                  text-gray-700 dark:text-gray-200"
              >
                <span className="flex items-center">
                  <Filter className="mr-2 text-yellow-400" />
                  {filteredGenre}
                </span>
                <ChevronUp
                  className={`transform transition-transform text-yellow-400 ${
                    isGenreMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isGenreMenuOpen && (
                <div
                  className="absolute z-10 w-full 
                  bg-white dark:bg-gray-700 
                  shadow-lg rounded-lg max-h-60 overflow-y-auto"
                >
                  {genreList.map((genre) => (
                    <div
                      key={genre}
                      onClick={() => {
                        handleFilter(genre);
                        setIsGenreMenuOpen(false);
                      }}
                      className={`p-3 cursor-pointer 
                        ${
                          filteredGenre === genre
                            ? "bg-yellow-500 text-white dark:bg-yellow-600"
                            : "hover:bg-gray-100 dark:hover:bg-gray-600"
                        }
                        transition-colors`}
                    >
                      {genre}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input */}
            <div className="relative">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden pl-3">
                <Search
                  size={18}
                  className="text-yellow-500 dark:text-yellow-400"
                />
                <input
                  onChange={handleSearch}
                  value={searchTerm}
                  type="text"
                  placeholder="Search Movies"
                  className="w-full p-3 
                    bg-gray-100 dark:bg-gray-800 
                    text-gray-700 dark:text-gray-200 
                    rounded-lg outline-none 
                    focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* Stats summary */}
          <div className="flex flex-wrap items-center justify-between mb-4 px-2">
            <div className="text-sm text-yellow-600 dark:text-yellow-400 mb-2 sm:mb-0">
              Showing {filteredMovies.length} of {watchlist.length} from watch
              list
            </div>

            {filteredGenre !== "All Genres" && (
              <button
                onClick={() => handleFilter("All Genres")}
                className="text-sm text-yellow-500 hover:text-yellow-700 dark:text-yellow-400"
              >
                Clear filter
              </button>
            )}
          </div>

          {/* Card view for mobile and small screens */}
          <div className="grid grid-cols-1 sm:hidden gap-4 mb-6">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movieObj) => (
                <div
                  key={movieObj.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
                >
                  <div className="flex p-4">
                    <img
                      className="h-32 w-24 object-cover rounded"
                      src={`https://image.tmdb.org/t/p/w92/${movieObj.poster_path}`}
                      alt={movieObj.title || movieObj.name}
                      loading="lazy"
                    />
                    <div className="ml-4 flex-1">
                      <h3
                        className="font-semibold text-lg mb-1 cursor-pointer hover:underline"
                        onClick={() => setSelectedMovie(movieObj)}
                      >
                        {movieObj.title || movieObj.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {(
                          movieObj.release_date ||
                          movieObj.first_air_date ||
                          ""
                        ).substring(0, 4)}{" "}
                        • {genreids[movieObj.genre_ids[0]]}
                      </p>
                      <div className="flex items-center mb-3">
                        <Star size={16} className="text-yellow-500 mr-1" />
                        <span>{movieObj.vote_average?.toFixed(1)}</span>
                        <span className="mx-2">•</span>
                        <span className="text-sm">
                          Pop: {movieObj.popularity?.toFixed(1)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveFromWatchList(movieObj)}
                        className="bg-red-500 text-white px-3 py-1 text-sm rounded-xl hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                No movie or series found matching your criteria.
              </div>
            )}
          </div>

          {/* Table view for tablets and larger screens */}
          <div className="hidden sm:block overflow-x-auto bg-white dark:bg-black rounded-lg shadow">
            <table className="w-full text-left">
              {/* Table headers with sorting icons */}
              <thead className="bg-yellow-500 dark:bg-yellow-600">
                <tr>
                  <th className="p-3 text-center">Movie</th>
                  <th className="p-3">
                    <div className="flex justify-center items-center">
                      <ChevronUp
                        onClick={() => dispatch(sortRatingAsc())}
                        className="cursor-pointer hover:text-blue-500"
                        size={16}
                      />
                      Rating
                      <ChevronDown
                        onClick={() => dispatch(sortRatingDesc())}
                        className="cursor-pointer hover:text-blue-500"
                        size={16}
                      />
                    </div>
                  </th>
                  <th className="p-3 hidden md:table-cell">
                    <div className="flex justify-center items-center">
                      <ChevronUp
                        onClick={() => dispatch(sortPopularityAsc())}
                        className="cursor-pointer hover:text-blue-500"
                        size={16}
                      />
                      Popularity
                      <ChevronDown
                        onClick={() => dispatch(sortPopularityDesc())}
                        className="cursor-pointer hover:text-blue-500"
                        size={16}
                      />
                    </div>
                  </th>
                  <th className="p-3 hidden sm:table-cell">Genre</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {filteredMovies.length > 0 ? (
                  filteredMovies.map((movieObj) => (
                    <tr
                      key={movieObj.id}
                      className="border-b dark:border-gray-700 
                        hover:bg-gray-50 dark:hover:bg-gray-800 
                        transition-colors"
                    >
                      {/* Movie details */}
                      <td className="p-3 flex items-center">
                        <img
                          className="h-24 w-16 object-cover mr-4 rounded"
                          src={`https://image.tmdb.org/t/p/w92/${movieObj.poster_path}`}
                          alt={movieObj.title || movieObj.name}
                          loading="lazy"
                        />
                        <div>
                          <span
                            className="font-semibold dark:text-gray-200 block cursor-pointer hover:underline"
                            onClick={() => setSelectedMovie(movieObj)}
                          >
                            {movieObj.title || movieObj.name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">
                            {(
                              movieObj.release_date ||
                              movieObj.first_air_date ||
                              ""
                            ).substring(0, 4)}
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center">
                          <Star size={16} className="text-yellow-500 mr-1" />
                          {movieObj.vote_average?.toFixed(1)}
                        </div>
                      </td>
                      <td className="p-3 hidden text-center md:table-cell">
                        {movieObj.popularity?.toFixed(1)}
                      </td>
                      <td className="p-3 hidden sm:table-cell">
                        {genreids[movieObj.genre_ids[0]]}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleRemoveFromWatchList(movieObj)}
                          className="bg-red-500 text-white px-3 py-1 
                            rounded-xl hover:bg-red-600 
                            dark:bg-red-700 dark:hover:bg-red-600 
                            transition-colors"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-500 dark:text-gray-400"
                    >
                      No movie or series found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default WatchList;
