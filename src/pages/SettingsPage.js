import React, { useState } from 'react';
import { 
  User, Bell, Shield, Heart, MapPin, Calendar, 
  LogOut, ChevronRight, Toggle, Slider, Save 
} from 'lucide-react';
import { useAppContext, ACTION_TYPES } from '../context/AppContext';

const SettingsPage = () => {
  const { currentUser, preferences, dispatch } = useAppContext();
  const [localPreferences, setLocalPreferences] = useState({
    ...preferences,
    notifications: {
      matches: true,
      messages: true,
      likes: true,
      marketing: false
    },
    privacy: {
      showDistance: true,
      showAge: true,
      showOnline: true
    }
  });
  const [hasChanges, setHasChanges] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please sign in to access settings.</p>
        </div>
      </div>
    );
  }

  const handlePreferenceChange = (category, key, value) => {
    setLocalPreferences(prev => ({
      ...prev,
      [category]: typeof prev[category] === 'object' 
        ? { ...prev[category], [key]: value }
        : value
    }));
    setHasChanges(true);
  };

  const handleSliderChange = (key, value) => {
    setLocalPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const savePreferences = () => {
    dispatch({
      type: ACTION_TYPES.UPDATE_PREFERENCES,
      payload: localPreferences
    });

    dispatch({
      type: ACTION_TYPES.ADD_NOTIFICATION,
      payload: {
        id: Date.now(),
        type: 'success',
        message: 'Settings saved successfully!',
        timestamp: new Date().toISOString()
      }
    });

    setHasChanges(false);
  };

  const handleLogout = () => {
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_USER,
      payload: null
    });
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_PAGE,
      payload: 'landing'
    });
    dispatch({
      type: ACTION_TYPES.ADD_NOTIFICATION,
      payload: {
        id: Date.now(),
        type: 'success',
        message: 'You have been logged out successfully.',
        timestamp: new Date().toISOString()
      }
    });
  };

  const settingSections = [
    {
      title: 'Account',
      icon: User,
      settings: [
        {
          label: 'Profile Information',
          description: 'Update your name, photos, and bio',
          action: () => dispatch({ type: ACTION_TYPES.SET_CURRENT_PAGE, payload: 'profile' }),
          showArrow: true
        }
      ]
    },
    {
      title: 'Discovery Preferences',
      icon: Heart,
      settings: [
        {
          label: 'Age Range',
          description: `${localPreferences.ageRange[0]} - ${localPreferences.ageRange[1]} years old`,
          component: (
            <div className="mt-3">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{localPreferences.ageRange[0]}</span>
                <span>{localPreferences.ageRange[1]}</span>
              </div>
              <div className="px-3">
                <input
                  type="range"
                  min="18"
                  max="60"
                  value={localPreferences.ageRange[1]}
                  onChange={(e) => handleSliderChange('ageRange', [localPreferences.ageRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          )
        },
        {
          label: 'Maximum Distance',
          description: `${localPreferences.maxDistance} miles away`,
          component: (
            <div className="mt-3">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>1 mile</span>
                <span>100+ miles</span>
              </div>
              <div className="px-3">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={localPreferences.maxDistance}
                  onChange={(e) => handleSliderChange('maxDistance', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          )
        },
        {
          label: 'Interested In',
          description: 'Who do you want to see?',
          component: (
            <div className="mt-3">
              <select
                value={localPreferences.interestedIn}
                onChange={(e) => handleSliderChange('interestedIn', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Everyone</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="nonbinary">Non-binary</option>
              </select>
            </div>
          )
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          label: 'New Matches',
          description: 'Get notified when you have a new match',
          component: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localPreferences.notifications.matches}
                onChange={(e) => handlePreferenceChange('notifications', 'matches', e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          )
        },
        {
          label: 'New Messages',
          description: 'Get notified when someone messages you',
          component: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localPreferences.notifications.messages}
                onChange={(e) => handlePreferenceChange('notifications', 'messages', e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          )
        },
        {
          label: 'Someone Likes You',
          description: 'Get notified when someone likes your profile',
          component: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localPreferences.notifications.likes}
                onChange={(e) => handlePreferenceChange('notifications', 'likes', e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          )
        }
      ]
    },
    {
      title: 'Privacy',
      icon: Shield,
      settings: [
        {
          label: 'Show Distance',
          description: 'Display your distance from other users',
          component: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localPreferences.privacy.showDistance}
                onChange={(e) => handlePreferenceChange('privacy', 'showDistance', e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          )
        },
        {
          label: 'Show Age',
          description: 'Display your age on your profile',
          component: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localPreferences.privacy.showAge}
                onChange={(e) => handlePreferenceChange('privacy', 'showAge', e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          )
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          {hasChanges && (
            <button
              onClick={savePreferences}
              className="btn-primary flex items-center space-x-2 px-4 py-2"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
          )}
        </div>

        {/* User Info Card */}
        <div className="card p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              {currentUser.photos && currentUser.photos.length > 0 ? (
                <img
                  src={currentUser.photos[0]}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">{currentUser.name}</h2>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {settingSections.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <div key={sectionIndex} className="card p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-primary-100 to-accent-100 p-2 rounded-lg">
                    <Icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                </div>

                <div className="space-y-6">
                  {section.settings.map((setting, settingIndex) => (
                    <div key={settingIndex} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{setting.label}</p>
                              <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                            </div>
                            {setting.component || (
                              setting.showArrow && (
                                <button
                                  onClick={setting.action}
                                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                >
                                  <ChevronRight className="h-5 w-5 text-gray-400" />
                                </button>
                              )
                            )}
                          </div>
                          {setting.component}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="card p-6 mt-8">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium"
          >
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>

        {/* App Info */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Spark Dating App v1.0.0</p>
          <p>Made with ❤️ for meaningful connections</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
