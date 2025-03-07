import React, { createContext, useState, useContext, useEffect } from 'react';

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
    return savedPosts ? JSON.parse(savedPosts) : [];
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