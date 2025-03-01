
import React, { useState } from 'react';
import { Crown } from 'lucide-react';

interface ProfileImageProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hasLikes?: boolean;
  likesCount?: number;
  onClick?: () => void;
}

const ProfileImage = ({
  src,
  alt,
  size = 'md',
  hasLikes = false,
  likesCount = 0,
  onClick,
}: ProfileImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };
  
  const showCrown = hasLikes && likesCount >= 20;

  return (
    <div className="relative inline-block">
      <div 
        className={`profile-avatar ${sizeClasses[size]} cursor-pointer`}
        onClick={onClick}
      >
        {!isLoaded && (
          <div className={`absolute inset-0 bg-gray-200 animate-pulse rounded-full`}></div>
        )}
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      
      {showCrown && (
        <div className="absolute -top-2 -right-2 bg-amber-400 rounded-full p-1 shadow-sm animate-scale-in">
          <Crown className="w-4 h-4 text-white" />
        </div>
      )}
      
      {hasLikes && likesCount > 0 && !showCrown && (
        <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
          {likesCount}
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
