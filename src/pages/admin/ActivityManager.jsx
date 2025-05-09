import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import api from "../../api/axios";
import { format } from "date-fns";

axios.defaults.baseURL = api.baseURL;

const ActivityManager = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get("/activities");
      setActivities(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching activities");
      setLoading(false);
    }
  };

  const handleOpenDialog = (activity = null) => {
    if (activity) {
      setEditingActivity(activity);
      setFormData({
        title: activity.title,
        description: activity.description,
        image: null,
      });
      setPreview(activity.imageUrl);
    } else {
      setEditingActivity(null);
      setFormData({
        title: "",
        description: "",
        image: null,
      });
      setPreview(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingActivity(null);
    setFormData({
      title: "",
      description: "",
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
    submitData.append("description", formData.description);
    if (formData.image) {
      submitData.append("image", formData.image);
    }

    try {
      if (editingActivity) {
        await axios.put(`/activities/${editingActivity.id}`, submitData);
      } else {
        await axios.post("/activities", submitData);
      }
      fetchActivities();
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.message || "Error submitting activity");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        await axios.delete(`/activities/${id}`);
        setActivities(activities.filter((activity) => activity.id !== id));
      } catch (err) {
        setError("Error deleting activity");
      }
    }
  };

  if (loading && !openDialog) return <div>Loading...</div>;

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Activity Manager
          </h1>
        </div>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300 mt-4 md:mt-0"
          onClick={() => handleOpenDialog()}
        >
          Add New Activity
        </button>
      </div>

      {error && (
        <div className="text-red-600 p-4 mb-6 bg-red-100 rounded-lg shadow-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={activity.imageUrl}
              alt={activity.title}
              className="w-full h-[220px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 truncate">
                {activity.title}
              </h3>
              <p className="text-gray-700 mt-2 overflow-hidden text-ellipsis line-clamp-3 min-h-[70px]">
                {activity.description}
              </p>
              <div className="flex  sm:flex-row justify-between items-center mt-4 text-sm text-gray-500">
                <div>{format(new Date(activity.createdAt), "d MMM yyyy")}</div>
                <div className="flex  sm:flex-row gap-4 mt-4 sm:mt-0">
                  <button
                    className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold shadow-md hover:bg-green-700 transition duration-300"
                    onClick={() => handleOpenDialog(activity)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold shadow-md hover:bg-red-700 transition duration-300"
                    onClick={() => handleDelete(activity.id)}
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
          {editingActivity ? "Edit Activity" : "Create New Activity"}
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
                htmlFor="description"
                className="block mb-2 font-semibold text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y h-[150px] transition duration-200"
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
                required={!editingActivity}
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
                : editingActivity
                ? "Update Activity"
                : "Create Activity"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActivityManager;
