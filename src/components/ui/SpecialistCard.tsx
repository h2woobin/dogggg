
import React from 'react';
import { Star, Clock, Award, DollarSign, MessageSquare } from 'lucide-react';
import ProfileImage from './ProfileImage';

interface SpecialistCardProps {
  id: string;
  name: string;
  image: string;
  occupation: string;
  experience: number;
  certifications: string[];
  bio: string;
  pricePerHour: number;
  consultationCount: number;
  rating: number;
  onClick?: () => void;
  onMessageClick?: () => void;
  isExpanded?: boolean;
}

const SpecialistCard = ({
  id,
  name,
  image,
  occupation,
  experience,
  certifications,
  bio,
  pricePerHour,
  consultationCount,
  rating,
  onClick,
  onMessageClick,
  isExpanded = false,
}: SpecialistCardProps) => {
  if (!isExpanded) {
    // Compact view
    return (
      <div 
        className="bg-white rounded-xl p-3 flex items-center border border-gray-100 mb-3 cursor-pointer transition-all hover:shadow-md"
        onClick={onClick}
      >
        <ProfileImage src={image} alt={name} size="sm" />
        <div className="ml-3 flex-1">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{occupation}</p>
        </div>
        <div className="flex items-center text-amber-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
      </div>
    );
  }
  
  // Expanded view
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4 transition-all hover:shadow-md animate-scale-in">
      <div className="p-5">
        <div className="flex items-center">
          <ProfileImage src={image} alt={name} size="lg" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-blue-600 font-medium">{occupation}</p>
            <div className="flex items-center mt-1 text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-medium">{experience} years</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium">${pricePerHour}/hr</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Consultations</p>
              <p className="font-medium">{consultationCount}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Award className="w-5 h-5 text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Certifications</p>
              <p className="font-medium">{certifications.length}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium mb-1">About</h3>
          <p className="text-sm text-gray-700">{bio}</p>
        </div>
        
        <div className="mt-3">
          <h3 className="font-medium mb-1">Certifications</h3>
          <div className="flex flex-wrap gap-1">
            {certifications.map((cert, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
        
        <button 
          className="mt-5 w-full py-3 btn-primary rounded-lg flex items-center justify-center"
          onClick={onMessageClick}
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          Start Consultation
        </button>
      </div>
    </div>
  );
};

export default SpecialistCard;
