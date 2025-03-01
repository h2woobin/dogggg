
import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { ChevronDown, Filter } from 'lucide-react';
import SwipeContainer from '../components/ui/SwipeContainer';

// Sample data
const samplePets = [
  {
    id: '1',
    name: 'Bella',
    images: [
      'https://images.unsplash.com/photo-1583511655826-05700442982d',
      'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01',
    ],
    gender: 'female' as const,
    distance: 2.4,
    breed: 'Golden Retriever',
    bio: 'Loves to play fetch and go swimming. Very friendly with other dogs and children.',
    owner: {
      name: 'Sarah',
      gender: 'female' as const,
    },
    likesCount: 23,
  },
  {
    id: '2',
    name: 'Max',
    images: [
      'https://images.unsplash.com/photo-1560743641-3914f2c45636',
      'https://images.unsplash.com/photo-1521673461164-de300ebcfb17',
    ],
    gender: 'male' as const,
    distance: 4.1,
    breed: 'German Shepherd',
    bio: 'Energetic and intelligent. Looking for friends to run and play with at the park.',
    owner: {
      name: 'Mike',
      gender: 'male' as const,
    },
    likesCount: 18,
  },
  {
    id: '3',
    name: 'Luna',
    images: [
      'https://images.unsplash.com/photo-1511382686815-a9a670f0a512',
      'https://images.unsplash.com/photo-1554692918-08fa0fdc9db3',
    ],
    gender: 'female' as const,
    distance: 1.8,
    breed: 'Poodle',
    bio: 'Elegant and social. Enjoys long walks and playing with toys.',
    owner: {
      name: 'Emma',
      gender: 'female' as const,
    },
    likesCount: 15,
  },
];

const Dating = () => {
  const [isDetailView, setIsDetailView] = useState(false);
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  
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
  
  // Find the selected pet
  const petDetail = samplePets.find(pet => pet.id === selectedPet);

  return (
    <div className="page-container">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">PetMeet</h1>
        <button className="rounded-full p-2 hover:bg-gray-100">
          <Filter className="w-5 h-5 text-gray-700" />
        </button>
      </header>
      
      <div className="flex-1 overflow-hidden">
        <SwipeContainer 
          pets={samplePets} 
          onDetailView={handleDetailView} 
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
                      <div className="text-gray-600">Gender</div>
                      <div className="font-medium">{petDetail.gender === 'male' ? 'Male' : 'Female'}</div>
                    </div>
                    
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="text-gray-600">Distance</div>
                      <div className="font-medium">{petDetail.distance} km away</div>
                    </div>
                  </div>
                </div>
                
                {/* Bio */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Bio</h3>
                  <p className="text-gray-700">{petDetail.bio}</p>
                </div>
                
                {/* Owner Information */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">My Parent</h3>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">{petDetail.owner.name}</div>
                    <div className="text-gray-600">{petDetail.owner.gender === 'male' ? 'Male' : 'Female'}</div>
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
