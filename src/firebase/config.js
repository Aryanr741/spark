// Firebase configuration for Spark Dating App
// This configuration will be used when implementing the actual backend

import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Firebase configuration object
// In production, these values should come from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "your-api-key-here",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "spark-dating-app.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "spark-dating-app",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "spark-dating-app.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "your-sender-id",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "your-app-id",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "your-measurement-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Development emulator setup (optional, for local development)
if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_EMULATORS === 'true') {
  // Connect to Authentication emulator
  if (!auth._delegate._config.emulator) {
    connectAuthEmulator(auth, 'http://localhost:9099');
  }
  
  // Connect to Firestore emulator
  if (!db._delegate._settings?.host?.includes('localhost')) {
    connectFirestoreEmulator(db, 'localhost', 8080);
  }
  
  // Connect to Storage emulator
  if (!storage._delegate._location?.host?.includes('localhost')) {
    connectStorageEmulator(storage, 'localhost', 9199);
  }
}

export default app;
