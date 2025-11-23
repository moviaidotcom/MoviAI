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
    { name: 'Vision', action: () => onNavigate('vision') },
    { name: 'Governance', action: () => onNavigate('dao') },
    { name: 'Studio', action: () => onNavigate('genesis') },
    { name: 'Product', action: () => onNavigate('product') },
  ];

  return (
    <div className="bg-movi-black text-white selection:bg-movi-green selection:text-black overflow-x-hidden w-full">
      
      {/* Cinema Curtain/Vignette */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.8)_100%)]"></div>

      {/* Navbar - Marquee Style */}
      <nav className={`fixed w-full z-40 transition-all duration-500 border-b