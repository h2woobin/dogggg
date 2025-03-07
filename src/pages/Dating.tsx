import React, { useState, useMemo, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { ChevronDown, Filter, MapPin } from 'lucide-react';
import SwipeContainer from '../components/ui/SwipeContainer';
import { getPets } from '../lib/api';
import type { Pet as SupabasePet } from '../types/supabase';

// UI Pet interface that includes all required properties for display
interface UIPet {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: 'male' | 'female';
  bio: string;
  owner: {
    name: string;
    gender: 'male' | 'female';
  };
  likesCount: number;
  images: string[];
  description: string;
  personality: string[];
  interests: string[];
  distance: number;
  address: string;
}

const Dating = () => {
  const [isDetailView, setIsDetailView] = useState(false);
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [viewedPets, setViewedPets] = useState<string[]>([]);
  const [pets, setPets] = useState<UIPet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Transform Supabase Pet to UI Pet
  const transformPetToUIPet = (pet: SupabasePet): UIPet => ({
    id: pet.id,
    name: pet.name,
    breed: pet.breed,
    age: pet.age,
    gender: 'male', // Default value
    bio: pet.description,
    owner: {
      name: 'Unknown Owner',
      gender: 'male'
    },
    likesCount: 0,
    images: pet.images,
    description: pet.description,
    personality: ['Friendly', 'Playful'], // Default values
    interests: ['Playing', 'Walking'], // Default values
    distance: 5, // Default value in km
    address: 'Vancouver, BC' // Default value
  });

  // Fetch pets from database
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setIsLoading(true);
        const fetchedPets = await getPets();
        const transformedPets = fetchedPets.map(transformPetToUIPet);
        setPets(transformedPets);
      } catch (err) {
        setError('Failed to load pets. Please try again later.');
        console.error('Error loading pets:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPets();
  }, []);
  
  // Filter out viewed pets
  const remainingPets = useMemo(() => {
    return pets.filter(pet => !viewedPets.includes(pet.id));
  }, [viewedPets, pets]);
  
  const detailViewSpring = useSpring({
    transform: isDetailView ? 'translateY(0%)' : 'translateY(100%)',
    config: { tension: 300, friction: 30 }
  });
  
  const handleDetailView = (id: string) => {
    setSelectedPet(id);
    setIsDetailView(true);
  };
  
  const handleCloseDetailView = () => {
    setIsDetailView(false);
  };

  const handlePetViewed = (id: string) => {
    setViewedPets(prev => [...prev, id]);
  };
  
  // Find the selected pet
  const petDetail = pets.find(pet => pet.id === selectedPet);

  if (isLoading) {
    return (
      <div className="page-container">
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Lovey Dogey</h1>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <Filter className="w-5 h-5 text-gray-700" />
          </button>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading pets...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Lovey Dogey</h1>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <Filter className="w-5 h-5 text-gray-700" />
          </button>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">😿</div>
            <h2 className="text-xl font-semibold mb-2">Oops!</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (remainingPets.length === 0) {
    return (
      <div className="page-container">
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Lovey Dogey</h1>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <Filter className="w-5 h-5 text-gray-700" />
          </button>
        </header>
        
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-4 text-6xl">🐾</div>
          <h2 className="text-2xl font-semibold mb-2">You've seen all dogs!</h2>
          <p className="text-gray-600">Check back later for new furry friends.</p>
          <button 
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600"
            onClick={() => setViewedPets([])}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Lovey Dogey</h1>
        <button className="rounded-full p-2 hover:bg-gray-100">
          <Filter className="w-5 h-5 text-gray-700" />
        </button>
      </header>
      
      <div className="flex-1 overflow-hidden">
        <SwipeContainer 
          pets={remainingPets} 
          onDetailView={handleDetailView}
          onPetViewed={handlePetViewed}
        />
        
        {/* Detail View */}
        <animated.div 
          style={detailViewSpring}
          className="fixed inset-0 z-20 bg-white overflow-auto"
        >
          {petDetail && (
            <>
              <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 flex items-center">
                <button 
                  className="rounded-full p-2 mr-3 hover:bg-gray-100"
                  onClick={handleCloseDetailView}
                >
                  <ChevronDown className="w-5 h-5 text-gray-700" />
                </button>
                <h2 className="text-xl font-semibold">{petDetail.name}'s Profile</h2>
              </div>
              
              <div className="p-4">
                {/* Image Gallery */}
                <div className="flex overflow-x-auto pb-2 gap-2 -mx-4 px-4 scrollable">
                  {petDetail.images.map((image, idx) => (
                    <img 
                      key={idx} 
                      src={image} 
                      alt={`${petDetail.name} photo ${idx + 1}`} 
                      className="w-80 h-80 object-cover rounded-lg flex-shrink-0"
                    />
                  ))}
                </div>
                
                {/* Basic Info */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">About {petDetail.name}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="text-gray-600">Breed</div>
                      <div className="font-medium">{petDetail.breed}</div>
                    </div>
                    
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="text-gray-600">Age</div>
                      <div className="font-medium">{petDetail.age} years</div>
                    </div>

                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="text-gray-600">Location</div>
                      <div className="font-medium flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {petDetail.address} • {petDetail.distance}km away
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{petDetail.description}</p>
                </div>
                
                {/* Personality */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Personality</h3>
                  <div className="flex flex-wrap">
                    {petDetail.personality.map((trait, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-gray-200 text-sm rounded-full mr-2 mb-2"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Interests */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Interests</h3>
                  <div className="flex flex-wrap">
                    {petDetail.interests.map((interest, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-gray-200 text-sm rounded-full mr-2 mb-2"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="mt-8 pb-6">
                  <button className="w-full py-3 btn-primary rounded-lg font-medium">
                    Send {petDetail.name} a Like
                  </button>
                </div>
              </div>
            </>
          )}
        </animated.div>
      </div>
    </div>
  );
};

export default Dating;
