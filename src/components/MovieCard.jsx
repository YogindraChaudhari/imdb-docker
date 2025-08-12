import React, { useState } from "react";
import {
  Heart,
  XCircle,
  Star,
  TrendingUp,
  Calendar,
  Clock,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../store/slices/watchlistSlice";
import { setImageLoading } from "../store/slices/uiSlice";
import MovieDetailsModal from "./MovieDetailsModal";

function MovieCard({ movieObj, poster_path, name }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.list);

  // Check if movie is in watchlist
  const isInWatchlist = watchlist.some((movie) => movie.id === movieObj.id);

  // Handle image loading
  const handleImageLoad = () => {
    setImageLoaded(true);
    dispatch(setImageLoading(false));
  };

  // Handle watchlist actions
  const toggleWatchlist = (e) => {
    e.stopPropagation();
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movieObj));
    } else {
      dispatch(addToWatchlist(movieObj));
    }
  };

  // Use progressive image loading technique
  const thumbnailUrl = poster_path
    ? `https://image.tmdb.org/t/p/w92${poster_path}`
    : "/placeholder-poster.jpg";

  const fullImageUrl = poster_path
    ? `https://image.tmdb.org/t/p/original${poster_path}`
    : "/placeholder-poster.jpg";

  return (
    <>
      <div
        className="relative h-[45vh] w-[30vh] 
          rounded-2xl 
          overflow-hidden 
          shadow-lg 
          transform transition-all duration-300 
          hover:scale-105 
          hover:shadow-xl 
          cursor-pointer
          group bg-gray-300 dark:bg-gray-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowModal(true)}
      >
        {/* Low quality placeholder while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse">
            <div className="flex items-center justify-center h-full">
              <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}

        {/* Progressive image loading */}
        <div
          className={`absolute inset-0 bg-cover bg-center filter blur-sm transition-opacity duration-500 ${
            imageLoaded ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
          }}
        />

        {/* Full quality image */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${fullImageUrl})`,
          }}
        />
        <img
          src={fullImageUrl}
          alt={name}
          className="hidden"
          onLoad={handleImageLoad}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70"></div>

        {/* Movie Title */}
        <div
          className="absolute top-0 w-full 
          bg-gray-600/80 dark:bg-gray-900/80 
          text-white 
          text-center 
          p-2 
          truncate"
        >
          {name}
        </div>

        {/* Watchlist Toggle Button */}
        <div
          onClick={toggleWatchlist}
          className={`absolute top-2 right-2 
            p-2 
            rounded-full 
            transition-all duration-300 
            ${isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
            ${
              isInWatchlist
                ? "bg-red-500/90 hover:bg-red-600"
                : "bg-green-500/90 hover:bg-green-600"
            }
            text-white 
            cursor-pointer 
            hover:scale-110
            shadow-lg`}
          title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        >
          {isInWatchlist ? (
            <XCircle className="h-6 w-6" />
          ) : (
            <Heart className="h-6 w-6" />
          )}
        </div>

        {/* Additional Movie Info Overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 
            bg-black/80 
            text-white 
            px-3 py-4 
            transform transition-transform duration-300
            ${isHovered ? "translate-y-0" : "translate-y-full"}`}
        >
          {/* Rating */}
          <div className="flex items-center mb-2">
            <Star className="text-yellow-400 mr-2" size={16} />
            <span className="font-semibold">
              {movieObj.vote_average?.toFixed(1)}
            </span>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-300">10</span>
          </div>

          {/* Popularity */}
          <div className="flex items-center mb-2">
            <TrendingUp className="text-blue-400 mr-2" size={16} />
            <span>{movieObj.popularity?.toFixed(1)} popularity</span>
          </div>

          {/* Release Date if available */}
          {movieObj.release_date && (
            <div className="flex items-center mb-2">
              <Calendar className="text-green-400 mr-2" size={16} />
              <span>{new Date(movieObj.release_date).getFullYear()}</span>
            </div>
          )}

          {/* Overview short preview */}
          {movieObj.overview && (
            <p className="text-sm line-clamp-2 text-gray-300 mt-2">
              {movieObj.overview}
            </p>
          )}
        </div>
      </div>

      {/* Modal for detailed movie information */}
      {showModal && (
        <MovieDetailsModal
          movie={movieObj}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default MovieCard;
