// components/Navigation.tsx - Bottom Navigation Component
// This component provides the main navigation interface for the LangPad app.
// It displays a bottom navigation bar with icons and labels for each main section:
// Home, Drawing Pad, Character Library, Saved Characters, and Settings.
// It handles view switching and visual feedback for the currently active tab.

import React from 'react';
import { Home, PenTool, BookOpen, Heart, Settings } from 'lucide-react';
import type { NavigationProps, ViewType } from '../types';

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  // Navigation items configuration
  const navigationItems = [
    {
      id: 'home' as ViewType,
      icon: Home,
      label: '首页', // Home in Chinese
      labelEn: 'Home',
      color: 'text-blue-600',
      activeColor: 'text-blue-600',
      description: 'Go to home screen'
    },
    {
      id: 'draw' as ViewType,
      icon: PenTool,
      label: '练习', // Practice in Chinese
      labelEn: 'Draw',
      color: 'text-green-600',
      activeColor: 'text-green-600',
      description: 'Practice drawing characters'
    },
    {
      id: 'library' as ViewType,
      icon: BookOpen,
      label: '字库', // Character library in Chinese
      labelEn: 'Library',
      color: 'text-purple-600',
      activeColor: 'text-purple-600',
      description: 'Browse character library'
    },
    {
      id: 'saved' as ViewType,
      icon: Heart,
      label: '收藏', // Saved/Collection in Chinese
      labelEn: 'Saved',
      color: 'text-red-600',
      activeColor: 'text-red-600',
      description: 'View saved characters'
    },
    {
      id: 'settings' as ViewType,
      icon: Settings,
      label: '设置', // Settings in Chinese
      labelEn: 'Settings',
      color: 'text-gray-600',
      activeColor: 'text-gray-600',
      description: 'App settings and preferences'
    }
  ];

  // Handle navigation item click
  const handleNavClick = (viewId: ViewType) => {
    onViewChange(viewId);
    
    // Add haptic feedback on mobile devices (if supported)
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      {/* Navigation container */}
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex justify-around items-center">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  flex flex-col items-center justify-center p-3 rounded-lg
                  transition-all duration-200 ease-in-out
                  hover:bg-gray-50 active:scale-95
                  min-w-[60px] relative
                  ${isActive ? 'bg-gray-50' : ''}
                `}
                aria-label={item.description}
                title={item.description}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                    <div className={`w-1 h-1 rounded-full ${item.activeColor} bg-current`} />
                  </div>
                )}
                
                {/* Icon */}
                <Icon 
                  className={`
                    w-6 h-6 mb-1 transition-colors duration-200
                    ${isActive ? item.activeColor : 'text-gray-500'}
                  `}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                
                {/* Label */}
                <div className="flex flex-col items-center">
                  {/* Chinese label */}
                  <span className={`
                    text-xs font-medium transition-colors duration-200
                    ${isActive ? item.activeColor : 'text-gray-500'}
                  `}>
                    {item.label}
                  </span>
                  
                  {/* English label (smaller) */}
                  <span className={`
                    text-[10px] transition-colors duration-200
                    ${isActive ? 'text-gray-600' : 'text-gray-400'}
                  `}>
                    {item.labelEn}
                  </span>
                </div>
                
                {/* Active background indicator */}
                {isActive && (
                  <div className={`
                    absolute inset-0 rounded-lg opacity-10
                    ${item.activeColor} bg-current
                  `} />
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Safe area padding for devices with home indicators */}
      <div className="h-safe-area-inset-bottom bg-white" />
    </nav>
  );
};

// Additional component for showing navigation hints (optional)
export const NavigationHint: React.FC<{ currentView: ViewType }> = ({ currentView }) => {
  const getHintText = () => {
    switch (currentView) {
      case 'home':
        return 'Choose an activity to start learning Chinese characters';
      case 'draw':
        return 'Draw characters on the canvas to practice stroke order';
      case 'library':
        return 'Browse and select characters to learn and practice';
      case 'saved':
        return 'Review your practiced characters and track progress';
      case 'settings':
        return 'Customize your learning experience';
      default:
        return '';
    }
  };

  return (
    <div className="fixed bottom-20 left-0 right-0 pointer-events-none z-40">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-black/70 text-white text-sm px-3 py-2 rounded-lg text-center backdrop-blur-sm">
          {getHintText()}
        </div>
      </div>
    </div>
  );
};

// Hook for managing navigation state (optional utility)
export const useNavigation = () => {
  const [currentView, setCurrentView] = React.useState<ViewType>('home');
  const [previousView, setPreviousView] = React.useState<ViewType>('home');
  
  const navigateTo = (view: ViewType) => {
    setPreviousView(currentView);
    setCurrentView(view);
  };
  
  const navigateBack = () => {
    setCurrentView(previousView);
  };
  
  return {
    currentView,
    previousView,
    navigateTo,
    navigateBack,
    setCurrentView
  };
};

export default Navigation;