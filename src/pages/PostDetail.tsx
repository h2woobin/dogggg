import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { postId } = useParams();
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Post {postId}</h1>
      <div className="mb-4">
        <button onClick={handleLike} className="bg-blue-500 text-white px-4 py-2 rounded">
          Like ({likes})
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Comments</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="border-b py-2">{comment}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-2 w-full mt-2"
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default PostDetail; 