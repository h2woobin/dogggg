import { useState } from 'react';
import { createUser, createPet, sendMessage, getPets, getMessages } from '../lib/api';

export default function TestDB() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const testCreateUser = async () => {
    try {
      const user = await createUser({
        email: 'test@example.com',
        name: 'Test User',
        profile_image: 'https://example.com/profile.jpg'
      });
      setResult(user);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating user');
    }
  };

  const testCreatePet = async () => {
    try {
      // First, we need to create a user
      const user = await createUser({
        email: 'petowner@example.com',
        name: 'Pet Owner',
        profile_image: 'https://example.com/owner.jpg'
      });

      const pet = await createPet({
        name: 'Bella',
        breed: 'Golden Retriever',
        age: 3,
        images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80'],
        description: 'A friendly and energetic Golden Retriever who loves to play!',
        owner_id: user.id
      });
      setResult(pet);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error registering pet');
    }
  };

  const testGetPets = async () => {
    try {
      const pets = await getPets();
      setResult(pets);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching pets');
    }
  };

  const testSendMessage = async () => {
    try {
      // Create two users for testing
      const user1 = await createUser({
        email: 'sender@example.com',
        name: 'Sender',
        profile_image: 'https://example.com/sender.jpg'
      });

      const user2 = await createUser({
        email: 'receiver@example.com',
        name: 'Receiver',
        profile_image: 'https://example.com/receiver.jpg'
      });

      const message = await sendMessage({
        sender_id: user1.id,
        receiver_id: user2.id,
        text: 'Hello! This is a test message.'
      });
      setResult(message);
      setError('');

      // Test message retrieval
      const messages = await getMessages(user1.id, user2.id);
      console.log('Messages:', messages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error sending message');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Database Test</h1>
      
      <div className="space-y-4">
        <button
          onClick={testCreateUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Test Create User
        </button>

        <button
          onClick={testCreatePet}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
        >
          Test Register Pet
        </button>

        <button
          onClick={testGetPets}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 ml-2"
        >
          Test Get Pets
        </button>

        <button
          onClick={testSendMessage}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2"
        >
          Test Send Message
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 