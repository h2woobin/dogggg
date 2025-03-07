import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ProfileImage from '../components/ui/ProfileImage';
import { useNavigate } from 'react-router-dom';
import { getMessages } from '../lib/api';

interface Conversation {
  id: string;
  petName: string;
  ownerName: string;
  image: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  text: string;
  created_at: string;
  read: boolean;
}

// Get userId from localStorage
const getUserId = () => {
  const storedUserId = localStorage.getItem('chatUserId');
  if (storedUserId) {
    return storedUserId;
  }
  const newUserId = 'user-' + Date.now();
  localStorage.setItem('chatUserId', newUserId);
  return newUserId;
};

const Messages = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [userId] = useState(getUserId());

  // Format time function
  const formatTime = (date: string) => {
    const messageDate = new Date(date);
    const now = new Date();
    
    // Convert to Pacific Time
    const pacificFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Vancouver',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    const pacificDateFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Vancouver',
      month: 'short',
      day: 'numeric'
    });

    // Get Pacific Time versions of the dates
    const pacificMessageDate = new Date(messageDate.toLocaleString('en-US', { timeZone: 'America/Vancouver' }));
    const pacificNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/Vancouver' }));

    // Calculate the difference in hours in Pacific Time
    const diffInHours = (pacificNow.getTime() - pacificMessageDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return pacificFormatter.format(messageDate);
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return pacificDateFormatter.format(messageDate);
    }
  };

  // Fetch messages for all conversations
  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const conversationPromises = samplePets.map(async (pet) => {
          const messages = await getMessages(userId, pet.id);
          const lastMessage = messages && messages.length > 0 ? messages[messages.length - 1] : null;

          return {
            id: pet.id,
            petName: pet.petName,
            ownerName: pet.ownerName,
            image: pet.image,
            lastMessage: lastMessage ? lastMessage.text : "No messages yet",
            time: lastMessage ? formatTime(lastMessage.created_at) : "",
            unread: messages ? messages.filter(
              (msg: Message) => msg.sender_id !== userId && !msg.read
            ).length : 0,
          };
        });

        const updatedConversations = await Promise.all(conversationPromises);
        setConversations(updatedConversations);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchAllMessages();
    const interval = setInterval(fetchAllMessages, 3000);
    return () => clearInterval(interval);
  }, [userId]);

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
        {conversations.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 text-6xl">💬</div>
            <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
            <p className="text-muted-foreground">
              You'll see messages from matches here once you start chatting.
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-1">
            {conversations.map((conversation) => (
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
