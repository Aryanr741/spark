import React from 'react';
import { Heart, MessageCircle, User, Settings, Flame } from 'lucide-react';
import { useAppContext, ACTION_TYPES } from '../context/AppContext';

const Navbar = () => {
  const { currentPage, notifications, dispatch } = useAppContext();

  const navItems = [
    { id: 'matches', icon: Heart, label: 'Discover', path: 'matches' },
    { id: 'messages', icon: MessageCircle, label: 'Messages', path: 'messages' },
    { id: 'profile', icon: User, label: 'Profile', path: 'profile' },
    { id: 'settings', icon: Settings, label: 'Settings', path: 'settings' }
  ];

  const handleNavClick = (path) => {
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_PAGE,
      payload: path
    });
  };

  const unreadCount = notifications.filter(n => n.type === 'message').length;
  const matchCount = notifications.filter(n => n.type === 'match').length;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-full">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Spark</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.path;
              const hasNotification = 
                (item.id === 'messages' && unreadCount > 0) ||
                (item.id === 'matches' && matchCount > 0);

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  
                  {hasNotification && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.id === 'messages' ? unreadCount : matchCount}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Navigation - Bottom Fixed */}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.path;
            const hasNotification = 
              (item.id === 'messages' && unreadCount > 0) ||
              (item.id === 'matches' && matchCount > 0);

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`relative flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-gray-500'
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                <span className="text-xs font-medium">{item.label}</span>
                
                {hasNotification && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {item.id === 'messages' ? unreadCount : matchCount}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
