import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-12 w-auto',
    xl: 'h-16 w-auto'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo Icon */}
      <div className={`relative ${sizeClasses[size]}`}>
        <svg 
          viewBox="0 0 60 60" 
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle */}
          <circle 
            cx="30" 
            cy="30" 
            r="28" 
            fill="url(#logoGradient)" 
            stroke="#1e40af" 
            strokeWidth="2"
          />
          
          {/* Digital "D" */}
          <path 
            d="M15 18 L15 42 L25 42 C32 42 37 37 37 30 C37 23 32 18 25 18 Z M20 23 L25 23 C28.5 23 31 25.5 31 30 C31 34.5 28.5 37 25 37 L20 37 Z" 
            fill="white"
          />
          
          {/* Digital pixels effect */}
          <rect x="40" y="20" width="3" height="3" fill="#10b981" />
          <rect x="44" y="24" width="3" height="3" fill="#3b82f6" />
          <rect x="40" y="28" width="3" height="3" fill="#8b5cf6" />
          <rect x="44" y="32" width="3" height="3" fill="#f59e0b" />
          <rect x="40" y="36" width="3" height="3" fill="#ef4444" />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <span className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight ${
          size === 'sm' ? 'text-lg' : 
          size === 'md' ? 'text-xl' : 
          size === 'lg' ? 'text-2xl' : 
          'text-3xl'
        }`}>
          DigiStore
        </span>
        {size !== 'sm' && (
          <span className={`text-gray-500 font-medium ${
            size === 'md' ? 'text-xs' : 
            size === 'lg' ? 'text-sm' : 
            'text-base'
          }`}>
            by Ose Okunmwendia
          </span>
        )}
      </div>
    </div>
  );
}

// Alternative compact logo for mobile/small spaces
export function CompactLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="h-8 w-8">
        <svg viewBox="0 0 32 32" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="15" fill="url(#compactGradient)" />
          <text x="16" y="22" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">D</text>
          <defs>
            <linearGradient id="compactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        DigiStore
      </span>
    </div>
  );
}