import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, TrendingUp, Clock, Filter } from 'lucide-react';
import PostCard from '../components/ui/PostCard';
import { usePost } from '../contexts/PostContext';

function calculateTimeSince(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  const hours = Math.floor(diff / 3600);
  return `${hours}시간 전`;
}

const Community = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('trending');
  const { posts, toggleLike, toggleBookmark } = usePost();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.petType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (activeTab === 'recent') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return b.likesCount - a.likesCount;
  });

  const displayPosts = activeTab === 'saved' 
    ? sortedPosts.filter(post => post.isBookmarked)
    : sortedPosts;

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-100 border-none text-gray-900 text-sm rounded-xl block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search topics, posts, and dog breeds..."
          />
        </div>
      </header>

      <div className="scrollable flex-1 p-4">
        {displayPosts.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            {searchTerm ? '검색 결과가 없습니다.' : '게시물이 없습니다.'}
          </div>
        ) : (
          displayPosts.map(post => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              tags={post.tags}
              petType={post.petType}
              likesCount={post.likesCount}
              commentsCount={post.commentsCount}
              isLiked={post.isLiked}
              isBookmarked={post.isBookmarked}
              onLike={toggleLike}
              onBookmark={toggleBookmark}
              onComment={(id) => {
                console.log("Navigating to:", `/community/post/${id}`); // ✅ 디버깅 추가
                navigate(`/community/post/${id}`);  // ✅ 수정된 부분
              }}
              timeSince={calculateTimeSince(new Date(post.created_at))}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Community;
