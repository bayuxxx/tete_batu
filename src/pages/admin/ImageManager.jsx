import React from 'react';
import { useImageGallery } from '../../Hooks/useImageGallery'; 
import ImageDialogForm from '../../components/admin/ImageDialogForm';

function ImageGalleryCRUD() {
  const {
    images,
    dialogOpen,
    selectedImage,
    loading,
    alert,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleOpenAddDialog,
    handleOpenEditDialog,
    setDialogOpen
  } = useImageGallery();

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Alert */}
      {alert && (
        <div 
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded ${
            alert.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}
        >
          {alert.message}
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Image Gallery</h1>

      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-6"
        onClick={handleOpenAddDialog}
        disabled={loading}
      >
        Add New Image
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden relative"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">{image.title}</h2>
              <div className="flex justify-between space-x-2">
                <button 
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                  onClick={() => handleOpenEditDialog(image)}
                  disabled={loading}
                >
                  Edit
                </button>
                <button 
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded"
                  onClick={() => handleDelete(image.id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {dialogOpen && (
        <ImageDialogForm
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSubmit={selectedImage ? handleUpdate : handleCreate}
          initialData={selectedImage || {}}
          loading={loading}
        />
      )}
    </div>
  );
}

export default ImageGalleryCRUD;