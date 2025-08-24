import React, { useState } from 'react';
import { ArrowLeft, MapPin, Verified, Heart, MessageCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext, ACTION_TYPES } from '../context/AppContext';

const UserProfilePage = () => {
  const { currentProfile, matches, dispatch } = useAppContext();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  if (!currentProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Profile not found.</p>
        </div>
      </div>
    );
  }

  const isMatched = matches.some(match => match.userId === currentProfile.id);

  const goBack = () => {
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_PROFILE,
      payload: null
    });
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_PAGE,
      payload: 'matches'
    });
  };

  const handleLike = () => {
    dispatch({
      type: ACTION_TYPES.LIKE_USER,
      payload: currentProfile.id
    });

    dispatch({
      type: ACTION_TYPES.ADD_NOTIFICATION,
      payload: {
        id: Date.now(),
        type: 'success',
        message: `You liked ${currentProfile.name}!`,
        timestamp: new Date().toISOString()
      }
    });
  };

  const handleMessage = () => {
    if (isMatched) {
      const match = matches.find(m => m.userId === currentProfile.id);
      if (match) {
        dispatch({
          type: ACTION_TYPES.SET_CURRENT_CHAT,
          payload: match
        });
        dispatch({
          type: ACTION_TYPES.SET_CURRENT_PAGE,
          payload: 'messages'
        });
      }
    }
  };

  const nextPhoto = () => {
    if (currentProfile.photos && currentPhotoIndex < currentProfile.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const goToPhoto = (index) => {
    setCurrentPhotoIndex(index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={goBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-semibold text-gray-900">{currentProfile.name}</h1>
            {currentProfile.verified && (
              <Verified className="h-5 w-5 text-blue-500" fill="currentColor" />
            )}
          </div>

          <div className="w-10"></div> {/* Spacer for centered title */}
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="relative">
        <div className="aspect-w-3 aspect-h-4 bg-gray-200">
          {currentProfile.photos && currentProfile.photos.length > 0 ? (
            <img
              src={currentProfile.photos[currentPhotoIndex]}
              alt={`${currentProfile.name} photo ${currentPhotoIndex + 1}`}
              className="w-full h-96 md:h-[500px] object-cover"
            />
          ) : (
            <div className="w-full h-96 md:h-[500px] bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
                <p className="text-gray-500">No photo available</p>
              </div>
            </div>
          )}
        </div>

        {/* Photo Navigation */}
        {currentProfile.photos && currentProfile.photos.length > 1 && (
          <>
            {/* Previous/Next Buttons */}
            <button
              onClick={prevPhoto}
              disabled={currentPhotoIndex === 0}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white transition-all duration-200 ${
                currentPhotoIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/50'
              }`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextPhoto}
              disabled={currentPhotoIndex === currentProfile.photos.length - 1}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white transition-all duration-200 ${
                currentPhotoIndex === currentProfile.photos.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/50'
              }`}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Photo Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {currentProfile.photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPhoto(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Age overlay */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentProfile.age}
        </div>
      </div>

      {/* Profile Information */}
      <div className="px-6 py-6">
        {/* Basic Info */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{currentProfile.name}</h1>
            {currentProfile.verified && (
              <Verified className="h-7 w-7 text-blue-500" fill="currentColor" />
            )}
          </div>

          {currentProfile.location && (
            <div className="flex items-center space-x-1 mb-4">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{currentProfile.location}</span>
            </div>
          )}

          {currentProfile.lastActive && (
            <p className="text-sm text-gray-500 mb-4">
              Active {currentProfile.lastActive}
            </p>
          )}
        </div>

        {/* Bio */}
        {currentProfile.bio && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
            <p className="text-gray-700 leading-relaxed">{currentProfile.bio}</p>
          </div>
        )}

        {/* Interests */}
        {currentProfile.interests && currentProfile.interests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {currentProfile.interests.map((interest) => (
                <span key={interest} className="interest-tag">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 md:relative md:border-t-0 md:px-6 md:py-0 md:bg-transparent">
        <div className="flex justify-center space-x-4 max-w-sm mx-auto">
          <button
            onClick={goBack}
            className="bg-white text-gray-600 w-14 h-14 rounded-full shadow-lg hover:shadow-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
          >
            <X className="h-6 w-6" />
          </button>

          {isMatched ? (
            <button
              onClick={handleMessage}
              className="bg-gradient-to-r from-primary-500 to-accent-500 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
            >
              <MessageCircle className="h-7 w-7" />
            </button>
          ) : (
            <button
              onClick={handleLike}
              className="bg-gradient-to-r from-primary-500 to-accent-500 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
            >
              <Heart className="h-7 w-7" />
            </button>
          )}
        </div>

        {isMatched && (
          <div className="text-center mt-3">
            <p className="text-sm text-green-600 font-medium">
              ✨ It's a match! You can now message each other
            </p>
          </div>
        )}
      </div>

      {/* Add padding bottom on mobile to account for fixed buttons */}
      <div className="h-24 md:hidden"></div>
    </div>
  );
};

export default UserProfilePage;
