import React, { createContext, useState, useContext, useEffect } from 'react';

interface ProfileData {
  petName: string;
  petImage: string;
  petAge: number;
  petGender: 'male' | 'female';
  petBreed: string;
  ownerName: string;
  ownerImage: string;
  location: string;
  bio: string;
  interests: string[];
}

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (newProfile: Partial<ProfileData>) => void;
}

const initialProfile: ProfileData = {
  petName: 'Charlie',
  petImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
  petAge: 3,
  petGender: 'male',
  petBreed: 'Beagle',
  ownerName: 'Alex Johnson',
  ownerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  location: 'San Francisco, CA',
  bio: 'Charlie loves playing fetch at the park and meeting new furry friends! He\'s very friendly and gets along with dogs of all sizes.',
  interests: ['Running', 'Fetch', 'Swimming', 'Toys'],
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // localStorage에서 프로필 데이터 불러오기 또는 초기 데이터 사용
  const [profile, setProfile] = useState<ProfileData>(() => {
    const savedProfile = localStorage.getItem('profile');
    return savedProfile ? JSON.parse(savedProfile) : initialProfile;
  });

  // 프로필 데이터가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (newProfile: Partial<ProfileData>) => {
    setProfile(prev => ({
      ...prev,
      ...newProfile
    }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}; 