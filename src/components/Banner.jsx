import React from "react";
import { useBannerRotation } from "../hooks/useBannerRotation";
import { Play, Clapperboard } from "lucide-react";

function Banner() {
  const currentBanner = useBannerRotation();

  return (
    <div
      className="relative h-[40vh] md:h-[70vh] 
        bg-cover bg-center 
        flex items-end 
        transition-all duration-700 ease-in-out 
        shadow-lg"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(${currentBanner.url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>

      <div className="relative z-10 w-full p-6 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center items-center mb-4">
            <Clapperboard className="text-yellow-400 mr-3" size={40} />
            <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
              {currentBanner.title}
            </h1>
          </div>

          <p className="text-md md:text-xl text-gray-200 mb-6 drop-shadow-md">
            {currentBanner.description}
          </p>

          <div className="flex justify-center space-x-4">
            <button
              className="flex items-center px-6 py-3 
                bg-yellow-500 text-black 
                rounded-full 
                hover:bg-yellow-600 
                transition-colors 
                font-semibold 
                shadow-lg 
                group"
            >
              <Play className="mr-2 group-hover:scale-110 transition-transform" />
              Explore Movies
            </button>

            <button
              className="flex items-center px-6 py-3 
                bg-transparent 
                border-2 border-white 
                text-white 
                rounded-full 
                hover:bg-white hover:text-black 
                transition-colors 
                font-semibold 
                shadow-lg 
                group"
            >
              <Clapperboard className="mr-2 group-hover:rotate-12 transition-transform" />
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
