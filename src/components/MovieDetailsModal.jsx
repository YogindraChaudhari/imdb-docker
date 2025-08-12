import React, { useEffect, useState } from "react";
import {
  X,
  Star,
  Users,
  Clock,
  Calendar,
  Heart,
  XCircle,
  Link as LinkIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../store/slices/watchlistSlice";
import genreids from "../utils/genre";

function MovieDetailsModal({ movie, onClose }) {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.list);
  const isInWatchlist = watchlist.some((item) => item.id === movie.id);
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState(null);

  // Handle watchlist actions
  const toggleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Fetch additional movie details (runtime, cast) when modal opens
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const API_KEY = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;
        const isMovie = movie.media_type === "tv" ? false : true;
        const endpoint = isMovie
          ? `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=credits`
          : `https://api.themoviedb.org/3/tv/${movie.id}?api_key=${API_KEY}&append_to_response=credits`;

        const response = await fetch(endpoint);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie.id, movie.media_type]);

  if (!movie) return null;

  // Get genre names from ids
  const genreNames = movie.genre_ids?.map((id) => genreids[id]).filter(Boolean);

  // If we have detailed data, use it. Otherwise use the original movie data
  const runtime =
    movieDetails?.runtime || movieDetails?.episode_run_time?.[0] || "?";
  const cast =
    movieDetails?.credits?.cast?.slice(0, 8).map((actor) => actor.name) || [];
  const director = movieDetails?.credits?.crew?.find(
    (person) => person.job === "Director"
  )?.name;
  const genres =
    movieDetails?.genres?.map((genre) => genre.name) || genreNames || [];

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl 
        max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 
            bg-black/50 text-white 
            p-2 rounded-full 
            hover:bg-black/70 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Modal content with improved responsive layout */}
        {!loading && (
          <div className="flex flex-col md:flex-row">
            {/* Poster container - smaller, more proportional */}
            {/* Poster container */}
            <div className="w-full md:w-2/5 lg:w-1/3 p-4 flex flex-col items-center md:items-start">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : "/placeholder-poster.jpg"
                }
                alt={movie.title || movie.name}
                className="w-40 sm:w-52 md:w-full h-auto rounded-lg shadow-lg"
                loading="lazy"
              />

              {/* Watchlist button below poster on all views */}
              <button
                onClick={toggleWatchlist}
                className={`mt-4 w-full md:w-auto px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors
      ${
        isInWatchlist
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-green-500 hover:bg-green-600 text-white"
      }`}
              >
                {isInWatchlist ? (
                  <>
                    <XCircle className="inline mr-2" size={18} />
                    Remove from Watchlist
                  </>
                ) : (
                  <>
                    <Heart className="inline mr-2" size={18} />
                    Add to Watchlist
                  </>
                )}
              </button>
            </div>

            {/* Details container - more space for content */}
            <div className="w-full md:w-3/5 lg:w-2/3 p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-center md:text-left">
                {movie.title || movie.name}
              </h2>

              {/* Meta info */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start text-gray-500 dark:text-gray-400 text-sm mb-4">
                {(movie.release_date || movie.first_air_date) && (
                  <div className="flex items-center">
                    <Calendar className="mr-1" size={16} />
                    {new Date(
                      movie.release_date || movie.first_air_date
                    ).getFullYear()}
                  </div>
                )}

                <div className="flex items-center">
                  <Clock className="mr-1" size={16} />
                  <span>{runtime} min</span>
                </div>

                <div className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs">
                  {movie.media_type === "tv" ? "TV Show" : "Movie"}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6 text-sm sm:text-base">
                <div>
                  <div className="flex justify-center items-center mb-1">
                    <Star className="text-yellow-500 mr-1" size={18} />
                    <span className="font-bold">
                      {movie.vote_average?.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Rating
                  </span>
                </div>
                <div>
                  <div className="font-bold mb-1">
                    {movie.vote_count?.toLocaleString()}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Votes
                  </span>
                </div>
                <div>
                  <div className="font-bold mb-1">
                    {movie.popularity?.toFixed(1)}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Popularity
                  </span>
                </div>
              </div>

              {/* Genres */}
              {genres.length > 0 && (
                <div className="mb-5">
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-900 text-yellow-400 rounded-full text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Overview */}
              <div className="mb-5">
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Overview
                </h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {movie.overview || "No overview available."}
                </p>
              </div>

              {/* Director */}
              {director && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Director
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {director}
                  </p>
                </div>
              )}

              {/* Cast */}
              {cast.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Cast
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cast.map((name, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-900 text-yellow-400 rounded-full text-sm"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Official Site */}
              {movieDetails?.homepage && (
                <div className="mb-4">
                  <a
                    href={movieDetails.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-green-400 hover:text-green-500 transition-colors"
                  >
                    <LinkIcon size={16} className="mr-2" />
                    Official Website
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetailsModal;
