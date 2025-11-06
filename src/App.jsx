import React, { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection';
import ProfileShowcase from './components/ProfileShowcase';
import MLRiskDemo from './components/MLRiskDemo';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Minimal splash: ensures users see a smooth intro even if assets are still initializing.
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0A0B1A] selection:bg-fuchsia-500/30 selection:text-white">
      {loading && <LoadingScreen />}
      <HeroSection />
      <ProfileShowcase />
      <MLRiskDemo />
      <Footer />
    </div>
  );
}

export default App;
