import React, { useState, useEffect } from 'react';
import { Heart, X, MapPin, Verified, RotateCcw, Settings, Info } from 'lucide-react';
import { useAppContext, ACTION_TYPES } from '../context/AppContext';

const DiscoveryPage = () => {
  const { currentUser, users, dispatch } = useAppContext();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('');
  const [likedUsers, setLikedUsers] = useState([]);
  const [passedUsers, setPassedUsers] = useState([]);

  // Filter out current user and already interacted users
  const availableUsers = users.filter(user => 
    user.id !== currentUser?.id && 
    !likedUsers.includes(user.id) && 
    !passedUsers.includes(user.id)
  );

  const currentCard = availableUsers[currentCardIndex];

  useEffect(() => {
    // Reset card index when no more cards available
    if (currentCardIndex >= availableUsers.length && availableUsers.length > 0) {
      setCurrentCardIndex(0);
    }
  }, [currentCardIndex, availableUsers.length]);

  const handleSwipe = (direction) => {
    if (isAnimating || !currentCard) return;

    setIsAnimating(true);
    setAnimationDirection(direction);

    if (direction === 'right') {
      handleLike();
    } else {
      handlePass();
    }

    setTimeout(() => {
      setCurrentCardIndex(prev => prev + 1);
      setIsAnimating(false);
      setAnimationDirection('');
    }, 300);
  };

  const handleLike = () => {
    if (!currentCard) return;

    setLikedUsers(prev => [...prev, currentCard.id]);
    
    // Dispatch like action (may result in a match)
    dispatch({
      type: ACTION_TYPES.LIKE_USER,
      payload: currentCard.id
    });
  };

  const handlePass = () => {
    if (!currentCard) return;

    setPassedUsers(prev => [...prev, currentCard.id]);
    
    dispatch({
      type: ACTION_TYPES.PASS_USER,
      payload: currentCard.id
    });
  };

  const resetCards = () => {
    setLikedUsers([]);
    setPassedUsers([]);
    setCurrentCardIndex(0);
  };

  const openSettings = () => {
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_PAGE,
      payload: 'settings'
    });
  };

  const viewProfile = () => {
    if (currentCard) {
      dispatch({
        type: ACTION_TYPES.SET_CURRENT_PROFILE,
        payload: currentCard
      });
      dispatch({
        type: ACTION_TYPES.SET_CURRENT_PAGE,
        payload: 'user-profile'
      });
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please sign in to start discovering matches.</p>
        </div>
      </div>
    );
  }

  if (availableUsers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Discover</h1>
            <div className="flex space-x-2">
              <button
                onClick={resetCards}
                className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
                title="Reset cards"
              >
                <RotateCcw className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={openSettings}
                className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
                title="Settings"
              >
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* No more cards */}
          <div className="text-center py-16">
            <div className="bg-gray-200 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Heart className="h-12 w-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No more people nearby
            </h3>
            <p className="text-gray-600 mb-6">
              Check back later for new profiles or adjust your discovery settings.
            </p>
            <div className="space-y-3">
              <button
                onClick={resetCards}
                className="btn-primary w-full"
              >
                Review Again
              </button>
              <button
                onClick={openSettings}
                className="btn-secondary w-full"
              >
                Adjust Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-24 md:pb-8">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Discover</h1>
          <div className="flex space-x-2">
            <button
              onClick={resetCards}
              className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
              title="Reset cards"
            >
              <RotateCcw className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={openSettings}
              className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
              title="Settings"
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Card Stack */}
        <div className="relative h-96 md:h-[500px] mb-8">
          {/* Background cards for stack effect */}
          {availableUsers.slice(currentCardIndex + 1, currentCardIndex + 3).map((user, index) => (
            <div
              key={user.id}
              className="absolute inset-0 card overflow-hidden"
              style={{
                transform: `scale(${0.95 - index * 0.02}) translateY(${index * 4}px)`,
                zIndex: 10 - index
              }}
            >
              <img
                src={user.photos[0]}
                alt={user.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          ))}

          {/* Current card */}
          {currentCard && (
            <div
              className={`absolute inset-0 card overflow-hidden cursor-pointer swipe-card ${
                isAnimating ? `swipe-${animationDirection}` : ''
              }`}
              style={{ zIndex: 20 }}
              onClick={viewProfile}
            >
              <img
                src={currentCard.photos[0]}
                alt={currentCard.name}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              {/* User info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <h2 className="text-2xl font-bold">
                    {currentCard.name}, {currentCard.age}
                  </h2>
                  {currentCard.verified && (
                    <Verified className="h-6 w-6 text-blue-400" fill="currentColor" />
                  )}
                </div>
                
                <div className="flex items-center space-x-1 mb-3">
                  <MapPin className="h-4 w-4 text-gray-300" />
                  <span className="text-sm text-gray-300">{currentCard.location}</span>
                </div>
                
                {currentCard.bio && (
                  <p className="text-sm text-gray-200 line-clamp-2 mb-3">
                    {currentCard.bio}
                  </p>
                )}
                
                {/* Interests */}
                <div className="flex flex-wrap gap-2">
                  {currentCard.interests.slice(0, 3).map((interest) => (
                    <span
                      key={interest}
                      className="bg-white/20 text-white text-xs px-2 py-1 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                  {currentCard.interests.length > 3 && (
                    <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                      +{currentCard.interests.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Info button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  viewProfile();
                }}
                className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/50 transition-colors duration-200"
              >
                <Info className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => handleSwipe('left')}
            disabled={isAnimating || !currentCard}
            className="bg-white text-gray-600 w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="h-7 w-7" />
          </button>
          
          <button
            onClick={() => handleSwipe('right')}
            disabled={isAnimating || !currentCard}
            className="bg-gradient-to-r from-primary-500 to-accent-500 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Heart className="h-8 w-8" />
          </button>
        </div>

        {/* Cards remaining indicator */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            {availableUsers.length - currentCardIndex} people nearby
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryPage;
