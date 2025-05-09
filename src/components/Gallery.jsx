import React, { useState, useEffect } from "react";
import PhotoGallery from "./Photo";
import VideoGallery from "./Video";
import axios from "axios";
import api from "../api/axios";

axios.defaults.baseURL = api.baseURL;
const Gallery = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("photos");

  // Transform data to match the component's expected format
  const transformImageData = (data) => {
    return data.map(image => ({
      id: image.id,
      src: image.imageUrl,
      alt: image.title,
      type: "image",
      createdAt: image.createdAt
    }));
  };

  const transformVideoData = (data) => {
    return data.map(video => {
      const srcMatch = video.url.match(/src="([^"]+)"/);
      const videoSrc = srcMatch ? srcMatch[1] : "";
      
      return {
        id: video.id,
        src: videoSrc,
        alt: video.title,
        type: "video",
        createdAt: video.createdAt,
        createdBy: video.createdBy
      };
    });
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/images");
        const transformedImages = transformImageData(response.data.data);
        setImages(transformedImages);
        setLoading(false);
      } catch (err) {
        setError("Error fetching images");
        setLoading(false);
      }
    };

    const fetchVideos = async () => {
      try {
        const response = await axios.get("/videos");
        const transformedVideos = transformVideoData(response.data.data);
        setVideos(transformedVideos);
        setLoading(false);
      } catch (err) {
        setError("Error fetching videos");
        setLoading(false);
      }
    };

    fetchImages();
    fetchVideos();
  }, []);

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">{error}</div>;
  }

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
              onClick={() => setActiveTab("photos")} 
              className={`px-6 py-2 font-medium rounded-full ${
                activeTab === "photos" ? "bg-green-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Photos
            </button>
            <button 
              onClick={() => setActiveTab("videos")} 
              className={`px-6 py-2 font-medium rounded-full ${
                activeTab === "videos" ? "bg-green-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Videos
            </button>
          </div>
        </div>

        {/* Render based on active tab */}
        {activeTab === "photos" ? (
          <PhotoGallery photos={images} />
        ) : (
          <VideoGallery videos={videos} />
        )}
      </div>
    </section>
  );
};

export default Gallery;