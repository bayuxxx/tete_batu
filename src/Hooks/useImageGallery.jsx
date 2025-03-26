import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../config/firebase";

export const useImageGallery = () => {
  const [images, setImages] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const fetchImages = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, "images"));
      const imageList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(imageList);
    } catch (error) {
      console.error("Error fetching images: ", error);
      showAlert("error", "Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "react_upload");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/damguvwwb/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error: ", error);
      showAlert("error", "Failed to upload image");
      return null;
    }
  };

  const handleCreate = async (imageData) => {
    setLoading(true);
    try {
      const imageUrl = imageData.file
        ? await uploadToCloudinary(imageData.file)
        : null;

      if (imageUrl) {
        await addDoc(collection(firestore, "images"), {
          title: imageData.title,
          alt: imageData.alt,
          src: imageUrl,
        });

        fetchImages();
        showAlert("success", "Image added successfully");
        setDialogOpen(false);
      }
    } catch (error) {
      console.error("Error creating image: ", error);
      showAlert("error", "Failed to add image");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (imageData) => {
    setLoading(true);
    try {
      let imageUrl = imageData.src;

      if (imageData.file) {
        imageUrl = await uploadToCloudinary(imageData.file);
      }

      const imageRef = doc(firestore, "images", imageData.id);
      await updateDoc(imageRef, {
        title: imageData.title,
        alt: imageData.alt,
        src: imageUrl,
      });

      fetchImages();
      showAlert("success", "Image updated successfully");
      setDialogOpen(false);
    } catch (error) {
      console.error("Error updating image: ", error);
      showAlert("error", "Failed to update image");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await deleteDoc(doc(firestore, "images", imageId));
      fetchImages();
      showAlert("success", "Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image: ", error);
      showAlert("error", "Failed to delete image");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddDialog = () => {
    setSelectedImage(null);
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (image) => {
    setSelectedImage(image);
    setDialogOpen(true);
  };

  return {
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
    setDialogOpen,
  };
};
