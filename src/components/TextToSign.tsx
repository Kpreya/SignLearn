import React, { useState } from 'react';
import { Type, Volume2 } from 'lucide-react';

const TextToSign: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [signLanguageGif, setSignLanguageGif] = useState<string | null>(null);

  const handleTextToSign = () => {
    // Here you would implement the logic to convert text to sign language
    // For this example, we'll just use a placeholder GIF
    setSignLanguageGif('https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif');
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(inputText);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg resize-none"
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to convert to sign language"
        />
        <div className="flex justify-between mt-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={handleTextToSign}
          >
            <Type className="mr-2" size={20} />
            Convert to Sign
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={handleSpeak}
          >
            <Volume2 className="mr-2" size={20} />
            Speak
          </button>
        </div>
      </div>
      {signLanguageGif && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Sign Language:</h2>
          <img src={signLanguageGif} alt="Sign language representation" className="rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default TextToSign;