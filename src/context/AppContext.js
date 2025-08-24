import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockUsers, mockMatches, mockMessages } from '../data/mockData';

const AppContext = createContext();

// Initial state
const initialState = {
  currentUser: null,
  currentPage: 'landing', // landing, login, signup, onboarding, matches, messages, profile, settings, user-profile
  users: mockUsers,
  matches: mockMatches,
  messages: mockMessages,
  currentChat: null,
  isAuthenticated: false,
  onboardingStep: 1,
  currentProfile: null,
  notifications: [],
  preferences: {
    ageRange: [18, 35],
    maxDistance: 50,
    interestedIn: 'all'
  }
};

// Action types
export const ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_AUTHENTICATION: 'SET_AUTHENTICATION',
  SET_ONBOARDING_STEP: 'SET_ONBOARDING_STEP',
  SET_CURRENT_CHAT: 'SET_CURRENT_CHAT',
  SET_CURRENT_PROFILE: 'SET_CURRENT_PROFILE',
  ADD_MESSAGE: 'ADD_MESSAGE',
  ADD_MATCH: 'ADD_MATCH',
  UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  LIKE_USER: 'LIKE_USER',
  PASS_USER: 'PASS_USER'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: !!action.payload
      };
      
    case ACTION_TYPES.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
      
    case ACTION_TYPES.SET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.payload
      };
      
    case ACTION_TYPES.SET_ONBOARDING_STEP:
      return {
        ...state,
        onboardingStep: action.payload
      };
      
    case ACTION_TYPES.SET_CURRENT_CHAT:
      return {
        ...state,
        currentChat: action.payload
      };
      
    case ACTION_TYPES.SET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: action.payload
      };
      
    case ACTION_TYPES.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
      
    case ACTION_TYPES.ADD_MATCH:
      return {
        ...state,
        matches: [...state.matches, action.payload],
        notifications: [...state.notifications, {
          id: Date.now(),
          type: 'match',
          message: `You have a new match with ${action.payload.name}!`,
          timestamp: new Date().toISOString()
        }]
      };
      
    case ACTION_TYPES.UPDATE_USER_PROFILE:
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload },
        users: state.users.map(user => 
          user.id === state.currentUser?.id 
            ? { ...user, ...action.payload }
            : user
        )
      };
      
    case ACTION_TYPES.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
      
    case ACTION_TYPES.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notif => notif.id !== action.payload)
      };
      
    case ACTION_TYPES.UPDATE_PREFERENCES:
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      };
      
    case ACTION_TYPES.LIKE_USER:
      const likedUser = state.users.find(user => user.id === action.payload);
      // Check if it's a mutual like (match)
      const isMatch = likedUser && Math.random() > 0.7; // 30% chance of match for demo
      
      if (isMatch) {
        const newMatch = {
          id: Date.now(),
          userId: action.payload,
          name: likedUser.name,
          photo: likedUser.photos[0],
          timestamp: new Date().toISOString()
        };
        
        return {
          ...state,
          matches: [...state.matches, newMatch],
          notifications: [...state.notifications, {
            id: Date.now(),
            type: 'match',
            message: `It's a match with ${likedUser.name}!`,
            timestamp: new Date().toISOString()
          }]
        };
      }
      return state;
      
    case ACTION_TYPES.PASS_USER:
      return state; // For now, just return current state
      
    default:
      return state;
  }
};

// Context Provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Auto-login for demo (simulating __initial_auth_token)
  useEffect(() => {
    // Simulate checking for existing auth token
    const demoUser = mockUsers[0]; // Use first mock user as demo logged-in user
    if (demoUser) {
      dispatch({
        type: ACTION_TYPES.SET_CURRENT_USER,
        payload: demoUser
      });
    }
  }, []);

  const value = {
    ...state,
    dispatch
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
