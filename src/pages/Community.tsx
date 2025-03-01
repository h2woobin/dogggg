
import React, { useState } from 'react';
import { Search, Plus, TrendingUp, Clock, Filter } from 'lucide-react';
import PostCard from '../components/ui/PostCard';

// Sample data
const samplePosts = [
  {
    id: '1',
    title: 'How do I stop my dog from barking at strangers?',
    content: 'My 2-year-old Beagle barks excessively whenever someone new comes to our house. We've tried treats and distraction but nothing seems to work. Any advice from experienced owners?',
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
    content: 'My German Shepherd has developed some digestive issues and I'm looking for food recommendations. He's 4 years old and quite active.',
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
    content: 'I'm getting a new Labrador puppy next week and I already have a 7-year-old Retriever at home. Any tips on how to make the introduction go smoothly and avoid jealousy?',
    tags: ['puppies', 'multipledog', 'training'],
    petType: 'Labrador',
    likesCount: 32,
    commentsCount: 15,
    timeSince: '1d ago',
    isLiked: false,
    isBookmarked: false,
  },
];

const Community = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>(['2']);
  
  const handleLike = (id: string) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(postId => postId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };
  
  const handleBookmark = (id: string) => {
    if (bookmarkedPosts.includes(id)) {
      setBookmarkedPosts(bookmarkedPosts.filter(postId => postId !== id));
    } else {
      setBookmarkedPosts([...bookmarkedPosts, id]);
    }
  };

  const postsWithUpdatedState = samplePosts.map(post => ({
    ...post,
    isLiked: likedPosts.includes(post.id) || post.isLiked,
    isBookmarked: bookmarkedPosts.includes(post.id) || post.isBookmarked,
  }));

  return (
    <div className="page-container">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-semibold">Community</h1>
          <button className="btn-circle w-10 h-10 bg-blue-500 text-white">
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
        {postsWithUpdatedState.map(post => (
          <PostCard
            key={post.id}
            {...post}
            onLike={handleLike}
            onBookmark={handleBookmark}
          />
        ))}
      </div>
    </div>
  );
};

export default Community;
