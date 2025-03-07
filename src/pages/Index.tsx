import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartHandshake, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate('/dating');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <div className={`transition-all duration-1000 transform ${
        animationComplete ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}>
        <div className="mb-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center mb-6 shadow-lg">
            <HeartHandshake className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Lovey Dogey</h1>
          <p className="text-gray-600 text-center max-w-xs">Find the perfect playmate for your furry friend</p>
        </div>
        
        <div className="space-y-4 w-full max-w-xs">
          <button 
            onClick={handleGetStarted}
            className="w-full flex items-center justify-center bg-blue-500 text-white py-3 px-4 rounded-xl font-medium transition-all hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          
          <div className="text-center">
            <span className="text-sm text-gray-500">
              By continuing, you agree to our<br />
              <a href="#" className="text-blue-500 hover:text-blue-700">Terms of Service</a>
              {' & '}
              <a href="#" className="text-blue-500 hover:text-blue-700">Privacy Policy</a>
            </span>
          </div>
        </div>
        
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <div className="w-2 h-2 rounded-full bg-blue-300"></div>
            <div className="w-2 h-2 rounded-full bg-blue-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
