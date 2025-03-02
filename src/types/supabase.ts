export type User = {
  id: string;
  email: string;
  name: string;
  profile_image?: string;
  created_at: string;
};

export type Pet = {
  id: string;
  name: string;
  breed: string;
  age: number;
  images: string[];
  description: string;
  owner_id: string;
  created_at: string;
};

export type Match = {
  id: string;
  user_id: string;
  pet_id: string;
  liked: boolean;
  created_at: string;
};

export type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  text: string;
  read: boolean;
  created_at: string;
}; 