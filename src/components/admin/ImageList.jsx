import React from "react";

const ImageList = ({ images, isLoading, handleDeleteImage }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative p-4">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-56 object-cover border-2 border-black rounded-xl"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                {image.title}
              </h3>

              <button
                onClick={() => handleDeleteImage(image.id)}
                disabled={isLoading}
                className={`
                  w-full py-2 rounded-md text-white font-bold transition-all duration-300
                  ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 active:bg-red-700"
                  }
                  flex items-center justify-center space-x-2
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
