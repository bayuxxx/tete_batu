import React, { useState, useRef, useEffect } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

const Gallery = () => {
  const photos = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1470104240373-bc1812eddc9f",
      alt: "Hideaway Tetebatu Landscape View",
      type: "image",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1470104240373-bc1812eddc9f",
      alt: "Waterfall at Hideaway Tetebatu",
      type: "image",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1470104240373-bc1812eddc9f",
      alt: "Hideaway Tetebatu Landscape View",
      type: "image",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1470104240373-bc1812eddc9f",
      alt: "Waterfall at Hideaway Tetebatu",
      type: "image",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1470104240373-bc1812eddc9f",
      alt: "Waterfall at Hideaway Tetebatu",
      type: "image",
    },
  ];

  const videos = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
      src: 'https://www.youtube.com/embed/iQo-8wx0l0Y?si=B-6KM_VdnZZ06w-D',
      alt: "Welcome to Hideaway Tetebatu",
      type: "video",
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
      src: 'https://www.youtube.com/embed/iQo-8wx0l0Y?si=B-6KM_VdnZZ06w-D',
      alt: "Exploring Tetebatu Village",
      type: "video",
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
      src: 'https://www.youtube.com/embed/iQo-8wx0l0Y?si=B-6KM_VdnZZ06w-D',
      alt: "Local Traditions",
      type: "video",
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
      src: 'https://www.youtube.com/embed/pqfZYvsTkkk?si=58y-4MbnkVMMgbCA',
      alt: "Exploring Tetebatu Village",
      type: "video",
    },
    {
      id: 5,
      thumbnail: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
      src: 'https://www.youtube.com/embed/pqfZYvsTkkk?si=58y-4MbnkVMMgbCA',
      alt: "Local Traditions",
      type: "video",
    },
  ];

  const [activeTab, setActiveTab] = useState("photos");
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const modalRef = useRef(null);
  
  const currentGallery = activeTab === "photos" ? photos : videos;
  
  const openModal = (media) => {
    const index = currentGallery.findIndex(item => item.id === media.id);
    setSelectedMedia(media);
    setCurrentIndex(index >= 0 ? index : 0);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.add('animate-fadeOut');
      setTimeout(() => {
        setModalOpen(false);
        setSelectedMedia(null);
        document.body.style.overflow = '';
      }, 300);
    } else {
      setModalOpen(false);
      setSelectedMedia(null);
      document.body.style.overflow = '';
    }
  };
  
  const showPrevious = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    setCurrentIndex(newIndex);
    setSelectedMedia(currentGallery[newIndex]);
  };
  
  const showNext = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % currentGallery.length;
    setCurrentIndex(newIndex);
    setSelectedMedia(currentGallery[newIndex]);
  };
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalOpen) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        showPrevious(e);
      } else if (e.key === 'ArrowRight') {
        showNext(e);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, currentIndex]);

  return (
    <section id="gallery" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-2 text-gray-800">Our Gallery</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore the beauty and experiences of Hideaway Tetebatu through our collection of images and videos
        </p>

        {/* Gallery Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-100 p-1 rounded-full shadow-sm">
            <button
              className={`px-6 py-2 font-medium rounded-full transition-all duration-300 ${
                activeTab === "photos" 
                  ? "bg-green-500 text-white shadow-md" 
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("photos")}
            >
              Photos
            </button>
            <button
              className={`px-6 py-2 font-medium rounded-full transition-all duration-300 ${
                activeTab === "videos" 
                  ? "bg-green-500 text-white shadow-md" 
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("videos")}
            >
              Videos
            </button>
          </div>
        </div>

        {/* Gallery Grid - Masonry style layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {currentGallery.map((item, index) => (
            <div
              key={item.id}
              className={`group overflow-hidden rounded-xl shadow-md cursor-pointer transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                index % 5 === 0 ? "row-span-2 sm:col-span-2" : 
                index % 7 === 0 ? "sm:row-span-2" : ""
              }`}
              onClick={() => openModal(item)}
            >
              <div className="relative overflow-hidden h-full">
                <img
                  src={item.type === "image" ? item.src : item.thumbnail}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                  <div>
                    <h3 className="text-white font-medium text-lg truncate">{item.alt}</h3>
                    {item.type === "video" && (
                      <div className="flex items-center mt-1 text-white/80 text-sm">
                        <Play size={16} className="mr-1" />
                        <span>Play video</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                  <iframe
                    className="w-full h-full"
                    src={item.src}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for viewing media - with improved animations and navigation */}
      {modalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={closeModal}
        >
          {/* Navigation buttons */}
          <button 
            onClick={showPrevious} 
            className="absolute left-2 md:left-8 z-10 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white backdrop-blur-sm transition-all"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={showNext} 
            className="absolute right-2 md:right-8 z-10 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white backdrop-blur-sm transition-all"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Close button */}
          <button 
            onClick={closeModal} 
            className="absolute top-4 right-4 z-10 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white backdrop-blur-sm transition-all"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          
          {/* Media container */}
          <div
            className="max-w-5xl w-full max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia?.type === "image" ? (
              <img
                src={selectedMedia.src}
                alt={selectedMedia.alt}
                className="w-full h-auto max-h-[85vh] object-contain mx-auto animate-scaleIn"
              />
            ) : (
              <div className="relative w-full pb-9/16 bg-black">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-center p-4 max-w-2xl animate-scaleIn">
                    <Play size={64} className="mx-auto text-white/50 mb-4" />
                    <p className="text-white/80 text-lg">
                      {selectedMedia.alt}
                    </p>
                    <p className="mt-2 text-white/60">
                      Video preview (actual video would play here)
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Caption */}
            <div className="bg-black/50 backdrop-blur-sm p-4 text-white">
              <h3 className="font-medium text-lg">{selectedMedia?.alt}</h3>
              <p className="text-white/70 text-sm mt-1">
                {`${currentIndex + 1} of ${currentGallery.length}`}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Custom animations styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-fadeOut {
          animation: fadeOut 0.3s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out forwards;
        }
        
        .pb-9/16 {
          padding-bottom: 56.25%;
        }
      `}</style>
    </section>
  );
};

export default Gallery;