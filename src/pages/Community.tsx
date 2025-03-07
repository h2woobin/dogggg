import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, TrendingUp, Clock, Filter } from 'lucide-react';
import PostCard from '../components/ui/PostCard';
import { usePost } from '../contexts/PostContext';

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

const Community = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('trending');
  const { posts, toggleLike, toggleBookmark } = usePost();

  return (
    <div className="page-container">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-semibold">Community</h1>
          <button 
            onClick={() => navigate('/create-post')}
            className="btn-circle w-10 h-10 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-100 border-none text-gray-900 text-sm rounded-xl block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search topics, posts, and dog breeds..."
          />
        </div>
        
        <div className="flex border-b border-gray-200">
          <button 
            className={`flex items-center py-2 px-4 border-b-2 text-sm font-medium ${
              activeTab === 'trending' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('trending')}
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            Trending
          </button>
          <button 
            className={`flex items-center py-2 px-4 border-b-2 text-sm font-medium ${
              activeTab === 'recent' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('recent')}
          >
            <Clock className="w-4 h-4 mr-1" />
            Recent
          </button>
          <button 
            className={`flex items-center py-2 px-4 border-b-2 text-sm font-medium ${
              activeTab === 'saved' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('saved')}
          >
            <Filter className="w-4 h-4 mr-1" />
            Filters
          </button>
        </div>
      </header>
      
      <div className="scrollable flex-1 p-4">
        {posts.map(post => (
          <PostCard
            key={post.id}
            {...post}
            onClick={() => navigate(`/post/${post.id}`)}
            onLike={() => toggleLike(post.id)}
            onBookmark={() => toggleBookmark(post.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Community;
