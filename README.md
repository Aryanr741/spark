# Spark - Ignite Your Connection 🔥

A modern, responsive dating website built with React, Tailwind CSS, and designed for meaningful connections.

## Features

✨ **Complete Dating Experience**
- User authentication (login/signup)
- Multi-step profile creation with photo upload
- Swipe-based discovery interface
- Real-time messaging system
- Match notifications
- User profile management
- Advanced search filters and preferences

🎨 **Modern Design**
- Beautiful, intuitive UI with Tailwind CSS
- Fully responsive across mobile, tablet, and desktop
- Smooth animations and transitions
- Gradient color schemes with modern aesthetics

🚀 **Tech Stack**
- **Frontend**: React 18 with hooks and context API
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React
- **State Management**: React Context + Reducer pattern
- **Future Backend**: Firebase/Firestore ready architecture

## Screenshots

### Landing Page
Beautiful hero section with call-to-action, features overview, testimonials, and how it works section.

### Discovery Interface
Swipe-based card interface for discovering potential matches with smooth animations.

### Messaging System
Real-time chat interface with conversation list and message history.

### Profile Management
Comprehensive profile creation and editing with photo galleries and interests.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spark
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the app in action.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation component
│   └── NotificationToast.js
├── pages/              # Main page components
│   ├── LandingPage.js  # Homepage with hero section
│   ├── AuthPage.js     # Login/Signup pages
│   ├── OnboardingPage.js # Profile creation flow
│   ├── DiscoveryPage.js # Swipe interface
│   ├── MessagesPage.js # Chat system
│   ├── ProfilePage.js  # User's own profile
│   ├── UserProfilePage.js # Other users' profiles
│   └── SettingsPage.js # App preferences
├── context/            # React Context for state management
│   └── AppContext.js   # Global app state
├── data/              # Mock data and utilities
│   └── mockData.js    # User profiles, matches, messages
├── App.js             # Main app component with routing
├── App.css            # Custom styles and animations
└── index.js           # React app entry point
```

## Key Features Explained

### 1. User Authentication
- Secure login/signup forms with validation
- Password strength requirements
- Form error handling
- Demo authentication for development

### 2. Profile Creation (Onboarding)
- **Step 1**: Personal details (name, age, gender, location)
- **Step 2**: Photo uploads (minimum 2 photos required)
- **Step 3**: Bio and interests selection
- Progress tracking and validation

### 3. Discovery System
- Card-based interface for browsing profiles
- Swipe left (pass) or right (like) functionality
- Match algorithm simulation
- Profile details view with photo galleries

### 4. Messaging System
- Real-time chat interface
- Conversation list with unread indicators
- Message history and timestamps
- Match-based messaging (only matched users can chat)

### 5. Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interface elements
- Adaptive layouts and navigation

## Customization

### Color Scheme
The app uses a modern gradient color palette defined in `tailwind.config.js`:
- **Primary**: Red/pink gradients (#ef4444 to #dc2626)
- **Secondary**: Blue tones (#0ea5e9 to #0284c7)
- **Accent**: Purple/magenta (#d946ef to #c026d3)

### Adding New Features
1. Create new components in the `components/` directory
2. Add new pages to the `pages/` directory
3. Update the routing logic in `App.js`
4. Extend the context state in `AppContext.js` if needed

### Mock Data
All user data is currently mocked in `src/data/mockData.js`. This includes:
- User profiles with photos, bios, and interests
- Match relationships
- Message histories
- App testimonials

## Future Enhancements

### Backend Integration (Planned)
- Firebase Authentication
- Firestore database for user profiles
- Real-time messaging with Firestore
- Cloud Storage for photos
- Push notifications

### Additional Features
- Video calling integration
- Advanced matching algorithms
- Geolocation-based discovery
- Premium features and subscriptions
- Social media integration
- Profile verification system

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern dating apps
- Icons by Lucide React
- Images from Unsplash (for demo purposes)
- Tailwind CSS for the utility-first styling approach

---

**Spark** - Where meaningful connections begin! 💕

For questions or support, please open an issue in the repository.