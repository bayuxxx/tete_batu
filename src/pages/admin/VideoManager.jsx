import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { format } from "date-fns";
import api from "../../api/axios";

axios.defaults.baseURL = api.baseURL;

const VideoManager = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("/videos");
      setVideos(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching videos");
      setLoading(false);
    }
  };

  const handleOpenDialog = (video = null) => {
    if (video) {
      setEditingVideo(video);
      setFormData({
        title: video.title,
        url: video.url,
      });
    } else {
      setEditingVideo(null);
      setFormData({
        title: "",
        url: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingVideo(null);
    setFormData({
      title: "",
      url: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createMarkup = (html) => {
    return { __html: html };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingVideo) {
        await axios.put(`/videos/${editingVideo.id}`, formData);
      } else {
        await axios.post("/videos", formData);
      }
      fetchVideos();
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.message || "Error submitting video");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        await axios.delete(`/videos/${id}`);
        setVideos(videos.filter((video) => video.id !== id));
      } catch (err) {
        setError("Error deleting video");
      }
    }
  };

  if (loading && !openDialog) return <div>Loading...</div>;

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Video Manager</h1>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300 mt-4 md:mt-0"
          onClick={() => handleOpenDialog()}
        >
          Add New Video
        </button>
      </div>

      {error && (
        <div className="text-red-600 p-4 mb-6 bg-red-100 rounded-lg shadow-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative aspect-video">
              <div dangerouslySetInnerHTML={createMarkup(video.url)} />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 truncate">
                {video.title}
              </h3>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <div>{format(new Date(video.createdAt), "d MMM yyyy")}</div>
                <div className="flex gap-4">
                  <button
                    className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold shadow-md hover:bg-green-700 transition duration-300"
                    onClick={() => handleOpenDialog(video)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold shadow-md hover:bg-red-700 transition duration-300"
                    onClick={() => handleDelete(video.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="text-xl font-semibold text-gray-800">
          {editingVideo ? "Edit Video" : "Add New Video"}
        </DialogTitle>
        <DialogContent className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 font-semibold text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="url"
                className="block mb-2 font-semibold text-gray-700"
              >
                Iframe Code
              </label>
              <textarea
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
                placeholder="<iframe width='560' height='315' src='https://www.youtube.com/embed/...' ...></iframe>"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 min-h-[100px]"
              />
              {formData.url && (
                <div className="mt-4">
                  <label className="block mb-2 font-semibold text-gray-700">
                    Preview
                  </label>
                  <div className="aspect-video">
                    <div dangerouslySetInnerHTML={createMarkup(formData.url)} />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 mt-5 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : editingVideo
                ? "Update Video"
                : "Add Video"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoManager;
