import React, { useState } from 'react';
import { Camera, Upload, ChevronRight, ChevronLeft, X, Plus } from 'lucide-react';
import { useAppContext, ACTION_TYPES } from '../context/AppContext';
import { availableInterests } from '../data/mockData';

const OnboardingPage = () => {
  const { currentUser, onboardingStep, dispatch } = useAppContext();
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    age: '',
    gender: '',
    location: '',
    bio: '',
    interests: [],
    photos: []
  });
  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, title: 'Personal Details', description: 'Tell us about yourself' },
    { number: 2, title: 'Photos', description: 'Add your best photos' },
    { number: 3, title: 'Bio & Interests', description: 'Share your story and hobbies' }
  ];

  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleInterestToggle = (interest) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData(prev => ({
          ...prev,
          photos: [...prev.photos, event.target.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    setProfileData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!profileData.name) newErrors.name = 'Name is required';
        if (!profileData.age || profileData.age < 18 || profileData.age > 100) {
          newErrors.age = 'Please enter a valid age (18-100)';
        }
        if (!profileData.gender) newErrors.gender = 'Please select your gender';
        if (!profileData.location) newErrors.location = 'Location is required';
        break;
      case 2:
        if (profileData.photos.length < 2) {
          newErrors.photos = 'Please add at least 2 photos';
        }
        break;
      case 3:
        if (!profileData.bio || profileData.bio.length < 20) {
          newErrors.bio = 'Please write a bio with at least 20 characters';
        }
        if (profileData.interests.length < 3) {
          newErrors.interests = 'Please select at least 3 interests';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(onboardingStep)) {
      if (onboardingStep < 3) {
        dispatch({
          type: ACTION_TYPES.SET_ONBOARDING_STEP,
          payload: onboardingStep + 1
        });
      } else {
        completeOnboarding();
      }
    }
  };

  const prevStep = () => {
    if (onboardingStep > 1) {
      dispatch({
        type: ACTION_TYPES.SET_ONBOARDING_STEP,
        payload: onboardingStep - 1
      });
    }
  };

  const completeOnboarding = () => {
    // Update user profile with complete data
    const updatedUser = {
      ...currentUser,
      ...profileData,
      photos: profileData.photos.length > 0 ? profileData.photos : [
        'https://images.unsplash.com/photo-1494790108755-2616b5352da1?w=400&h=600&fit=crop'
      ],
      verified: true,
      lastActive: 'now'
    };

    dispatch({
      type: ACTION_TYPES.UPDATE_USER_PROFILE,
      payload: updatedUser
    });

    // Show success notification
    dispatch({
      type: ACTION_TYPES.ADD_NOTIFICATION,
      payload: {
        id: Date.now(),
        type: 'success',
        message: 'Profile created successfully! Start discovering matches.',
        timestamp: new Date().toISOString()
      }
    });

    // Redirect to discovery page
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_PAGE,
      payload: 'matches'
    });
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={profileData.name}
          onChange={handleInputChange}
          className={`input-field ${errors.name ? 'border-red-500' : ''}`}
          placeholder="Enter your full name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={profileData.age}
          onChange={handleInputChange}
          className={`input-field ${errors.age ? 'border-red-500' : ''}`}
          placeholder="Enter your age"
          min="18"
          max="100"
        />
        {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={profileData.gender}
          onChange={handleInputChange}
          className={`input-field ${errors.gender ? 'border-red-500' : ''}`}
        >
          <option value="">Select your gender</option>
          {genderOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={profileData.location}
          onChange={handleInputChange}
          className={`input-field ${errors.location ? 'border-red-500' : ''}`}
          placeholder="City, State"
        />
        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-600 mb-6">
          Add at least 2 photos to show your personality. The first photo will be your main profile picture.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {profileData.photos.map((photo, index) => (
          <div key={index} className="relative">
            <img
              src={photo}
              alt={`Profile ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
            {index === 0 && (
              <div className="absolute bottom-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded">
                Main Photo
              </div>
            )}
          </div>
        ))}

        {profileData.photos.length < 6 && (
          <label className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors duration-200">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <Plus className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Add Photo</span>
          </label>
        )}
      </div>

      {errors.photos && <p className="text-sm text-red-600">{errors.photos}</p>}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <strong>Tip:</strong> Choose photos that show your face clearly and represent your personality. 
          Avoid group photos as your main picture.
        </p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows="4"
          value={profileData.bio}
          onChange={handleInputChange}
          className={`input-field resize-none ${errors.bio ? 'border-red-500' : ''}`}
          placeholder="Tell people about yourself, your hobbies, and what you're looking for..."
        />
        <p className="mt-1 text-sm text-gray-500">
          {profileData.bio.length}/500 characters
        </p>
        {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Interests (Select at least 3)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {availableInterests.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => handleInterestToggle(interest)}
              className={`interest-tag ${profileData.interests.includes(interest) ? 'selected' : ''}`}
            >
              {interest}
            </button>
          ))}
        </div>
        {errors.interests && <p className="mt-2 text-sm text-red-600">{errors.interests}</p>}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-700">
          <strong>Almost done!</strong> Your interests help us find better matches for you.
        </p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (onboardingStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold ${
                  onboardingStep >= step.number
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-24 h-1 mx-4 rounded ${
                    onboardingStep > step.number ? 'bg-primary-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {steps[onboardingStep - 1].title}
            </h2>
            <p className="text-gray-600 mt-1">
              {steps[onboardingStep - 1].description}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="card p-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={prevStep}
            disabled={onboardingStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              onboardingStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back</span>
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Step {onboardingStep} of {steps.length}
            </p>
          </div>

          <button
            type="button"
            onClick={nextStep}
            className="btn-primary flex items-center space-x-2"
          >
            <span>{onboardingStep === 3 ? 'Complete Profile' : 'Continue'}</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
