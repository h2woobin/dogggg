import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';

interface Pet {
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
}

interface SwipeContainerProps {
  pets: Pet[];
  onDetailView: (id: string) => void;
  onPetViewed: (id: string) => void;
}

const SwipeContainer = ({ pets, onDetailView, onPetViewed }: SwipeContainerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedPets, setLikedPets] = useState<string[]>([]);
  const [dislikedPets, setDislikedPets] = useState<string[]>([]);
  const [exitingCardId, setExitingCardId] = useState<string | null>(null);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  const currentPet = pets[currentIndex];
  
  const handleLike = (id: string) => {
    setExitingCardId(id);
    setExitDirection('right');
    setLikedPets([...likedPets, id]);
    
    setTimeout(() => {
      if (currentIndex === pets.length - 1) {
        onPetViewed(id);
      } else {
        onPetViewed(id);
        setCurrentIndex(prev => prev + 1);
      }
      setExitingCardId(null);
      setExitDirection(null);
    }, 500);
  };
  
  const handleDislike = (id: string) => {
    setExitingCardId(id);
    setExitDirection('left');
    setDislikedPets([...dislikedPets, id]);
    
    setTimeout(() => {
      if (currentIndex === pets.length - 1) {
        onPetViewed(id);
      } else {
        onPetViewed(id);
        setCurrentIndex(prev => prev + 1);
      }
      setExitingCardId(null);
      setExitDirection(null);
    }, 500);
  };

  if (pets.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 text-6xl">🐾</div>
        <h3 className="text-xl font-semibold mb-2">You've seen all dogs!</h3>
        <p className="text-muted-foreground">
          Check back later for new furry friends in your area!
        </p>
      </div>
    );
  }

  if (currentIndex > pets.length - 1) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 text-6xl">👋</div>
        <h3 className="text-xl font-semibold mb-2">You've seen all pets!</h3>
        <p className="text-muted-foreground">
          Check back later for new matches or adjust your preferences.
        </p>
      </div>
    );
  }

  const exitingAnimationClass = exitingCardId === currentPet.id 
    ? exitDirection === 'left' 
      ? 'animate-swipe-left' 
      : 'animate-swipe-right'
    : '';

  return (
    <div className="relative h-full max-w-md mx-auto p-2">
      <div className={exitingAnimationClass}>
        <PetCard
          {...currentPet}
          onLike={handleLike}
          onDislike={handleDislike}
          onDetailView={onDetailView}
        />
      </div>
    </div>
  );
};

export default SwipeContainer;
