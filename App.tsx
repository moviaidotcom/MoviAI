import * as React from 'react';
import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Whitepaper from './components/Whitepaper';
import TokenLaunch from './components/TokenLaunch';
import GeminiAssistant from './components/GeminiAssistant';
import Dao from './components/Dao';
import GenesisEngine from './components/GenesisEngine';
import Vision from './components/Vision';
import Product from './components/Product';
import { ViewState } from './types';

// Film Leader Intro Animation
const IntroSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [count, setCount] = useState(3);
  const [showNoise, setShowNoise] = useState(true);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 500); // Short delay after 0
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center flex-col overflow-hidden">
       {/* Film Scratches and Noise Overlay */}
       <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-grain"></div>
       
       {/* Spinning Radar / Countdown Circle */}
       <div className="relative w-64 h-64 border-4 border-white/20 rounded-full flex items-center justify-center">
          <div className="absolute inset-0 border-t-4 border-movi-green rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-white/10 rounded-full"></div>
          <div className="absolute w-[1px] h-full bg-white/30 rotate-45"></div>
          <div className="absolute h-[1px] w-full bg-white/30 rotate-45"></div>
          
          <span className="text-9xl font-mono font-bold text-white animate-pulse">
            {count > 0 ? count : 'PLAY'}
          </span>
       </div>
       
       <div className="mt-12 font-script text-movi-green text-xs uppercase tracking-[0.5em] animate-pulse">
          Initializing MoviAI Protocol...
       </div>
    </div>
  );
};

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [introComplete, setIntroComplete] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen bg-movi-black text-white relative">
      {/* Cinematic Film Grain Overlay */}
      <div className="film-grain"></div>

      {!introComplete ? (
        <IntroSequence onComplete={() => setIntroComplete(true)} />
      ) : (
        <>
          {view === 'landing' && <LandingPage onNavigate={(v) => setView(v)} />}
          {view === 'whitepaper' && <Whitepaper onBack={() => setView('landing')} />}
          {view === 'token-launch' && <TokenLaunch onBack={() => setView('landing')} />}
          {view === 'dao' && <Dao onBack={() => setView('landing')} />}
          {view === 'genesis' && <GenesisEngine onBack={() => setView('landing')} />}
          {view === 'vision' && <Vision onBack={() => setView('landing')} />}
          {view === 'product' && <Product onBack={() => setView('landing')} />}
          
          <GeminiAssistant />
        </>
      )}
    </div>
  );
}

export default App;