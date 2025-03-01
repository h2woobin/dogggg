
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, MessageCircle, HelpCircle, Stethoscope, User } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { path: '/dating', icon: Heart, label: 'Dating' },
    { path: '/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/community', icon: HelpCircle, label: 'Community' },
    { path: '/experts', icon: Stethoscope, label: 'Experts' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-50 flex items-center justify-around px-2">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
        >
          <item.icon className="nav-link-icon" />
          <span className="nav-link-text">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
