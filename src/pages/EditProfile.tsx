import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import { useProfile } from '../contexts/ProfileContext';

const EditProfile = () => {
  const navigate = useNavigate();
  const { profile: originalProfile, updateProfile } = useProfile();
  const [editedProfile, setEditedProfile] = useState({
    petImage: originalProfile.petImage,
    petName: originalProfile.petName,
    location: originalProfile.location,
    age: originalProfile.petAge.toString(),
    breed: originalProfile.petBreed,
    about: originalProfile.bio,
    interests: originalProfile.interests,
    ownerImage: originalProfile.ownerImage,
    ownerName: originalProfile.ownerName
  });

  const handleInputChange = (field: keyof typeof editedProfile, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestsChange = (value: string) => {
    const interestArray = value.split(',').map(item => item.trim());
    setEditedProfile(prev => ({
      ...prev,
      interests: interestArray
    }));
  };

  const handleImageUpload = (field: 'petImage' | 'ownerImage', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile(prev => ({
          ...prev,
          [field]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile({
      petImage: editedProfile.petImage,
      petName: editedProfile.petName,
      location: editedProfile.location,
      petAge: parseInt(editedProfile.age),
      petBreed: editedProfile.breed,
      bio: editedProfile.about,
      interests: editedProfile.interests,
      ownerImage: editedProfile.ownerImage,
      ownerName: editedProfile.ownerName
    });
    navigate('/profile');
  };

  return (
    <div className="page-container">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold">Edit Profile</h1>
        <button 
          onClick={handleSave}
          className="text-primary font-medium"
        >
          Save
        </button>
      </header>

      <div className="p-4 space-y-6">
        {/* 반려동물 프로필 사진 */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={editedProfile.petImage}
              alt="Pet"
              className="w-24 h-24 rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer">
              <Camera className="w-4 h-4" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload('petImage', e)}
              />
            </label>
          </div>
        </div>

        {/* 반려동물 정보 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pet Name
            </label>
            <input
              type="text"
              value={editedProfile.petName}
              onChange={(e) => handleInputChange('petName', e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={editedProfile.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="text"
              value={editedProfile.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Breed
            </label>
            <input
              type="text"
              value={editedProfile.breed}
              onChange={(e) => handleInputChange('breed', e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              About
            </label>
            <textarea
              value={editedProfile.about}
              onChange={(e) => handleInputChange('about', e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interests (comma-separated)
            </label>
            <input
              type="text"
              value={editedProfile.interests.join(', ')}
              onChange={(e) => handleInterestsChange(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* 보호자 정보 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Owner Information</h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={editedProfile.ownerImage}
                alt="Owner"
                className="w-16 h-16 rounded-full object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 cursor-pointer">
                <Camera className="w-3 h-3" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('ownerImage', e)}
                />
              </label>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Owner Name
              </label>
              <input
                type="text"
                value={editedProfile.ownerName}
                onChange={(e) => handleInputChange('ownerName', e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile; 