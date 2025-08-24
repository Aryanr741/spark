// Firestore database service functions
// These functions will be used when implementing actual Firestore backend

import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot
} from 'firebase/firestore';
import { db } from './config';

// User Profile Functions
export const createUserProfile = async (userId, profileData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...profileData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateUserProfile = async (userId, updateData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updateData,
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Discovery Functions
export const getDiscoveryUsers = async (currentUserId, preferences = {}) => {
  try {
    const usersRef = collection(db, 'users');
    let q = query(usersRef, where('id', '!=', currentUserId));
    
    // Add age filter if specified
    if (preferences.ageRange) {
      q = query(q, 
        where('age', '>=', preferences.ageRange[0]),
        where('age', '<=', preferences.ageRange[1])
      );
    }
    
    // Add gender filter if specified
    if (preferences.interestedIn && preferences.interestedIn !== 'all') {
      q = query(q, where('gender', '==', preferences.interestedIn));
    }
    
    // Limit results
    q = query(q, limit(20));
    
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: users };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Likes and Matches Functions
export const likeUser = async (likerId, likedId) => {
  try {
    const likeRef = doc(db, 'likes', `${likerId}_${likedId}`);
    await setDoc(likeRef, {
      likerId,
      likedId,
      timestamp: new Date()
    });
    
    // Check if it's a mutual like (match)
    const reciprocalLikeRef = doc(db, 'likes', `${likedId}_${likerId}`);
    const reciprocalLikeSnap = await getDoc(reciprocalLikeRef);
    
    if (reciprocalLikeSnap.exists()) {
      // It's a match! Create match document
      const matchRef = doc(db, 'matches', `${likerId}_${likedId}`);
      await setDoc(matchRef, {
        user1Id: likerId,
        user2Id: likedId,
        timestamp: new Date(),
        isActive: true
      });
      
      return { success: true, isMatch: true };
    }
    
    return { success: true, isMatch: false };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserMatches = async (userId) => {
  try {
    const matchesRef = collection(db, 'matches');
    const q1 = query(matchesRef, where('user1Id', '==', userId), where('isActive', '==', true));
    const q2 = query(matchesRef, where('user2Id', '==', userId), where('isActive', '==', true));
    
    const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);
    
    const matches = [];
    snapshot1.forEach((doc) => matches.push({ id: doc.id, ...doc.data() }));
    snapshot2.forEach((doc) => matches.push({ id: doc.id, ...doc.data() }));
    
    return { success: true, data: matches };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Messaging Functions
export const sendMessage = async (matchId, senderId, messageText) => {
  try {
    const messagesRef = collection(db, 'messages');
    await addDoc(messagesRef, {
      matchId,
      senderId,
      text: messageText,
      timestamp: new Date(),
      isRead: false
    });
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getMessages = async (matchId) => {
  try {
    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef, 
      where('matchId', '==', matchId), 
      orderBy('timestamp', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: messages };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Real-time message listener
export const subscribeToMessages = (matchId, callback) => {
  const messagesRef = collection(db, 'messages');
  const q = query(
    messagesRef, 
    where('matchId', '==', matchId), 
    orderBy('timestamp', 'asc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    callback(messages);
  });
};

// Real-time matches listener
export const subscribeToMatches = (userId, callback) => {
  const matchesRef = collection(db, 'matches');
  const q1 = query(matchesRef, where('user1Id', '==', userId), where('isActive', '==', true));
  const q2 = query(matchesRef, where('user2Id', '==', userId), where('isActive', '==', true));
  
  const unsubscribe1 = onSnapshot(q1, (snapshot) => {
    const matches = [];
    snapshot.forEach((doc) => matches.push({ id: doc.id, ...doc.data() }));
    callback(matches, 'user1');
  });
  
  const unsubscribe2 = onSnapshot(q2, (snapshot) => {
    const matches = [];
    snapshot.forEach((doc) => matches.push({ id: doc.id, ...doc.data() }));
    callback(matches, 'user2');
  });
  
  // Return unsubscribe function
  return () => {
    unsubscribe1();
    unsubscribe2();
  };
};
