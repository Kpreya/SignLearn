import React, { useState } from 'react';
import { Camera, Type } from 'lucide-react';
import SignToText from './components/SignToText';
import TextToSign from './components/TextToSign';

function App() {
  const [activeTab, setActiveTab] = useState<'signToText' | 'textToSign'>('signToText');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Sign Language Translator</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <div className="flex justify-center mb-6">
          <button
            className={`flex items-center px-4 py-2 rounded-l-lg ${
              activeTab === 'signToText' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('signToText')}
          >
            <Camera className="mr-2" size={20} />
            Sign to Text
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-r-lg ${
              activeTab === 'textToSign' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('textToSign')}
          >
            <Type className="mr-2" size={20} />
            Text to Sign
          </button>
        </div>
        {activeTab === 'signToText' ? <SignToText /> : <TextToSign />}
      </div>
    </div>
  );
}

export default App;