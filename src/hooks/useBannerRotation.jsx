import { useState, useEffect } from "react";

const bannerImages = [
  {
    url: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
    title: "Cinema Magic",
    description: "Explore Cinematic Wonders",
  },
  {
    url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
    title: "Movie Night",
    description: "Discover Unforgettable Stories",
  },
  {
    url: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
    title: "Silver Screen",
    description: "Your Ultimate Movie Companion",
  },
  {
    url: "https://images.unsplash.com/photo-1543536448-d209d2d13a1c",
    title: "Lights, Camera, Action",
    description: "Curated Films for Every Mood",
  },
];

export const useBannerRotation = () => {
  const [currentBanner, setCurrentBanner] = useState(bannerImages[0]);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (bannerIndex + 1) % bannerImages.length;
      setCurrentBanner(bannerImages[nextIndex]);
      setBannerIndex(nextIndex);
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval);
  }, [bannerIndex]);

  return currentBanner;
};
