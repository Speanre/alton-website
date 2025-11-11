'use client'; // For interactivity and camera

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ARPreview() {
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!cameraActive) return;

    // Load AR.js script dynamically
    const script = document.createElement('script');
    script.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Create AR scene (simple marker-based)
      const scene = `
        <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
          <a-marker preset="hiro">
            <a-plane src="https://via.placeholder.com/300x200?text=Your+Business+Card" 
                     material="color: white; opacity: 0.9;" 
                     geometry="primitive: plane; width: 1; height: 0.67" 
                     position="0 0 0" 
                     rotation="-90 0 0"></a-plane>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      `;
      const arDiv = document.getElementById('ar-scene');
      if (arDiv) arDiv.innerHTML = scene;
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [cameraActive]);

  const startAR = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setCameraActive(true);
      setError('');
    } catch (err) {
      setError('Camera access denied. Use static preview below.');
      setCameraActive(false);
    }
  };

  return (
    <>
      <Head>
        <script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <Header />

        <section className="py-12">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">AR Product Preview</h2>
            <p className="text-center mb-8 text-gray-600">Point your camera at the Hiro marker (download <a href="https://github.com/AR-js-org/AR.js/raw/master/data/images/HIRO.jpg" target="_blank" className="text-blue-600 hover:underline">here</a>) to see your print in AR!</p>
            
            {!cameraActive ? (
              <div className="text-center">
                <button 
                  onClick={startAR} 
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 mb-4"
                >
                  Start AR Preview
                </button>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div id="fallback-preview" className="bg-white p-4 rounded-lg shadow">
                  <p>Static Fallback: Imagine this business card on your desk!</p>
                  <img 
                    src="https://via.placeholder.com/400x250?text=Custom+Business+Card" 
                    alt="Static Preview" 
                    className="mx-auto rounded" 
                  />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p>AR Active! Point camera at marker.</p>
                <div id="ar-scene" className="w-full h-96 bg-black"></div>
                <button 
                  onClick={() => setCameraActive(false)} 
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Stop AR
                </button>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}