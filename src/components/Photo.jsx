import React from "react";

const PhotoGallery = ({ photos, openModal }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {photos.map((item, index) => (
        <div
          key={item.id}
          className={`group overflow-hidden rounded-xl shadow-md cursor-pointer transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
            index % 5 === 0
              ? "row-span-2 sm:col-span-2"
              : index % 7 === 0
              ? "sm:row-span-2"
              : ""
          }`}
          onClick={() => openModal(item)}
        >
          <div className="relative overflow-hidden h-full">
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
              <h3 className="text-white font-medium text-lg truncate">
                {item.alt}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
