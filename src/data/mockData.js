// Mock user data for development
export const mockUsers = [
  {
    id: 'user-1',
    name: 'Alex Rivera',
    age: 28,
    gender: 'Non-binary',
    location: 'San Francisco, CA',
    bio: 'Adventure seeker and coffee enthusiast. Love hiking, trying new restaurants, and deep conversations under the stars. Looking for someone to explore life with!',
    interests: ['Hiking', 'Photography', 'Coffee', 'Travel', 'Music', 'Art'],
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616b5352da1?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop'
    ],
    verified: true,
    lastActive: '2 hours ago'
  },
  {
    id: 'user-2',
    name: 'Jordan Chen',
    age: 26,
    gender: 'Male',
    location: 'New York, NY',
    bio: 'Software developer by day, chef by night. I love creating both beautiful code and delicious meals. Seeking someone who appreciates good food and great company.',
    interests: ['Cooking', 'Technology', 'Gaming', 'Movies', 'Books', 'Fitness'],
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop'
    ],
    verified: true,
    lastActive: '1 hour ago'
  },
  {
    id: 'user-3',
    name: 'Maya Patel',
    age: 29,
    gender: 'Female',
    location: 'Los Angeles, CA',
    bio: 'Yoga instructor and wellness coach. Passionate about mindful living, sustainable fashion, and making a positive impact. Let\'s grow together!',
    interests: ['Yoga', 'Meditation', 'Sustainability', 'Fashion', 'Health', 'Travel'],
    photos: [
      'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=600&fit=crop'
    ],
    verified: true,
    lastActive: '30 minutes ago'
  },
  {
    id: 'user-4',
    name: 'Sam Thompson',
    age: 31,
    gender: 'Male',
    location: 'Chicago, IL',
    bio: 'Marketing professional with a passion for live music and craft beer. Weekend warrior who loves exploring new neighborhoods and trying local breweries.',
    interests: ['Music', 'Beer', 'Marketing', 'Sports', 'Concerts', 'Food'],
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop'
    ],
    verified: true,
    lastActive: '3 hours ago'
  },
  {
    id: 'user-5',
    name: 'Emma Rodriguez',
    age: 25,
    gender: 'Female',
    location: 'Austin, TX',
    bio: 'Graphic designer and dog mom to Luna 🐕 I love creating beautiful things, weekend farmers markets, and spontaneous road trips. Swipe right if you love dogs!',
    interests: ['Design', 'Dogs', 'Art', 'Markets', 'Road Trips', 'Nature'],
    photos: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1494790108755-2616b5352da1?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=400&h=600&fit=crop'
    ],
    verified: false,
    lastActive: '5 hours ago'
  },
  {
    id: 'user-6',
    name: 'David Kim',
    age: 33,
    gender: 'Male',
    location: 'Seattle, WA',
    bio: 'Physical therapist who loves helping others feel their best. When I\'m not working, you\'ll find me rock climbing or planning my next adventure.',
    interests: ['Climbing', 'Healthcare', 'Adventure', 'Fitness', 'Nature', 'Travel'],
    photos: [
      'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=400&h=600&fit=crop'
    ],
    verified: true,
    lastActive: '1 day ago'
  }
];

// Mock matches data
export const mockMatches = [
  {
    id: 'match-1',
    userId: 'user-2',
    name: 'Jordan Chen',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    timestamp: '2024-01-15T10:30:00Z',
    lastMessage: 'Hey! Thanks for the match. How\'s your day going?',
    lastMessageTime: '2024-01-15T14:22:00Z',
    unread: true
  },
  {
    id: 'match-2',
    userId: 'user-3',
    name: 'Maya Patel',
    photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop',
    timestamp: '2024-01-14T16:45:00Z',
    lastMessage: 'I love your hiking photos! Where was that taken?',
    lastMessageTime: '2024-01-14T18:15:00Z',
    unread: false
  },
  {
    id: 'match-3',
    userId: 'user-5',
    name: 'Emma Rodriguez',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop',
    timestamp: '2024-01-13T09:20:00Z',
    lastMessage: 'Luna is adorable! I have a golden retriever too 🐕',
    lastMessageTime: '2024-01-13T11:45:00Z',
    unread: true
  }
];

// Mock messages data
export const mockMessages = [
  // Conversation with Jordan Chen
  {
    id: 'msg-1',
    matchId: 'match-1',
    senderId: 'user-2',
    senderName: 'Jordan Chen',
    text: 'Hey! Thanks for the match. How\'s your day going?',
    timestamp: '2024-01-15T14:22:00Z'
  },
  {
    id: 'msg-2',
    matchId: 'match-1',
    senderId: 'user-1',
    senderName: 'Alex Rivera',
    text: 'Hi Jordan! It\'s going great, thanks for asking. I just got back from a morning hike. How about you?',
    timestamp: '2024-01-15T14:35:00Z'
  },
  {
    id: 'msg-3',
    matchId: 'match-1',
    senderId: 'user-2',
    senderName: 'Jordan Chen',
    text: 'That sounds amazing! I\'ve been coding all morning but I\'m about to take a break and try out a new recipe.',
    timestamp: '2024-01-15T14:40:00Z'
  },
  
  // Conversation with Maya Patel
  {
    id: 'msg-4',
    matchId: 'match-2',
    senderId: 'user-3',
    senderName: 'Maya Patel',
    text: 'I love your hiking photos! Where was that taken?',
    timestamp: '2024-01-14T18:15:00Z'
  },
  {
    id: 'msg-5',
    matchId: 'match-2',
    senderId: 'user-1',
    senderName: 'Alex Rivera',
    text: 'Thank you! That was at Mount Tamalpais in Marin County. The sunrise view was incredible.',
    timestamp: '2024-01-14T18:30:00Z'
  },
  
  // Conversation with Emma Rodriguez
  {
    id: 'msg-6',
    matchId: 'match-3',
    senderId: 'user-1',
    senderName: 'Alex Rivera',
    text: 'Hi Emma! Your design portfolio looks incredible. What\'s your favorite project you\'ve worked on recently?',
    timestamp: '2024-01-13T11:30:00Z'
  },
  {
    id: 'msg-7',
    matchId: 'match-3',
    senderId: 'user-5',
    senderName: 'Emma Rodriguez',
    text: 'Luna is adorable! I have a golden retriever too 🐕',
    timestamp: '2024-01-13T11:45:00Z'
  }
];

// Available interests for user profiles
export const availableInterests = [
  'Adventure', 'Art', 'Beer', 'Books', 'Climbing', 'Coffee', 'Concerts',
  'Cooking', 'Dancing', 'Design', 'Dogs', 'Fashion', 'Fitness', 'Food',
  'Gaming', 'Health', 'Hiking', 'Marketing', 'Markets', 'Meditation',
  'Movies', 'Music', 'Nature', 'Photography', 'Reading', 'Road Trips',
  'Sports', 'Sustainability', 'Technology', 'Travel', 'Yoga'
];

// Sample testimonials for landing page
export const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    text: 'I met my partner on Spark 8 months ago. The quality of matches was so much better than other apps!',
    rating: 5,
    location: 'San Francisco'
  },
  {
    id: 2,
    name: 'Mike R.',
    text: 'Finally, a dating app that focuses on real connections. The interface is beautiful and so easy to use.',
    rating: 5,
    location: 'New York'
  },
  {
    id: 3,
    name: 'Jessica L.',
    text: 'Spark helped me find someone who truly gets me. We bonded over our shared love of hiking and photography.',
    rating: 5,
    location: 'Los Angeles'
  }
];
