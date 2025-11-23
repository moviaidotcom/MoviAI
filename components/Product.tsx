import React from 'react';
import { ArrowLeft, Cpu, Vote, Coins, Globe, Layers, ShieldCheck, Zap, Repeat, BarChart3, CheckCircle2, Briefcase } from 'lucide-react';

interface ProductProps {
    onBack: () => void;
}

const Product: React.FC<ProductProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-movi-black text-white selection:bg-movi-green selection:text-black relative overflow-x-hidden">
            {/* Cinematic Backgrounds */}
            <div className="film-grain"></div>
            <div className="stage-light" style={{ background: 'radial-gradient(circle at 50% -20%, rgba(20, 241, 149, 0.15), transparent 60%)' }}></div>
            
            {/* Grid overlay for "Blueprint" feel */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10" 
                 style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
            </div>

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
                        <div className="w-8 h-8 bg-white text-black rounded-sm flex items-center justify-center font-bold">
                            <Layers size={18} />
                        </div>
                        <span className="font-display font-bold text-lg tracking-tight uppercase">Architecture</span>
                    </div>
                    <div className="hidden md:block text-xs font-mono text-gray-500 uppercase tracking-widest">
                        System Overview V2.1
                    </div>
                </div>
            </div>

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
                <div className="text-center mb-24 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-movi-green/30 rounded-full bg-movi-green/5 backdrop-blur-md">
                        <div className="w-2 h-2 bg-movi-green rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-movi-green font-script">Live Ecosystem</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-none tracking-tighter uppercase">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">Platform</span>
                    </h1>
                    
                    <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed font-mono">
                        // A fully vertically integrated studio protocol.<br/>
                        Funding. Production. Distribution. Monetization.
                    </p>
                </div>

                {/* The 4 Pillars Schematic Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-32">
                    
                    {/* 1. Greenlight DAO */}
                    <SchematicCard 
                        number="01"
                        title="Greenlight DAO"
                        subtitle="Governance Layer"
                        icon={<Vote size={32} />}
                        description="The decision engine. Token holders stake $MOVI to vote on scripts, cast directors, and approve production budgets. Replaces studio executives with community consensus."
                        features={['Project Curation', 'Treasury Management', 'Executive Producer Credits']}
                        color="text-movi-purple"
                        borderColor="border-movi-purple/50"
                    />

                    {/* 2. Genesis Engine */}
                    <SchematicCard 
                        number="02"
                        title="Genesis Engine"
                        subtitle="Production Layer"
                        icon={<Cpu size={32} />}
                        description="Browser-based generative AI suite. Democratizes high-end production with tools for script analysis, storyboard generation, deepfake licensing, and asset creation."
                        features={['Veo Video Generation', 'Pro Image Studio', 'Neural Script Analysis']}
                        color="text-movi-green"
                        borderColor="border-movi-green/50"
                    />

                    {/* 3. Smart Royalties */}
                    <SchematicCard 
                        number="03"
                        title="Smart Royalties"
                        subtitle="Financial Layer"
                        icon={<Coins size={32} />}
                        description="Blockchain infrastructure that ensures transparent, instant compensation. Every view triggers a micropayment split between creators, actors, and token holders."
                        features={['Instant Payouts', 'Remix Licensing', 'Transparent Ledger']}
                        color="text-movi-gold"
                        borderColor="border-movi-gold/50"
                    />

                    {/* 4. Metaverse Theater */}
                    <SchematicCard 
                        number="04"
                        title="Metaverse Theater"
                        subtitle="Distribution Layer"
                        icon={<Globe size={32} />}
                        description="Social viewing experiences in virtual spaces. Watch parties, interactive overlays, and gamified discovery turn passive viewing into active participation."
                        features={['VR/AR Integration', 'Social Watch Parties', 'Gamified Rewards']}
                        color="text-blue-400"
                        borderColor="border-blue-400/50"
                    />
                </div>

                {/* Revenue Model Section */}
                <div className="bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-3xl p-8 md:p-16 relative overflow-hidden">
                     {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-white/10 rounded-tl-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-white/10 rounded-br-3xl"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 bg-white/5 rounded border border-white/10">
                                <BarChart3 size={32} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-display font-bold uppercase">Revenue Model</h2>
                                <p className="text-sm text-gray-400 font-mono uppercase tracking-wider">Transaction Economy & Enterprise Licensing</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="mt-1"><Zap className="text-movi-green" size={24} /></div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 font-display">Platform Fees (1.5%)</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            A minimal fee on all DAO votes, purchases, and remixes. Low friction encourages high volume.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1"><Repeat className="text-blue-400" size={24} /></div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 font-display">Marketplace Commission (8-12%)</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            Commission on sales of production assets (3D models, scripts, SFX) between users.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1"><Briefcase className="text-movi-gold" size={24} /></div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 font-display">Enterprise Licensing (B2B)</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            SaaS pricing ($5k-$50k/mo) for traditional studios to use the Genesis Engine.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1"><ShieldCheck className="text-movi-purple" size={24} /></div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 font-display">Subscriptions</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            Optional tiers: Base ($4.99/mo) and Creator Pro ($19.99/mo) for enhanced tools.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Visual breakdown */}
                            <div className="bg-black/50 rounded-xl p-8 border border-white/5 font-mono text-sm">
                                <h4 className="text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-800 pb-2">Revenue Split Example ($10 Movie Ticket)</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span>Creator / Cast</span>
                                        <span className="text-movi-green font-bold">70% ($7.00)</span>
                                    </div>
                                    <div className="w-full bg-gray-800 h-1 rounded-full"><div className="w-[70%] bg-movi-green h-full rounded-full"></div></div>
                                    
                                    <div className="flex justify-between items-center">
                                        <span>MoviAI Protocol</span>
                                        <span className="text-white font-bold">25% ($2.50)</span>
                                    </div>
                                    <div className="w-full bg-gray-800 h-1 rounded-full"><div className="w-[25%] bg-white h-full rounded-full"></div></div>

                                    <div className="flex justify-between items-center">
                                        <span>DAO Treasury</span>
                                        <span className="text-movi-purple font-bold">5% ($0.50)</span>
                                    </div>
                                    <div className="w-full bg-gray-800 h-1 rounded-full"><div className="w-[5%] bg-movi-purple h-full rounded-full"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-32 text-center">
                    <button 
                        onClick={onBack}
                        className="px-8 py-3 border border-white/20 hover:border-white hover:bg-white hover:text-black text-white transition-all font-bold uppercase tracking-widest text-sm"
                    >
                        Return to Main
                    </button>
                </div>

            </div>
        </div>
    );
};

const SchematicCard: React.FC<{
    number: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    description: string;
    features: string[];
    color: string;
    borderColor: string;
}> = ({ number, title, subtitle, icon, description, features, color, borderColor }) => {
    return (
        <div className={`bg-black/80 border ${borderColor} p-8 relative group overflow-hidden hover:bg-white/5 transition-colors duration-500`}>
            {/* Tech lines */}
            <div className="absolute top-0 right-0 p-4 font-mono text-xs text-gray-600 opacity-50">SYS_{number}</div>
            <div className={`absolute -bottom-12 -right-12 w-32 h-32 bg-current opacity-5 blur-3xl rounded-full ${color}`}></div>

            <div className={`mb-6 ${color} group-hover:scale-110 transition-transform duration-500`}>
                {icon}
            </div>
            
            <h3 className="text-3xl font-display font-bold text-white mb-1 uppercase">{title}</h3>
            <p className={`font-script text-xs ${color} mb-6 uppercase tracking-widest opacity-80`}>{subtitle}</p>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-8 border-l-2 border-gray-800 pl-4 group-hover:border-gray-600 transition-colors">
                {description}
            </p>

            <div className="space-y-2">
                {features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-gray-300">
                        <CheckCircle2 size={12} className={color} />
                        <span>{feat}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;