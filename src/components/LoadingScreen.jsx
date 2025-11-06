import React from 'react';
import Spline from '@splinetool/react-spline';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/igThmltzmqv5hkWo/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      {/* Soft gradient vignette that won't block interaction with Spline if needed */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="relative z-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">Initializing</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
