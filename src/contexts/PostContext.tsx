import React, { createContext, useState, useContext, useEffect } from 'react';

// Sample data
const initialPosts = [
  {
    id: '1',
    title: 'How do I stop my dog from barking at strangers?',
    content: "My 2-year-old Beagle barks excessively whenever someone new comes to our house. We've tried treats and distraction but nothing seems to work. Any advice from experienced owners?",
    tags: ['training', 'behavior', 'barking'],
    petType: 'Beagle',
    likesCount: 24,
    commentsCount: 7,
    timeSince: '2h ago',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '2',
    title: 'Best food for a German Shepherd with sensitive stomach?',
    content: "My German Shepherd has developed some digestive issues and I'm looking for food recommendations. He's 4 years old and quite active.",
    tags: ['nutrition', 'health', 'germanshepherd'],
    petType: 'German Shepherd',
    likesCount: 18,
    commentsCount: 12,
    timeSince: '5h ago',
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: '3',
    title: 'Introducing a new puppy to my older dog',
    content: "I'm getting a new Labrador puppy next week and I already have a 7-year-old Retriever at home. Any tips on how to make the introduction go smoothly and avoid jealousy?",
    tags: ['puppies', 'multipledog', 'training'],
    petType: 'Labrador',
    likesCount: 32,
    commentsCount: 15,
    timeSince: '1d ago',
    isLiked: false,
    isBookmarked: false,
  },
];

export interface Post {
  id: string;
  title: string;
  content: string;
  tags: string[];
  petType: string;
  likesCount: number;
  commentsCount: number;
  timeSince: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

interface PostContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'likesCount' | 'commentsCount' | 'timeSince' | 'isLiked' | 'isBookmarked'>) => void;
  toggleLike: (id: string) => void;
  toggleBookmark: (id: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // localStorage에서 데이터 불러오기 또는 초기 데이터 사용
  const [posts, setPosts] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : initialPosts;
  });

  const [likedPosts, setLikedPosts] = useState<string[]>(() => {
    const savedLikedPosts = localStorage.getItem('likedPosts');
    return savedLikedPosts ? JSON.parse(savedLikedPosts) : [];
  });

  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>(() => {
    const savedBookmarkedPosts = localStorage.getItem('bookmarkedPosts');
    return savedBookmarkedPosts ? JSON.parse(savedBookmarkedPosts) : ['2'];
  });

  // 데이터가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarkedPosts));
  }, [bookmarkedPosts]);

  const addPost = (newPost: Omit<Post, 'id' | 'likesCount' | 'commentsCount' | 'timeSince' | 'isLiked' | 'isBookmarked'>) => {
    const post: Post = {
      ...newPost,
      id: (posts.length + 1).toString(),
      likesCount: 0,
      commentsCount: 0,
      timeSince: 'just now',
      isLiked: false,
      isBookmarked: false,
    };
    setPosts([post, ...posts]);
  };

  const toggleLike = (id: string) => {
    setLikedPosts(prev => 
      prev.includes(id) ? prev.filter(postId => postId !== id) : [...prev, id]
    );
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedPosts(prev => 
      prev.includes(id) ? prev.filter(postId => postId !== id) : [...prev, id]
    );
  };

  const value = {
    posts: posts.map(post => ({
      ...post,
      isLiked: likedPosts.includes(post.id) || post.isLiked,
      isBookmarked: bookmarkedPosts.includes(post.id) || post.isBookmarked,
    })),
    addPost,
    toggleLike,
    toggleBookmark,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
}; 