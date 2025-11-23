import React from 'react';
import { ArrowLeft, Compass, Heart, Shield, Zap, Lightbulb, TrendingDown, Database, Star } from 'lucide-react';
import NorthStarEvaluator from './NorthStarEvaluator';

interface VisionProps {
    onBack: () => void;
}

const Vision: React.FC<VisionProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-movi-black text-white selection:bg-movi-green selection:text-black relative overflow-x-hidden">
            {/* Film Grain & Light Effects */}
            <div className="film-grain"></div>
            <div className="stage-light" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(153, 69, 255, 0.15), transparent 60%)' }}></div>

            {/* Header */}
            <div className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-md border-b border-white/10 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button 
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group uppercase tracking-wider font-display"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold">
                            <Compass size={18} className="animate-spin-slow" style={{ animationDuration: '10s' }} />
                        </div>
                        <span className="font-display font-bold text-lg tracking-tight uppercase">Manifesto</span>
                    </div>
                    <div className="hidden md:block text-xs font-mono text-gray-500 uppercase tracking-widest">
                        PROTOCOL MISSION V2.0
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-5xl mx-auto px-6 pt-32 pb-24 relative z-10">
                
                {/* Hero Section */}
                <div className="text-center mb-24 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
                        <Star size={12} className="text-movi-gold" fill="currentColor" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300 font-script">The Core Philosophy</span>
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 leading-none tracking-tighter">
                        Restoring the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-movi-purple via-white to-movi-green">Soul of Cinema</span>
                    </h1>
                    
                    <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed font-serif italic">
                        "Hollywood didn't just lose money. It lost its North Star—the commitment to inspiring, morally challenging, and elevating the human spirit."
                    </p>
                </div>

                {/* The Problem Section */}
                <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-display font-bold mb-4">From Art to <span className="text-red-500">Algorithm</span></h2>
                        <p className="text-gray-300 leading-relaxed">
                            The shift from "Will this move audiences?" to "What is the projected ROI?" destroyed creative risk. Modern blockbusters prioritize spectacle over soul, and algorithmic data dictates story beats.
                        </p>
                        <div className="space-y-4">
                            <div className="bg-red-900/10 border border-red-900/30 p-6 rounded-xl flex gap-4 items-start group hover:bg-red-900/20 transition-colors">
                                <div className="p-3 bg-black rounded border border-red-900/50 text-red-500 group-hover:scale-110 transition-transform">
                                    <Database size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white uppercase font-display mb-1">Algorithmic Storytelling</h4>
                                    <p className="text-sm text-gray-400">Studios use analytics to flatten moral complexity. Stories are engineered to prevent you from hitting "stop" rather than to make you feel.</p>
                                </div>
                            </div>
                            <div className="bg-red-900/10 border border-red-900/30 p-6 rounded-xl flex gap-4 items-start group hover:bg-red-900/20 transition-colors">
                                <div className="p-3 bg-black rounded border border-red-900/50 text-red-500 group-hover:scale-110 transition-transform">
                                    <TrendingDown size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white uppercase font-display mb-1">The Ambiguous Anti-Hero</h4>
                                    <p className="text-sm text-gray-400">Moral clarity has been replaced by cynicism. Stories often lack a meaningful framework, blurring lines for edginess rather than depth.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[500px] w-full bg-black rounded-2xl overflow-hidden border border-gray-800 group">
                         {/* Abstract representation of "The Algorithm" */}
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black"></div>
                         <div className="absolute inset-0 opacity-30 font-mono text-[10px] text-red-500 p-4 overflow-hidden leading-none select-none">
                            {Array(1000).fill("ROI_OPTIMIZED ").join("")}
                         </div>
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-48 h-48 border border-red-500/30 rounded-full flex items-center justify-center animate-pulse">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-red-500 mb-2">0.0%</div>
                                    <div className="text-xs font-script uppercase text-red-400">Human Soul Detected</div>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>

                {/* The Solution / 4 Pillars */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold mb-4">The <span className="text-movi-green">North Star</span> Pillars</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            To prevent MoviAI from succumbing to the same economic pressures, we embed ethical evaluation directly into our DAO funding mechanism. Every project is judged on four immutable pillars.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <PillarCard 
                            icon={<Zap size={32} />}
                            title="Inspiration & The Heroic Journey"
                            question="Does this story model behavior worth emulating?"
                            desc="Heroes must demonstrate moral courage, not just physical power. Victory should come through virtue. We want audiences to leave wanting to be braver."
                            color="text-movi-gold"
                            borderColor="border-movi-gold/30"
                        />
                        <PillarCard 
                            icon={<Heart size={32} />}
                            title="Love & Human Connection"
                            question="Is connection essential and transformative?"
                            desc="We celebrate love that requires sacrifice and vulnerability, not transactional romance. Relationships should be the point, not the subplot."
                            color="text-movi-purple"
                            borderColor="border-movi-purple/30"
                        />
                        <PillarCard 
                            icon={<Shield size={32} />}
                            title="Moral Complexity & Ethical Struggle"
                            question="Does the story wrestle with right and wrong?"
                            desc="We avoid easy answers. Characters must face dilemmas where even the right choice has costs. We reject nihilism and 'evil for evil's sake'."
                            color="text-blue-400"
                            borderColor="border-blue-400/30"
                        />
                        <PillarCard 
                            icon={<Lightbulb size={32} />}
                            title="Hope & The Human Spirit"
                            question="Does it affirm that struggle has meaning?"
                            desc="Even in darkness, we look for resilience. Stories should offer a counter-narrative to cynicism: that individual action matters and tomorrow can be better."
                            color="text-movi-green"
                            borderColor="border-movi-green/30"
                        />
                    </div>
                </div>

                {/* Interactive Evaluator Section */}
                <div className="bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-movi-purple/20 blur-3xl rounded-full pointer-events-none"></div>
                    
                    <div className="relative z-10 text-center mb-12">
                        <h2 className="text-3xl font-display font-bold mb-4">Test The System</h2>
                        <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">Interactive Protocol Demo</p>
                    </div>

                    <NorthStarEvaluator />
                </div>

                {/* Footer Quote */}
                <div className="mt-32 text-center border-t border-white/10 pt-16">
                    <p className="text-2xl md:text-4xl font-display font-bold text-white mb-8">
                        "What’s good for culture is good for the <span className="text-movi-green">economy</span>."
                    </p>
                    <button 
                        onClick={onBack} 
                        className="px-8 py-3 border border-white/30 hover:bg-white hover:text-black text-white transition-all font-bold uppercase tracking-widest text-sm"
                    >
                        Return to Studio
                    </button>
                </div>

            </div>
        </div>
    );
};

const PillarCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    question: string;
    desc: string;
    color: string;
    borderColor: string;
}> = ({ icon, title, question, desc, color, borderColor }) => {
    return (
        <div className={`bg-black/50 border ${borderColor} p-8 rounded-xl hover:bg-white/5 transition-colors group`}>
            <div className={`${color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2 uppercase">{title}</h3>
            <p className={`font-script text-xs font-bold ${color} mb-4 uppercase tracking-wide`}>
                {question}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
                {desc}
            </p>
        </div>
    );
};

export default Vision;