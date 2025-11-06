import React from 'react';
import HeroSection from './components/HeroSection';
import ProfileShowcase from './components/ProfileShowcase';
import MLRiskDemo from './components/MLRiskDemo';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen w-full bg-[#0A0B1A] selection:bg-fuchsia-500/30 selection:text-white">
      <HeroSection />
      <ProfileShowcase />
      <MLRiskDemo />
      <Footer />
    </div>
  );
}

export default App;
