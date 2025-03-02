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

export const getPets = async () => {
  const { data, error } = await supabase
    .from('pets')
    .select('*, users(*)');
  
  if (error) {
    console.error('Get pets error:', error);
    throw new Error(`Failed to get pets: ${error.message}`);
  }
  return data;
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