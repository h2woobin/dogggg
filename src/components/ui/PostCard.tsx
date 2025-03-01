
import React from 'react';
import { MessageCircle, Heart, RefreshCw, Bookmark, MoreHorizontal } from 'lucide-react';

interface PostCardProps {
  id: string;
  title: string;
  content: string;
  tags: string[];
  petType: string;
  likesCount: number;
  commentsCount: number;
  timeSince: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
  onLike?: (id: string) => void;
  onBookmark?: (id: string) => void;
  onComment?: (id: string) => void;
  onRepost?: (id: string) => void;
}

const PostCard = ({
  id,
  title,
  content,
  tags,
  petType,
  likesCount,
  commentsCount,
  timeSince,
  isLiked = false,
  isBookmarked = false,
  onLike,
  onBookmark,
  onComment,
  onRepost,
}: PostCardProps) => {
  const handleLike = () => {
    if (onLike) onLike(id);
  };

  const handleBookmark = () => {
    if (onBookmark) onBookmark(id);
  };

  const handleComment = () => {
    if (onComment) onComment(id);
  };

  const handleRepost = () => {
    if (onRepost) onRepost(id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4 transition-all hover:shadow-md">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-1">
            <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">{petType}</span>
            <span className="text-xs text-gray-500">• {timeSince}</span>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-700 text-sm mb-3 line-clamp-3">{content}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button 
              className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
              onClick={handleLike}
            >
              <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
              <span className="text-xs">{likesCount}</span>
            </button>
            
            <button 
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
              onClick={handleComment}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{commentsCount}</span>
            </button>
            
            <button 
              className="flex items-center space-x-1 text-gray-500 hover:text-green-500"
              onClick={handleRepost}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          
          <button 
            className={isBookmarked ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}
            onClick={handleBookmark}
          >
            <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
