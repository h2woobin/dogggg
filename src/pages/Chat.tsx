import React, { useState, useMemo } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

// 샘플 데이터
const pets = {
  '1': {
    name: 'Bella',
    breed: 'Golden Retriever',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80'
  },
  '2': {
    name: 'Max',
    breed: 'Labrador',
    image: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?auto=format&fit=crop&w=800&q=80'
  },
  '3': {
    name: 'Luna',
    breed: 'Husky',
    image: 'https://images.unsplash.com/photo-1511382686815-a9a670f0a512?auto=format&fit=crop&w=800&q=80'
  }
};

const initialMessages = {
  '1': [
    {
      id: '1',
      senderId: 'pet',
      text: '안녕하세요! 저와 함께 산책하고 싶으신가요?',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    }
  ],
  '2': [
    {
      id: '1',
      senderId: 'pet',
      text: '공놀이 좋아하시나요? 저는 공 던지기를 정말 좋아해요!',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    }
  ],
  '3': [
    {
      id: '1',
      senderId: 'pet',
      text: '안녕하세요! 저는 활발한 성격이에요. 함께 뛰어놀아요!',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    }
  ]
};

const Chat = () => {
  const navigate = useNavigate();
  const { petId } = useParams();
  
  const pet = useMemo(() => {
    if (!petId || !pets[petId as keyof typeof pets]) {
      navigate('/messages');
      return null;
    }
    return pets[petId as keyof typeof pets];
  }, [petId, navigate]);

  const [messages, setMessages] = useState<Message[]>(
    initialMessages[petId as keyof typeof initialMessages] || []
  );
  
  const [newMessage, setNewMessage] = useState('');

  if (!pet) return null;

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
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
            className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                message.senderId === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.senderId === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="메시지를 입력하세요..."
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