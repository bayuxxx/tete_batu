import React, { useState } from "react";
import { Play } from "lucide-react";

const VideoGallery = ({ videos }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {videos.map((item, index) => (
        <div
          key={item.id}
          className={`group overflow-hidden rounded-xl shadow-md transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
            index % 5 === 0 ? "row-span-2 sm:col-span-2" : index % 7 === 0 ? "sm:row-span-2" : ""
          }`}
        >
          {/* Video Container with Fixed Aspect Ratio */}
          <div className="relative w-full pt-[56.25%]">
            <iframe
              src={`${item.src}${activeVideo === item.id ? '?autoplay=1' : ''}`}
              title={item.alt}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              style={{ border: 'none' }}
            />
            {/* Overlay with gradient and play button - only show when video is not active */}
            {activeVideo !== item.id && (
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4 cursor-pointer"
                onClick={() => setActiveVideo(item.id)}
              >
                <div>
                  <h3 className="text-white font-medium text-lg truncate max-w-full">
                    {item.alt}
                  </h3>
                  <div className="flex items-center mt-1 text-white/80 text-sm">
                    <Play size={16} className="mr-1" />
                    <span>Play video</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;