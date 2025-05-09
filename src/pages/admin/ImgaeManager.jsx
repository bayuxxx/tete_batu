import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { format } from "date-fns";
import api from "../../api/axios";


axios.defaults.baseURL = api.baseURL;

const ImageManager = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("/images");
      setImages(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching images");
      setLoading(false);
    }
  };

  const handleOpenDialog = (image = null) => {
    if (image) {
      setEditingImage(image);
      setFormData({
        title: image.title,
        image: null,
      });
      setPreview(image.imageUrl);
    } else {
      setEditingImage(null);
      setFormData({
        title: "",
        image: null,
      });
      setPreview(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingImage(null);
    setFormData({
      title: "",
      image: null,
    });
    setPreview(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const submitData = new FormData();
    submitData.append("title", formData.title);
    if (formData.image) {
      submitData.append("image", formData.image);
    }

    try {
      if (editingImage) {
        await axios.put(`/images/${editingImage.id}`, submitData);
      } else {
        await axios.post("/images", submitData);
      }
      fetchImages();
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.message || "Error submitting image");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await axios.delete(`/images/${id}`);
        setImages(images.filter((img) => img.id !== id));
      } catch (err) {
        setError("Error deleting image");
      }
    }
  };

  if (loading && !openDialog) return <div>Loading...</div>;

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Image Manager</h1>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300 mt-4 md:mt-0"
          onClick={() => handleOpenDialog()}
        >
          Add New Image
        </button>
      </div>

      {error && (
        <div className="text-red-600 p-4 mb-6 bg-red-100 rounded-lg shadow-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-[220px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 truncate">
                {image.title}
              </h3>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <div>{format(new Date(image.createdAt), "d MMM yyyy")}</div>
                <div className="flex gap-4">
                  <button
                    className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold shadow-md hover:bg-green-700 transition duration-300"
                    onClick={() => handleOpenDialog(image)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold shadow-md hover:bg-red-700 transition duration-300"
                    onClick={() => handleDelete(image.id)}
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
          {editingImage ? "Edit Image" : "Upload New Image"}
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
                htmlFor="image"
                className="block mb-2 font-semibold text-gray-700"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                required={!editingImage}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {preview && (
                <div className="mt-4 max-w-full max-h-[200px] rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-full max-h-[200px] object-contain"
                  />
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
                : editingImage
                ? "Update Image"
                : "Upload Image"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageManager;
