import { supabase } from './supabase';
import type { User, Pet, Match, Message } from '../types/supabase';

// User API
export const createUser = async (userData: Omit<User, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single();
  
  if (error) {
    console.error('Create user error:', error);
    throw new Error(`Failed to create user: ${error.message}`);
  }
  return data;
};

export const getUserById = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Get user error:', error);
    throw new Error(`Failed to get user: ${error.message}`);
  }
  return data;
};

// Pet API
export const createPet = async (petData: Omit<Pet, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('pets')
    .insert([petData])
    .select()
    .single();
  
  if (error) {
    console.error('Create pet error:', error);
    throw new Error(`Failed to create pet: ${error.message}`);
  }
  return data;
};

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  bio: string;
  owner: string;
  likesCount: number;
  images: string[];
  description: string;
  personality: string[];
  interests: string[];
  distance: number;
  address: string;
}

export const getPets = async (): Promise<Pet[]> => {
  const { data, error } = await supabase
    .from('pets')
    .select('*');
  
  if (error) {
    console.error('Error fetching pets:', error);
    return [];
  }
  
  return data || [];
};

export const getPetsByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('owner_id', userId);
  
  if (error) {
    console.error('Get pets by user error:', error);
    throw new Error(`Failed to get pets by user: ${error.message}`);
  }
  return data;
};

// Match API
export const createMatch = async (matchData: Omit<Match, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('matches')
    .insert([matchData])
    .select()
    .single();
  
  if (error) {
    console.error('Create match error:', error);
    throw new Error(`Failed to create match: ${error.message}`);
  }
  return data;
};

export const getMatches = async (userId: string) => {
  const { data, error } = await supabase
    .from('matches')
    .select('*, pets(*), users(*)')
    .eq('user_id', userId)
    .eq('liked', true);
  
  if (error) {
    console.error('Get matches error:', error);
    throw new Error(`Failed to get matches: ${error.message}`);
  }
  return data;
};

// Message API
export const sendMessage = async (messageData: Omit<Message, 'id' | 'created_at' | 'read'>) => {
  console.log('Sending message data:', messageData);
  const { data, error } = await supabase
    .from('messages')
    .insert([{ ...messageData, read: false }])
    .select()
    .single();
  
  if (error) {
    console.error('Send message error:', error);
    throw new Error(`Failed to send message: ${error.message}`);
  }
  return data;
};

export const getMessages = async (userId: string, otherId: string) => {
  console.log('Getting messages for:', { userId, otherId });
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherId}),and(sender_id.eq.${otherId},receiver_id.eq.${userId})`)
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Get messages error:', error);
    throw new Error(`Failed to get messages: ${error.message}`);
  }
  
  console.log('Retrieved messages:', data);
  return data || [];
};

export const markMessageAsRead = async (messageId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('id', messageId)
    .select()
    .single();
  
  if (error) {
    console.error('Mark message as read error:', error);
    throw new Error(`Failed to mark message as read: ${error.message}`);
  }
  return data;
};

// Sample data for testing
const samplePets = [
  {
    name: 'Luna',
    breed: 'Siberian Husky',
    age: 2,
    description: 'Energetic and friendly husky who loves snow and adventures!',
    images: [
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=800&q=80'
    ],
    owner_id: 'default-owner',
    personality: ['Energetic', 'Friendly', 'Adventurous'],
    interests: ['Snow Activities', 'Running', 'Adventures'],
    gender: 'female',
    bio: 'Energetic and friendly husky who loves snow and adventures!'
  },
  {
    name: 'Max',
    breed: 'Golden Retriever',
    age: 3,
    description: 'Gentle and loving retriever, perfect with kids and other dogs.',
    images: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80'
    ],
    owner_id: 'default-owner',
    personality: ['Gentle', 'Loving', 'Patient'],
    interests: ['Playing with Kids', 'Swimming', 'Fetch'],
    gender: 'male',
    bio: 'Gentle and loving retriever, perfect with kids and other dogs.'
  },
  {
    name: 'Bella',
    breed: 'French Bulldog',
    age: 1,
    description: 'Playful and cuddly Frenchie looking for a loving home.',
    images: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80'
    ],
    owner_id: 'default-owner',
    personality: ['Playful', 'Cuddly', 'Affectionate'],
    interests: ['Cuddling', 'Short Walks', 'Indoor Play'],
    gender: 'female',
    bio: 'Playful and cuddly Frenchie looking for a loving home.'
  },
  {
    name: 'Rocky',
    breed: 'German Shepherd',
    age: 4,
    description: 'Intelligent and loyal shepherd, great with training.',
    images: [
      'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80'
    ],
    owner_id: 'default-owner',
    personality: ['Intelligent', 'Loyal', 'Protective'],
    interests: ['Training', 'Agility', 'Protection Work'],
    gender: 'male',
    bio: 'Intelligent and loyal shepherd, great with training.'
  },
  {
    name: 'Daisy',
    breed: 'Corgi',
    age: 2,
    description: 'Adorable corgi who loves belly rubs and playing fetch!',
    images: [
      'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&w=800&q=80'
    ],
    owner_id: 'default-owner',
    personality: ['Adorable', 'Energetic', 'Smart'],
    interests: ['Belly Rubs', 'Fetch', 'Herding'],
    gender: 'female',
    bio: 'Adorable corgi who loves belly rubs and playing fetch!'
  }
];

export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // First, create a default owner if it doesn't exist
    const { data: ownerData, error: ownerError } = await supabase
      .from('users')
      .upsert([
        {
          id: 'default-owner',
          name: 'Test Owner',
          email: 'test@example.com',
          profile_image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80'
        }
      ])
      .select()
      .single();

    if (ownerError) {
      console.error('Error creating default owner:', ownerError);
      throw ownerError;
    }

    console.log('Default owner created/updated:', ownerData);

    // Then insert the sample pets
    const { data: petsData, error: petsError } = await supabase
      .from('pets')
      .upsert(samplePets)
      .select();

    if (petsError) {
      console.error('Error inserting sample pets:', petsError);
      throw petsError;
    }

    console.log('Successfully inserted pets:', petsData);

    return {
      owner: ownerData,
      pets: petsData
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}; 