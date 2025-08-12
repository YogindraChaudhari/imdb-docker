import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ handlePrevious, handleNext, pageNo }) {
  return (
    <div
      className=" p-4 m-8 flex justify-center 
      items-center rounded-lg shadow-md 
      transition-colors duration-300"
    >
      <button
        onClick={handlePrevious}
        disabled={pageNo === 1}
        className="px-4 py-2 mr-4 
          bg-white dark:bg-gray-700 
          text-gray-700 dark:text-gray-300 
          rounded-full 
          hover:bg-gray-100 dark:hover:bg-gray-600 
          disabled:opacity-50 disabled:cursor-not-allowed 
          transition-all duration-300 
          flex items-center justify-center"
      >
        <ChevronLeft className="mr-1" />
        Prev
      </button>

      <div
        className="px-4 py-2 
       bg-yellow-500 hover:bg-yellow-600 text-black
        rounded-full 
        font-bold 
        min-w-[60px] 
        text-center"
      >
        {pageNo}
      </div>

      <button
        onClick={handleNext}
        className="px-4 py-2 ml-4 
          bg-white dark:bg-gray-700 
          text-gray-700 dark:text-gray-300 
          rounded-full 
          hover:bg-gray-100 dark:hover:bg-gray-600 
          transition-all duration-300 
          flex items-center justify-center"
      >
        Next
        <ChevronRight className="ml-1" />
      </button>
    </div>
  );
}

export default Pagination;
