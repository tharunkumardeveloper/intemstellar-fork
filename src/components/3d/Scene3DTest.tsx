import React from 'react';
import Scene3D from './Scene3D';
import ParticleSystem from './ParticleSystem';

const Scene3DTest: React.FC = () => {
  return (
    <div className="w-full h-screen">
      <Scene3D
        enablePerformanceMonitoring={true}
        adaptivePerformance={true}
        showStats={true}
        enableControls={false}
      >
        <ParticleSystem
          count={500}
          color={['#3b82f6', '#8b5cf6', '#06b6d4']}
          size={[0.01, 0.03]}
          speed={0.5}
          interactive={true}
          scrollResponsive={true}
          shape="sphere"
          opacity={0.7}
        />
      </Scene3D>
    </div>
  );
};

export default Scene3DTest;