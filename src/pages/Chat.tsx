import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { sendMessage, getMessages } from '../lib/api';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  text: string;
  created_at: string;
}

// 샘플 데이터
const pets = {
  '1': {
    id: '1',
    name: 'Bella',
    breed: 'Golden Retriever',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80'
  },
  '2': {
    id: '2',
    name: 'Max',
    breed: 'Labrador',
    image: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?auto=format&fit=crop&w=800&q=80'
  },
  '3': {
    id: '3',
    name: 'Luna',
    breed: 'Husky',
    image: 'https://images.unsplash.com/photo-1511382686815-a9a670f0a512?auto=format&fit=crop&w=800&q=80'
  }
};

// userId를 가져오거나 생성하는 함수
const getUserId = () => {
  const storedUserId = localStorage.getItem('chatUserId');
  if (storedUserId) {
    return storedUserId;
  }
  const newUserId = 'user-' + Date.now();
  localStorage.setItem('chatUserId', newUserId);
  return newUserId;
};

const Chat = () => {
  const navigate = useNavigate();
  const { petId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId] = useState(getUserId());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const pet = useMemo(() => {
    if (!petId || !pets[petId as keyof typeof pets]) {
      navigate('/messages');
      return null;
    }
    return pets[petId as keyof typeof pets];
  }, [petId, navigate]);

  // 메시지 목록 가져오기
  const fetchMessages = async () => {
    if (!pet?.id || !userId) return;

    try {
      console.log('Fetching messages for:', { userId, petId: pet.id });
      const fetchedMessages = await getMessages(userId, pet.id);
      console.log('Fetched messages:', fetchedMessages);
      setMessages(fetchedMessages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // 컴포넌트 마운트 시와 주기적으로 메시지 업데이트
  useEffect(() => {
    if (!pet?.id || !userId) return;

    console.log('Setting up message polling with:', { userId, petId: pet.id });
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);

    return () => clearInterval(interval);
  }, [petId, userId, pet?.id]);

  if (!pet) return null;

  const handleSend = async () => {
    if (!newMessage.trim() || !pet?.id || !userId) return;

    try {
      console.log('Sending message:', {
        sender_id: userId,
        receiver_id: pet.id,
        text: newMessage
      });

      // 먼저 UI 업데이트
      const optimisticMessage = {
        id: Date.now().toString(),
        sender_id: userId,
        receiver_id: pet.id,
        text: newMessage,
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, optimisticMessage]);
      setNewMessage('');

      // 실제 메시지 전송
      await sendMessage({
        sender_id: userId,
        receiver_id: pet.id,
        text: newMessage
      });

      // 전체 메시지 목록 업데이트
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      // 에러 발생 시 optimistic 업데이트 롤백
      setMessages(prev => prev.filter(msg => msg.id !== Date.now().toString()));
    }
  };

  const formatTime = (date: string | Date) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Vancouver',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(new Date(date));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex items-center">
        <button 
          className="p-2 hover:bg-gray-100 rounded-full mr-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center">
          <img 
            src={pet.image}
            alt={pet.name} 
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <h2 className="font-semibold">{pet.name}</h2>
            <p className="text-xs text-gray-500">{pet.breed}</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender_id === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                message.sender_id === userId
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender_id === userId ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {formatTime(message.created_at)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat; 