import React, { useState } from "react";
import { Play } from "lucide-react";

const Gallery = () => {
  // Sample data for the gallery with mixed orientations
  const photos = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1470104240373-bc1812eddc9f",
      alt: "Hideaway Tetebatu Landscape View",
      type: "image",
      span: "col-span-2 row-span-2", // Large landscape
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1470104240373-bc1812eddc9f",
      alt: "Waterfall at Hideaway Tetebatu",
      type: "image",
      span: "col-span-1 row-span-2", // Tall portrait
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b",
      alt: "Hiking Trail",
      type: "image",
      span: "col-span-1 row-span-1", // Small square
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      alt: "Local Cuisine",
      type: "image",
      span: "col-span-1 row-span-1", // Small square
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
      alt: "Cultural Performance",
      type: "image",
      span: "col-span-2 row-span-1", // Wide landscape
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1502680390469-be75c86b636f",
      alt: "Sunset at Tetebatu",
      type: "image",
      span: "col-span-1 row-span-2", // Tall portrait
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1502680390469-be75c86b636f",
      alt: "Sunset at Tetebatu",
      type: "image",
      span: "col-span-1 row-span-2", // Tall portrait
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
        alt: "Cultural Performance",
        type: "image",
        span: "col-span-2 row-span-1", // Wide landscape
      },
  ];

  const videos = [
    {
      id: 1,
      thumbnail: "/bg.jpeg",
      alt: "Welcome to Hideaway Tetebatu",
      type: "video",
      span: "col-span-2 row-span-2",
    },
    {
      id: 2,
      thumbnail: "/bg.jpeg",
      alt: "Exploring Tetebatu Village",
      type: "video",
      span: "col-span-1 row-span-1",
    },
    {
      id: 3,
      thumbnail: "/bg.jpeg",
      alt: "Local Traditions",
      type: "video",
      span: "col-span-1 row-span-1",
    },
  ];

  // State for active gallery tab
  const [activeTab, setActiveTab] = useState("photos");

  // State for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Function to open modal with selected media
  const openModal = (media) => {
    setSelectedMedia(media);
    setModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedMedia(null);
  };

  return (
    <section id="gallery" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Gallery</h2>

        {/* Gallery Tabs */}
        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 font-medium rounded-l-lg ${
              activeTab === "photos" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("photos")}
          >
            Photos
          </button>
          <button
            className={`px-6 py-2 font-medium rounded-r-lg ${
              activeTab === "videos" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("videos")}
          >
            Videos
          </button>
        </div>

        {/* Photos Grid */}
        {activeTab === "photos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className={`${photo.span} overflow-hidden rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition duration-300`}
                onClick={() => openModal(photo)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Videos Grid */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className={`${video.span} overflow-hidden rounded-lg shadow-md cursor-pointer relative transform hover:scale-105 transition duration-300`}
                onClick={() => openModal(video)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <Play size={48} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for viewing media */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg overflow-hidden max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg">
                {selectedMedia?.alt || "Media View"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              {selectedMedia?.type === "image" ? (
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.alt}
                  className="w-full h-auto"
                />
              ) : (
                <div className="relative pt-16/9">
                  <div className="bg-gray-200 flex items-center justify-center h-64 md:h-96">
                    <div className="text-center p-4">
                      <Play size={64} className="mx-auto text-gray-500 mb-2" />
                      <p className="text-gray-700">
                        Video preview (actual video would play here)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
