import React, { useEffect } from 'react';
import { X, Heart, MessageCircle, Check } from 'lucide-react';
import { useAppContext, ACTION_TYPES } from '../context/AppContext';

const NotificationToast = () => {
  const { notifications, dispatch } = useAppContext();

  useEffect(() => {
    // Auto-dismiss notifications after 5 seconds
    notifications.forEach((notification) => {
      setTimeout(() => {
        dispatch({
          type: ACTION_TYPES.REMOVE_NOTIFICATION,
          payload: notification.id
        });
      }, 5000);
    });
  }, [notifications, dispatch]);

  const removeNotification = (id) => {
    dispatch({
      type: ACTION_TYPES.REMOVE_NOTIFICATION,
      payload: id
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case 'match':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'message':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      default:
        return <Check className="h-5 w-5 text-gray-500" />;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case 'match':
        return 'bg-red-50 border-red-200';
      case 'message':
        return 'bg-blue-50 border-blue-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center p-4 rounded-lg border shadow-lg max-w-sm transition-all duration-300 transform animate-slide-up ${getBackgroundColor(notification.type)}`}
        >
          <div className="flex-shrink-0 mr-3">
            {getIcon(notification.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {notification.message}
            </p>
            {notification.timestamp && (
              <p className="text-xs text-gray-500 mt-1">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </p>
            )}
          </div>
          
          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;
