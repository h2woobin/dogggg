
import React, { useState } from 'react';
import { Search, Filter, Award, Clock, DollarSign, MessageSquare, X } from 'lucide-react';
import SpecialistCard from '../components/ui/SpecialistCard';

// Sample data
const sampleSpecialists = [
  {
    id: '1',
    name: 'Dr. Jennifer Wilson',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f',
    occupation: 'Veterinarian',
    experience: 8,
    certifications: ['DVM', 'CVMA'],
    bio: 'Specialized in small animal medicine with a focus on preventive care and nutrition. I love helping pet owners understand their furry friends better!',
    pricePerHour: 80,
    consultationCount: 324,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Michael Brown',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    occupation: 'Dog Trainer',
    experience: 12,
    certifications: ['CPDT-KA', 'ABCDT'],
    bio: 'Professional dog trainer with over a decade of experience. Specializing in behavioral issues, obedience training, and puppy development.',
    pricePerHour: 60,
    consultationCount: 521,
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Amanda Lee',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    occupation: 'Dog Groomer',
    experience: 5,
    certifications: ['NDGAA', 'IPG'],
    bio: 'Certified professional groomer with experience handling all dog breeds. Specializing in breed-specific cuts and working with nervous dogs.',
    pricePerHour: 45,
    consultationCount: 187,
    rating: 4.6,
  },
];

const Experts = () => {
  const [expandedSpecialist, setExpandedSpecialist] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSpecialistClick = (id: string) => {
    setExpandedSpecialist(expandedSpecialist === id ? null : id);
  };
  
  const handleMessageClick = (id: string) => {
    console.log(`Start consultation with ${id}`);
    // Would navigate to payment and then messaging
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="page-container">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-semibold">Pet Experts</h1>
          <button 
            className={`rounded-full p-2 ${showFilters ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            onClick={toggleFilters}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
        
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-100 border-none text-gray-900 text-sm rounded-xl block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search specialists..."
          />
        </div>
        
        {showFilters && (
          <div className="bg-gray-50 p-3 rounded-lg mb-4 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Filters</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={toggleFilters}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-gray-700" />
                <span className="text-sm">Profession</span>
              </div>
              <select className="bg-white text-sm p-2 rounded border border-gray-200">
                <option value="">Any</option>
                <option value="vet">Veterinarian</option>
                <option value="trainer">Dog Trainer</option>
                <option value="groomer">Dog Groomer</option>
              </select>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-700" />
                <span className="text-sm">Experience</span>
              </div>
              <select className="bg-white text-sm p-2 rounded border border-gray-200">
                <option value="">Any</option>
                <option value="0-5">0-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="10+">10+ years</option>
              </select>
              
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-700" />
                <span className="text-sm">Price Range</span>
              </div>
              <select className="bg-white text-sm p-2 rounded border border-gray-200">
                <option value="">Any</option>
                <option value="0-50">$0-$50</option>
                <option value="51-100">$51-$100</option>
                <option value="100+">$100+</option>
              </select>
              
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-gray-700" />
                <span className="text-sm">Consultations</span>
              </div>
              <select className="bg-white text-sm p-2 rounded border border-gray-200">
                <option value="">Any</option>
                <option value="0-100">0-100</option>
                <option value="101-500">101-500</option>
                <option value="500+">500+</option>
              </select>
            </div>
            
            <button className="w-full py-2 btn-primary rounded-lg text-sm font-medium">
              Apply Filters
            </button>
          </div>
        )}
      </header>
      
      <div className="scrollable flex-1 p-4">
        {sampleSpecialists.map(specialist => (
          <SpecialistCard
            key={specialist.id}
            {...specialist}
            onClick={() => handleSpecialistClick(specialist.id)}
            onMessageClick={() => handleMessageClick(specialist.id)}
            isExpanded={expandedSpecialist === specialist.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Experts;
