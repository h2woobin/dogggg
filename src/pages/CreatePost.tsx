import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePost } from '../contexts/PostContext';
import type { Post } from './Community';

// List of dog breeds
const DOG_BREEDS = [
  'Golden Retriever',
  'German Shepherd',
  'Labrador',
  'Poodle',
  'Bulldog',
  'Beagle',
  'Husky',
  'Pomeranian',
  'Chihuahua',
  'Shih Tzu',
  'Yorkshire Terrier',
  'Border Collie',
  'Rottweiler',
  'Doberman',
  'Corgi',
  'Other'
];

// List of post categories
const POST_CATEGORIES = [
  'Daily Sharing',
  'Health Concerns',
  'Medications',
  'Food',
  'Cleaning Tools',
  'Training',
  'Behavior',
  'Grooming',
  'Exercise',
  'Travel Tips',
  'Pet Products',
  'Vet Visits'
];

const CreatePost = () => {
  const navigate = useNavigate();
  const { addPost } = usePost();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = () => {
    // Create new post
    addPost({
      title,
      content,
      petType: selectedBreed,
      tags: [...selectedCategories, selectedBreed],
    });

    // Navigate back to community page
    navigate('/community');
  };

  return (
    <div className="page-container">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold">New Post</h1>
        <button 
          onClick={handleSubmit}
          disabled={!title.trim() || !content.trim() || !selectedBreed || selectedCategories.length === 0}
          className="text-primary font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Share
        </button>
      </header>

      <div className="p-4 space-y-6">
        <div>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <textarea
            placeholder="Write your post..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Dog Breed
          </label>
          <div className="flex flex-wrap gap-2">
            {DOG_BREEDS.map((breed) => (
              <button
                key={breed}
                onClick={() => setSelectedBreed(breed)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                  ${selectedBreed === breed
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                #{breed}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Categories (Multiple)
          </label>
          <div className="flex flex-wrap gap-2">
            {POST_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                  ${selectedCategories.includes(category)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                #{category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost; 