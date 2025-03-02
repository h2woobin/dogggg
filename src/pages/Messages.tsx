import React from 'react';
import { Search } from 'lucide-react';
import ProfileImage from '../components/ui/ProfileImage';
import { useNavigate } from 'react-router-dom';

// Sample data
const sampleConversations = [
  {
    id: '1',
    petName: 'Bella',
    ownerName: 'Sarah',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    lastMessage: "Let's meet at the park this weekend!",
    time: '10:32 AM',
    unread: 2,
  },
  {
    id: '2',
    petName: 'Max',
    ownerName: 'Mike',
    image: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?auto=format&fit=crop&w=800&q=80',
    lastMessage: 'My dog really enjoyed playing with yours! We should do it again.',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    petName: 'Luna',
    ownerName: 'Emma',
    image: 'https://images.unsplash.com/photo-1511382686815-a9a670f0a512?auto=format&fit=crop&w=800&q=80',
    lastMessage: 'Thanks for the recommendation on the vet!',
    time: 'Wed',
    unread: 0,
  },
];

const Messages = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-semibold mb-3">Messages</h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-100 border-none text-gray-900 text-sm rounded-xl block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search messages..."
          />
        </div>
      </header>
      
      <div className="scrollable flex-1">
        {sampleConversations.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 text-6xl">💬</div>
            <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
            <p className="text-muted-foreground">
              You'll see messages from matches here once you start chatting.
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-1">
            {sampleConversations.map((conversation) => (
              <div
                key={conversation.id}
                className="flex items-center p-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => navigate(`/chat/${conversation.id}`)}
              >
                <div className="relative">
                  <ProfileImage
                    src={conversation.image}
                    alt={conversation.petName}
                    size="md"
                  />
                  {conversation.unread > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unread}
                    </div>
                  )}
                </div>
                
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold truncate">{conversation.petName}</h3>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
