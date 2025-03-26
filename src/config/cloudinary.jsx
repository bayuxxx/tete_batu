import crypto from 'crypto';

export const cloudinaryConfig = {
  cloudName: 'damguvwwb',
  uploadPreset: 'react_upload',
  apiKey: '364169328419411',
  apiSecret: 'XrBscQbDx5TfcyI-PEctvj0mlrY'
};

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return null;
  }
};

export const deleteFromCloudinary = async (publicId) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = `public_id=${publicId}&timestamp=${timestamp}${cloudinaryConfig.apiSecret}`;
  const hash = crypto.createHash('sha1').update(signature).digest('hex');

  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('api_key', cloudinaryConfig.apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', hash);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/destroy`,
      {
        method: 'POST',
        body: formData
      }
    );
    const data = await response.json();
    return data.result === 'ok';
  } catch (error) {
    console.error('Cloudinary Delete Error:', error);
    return false;
  }
};