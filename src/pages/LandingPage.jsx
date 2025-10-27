/**
 * Landing Page - Página de inicio mejorada
 */
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Roadmap from '../components/landing/Roadmap';
import Team from '../components/landing/Team';
import Footer from '../components/landing/Footer';

const LandingPage = ({ onStartChat }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero onStartChat={onStartChat} />
      
      {/* Features Section */}
      <section id="features">
        <Features />
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works">
        <HowItWorks />
      </section>
      
      {/* Roadmap Section */}
      <section id="roadmap">
        <Roadmap />
      </section>
      
      {/* Team Section */}
      <section id="team">
        <Team />
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
