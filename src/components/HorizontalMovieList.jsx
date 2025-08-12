import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import MovieCard from "./MovieCard";

function HorizontalMovieList({ title, movies, path, loading }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        </div>
        <div className="flex space-x-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-[45vh] w-[30vh] rounded-2xl bg-gray-300 dark:bg-gray-700 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        <Link
          to={path}
          className="flex items-center text-yellow-500 hover:text-yellow-600 font-medium transition-colors"
        >
          See More <ArrowRight className="ml-1" size={18} />
        </Link>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx="true">{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {movies.slice(0, 15).map((movieObj) => (
          <div key={movieObj.id} className="flex-shrink-0">
            <MovieCard
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              name={movieObj.original_title || movieObj.title || movieObj.name}
            />
          </div>
        ))}
      </div>

      {/* Scroll buttons below */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={scrollLeft}
          className="bg-transparent text-yellow-400 hover:text-yellow-500 transition-transform transform hover:scale-110"
          title="Scroll Left"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={scrollRight}
          className="bg-transparent text-yellow-400 hover:text-yellow-500 transition-transform transform hover:scale-110"
          title="Scroll Right"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}

export default HorizontalMovieList;
