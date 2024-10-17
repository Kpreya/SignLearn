import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import { Camera, Loader } from 'lucide-react';

const SignToText: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [model, setModel] = useState<handpose.HandPose | null>(null);
  const [prediction, setPrediction] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWebcamReady, setIsWebcamReady] = useState<boolean>(false);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      const loadedModel = await handpose.load();
      setModel(loadedModel);
      setIsLoading(false);
    };
    loadModel();
  }, []);

  const detectHands = async () => {
    if (model && webcamRef.current && isWebcamReady) {
      const video = webcamRef.current.video;
      if (video && video.readyState === 4) {
        try {
          const hand = await model.estimateHands(video);
          if (hand.length > 0) {
            // Here you would implement the logic to translate hand positions to text
            // For this example, we'll just return a placeholder text
            setPrediction('Hello');
          } else {
            setPrediction('');
          }
        } catch (error) {
          console.error('Error detecting hands:', error);
          setPrediction('Error detecting hands');
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      detectHands();
    }, 100);
    return () => clearInterval(interval);
  }, [model, isWebcamReady]);

  const handleWebcamLoad = () => {
    setIsWebcamReady(true);
  };

  return (
    <div className="flex flex-col items-center">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader className="animate-spin mr-2" size={24} />
          <span>Loading model...</span>
        </div>
      ) : (
        <>
          <div className="relative w-full max-w-md">
            <Webcam
              ref={webcamRef}
              audio={false}
              width={400}
              height={300}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: 'user' }}
              className="rounded-lg shadow-lg"
              onLoadedData={handleWebcamLoad}
            />
            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
              <Camera size={20} />
            </div>
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold mb-2">Prediction:</h2>
            <p className="text-2xl">{prediction || 'No sign detected'}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default SignToText;