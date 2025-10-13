import React from 'react';
import Scene3D from './Scene3D';
import ParticleSystem from './ParticleSystem';

/**
 * Test component to verify 3D setup is working correctly
 * This can be temporarily added to App.tsx for testing
 */
const Test3D: React.FC = () => {
  return (
    <div className="relative h-screen w-full">
      <Scene3D enableParticles={true} showStats={true} enableControls={true}>
        <ParticleSystem
          count={500}
          color="#3B82F6"
          size={0.02}
          speed={0.01}
          interactive={true}
        />
      </Scene3D>
      
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">3D Setup Test</h1>
          <p className="text-lg">If you can see particles in the background, the 3D setup is working!</p>
        </div>
      </div>
    </div>
  );
};

export default Test3D;