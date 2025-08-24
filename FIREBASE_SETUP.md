# Firebase Setup Guide for Spark Dating App

This guide explains how to set up Firebase backend services for the Spark dating app.

## Prerequisites

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable the following services:
   - Authentication
   - Firestore Database
   - Storage

## Firebase Configuration

### 1. Get Firebase Config

1. Go to your Firebase project settings
2. Scroll down to "Your apps" section
3. Click on the web app icon or create a new web app
4. Copy the Firebase config object

### 2. Environment Variables

Create a `.env.local` file in the project root with your Firebase config:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Optional: Enable emulators for development
REACT_APP_USE_EMULATORS=true
```

## Firebase Services Setup

### Authentication

1. Go to Authentication > Sign-in method
2. Enable Email/Password provider
3. Configure authorized domains if needed

### Firestore Database

1. Go to Firestore Database
2. Create database in production mode (or test mode for development)
3. Set up the following collection structure:

```
/users/{userId}
  - name: string
  - email: string
  - age: number
  - gender: string
  - location: string
  - bio: string
  - interests: array
  - photos: array
  - verified: boolean
  - createdAt: timestamp
  - updatedAt: timestamp

/likes/{likeId}
  - likerId: string
  - likedId: string
  - timestamp: timestamp

/matches/{matchId}
  - user1Id: string
  - user2Id: string
  - timestamp: timestamp
  - isActive: boolean

/messages/{messageId}
  - matchId: string
  - senderId: string
  - text: string
  - timestamp: timestamp
  - isRead: boolean
```

### Security Rules

#### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read other profiles for discovery
    match /users/{userId} {
      allow read: if request.auth != null;
    }
    
    // Users can create likes
    match /likes/{likeId} {
      allow create: if request.auth != null && 
        request.auth.uid == resource.data.likerId;
      allow read: if request.auth != null;
    }
    
    // Users can read matches they're part of
    match /matches/{matchId} {
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.user1Id || 
         request.auth.uid == resource.data.user2Id);
    }
    
    // Users can send/read messages in their matches
    match /messages/{messageId} {
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.senderId;
      allow read: if request.auth != null;
    }
  }
}
```

#### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Users can upload/read their own photos
    match /users/{userId}/photos/{photoId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow reading profile photos for discovery
    match /users/{userId}/photos/{photoId} {
      allow read: if request.auth != null;
    }
  }
}
```

### Storage

1. Go to Storage
2. Get started with default settings
3. Update security rules as shown above

## Integration Steps

### 1. Update AppContext

Replace the mock authentication in `src/context/AppContext.js`:

```javascript
import { onAuthChange } from '../firebase/auth';

// In useEffect
useEffect(() => {
  const unsubscribe = onAuthChange((user) => {
    if (user) {
      dispatch({
        type: ACTION_TYPES.SET_CURRENT_USER,
        payload: user
      });
    } else {
      dispatch({
        type: ACTION_TYPES.SET_CURRENT_USER,
        payload: null
      });
    }
  });

  return () => unsubscribe();
}, [dispatch]);
```

### 2. Update Authentication Pages

Replace mock login/signup in `src/pages/AuthPage.js`:

```javascript
import { signInWithEmail, signUpWithEmail } from '../firebase/auth';

// In handleSubmit function
if (isSignUp) {
  const result = await signUpWithEmail(
    formData.email, 
    formData.password, 
    `${formData.firstName} ${formData.lastName}`
  );
  
  if (result.success) {
    // Handle success
  } else {
    setErrors({ submit: result.error });
  }
}
```

### 3. Update Discovery System

Replace mock data with Firestore queries:

```javascript
import { getDiscoveryUsers, likeUser } from '../firebase/firestore';

// Get users based on preferences
const { success, data } = await getDiscoveryUsers(currentUser.uid, preferences);
```

### 4. Update Messaging

Implement real-time messaging:

```javascript
import { subscribeToMessages, sendMessage } from '../firebase/firestore';

// Subscribe to real-time messages
useEffect(() => {
  if (currentChat) {
    const unsubscribe = subscribeToMessages(currentChat.id, (messages) => {
      // Update messages state
    });
    
    return () => unsubscribe();
  }
}, [currentChat]);
```

## Development with Emulators

Install Firebase CLI and set up emulators for local development:

```bash
npm install -g firebase-tools
firebase login
firebase init emulators
```

Choose:
- Authentication Emulator
- Firestore Emulator
- Storage Emulator

Then run:

```bash
firebase emulators:start
```

Set `REACT_APP_USE_EMULATORS=true` in your `.env.local` file.

## Deployment

The app is ready for deployment to Firebase Hosting:

```bash
firebase init hosting
firebase deploy
```

## Notes

- All Firebase service files are already created in `src/firebase/`
- The app currently uses mock data for development
- Follow this guide to integrate with real Firebase services
- Security rules should be tested thoroughly before production deployment
