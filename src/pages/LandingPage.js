import React from 'react';
import { Heart, MessageCircle, Shield, Flame, Star, ChevronRight, Users, Zap } from 'lucide-react';
import { useAppContext, ACTION_TYPES } from '../context/AppContext';
import { testimonials } from '../data/mockData';

const LandingPage = () => {
  const { dispatch } = useAppContext();

  const handleSignUpClick = () => {
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_PAGE,
      payload: 'signup'
    });
  };

  const handleLoginClick = () => {
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_PAGE,
      payload: 'login'
    });
  };

  const features = [
    {
      icon: Heart,
      title: 'Find Your Match',
      description: 'Our smart algorithm connects you with compatible people based on your interests and preferences.'
    },
    {
      icon: MessageCircle,
      title: 'Chat with Ease',
      description: 'Start meaningful conversations with real-time messaging that brings you closer together.'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your privacy matters. We use advanced security measures to keep your data protected.'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Sign Up',
      description: 'Create your account and tell us about yourself'
    },
    {
      step: 2,
      title: 'Create Profile',
      description: 'Add photos and share your interests'
    },
    {
      step: 3,
      title: 'Start Matching',
      description: 'Discover people who share your passions'
    },
    {
      step: 4,
      title: 'Connect',
      description: 'Chat and build meaningful relationships'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '5K+', label: 'Successful Matches' },
    { number: '95%', label: 'User Satisfaction' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-full">
                <Flame className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-bold gradient-text">Spark</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLoginClick}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                Log In
              </button>
              <button
                onClick={handleSignUpClick}
                className="btn-primary"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Ignite Your
              <span className="block gradient-text">Connection</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover meaningful relationships with people who share your passions. 
              Join thousands of singles finding love on Spark.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={handleSignUpClick}
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
              >
                <span>Join Spark Now</span>
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                onClick={handleLoginClick}
                className="btn-secondary text-lg px-8 py-4"
              >
                Already a member?
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold gradient-text">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Spark?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're not just another dating app. We're here to help you build genuine connections.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-gradient-to-r from-primary-100 to-accent-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started is simple. Follow these easy steps to find your perfect match.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
                
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full">
                    <div className="flex items-center justify-center">
                      <ChevronRight className="h-6 w-6 text-gray-300" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real people, real connections, real love stories.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Find Your Spark?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of singles who have found love on Spark. Your perfect match is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSignUpClick}
              className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-full">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Spark</span>
            </div>
            <p className="text-gray-400 mb-4">Ignite Your Connection</p>
            <p className="text-sm text-gray-500">
              © 2024 Spark Dating. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
