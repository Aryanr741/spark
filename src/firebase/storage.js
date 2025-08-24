// Firebase Storage service functions
// These functions will be used when implementing actual Firebase storage for photos

import { 
  ref, 
  uploadBytes, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { storage } from './config';

// Upload a single profile photo
export const uploadProfilePhoto = async (userId, file, photoIndex = 0) => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const fileName = `profile_${photoIndex}_${timestamp}.${file.name.split('.').pop()}`;
    const photoRef = ref(storage, `users/${userId}/photos/${fileName}`);
    
    // Upload the file
    const snapshot = await uploadBytes(photoRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      success: true,
      downloadURL,
      fileName,
      fullPath: snapshot.ref.fullPath
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Upload multiple profile photos
export const uploadMultiplePhotos = async (userId, files) => {
  try {
    const uploadPromises = files.map((file, index) => 
      uploadProfilePhoto(userId, file, index)
    );
    
    const results = await Promise.all(uploadPromises);
    
    const successfulUploads = results.filter(result => result.success);
    const failedUploads = results.filter(result => !result.success);
    
    return {
      success: successfulUploads.length > 0,
      successfulUploads,
      failedUploads,
      urls: successfulUploads.map(upload => upload.downloadURL)
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Upload with progress tracking
export const uploadPhotoWithProgress = (userId, file, photoIndex, onProgress) => {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    const fileName = `profile_${photoIndex}_${timestamp}.${file.name.split('.').pop()}`;
    const photoRef = ref(storage, `users/${userId}/photos/${fileName}`);
    
    const uploadTask = uploadBytesResumable(photoRef, file);
    
    uploadTask.on('state_changed',
      (snapshot) => {
        // Progress tracking
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) {
          onProgress(progress, snapshot.state);
        }
      },
      (error) => {
        // Error handling
        reject({
          success: false,
          error: error.message
        });
      },
      async () => {
        // Upload completed successfully
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            success: true,
            downloadURL,
            fileName,
            fullPath: uploadTask.snapshot.ref.fullPath
          });
        } catch (error) {
          reject({
            success: false,
            error: error.message
          });
        }
      }
    );
  });
};

// Delete a profile photo
export const deleteProfilePhoto = async (photoPath) => {
  try {
    const photoRef = ref(storage, photoPath);
    await deleteObject(photoRef);
    
    return {
      success: true,
      message: 'Photo deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Delete all photos for a user
export const deleteAllUserPhotos = async (userId) => {
  try {
    // This would require listing all files first, then deleting them
    // For now, we'll provide the structure for future implementation
    const userPhotosRef = ref(storage, `users/${userId}/photos/`);
    
    // In a real implementation, you'd list all files and delete them
    // This is a placeholder for the actual implementation
    
    return {
      success: true,
      message: 'All user photos deletion initiated'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Compress and resize image before upload
export const compressImage = (file, maxWidth = 800, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxWidth) {
          width = (width * maxWidth) / height;
          height = maxWidth;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        resolve(new File([blob], file.name, {
          type: 'image/jpeg',
          lastModified: Date.now()
        }));
      }, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Validate file type and size
export const validatePhoto = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Please select a valid image file (JPEG, PNG, WebP)'
    };
  }
  
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Image size must be less than 10MB'
    };
  }
  
  return { valid: true };
};
