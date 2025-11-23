
import React, { useEffect, useState, useRef } from 'react';
import { Vote, Cpu, Coins, Globe, Menu, ArrowRight, Users, TrendingUp, Play, Film, Clapperboard, Ticket } from 'lucide-react';
import FeatureCard from './FeatureCard';
import NorthStarEvaluator from './NorthStarEvaluator';
import RevenueChart from './RevenueChart';
import { ViewState } from '../types';

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Beam Interaction State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setScrollProgress(Math.min(scrollY / 800, 1)); // Normalize 0-1 for hero fade
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        // Calculate relative mouse position (-1 to 1)
        const x = ((e.clientX - left) / width) * 2 - 1;
        const y = ((e.clientY - top) / height) * 2 - 1;
        setMousePos({ x, y });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navLinks = [
    { name: 'Vision', href: '#vision' },
    { name: 'Governance', action: () => onNavigate('dao') },
    { name: 'Studio', action: () => onNavigate('genesis') },
    { name: 'Product', href: '#product' },
  ];

  return (
    <div className="bg-movi-black text-white selection:bg-movi-green selection:text-black overflow-x-hidden w-full">
      
      {/* Cinema Curtain/Vignette */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.8)_100%)]"></div>

      {/* Navbar - Marquee Style */}
      <nav className={`fixed w-full z-40 transition-all duration-500 border-b ${scrolled ? 'bg-black/90 backdrop-blur-md border-white/10 py-3' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
            <div className="relative w-10 h-10 bg-black border border-white/20 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-movi-green opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <Film size={20} className="text-white group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-display font-bold tracking-tight leading-none text-white group-hover:text-movi-green transition-colors">MoviAI</span>
                <span className="text-[9px] font-mono text-gray-500 tracking-[0.2em] uppercase">Studio Protocol</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
                link.action ? (
                    <button key={link.name} onClick={link.action} className="text-xs font-bold text-gray-400 hover:text-white transition-colors tracking-widest uppercase font-display">
                        {link.name}
                    </button>
                ) : (
                    <a key={link.name} href={link.href} className="text-xs font-bold text-gray-400 hover:text-white transition-colors tracking-widest uppercase font-display">
                        {link.name}
                    </a>
                )
            ))}
            <button 
              onClick={() => onNavigate('whitepaper')}
              className="text-xs font-bold text-movi-green hover:text-white transition-colors font-display uppercase tracking-widest border border-movi-green/30 px-3 py-1 rounded-sm hover:bg-movi-green/10"
            >
              Script
            </button>
            
            {/* Ticket Stub Button */}
            <button 
              onClick={() => onNavigate('token-launch')}
              className="relative bg-white text-black font-bold text-xs uppercase tracking-wider px-6 py-2.5 hover:bg-movi-green transition-colors group"
              style={{ 
                 maskImage: 'radial-gradient(circle at 0 50%, transparent 4px, black 5px), radial-gradient(circle at 100% 50%, transparent 4px, black 5px)',
                 maskComposite: 'intersect'
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[2px] border-r border-dashed border-black/30"></div>
              <span className="flex items-center gap-2">
                <Ticket size={14} />
                Admit One
              </span>
              <div className="absolute right-0 top-0 bottom-0 w-[2px] border-l border-dashed border-black/30"></div>
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-2xl font-display">
             {navLinks.map(link => (
                link.action ? (
                    <button key={link.name} onClick={() => { setMobileMenuOpen(false); link.action!(); }} className="text-left text-gray-300 hover:text-movi-green uppercase">
                        {link.name}
                    </button>
                ) : (
                    <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-left text-gray-300 hover:text-movi-green uppercase">
                        {link.name}
                    </a>
                )
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,241,149,0.1)_0%,transparent_60%)] opacity-50"></div>
        
        {/* 3D Spotlight Effect reacting to mouse */}
        <div 
            className="absolute w-[200vw] h-[200vh] bg-gradient-to-b from-movi-green/5 to-transparent pointer-events-none transition-transform duration-75 ease-out"
            style={{ 
                transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px) rotate(${mousePos.x * 2}deg)`,
                opacity: 1 - scrollProgress
            }}
        ></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto transform transition-transform duration-100" style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-md animate-fade-in-up">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Recording Protocol Active</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter mb-6 leading-[0.85] uppercase mix-blend-difference">
                <span className="block animate-reveal-text">Decentralized</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 animate-reveal-text delay-100">Cinema</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
                "Don't just watch the story. <span className="text-white font-medium">Own it. Remix it. Profit from it.</span>" <br/>
                The world's first DAO-governed Hollywood studio.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300">
                <button 
                    onClick={() => onNavigate('genesis')}
                    className="px-8 py-4 bg-movi-green hover:bg-white text-black font-bold text-lg uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_20px_rgba(20,241,149,0.4)]"
                    style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)' }}
                >
                    Enter Studio
                </button>
                <button 
                    onClick={() => onNavigate('token-launch')}
                    className="px-8 py-4 border border-white/20 hover:border-white bg-transparent hover:bg-white/5 text-white font-bold text-lg uppercase tracking-widest transition-all flex items-center gap-2"
                >
                    <Coins size={18} /> Buy $MOVI
                </button>
            </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <ArrowRight className="rotate-90" size={16} />
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-24 px-6 relative border-t border-white/5">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-movi-purple to-transparent opacity-50"></div>
        
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
                <div className="flex-1">
                    <h2 className="text-5xl font-display font-bold mb-6">The "North Star" <span className="text-movi-purple">Protocol</span></h2>
                    <p className="text-lg text-gray-400 leading-relaxed mb-6">
                        Hollywood has lost its way. Algorithms dictate culture, and risk-aversion kills creativity. 
                        MoviAI restores the soul of cinema by evaluating every project against four immutable pillars.
                    </p>
                    <div className="flex gap-4 text-sm font-mono text-gray-500">
                        <span className="flex items-center gap-2"><TrendingUp size={14} className="text-movi-green" /> Algorithmic Fairness</span>
                        <span className="flex items-center gap-2"><Users size={14} className="text-movi-purple" /> Community Owned</span>
                    </div>
                </div>
                <div className="flex-1 w-full">
                    <NorthStarEvaluator />
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard 
                    title="Greenlight DAO"
                    description="You are the executive. Stake $MOVI tokens to vote on scripts, cast directors, and approve budgets."
                    icon={<Vote size={64} />}
                    onClick={() => onNavigate('dao')}
                />
                <FeatureCard 
                    title="Genesis Engine"
                    description="A suite of AI tools for script analysis, storyboard generation, and deepfake licensing."
                    icon={<Cpu size={64} />}
                    onClick={() => onNavigate('genesis')}
                />
                <FeatureCard 
                    title="Smart Royalties"
                    description="Blockchain-backed residuals. Creators, actors, and remixers get paid instantly when content is viewed."
                    icon={<Coins size={64} />}
                />
            </div>
        </div>
      </section>

      {/* Product / Stats Section */}
      <section id="product" className="py-24 bg-black border-y border-white/10 relative overflow-hidden">
          {/* Background Graph Lines */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                      <div className="inline-block px-2 py-1 bg-movi-green/20 text-movi-green text-xs font-bold uppercase tracking-widest mb-4 rounded">
                          Economic Model
                      </div>
                      <h2 className="text-5xl font-display font-bold mb-6">Profitable by <span className="text-movi-green">Design</span></h2>
                      <p className="text-gray-400 mb-8 leading-relaxed">
                          Unlike traditional studios burdened by overhead, MoviAI operates as a lean protocol. 
                          Revenue is generated through transaction fees, asset marketplace commissions, and global distribution.
                      </p>
                      
                      <div className="space-y-6">
                          <div className="flex items-start gap-4">
                              <div className="p-3 bg-gray-900 rounded border border-gray-800">
                                  <Globe size={24} className="text-white" />
                              </div>
                              <div>
                                  <h4 className="font-bold text-white uppercase">Global Distribution</h4>
                                  <p className="text-sm text-gray-500">Content streams directly to the Metaverse Theater.</p>
                              </div>
                          </div>
                          <div className="flex items-start gap-4">
                              <div className="p-3 bg-gray-900 rounded border border-gray-800">
                                  <Clapperboard size={24} className="text-white" />
                              </div>
                              <div>
                                  <h4 className="font-bold text-white uppercase">Remix Economy</h4>
                                  <p className="text-sm text-gray-500">Users pay to remix scenes, generating royalties for original IP holders.</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div>
                      <RevenueChart />
                  </div>
              </div>
          </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-24 text-center px-6 bg-gradient-to-b from-movi-black to-black">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Ready to <span className="text-white">Rolling?</span></h2>
          <div className="flex flex-col md:flex-row justify-center gap-4">
              <button 
                  onClick={() => onNavigate('token-launch')}
                  className="px-10 py-4 bg-white text-black hover:bg-movi-green font-bold text-lg uppercase tracking-widest transition-colors"
              >
                  Join the Presale
              </button>
              <button 
                  onClick={() => onNavigate('whitepaper')}
                  className="px-10 py-4 border border-gray-700 hover:border-white text-gray-400 hover:text-white font-bold text-lg uppercase tracking-widest transition-colors"
              >
                  Read Whitepaper
              </button>
          </div>
          
          <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono uppercase tracking-widest">
              <span>© 2025 MoviAI Protocol Foundation</span>
              <div className="flex gap-6">
                  <a href="#" className="hover:text-white transition-colors">Twitter</a>
                  <a href="#" className="hover:text-white transition-colors">Discord</a>
                  <a href="#" className="hover:text-white transition-colors">Etherscan</a>
              </div>
          </div>
      </footer>

    </div>
  );
};

export default LandingPage;
