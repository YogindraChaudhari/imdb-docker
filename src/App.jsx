import "./App.css";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import { ThemeProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div
          className="min-h-screen bg-light-background dark:bg-dark-background 
        text-light-text dark:text-dark-text transition-colors duration-300"
        >
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/watchlist" element={<WatchList />} />
              <Route
                path="/trending-movies"
                element={<Movies category="popular" title="Trending Movies" />}
              />
              <Route
                path="/trending-shows"
                element={
                  <Movies category="trendingShows" title="Trending Shows" />
                }
              />
              <Route
                path="/new-movies"
                element={<Movies category="newMovies" title="New Movies" />}
              />
              <Route
                path="/new-shows"
                element={<Movies category="newShows" title="New Shows" />}
              />
              <Route
                path="/search"
                element={<Movies category="search" title="Search Results" />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
