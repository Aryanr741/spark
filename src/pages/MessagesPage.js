import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, MoreVertical, Phone, Video, Heart } from 'lucide-react';
import { useAppContext, ACTION_TYPES } from '../context/AppContext';

const MessagesPage = () => {
  const { currentUser, matches, messages, currentChat, dispatch } = useAppContext();
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Get current chat messages
  const chatMessages = messages.filter(msg => msg.matchId === currentChat?.id);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const selectChat = (match) => {
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_CHAT,
      payload: match
    });
    
    // Mark as read (remove unread status)
    if (match.unread) {
      // In a real app, this would update the database
      match.unread = false;
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !currentChat) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      matchId: currentChat.id,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: messageText.trim(),
      timestamp: new Date().toISOString()
    };

    dispatch({
      type: ACTION_TYPES.ADD_MESSAGE,
      payload: newMessage
    });

    setMessageText('');
    inputRef.current?.focus();
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const backToList = () => {
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_CHAT,
      payload: null
    });
  };

  const viewProfile = () => {
    if (currentChat) {
      const user = matches.find(m => m.id === currentChat.id);
      if (user) {
        dispatch({
          type: ACTION_TYPES.SET_CURRENT_PROFILE,
          payload: { ...user, id: user.userId }
        });
        dispatch({
          type: ACTION_TYPES.SET_CURRENT_PAGE,
          payload: 'user-profile'
        });
      }
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please sign in to view your messages.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex">
      {/* Conversations List */}
      <div className={`w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 flex flex-col ${
        currentChat ? 'hidden md:flex' : 'flex'
      }`}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-sm text-gray-600">
            {matches.length} match{matches.length !== 1 ? 'es' : ''}
          </p>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {matches.length === 0 ? (
            <div className="p-6 text-center">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">No matches yet</p>
              <p className="text-sm text-gray-500">
                Start swiping to find your perfect match!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {matches.map((match) => (
                <button
                  key={match.id}
                  onClick={() => selectChat(match)}
                  className={`w-full p-4 hover:bg-gray-50 transition-colors duration-200 text-left ${
                    currentChat?.id === match.id ? 'bg-primary-50 border-r-2 border-primary-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={match.photo}
                        alt={match.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {match.unread && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium truncate ${
                          match.unread ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {match.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTime(match.lastMessageTime)}
                        </p>
                      </div>
                      
                      <p className={`text-sm truncate mt-1 ${
                        match.unread ? 'text-gray-700 font-medium' : 'text-gray-500'
                      }`}>
                        {match.lastMessage}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`flex-1 flex flex-col ${currentChat ? 'flex' : 'hidden md:flex'}`}>
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={backToList}
                    className="md:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={viewProfile}
                    className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 -ml-2 transition-colors duration-200"
                  >
                    <img
                      src={currentChat.photo}
                      alt={currentChat.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{currentChat.name}</p>
                      <p className="text-sm text-gray-500">Tap to view profile</p>
                    </div>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors duration-200">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors duration-200">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto custom-scrollbar messages-container bg-gray-50 px-6 py-4">
              <div className="space-y-4">
                {chatMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2">It's a match!</p>
                    <p className="text-sm text-gray-500">
                      Start the conversation with {currentChat.name}
                    </p>
                  </div>
                ) : (
                  chatMessages.map((message) => {
                    const isSent = message.senderId === currentUser.id;
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`message-bubble px-4 py-2 rounded-2xl ${
                          isSent ? 'sent text-white' : 'received'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            isSent ? 'text-white/70' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="px-6 py-4 border-t border-gray-200 bg-white">
              <form onSubmit={sendMessage} className="flex items-center space-x-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={`Message ${currentChat.name}...`}
                  className="flex-1 chat-input px-4 py-3 rounded-full resize-none"
                  maxLength={500}
                />
                <button
                  type="submit"
                  disabled={!messageText.trim()}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    messageText.trim()
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-lg hover:scale-105'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          /* No chat selected */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="bg-gray-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-600">
                Choose a match from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
