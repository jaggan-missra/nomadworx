import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle, ExternalLink } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  className?: string;
  label?: string;
  description?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  multiple = false,
  maxFiles = 1,
  accept = 'image/*',
  className = '',
  label = 'Upload Image',
  description = 'Drag and drop an image here, or click to select'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    setError('');
    
    if (files.length === 0) return;
    
    // Validate file types
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (validFiles.length !== files.length) {
      setError('Please select only image files');
      return;
    }
    
    // Validate file count
    if (!multiple && validFiles.length > 1) {
      setError('Please select only one image');
      return;
    }
    
    if (multiple && validFiles.length > maxFiles) {
      setError(`Please select no more than ${maxFiles} images`);
      return;
    }
    
    // Validate file size (max 5MB per file)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = validFiles.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      setError('Please select images smaller than 5MB');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // In a real application, you would upload to a cloud service like AWS S3, Cloudinary, etc.
      // For this demo, we'll create object URLs
      const file = validFiles[0];
      const objectUrl = URL.createObjectURL(file);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onChange(objectUrl);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (imageUrl.trim()) {
      // Basic URL validation
      try {
        new URL(imageUrl);
        onChange(imageUrl.trim());
        setImageUrl('');
        setShowUrlInput(false);
        setError('');
      } catch {
        setError('Please enter a valid image URL');
      }
    }
  };

  const handleRemove = () => {
    if (value && value.startsWith('blob:')) {
      URL.revokeObjectURL(value);
    }
    if (onRemove) {
      onRemove();
    } else {
      onChange('');
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-stone-700">
          {label}
        </label>
      )}
      
      {value ? (
        <div className="space-y-3">
          {/* Image Preview with Proper Fitting */}
          <div className="relative w-full">
            <div className="relative w-full h-48 overflow-hidden rounded-lg border-2 border-stone-200 bg-stone-50">
              <img
                src={value}
                alt="Uploaded image"
                className="w-full h-full object-contain bg-white"
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.objectFit = 'cover';
                }}
              />
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                title="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={openFileDialog}
              className="px-3 py-2 text-sm bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-lg transition-colors font-medium"
            >
              Change Image
            </button>
            <button
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="px-3 py-2 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-lg transition-colors font-medium"
            >
              Use URL Instead
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openFileDialog}
            className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? 'border-amber-500 bg-amber-50 scale-105'
                : 'border-stone-300 hover:border-amber-400 hover:bg-stone-50'
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600 mb-3"></div>
                <p className="text-sm font-medium text-stone-700">Uploading image...</p>
                <p className="text-xs text-stone-500 mt-1">Please wait</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-stone-400" />
                </div>
                <p className="text-sm font-medium text-stone-700 mb-2">{description}</p>
                <p className="text-xs text-stone-500 mb-3">PNG, JPG, GIF up to 5MB</p>
                <div className="flex items-center space-x-2 text-xs text-stone-400">
                  <span>Supports: 16:9, 4:3, 1:1 aspect ratios</span>
                </div>
              </div>
            )}
          </div>

          {/* URL Input Option */}
          <div className="text-center">
            <button
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Or use image URL
            </button>
          </div>

          {showUrlInput && (
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
                <button
                  onClick={handleUrlSubmit}
                  disabled={!imageUrl.trim()}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-stone-300 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Add
                </button>
              </div>
              <p className="text-xs text-stone-500">
                Enter a direct link to an image (JPG, PNG, GIF)
              </p>
            </div>
          )}
        </div>
      )}
      
      {error && (
        <div className="flex items-center text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Image Guidelines */}
      {!value && (
        <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
          <h4 className="text-sm font-medium text-stone-800 mb-2">Image Guidelines:</h4>
          <ul className="text-xs text-stone-600 space-y-1">
            <li>• Recommended size: 800x600px or higher</li>
            <li>• Aspect ratio: 16:9, 4:3, or 1:1 for best results</li>
            <li>• Format: JPG, PNG, or GIF</li>
            <li>• File size: Maximum 5MB</li>
            <li>• Images will be automatically fitted to maintain aspect ratio</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;