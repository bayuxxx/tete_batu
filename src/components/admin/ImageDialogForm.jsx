import React, { useState, useEffect } from 'react';

function ImageDialogForm({ open, onClose, onSubmit, initialData, loading }) {
  const [formData, setFormData] = useState({
    title: '',
    alt: '',
    file: null,
    src: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        title: initialData.title || '',
        alt: initialData.alt || '',
        src: initialData.src || '',
        file: null
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      file: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-96 p-6 relative">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {initialData.id ? 'Edit Image' : 'Add New Image'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              htmlFor="title" 
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="alt" 
              className="block text-gray-700 font-bold mb-2"
            >
              Alt Text
            </label>
            <input
              type="text"
              id="alt"
              name="alt"
              value={formData.alt}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="file" 
              className="block text-gray-700 font-bold mb-2"
            >
              Image File
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          {formData.src && (
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Current Image
              </label>
              <img 
                src={formData.src} 
                alt="Current" 
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          )}

          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 py-2 rounded ${
                loading 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>

        {/* Loading Indicator */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageDialogForm;