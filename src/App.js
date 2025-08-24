import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DiscoveryPage from './pages/DiscoveryPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import SettingsPage from './pages/SettingsPage';
import Navbar from './components/Navbar';
import NotificationToast from './components/NotificationToast';
import './App.css';

// Main app content component
const AppContent = () => {
  const { currentPage, isAuthenticated } = useAppContext();

  // Function to render the current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'login':
      case 'signup':
        return <AuthPage type={currentPage} />;
      case 'onboarding':
        return <OnboardingPage />;
      case 'matches':
        return <DiscoveryPage />;
      case 'messages':
        return <MessagesPage />;
      case 'profile':
        return <ProfilePage />;
      case 'user-profile':
        return <UserProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Show navbar for authenticated users (except on landing, login, signup, onboarding) */}
      {isAuthenticated && !['landing', 'login', 'signup', 'onboarding'].includes(currentPage) && (
        <Navbar />
      )}
      
      {/* Main content */}
      <main className={isAuthenticated && !['landing', 'login', 'signup', 'onboarding'].includes(currentPage) ? 'pt-16' : ''}>
        {renderCurrentPage()}
      </main>
      
      {/* Notification toasts */}
      <NotificationToast />
    </div>
  );
};

// Main App component with provider
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
