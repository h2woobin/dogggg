
import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Heart, X, ChevronUp, MapPin, Mars, Venus } from 'lucide-react';
import ProfileImage from './ProfileImage';

interface PetCardProps {
  id: string;
  name: string;
  images: string[];
  gender: 'male' | 'female';
  distance: number;
  breed: string;
  bio: string;
  owner: {
    name: string;
    gender: 'male' | 'female';
  };
  likesCount: number;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onDetailView: (id: string) => void;
}

const PetCard = ({
  id,
  name,
  images,
  gender,
  distance,
  breed,
  bio,
  owner,
  likesCount,
  onLike,
  onDislike,
  onDetailView,
}: PetCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | 'down' | null>(null);

  const cardSpring = useSpring({
    transform: isSwiping 
      ? `translateX(${offsetX}px) rotate(${offsetX * 0.05}deg) translateY(${offsetY}px)` 
      : 'translateX(0px) rotate(0deg) translateY(0px)',
    opacity: isSwiping ? 1 - Math.abs(offsetX) / 500 : 1,
    config: { tension: 300, friction: 20 }
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setIsSwiping(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setStartY(e.clientY);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    
    setOffsetX(currentX - startX);
    setOffsetY(currentY - startY);
    
    // Determine swipe direction
    const absX = Math.abs(currentX - startX);
    const absY = Math.abs(currentY - startY);
    
    if (absX > absY) {
      if (currentX > startX) setSwipeDirection('right');
      else setSwipeDirection('left');
    } else {
      if (currentY > startY) setSwipeDirection('down');
      else setSwipeDirection('up');
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSwiping) return;
    
    const currentX = e.clientX;
    const currentY = e.clientY;
    
    setOffsetX(currentX - startX);
    setOffsetY(currentY - startY);
    
    // Determine swipe direction
    const absX = Math.abs(currentX - startX);
    const absY = Math.abs(currentY - startY);
    
    if (absX > absY) {
      if (currentX > startX) setSwipeDirection('right');
      else setSwipeDirection('left');
    } else {
      if (currentY > startY) setSwipeDirection('down');
      else setSwipeDirection('up');
    }
  };

  const handleTouchEnd = () => {
    const absX = Math.abs(offsetX);
    const absY = Math.abs(offsetY);
    
    if (absX > 100) {
      // Horizontal swipe complete
      if (offsetX > 0) {
        // Swipe right - previous image
        if (currentImageIndex > 0) {
          setCurrentImageIndex(currentImageIndex - 1);
        }
      } else {
        // Swipe left - next image
        if (currentImageIndex < images.length - 1) {
          setCurrentImageIndex(currentImageIndex + 1);
        }
      }
    } else if (absY > 100) {
      // Vertical swipe complete
      if (offsetY < 0 && absY > absX) {
        // Swipe up - show detail
        onDetailView(id);
      }
    }
    
    // Reset state
    setIsSwiping(false);
    setOffsetX(0);
    setOffsetY(0);
    setSwipeDirection(null);
  };

  const handleMouseUp = handleTouchEnd;

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDislike(id);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(id);
  };

  return (
    <animated.div
      className="pet-card h-[calc(100vh-144px)]"
      style={cardSpring}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="relative h-[calc(100%-100px)]">
        {/* Current Image */}
        <img 
          src={images[currentImageIndex]} 
          alt={`${name}'s photo ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Image Pagination */}
        <div className="absolute top-2 left-2 right-2 flex justify-center gap-1 z-10">
          {images.map((_, index) => (
            <div 
              key={index} 
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 w-2'
              }`}
            />
          ))}
        </div>
        
        {/* Profile Info */}
        <div className="absolute top-4 left-4 flex items-center">
          <ProfileImage 
            src={images[0]} 
            alt={name} 
            size="sm" 
            hasLikes={true} 
            likesCount={likesCount}
          />
        </div>
        
        {/* Detail Instruction */}
        <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center animate-pulse-subtle">
          <ChevronUp className="w-6 h-6 text-white drop-shadow-md" />
          <span className="text-xs text-white font-medium drop-shadow-md">Swipe up for details</span>
        </div>
      </div>
      
      <div className="p-4 bg-white">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <div className="flex items-center text-sm text-gray-600">
              {gender === 'male' ? (
                <Mars className="w-4 h-4 text-blue-500 mr-1" />
              ) : (
                <Venus className="w-4 h-4 text-pink-500 mr-1" />
              )}
              <span className="mr-3">{breed}</span>
              <MapPin className="w-4 h-4 mr-1" />
              <span>{distance} km</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-around pt-2">
          <button 
            className="btn-circle w-14 h-14 bg-white border-2 border-red-500 text-red-500 hover:bg-red-50"
            onClick={handleDislike}
          >
            <X className="w-8 h-8" />
          </button>
          
          <button 
            className="btn-circle w-14 h-14 bg-white border-2 border-green-500 text-green-500 hover:bg-green-50"
            onClick={handleLike}
          >
            <Heart className="w-8 h-8" />
          </button>
        </div>
      </div>
    </animated.div>
  );
};

export default PetCard;
