import React from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      className="sticky top-0 z-50 flex flex-wrap border items-center justify-between px-4 py-4 
  dark:bg-dark-background dark:border-gray-700 
  bg-light-background transition-colors duration-300"
    >
      <div className="flex flex-wrap items-center space-x-4">
        <Link to="/">
          <p className="text-black-500 dark:text-white text-2xl md:text-3xl font-bold">
            IMDB 🎬
          </p>
        </Link>
        <nav className="flex space-x-4">
          <Link
            to="/"
            className="text-blue-500 dark:text-blue-300 text-xl md:text-2xl font-bold 
              hover:text-blue-700 dark:hover:text-blue-200 transition-colors"
          >
            MOVIES
          </Link>
          <Link
            to="/watchlist"
            className="text-red-500 dark:text-red-300 text-xl md:text-2xl font-bold 
              hover:text-red-700 dark:hover:text-red-200 transition-colors"
          >
            WATCHLIST
          </Link>
        </nav>
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full 
          bg-gray-200 dark:bg-gray-700 
          hover:bg-gray-300 dark:hover:bg-gray-600 
          transition-colors self-start md:self-auto"
      >
        {isDarkMode ? (
          <Sun className="text-yellow-500" size={24} />
        ) : (
          <Moon className="text-indigo-600" size={24} />
        )}
      </button>
    </div>
  );
};

export default Navbar;
