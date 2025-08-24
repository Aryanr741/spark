import React, { useState } from 'react';
import { Edit, MapPin, Verified, Camera, Heart, MessageCircle, Settings } from 'lucide-react';
import { useAppContext, ACTION_TYPES } from '../context/AppContext';

const ProfilePage = () => {
  const { currentUser, matches, dispatch } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    location: currentUser?.location || '',
    interests: currentUser?.interests || []
  });

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    dispatch({
      type: ACTION_TYPES.UPDATE_USER_PROFILE,
      payload: editData
    });

    dispatch({
      type: ACTION_TYPES.ADD_NOTIFICATION,
      payload: {
        id: Date.now(),
        type: 'success',
        message: 'Profile updated successfully!',
        timestamp: new Date().toISOString()
      }
    });

    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const openSettings = () => {
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_PAGE,
      payload: 'settings'
    });
  };

  const stats = [
    { label: 'Matches', value: matches.length, icon: Heart },
    { label: 'Messages', value: matches.filter(m => m.lastMessage).length, icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <div className="flex space-x-2">
            {isEditing ? (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="btn-primary px-4 py-2 text-sm"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
                  title="Edit Profile"
                >
                  <Edit className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={openSettings}
                  className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
                  title="Settings"
                >
                  <Settings className="h-5 w-5 text-gray-600" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="card p-0 overflow-hidden mb-8">
          {/* Photo Gallery */}
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {currentUser.photos?.length > 0 ? (
                currentUser.photos.slice(0, 6).map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`Profile ${index + 1}`}
                      className="w-full h-32 md:h-40 object-cover"
                    />
                    {index === 0 && (
                      <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded">
                        Main
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-2 md:col-span-3 h-64 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">No photos uploaded</p>
                  </div>
                </div>
              )}
            </div>

            {isEditing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
                  <Camera className="h-4 w-4" />
                  <span>Edit Photos</span>
                </button>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="p-6">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editData.location}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    rows="4"
                    value={editData.bio}
                    onChange={handleInputChange}
                    className="input-field resize-none"
                    placeholder="Tell people about yourself..."
                    maxLength={500}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {editData.bio.length}/500 characters
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentUser.name}, {currentUser.age}
                  </h2>
                  {currentUser.verified && (
                    <Verified className="h-6 w-6 text-blue-500" fill="currentColor" />
                  )}
                </div>

                {currentUser.location && (
                  <div className="flex items-center space-x-1 mb-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{currentUser.location}</span>
                  </div>
                )}

                {currentUser.bio && (
                  <p className="text-gray-700 mb-4">{currentUser.bio}</p>
                )}

                {/* Interests */}
                {currentUser.interests && currentUser.interests.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.interests.map((interest) => (
                        <span key={interest} className="interest-tag">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card p-6 text-center">
                <div className="bg-gradient-to-r from-primary-100 to-accent-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Profile Completion */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Completion</h3>
          
          {(() => {
            const completionItems = [
              { label: 'Profile photo', completed: currentUser.photos?.length > 0 },
              { label: 'Bio', completed: !!currentUser.bio },
              { label: 'Location', completed: !!currentUser.location },
              { label: 'Interests', completed: currentUser.interests?.length >= 3 },
              { label: 'Verified profile', completed: currentUser.verified }
            ];

            const completedCount = completionItems.filter(item => item.completed).length;
            const completionPercentage = Math.round((completedCount / completionItems.length) * 100);

            return (
              <div>
                <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Profile Strength</span>
              <span className="text-sm font-medium text-primary-600">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            {completionItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  item.completed ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {item.completed && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className={`text-sm ${
                  item.completed ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
