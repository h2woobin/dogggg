import React, { useState, useMemo } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { ChevronDown, Filter, MapPin } from 'lucide-react';
import SwipeContainer from '../components/ui/SwipeContainer';

// Sample pet data with distance
const samplePets = [
  {
    id: '1',
    name: 'Bella',
    breed: 'Golden Retriever',
    age: 2,
    images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80'],
    description: 'Friendly and energetic Golden Retriever who loves to play fetch and swim!',
    personality: ['Friendly', 'Active', 'Playful'],
    interests: ['Swimming', 'Fetch', 'Park Walks'],
    distance: 2.5,
    address: 'Vancouver, BC'
  },
  {
    id: '2',
    name: 'Max',
    breed: 'German Shepherd',
    age: 3,
    images: ['https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80'],
    description: 'Intelligent and loyal German Shepherd looking for an active family.',
    personality: ['Smart', 'Loyal', 'Protective'],
    interests: ['Training', 'Agility', 'Hiking'],
    distance: 5.8,
    address: 'Burnaby, BC'
  },
  {
    id: '3',
    name: 'Luna',
    breed: 'Husky',
    age: 2,
    images: ['https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=800&q=80'],
    description: 'Adventurous husky who loves winter activities and long runs.',
    personality: ['Energetic', 'Independent', 'Talkative'],
    interests: ['Running', 'Snow Activities', 'Adventure'],
    distance: 2.5,
    address: 'Vancouver, BC'
  },
  {
    id: '4',
    name: 'Charlie',
    breed: 'French Bulldog',
    age: 1,
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80'],
    description: 'Charming French Bulldog puppy who loves cuddles and short walks.',
    personality: ['Affectionate', 'Calm', 'Friendly'],
    interests: ['Cuddling', 'Short Walks', 'Napping'],
    distance: 2.5,
    address: 'Vancouver, BC'
  },
  {
    id: '5',
    name: 'Milo',
    breed: 'Poodle',
    age: 4,
    images: ['https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=80'],
    description: 'Intelligent and elegant poodle who enjoys learning new tricks.',
    personality: ['Smart', 'Elegant', 'Gentle'],
    interests: ['Training', 'Grooming', 'Dog Parks'],
    distance: 2.5,
    address: 'Vancouver, BC'
  },
  {
    id: '6',
    name: 'Bailey',
    breed: 'Labrador Retriever',
    age: 3,
    images: ['https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=800&q=80'],
    description: 'Friendly Lab who loves water and playing with other dogs.',
    personality: ['Social', 'Playful', 'Water-loving'],
    interests: ['Swimming', 'Fetch', 'Meeting New Dogs'],
    distance: 2.5,
    address: 'Vancouver, BC'
  },
  {
    id: '7',
    name: 'Rocky',
    breed: 'Rottweiler',
    age: 5,
    images: ['https://images.unsplash.com/photo-1567752881298-894bb81f9379?auto=format&fit=crop&w=800&q=80'],
    description: 'Gentle giant with a heart of gold, great with families.',
    personality: ['Gentle', 'Protective', 'Calm'],
    interests: ['Family Time', 'Guard Duty', 'Relaxing'],
    distance: 2.5,
    address: 'Vancouver, BC'
  },
  {
    id: '8',
    name: 'Daisy',
    breed: 'Corgi',
    age: 2,
    images: ['https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&w=800&q=80'],
    description: 'Energetic Corgi who loves herding and playing games.',
    personality: ['Energetic', 'Smart', 'Playful'],
    interests: ['Herding', 'Agility', 'Treats'],
    distance: 2.5,
    address: 'Vancouver, BC'
  },
  {
    id: '9',
    name: 'Leo',
    breed: 'Bernese Mountain Dog',
    age: 4,
    images: ['https://images.unsplash.com/photo-1582456891925-a0fab0e8f3bf?auto=format&fit=crop&w=800&q=80'],
    description: 'Big fluffy mountain dog who loves winter and cuddles.',
    personality: ['Gentle', 'Patient', 'Loving'],
    interests: ['Snow Play', 'Carrying Bags', 'Mountain Walks'],
    distance: 2.5,
    address: 'Vancouver, BC'
  },
  {
    id: '10',
    name: 'Zoe',
    breed: 'Border Collie',
    age: 3,
    images: ['https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=800&q=80'],
    description: 'Highly intelligent Border Collie who excels at agility.',
    personality: ['Intelligent', 'Athletic', 'Focused'],
    interests: ['Agility Training', 'Frisbee', 'Problem Solving'],
    distance: 2.5,
    address: 'Vancouver, BC'
  }
];

const Dating = () => {
  const [isDetailView, setIsDetailView] = useState(false);
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [viewedPets, setViewedPets] = useState<string[]>([]);
  
  // Filter out viewed pets
  const remainingPets = useMemo(() => {
    return samplePets.filter(pet => !viewedPets.includes(pet.id));
  }, [viewedPets]);
  
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
  const petDetail = samplePets.find(pet => pet.id === selectedPet);

  if (remainingPets.length === 0) {
    return (
      <div className="page-container">
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">PetMeet</h1>
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
        <h1 className="text-xl font-semibold">PetMeet</h1>
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
