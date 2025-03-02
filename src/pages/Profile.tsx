import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Settings, Edit, MapPin, User, Shield, LogOut } from 'lucide-react';
import { useProfile } from '../contexts/ProfileContext';

const Profile = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();

  const handleEditClick = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="page-container">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Profile</h1>
        <button className="rounded-full p-2 hover:bg-gray-100">
          <Settings className="w-5 h-5 text-gray-700" />
        </button>
      </header>
      
      <div className="scrollable flex-1 pb-6">
        {/* Cover Photo & Profile Picture */}
        <div className="relative h-40 bg-gradient-to-r from-blue-400 to-blue-500">
          <div className="absolute -bottom-16 left-4 border-4 border-white rounded-full bg-white">
            <div className="relative">
              <img 
                src={profile.petImage} 
                alt={profile.petName} 
                className="w-32 h-32 object-cover rounded-full"
              />
              <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow-md">
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="absolute -bottom-16 right-4">
            <button 
              onClick={handleEditClick}
              className="bg-white rounded-full p-2 shadow-sm text-gray-700 hover:bg-gray-50"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Basic Info */}
        <div className="mt-20 px-4">
          <h2 className="text-2xl font-bold">{profile.petName}</h2>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{profile.location}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">{profile.petAge}</h3>
              <p className="text-xs text-gray-500">Years old</p>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold flex justify-center">
                <User 
                  className={`w-5 h-5 ${profile.petGender === 'male' ? 'text-blue-500' : 'text-pink-500'}`} 
                />
              </h3>
              <p className="text-xs text-gray-500">Gender</p>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">{profile.petBreed}</h3>
              <p className="text-xs text-gray-500">Breed</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-gray-700">{profile.bio}</p>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Owner</h3>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <img
                src={profile.ownerImage}
                alt={profile.ownerName}
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <p className="font-medium">{profile.ownerName}</p>
                <p className="text-sm text-gray-600">Pet Parent</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 space-y-3">
            <button className="flex items-center justify-between w-full p-3 bg-gray-100 rounded-lg">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-gray-700 mr-3" />
                <span>Privacy and Settings</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            
            <button className="flex items-center justify-between w-full p-3 bg-gray-100 rounded-lg">
              <div className="flex items-center">
                <LogOut className="w-5 h-5 text-gray-700 mr-3" />
                <span>Sign Out</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
