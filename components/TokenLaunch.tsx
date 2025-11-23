import React, { useState } from 'react';
import { ArrowLeft, Wallet, ShieldCheck, Zap, Globe, Copy, Check } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface TokenLaunchProps {
    onBack: () => void;
}

const TOKENOMICS_DATA = [
    { name: 'Community DAO', value: 40, color: '#14F195' }, // Movi Green
    { name: 'Team & Founders', value: 20, color: '#9945FF' }, // Movi Purple
    { name: 'Treasury Reserve', value: 20, color: '#ffffff' }, // White
    { name: 'Liquidity Pool', value: 10, color: '#666666' }, // Grey
    { name: 'Marketing', value: 10, color: '#333333' }, // Dark Grey
];

const TokenLaunch: React.FC<TokenLaunchProps> = ({ onBack }) => {
    const [amount, setAmount] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const [connected, setConnected] = useState(false);

    const MOVI_PRICE = 0.08; // $0.08 per token
    
    const moviAmount = amount ? (parseFloat(amount) / MOVI_PRICE).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0';

    const handleCopy = () => {
        navigator.clipboard.writeText("7xKXtg2CSjqSuQZ...982x"); // Fake contract address
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-movi-green selection:text-black pt-24 pb-12 relative overflow-hidden">
            {/* Cinematic Lighting */}
            <div className="stage-light" style={{ background: 'radial-gradient(ellipse at top, rgba(20, 241, 149, 0.1), transparent 70%)' }}></div>

            {/* Header / Nav */}
            <div className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-lg border-b border-white/10 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button 
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-movi-green to-movi-purple rounded flex items-center justify-center font-bold text-black text-xs">M</div>
                        <span className="font-display font-bold text-lg tracking-tight">Presale</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="hidden md:block text-sm text-gray-400 font-script">PHASE 1 ENDS: <span className="text-movi-green">04:12:30:05</span></span>
                        <button 
                            onClick={() => setConnected(!connected)}
                            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${connected ? 'bg-movi-green/20 border-movi-green text-movi-green' : 'bg-white text-black border-white hover:bg-gray-200'}`}
                        >
                            {connected ? '0x82...39a' : 'Connect Wallet'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start mt-8 relative z-10">
                
                {/* Left Column: Info & Story */}
                <div className="space-y-12">
                    <div className="animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-movi-purple/30 bg-movi-purple/10 text-movi-purple text-xs font-bold uppercase tracking-widest mb-6 font-script">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-movi-purple opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-movi-purple"></span>
                            </span>
                            Live Production
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                            Invest in the <br />
                            <span className="gradient-text">Future of Cinema</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed max-w-xl font-light">
                            $MOVI is more than a token. It's a producer credit. By holding $MOVI, you become a studio executive with the power to greenlight the next generation of blockbusters.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="glass-panel p-4 rounded-xl border-l-2 border-movi-green">
                            <p className="text-gray-400 text-xs uppercase mb-1 font-script">Current Price</p>
                            <p className="text-2xl font-display font-bold text-white">$0.08</p>
                        </div>
                        <div className="glass-panel p-4 rounded-xl border-l-2 border-movi-purple">
                            <p className="text-gray-400 text-xs uppercase mb-1 font-script">Listing Price</p>
                            <p className="text-2xl font-display font-bold text-white">$0.15</p>
                        </div>
                        <div className="glass-panel p-4 rounded-xl border-l-2 border-white">
                            <p className="text-gray-400 text-xs uppercase mb-1 font-script">Total Raised</p>
                            <p className="text-2xl font-display font-bold text-white">$2.4M</p>
                        </div>
                        <div className="glass-panel p-4 rounded-xl border-l-2 border-gray-500">
                            <p className="text-gray-400 text-xs uppercase mb-1 font-script">Producers</p>
                            <p className="text-2xl font-display font-bold text-white">4,281</p>
                        </div>
                    </div>

                    {/* Contract Address */}
                    <div className="glass-panel p-4 rounded-xl flex justify-between items-center group cursor-pointer" onClick={handleCopy}>
                        <div>
                            <p className="text-xs text-gray-500 uppercase mb-1 font-script">Solana Contract Address</p>
                            <p className="font-mono text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">7xKXtg2CSjqSuQZ...982x</p>
                        </div>
                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            {copied ? <Check size={20} className="text-movi-green" /> : <Copy size={20} className="text-gray-400" />}
                        </div>
                    </div>

                    {/* Utility Cards */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-display font-bold mb-4">Token Utility</h3>
                        <div className="grid gap-4">
                            <div className="flex gap-4 items-start">
                                <div className="p-3 bg-movi-green/10 rounded-lg text-movi-green"><ShieldCheck size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-lg">Governance Power</h4>
                                    <p className="text-sm text-gray-400">Greenlight projects. Only $MOVI holders can vote on which scripts get funded by the treasury.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="p-3 bg-movi-purple/10 rounded-lg text-movi-purple"><Zap size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-lg">AI Tool Access</h4>
                                    <p className="text-sm text-gray-400">Burn $MOVI to access premium Genesis Engine features like 4K rendering and deepfake licensing.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><Globe size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-lg">Revenue Sharing</h4>
                                    <p className="text-sm text-gray-400">Stake $MOVI to earn a share of platform transaction fees and asset marketplace commissions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Swap Card & Tokenomics */}
                <div className="space-y-8 relative">
                    {/* Glowing effect behind card */}
                    <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-radial from-movi-green/20 to-transparent blur-3xl -z-10 opacity-50 pointer-events-none"></div>

                    {/* Swap Card */}
                    <div className="bg-movi-dark border border-gray-700 rounded-sm p-6 shadow-2xl relative">
                         {/* Tech corners */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-movi-green"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-movi-green"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-movi-green"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-movi-green"></div>

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold font-display uppercase tracking-wider">Acquire $MOVI</h3>
                            <div className="bg-green-900/30 text-green-400 text-xs px-2 py-1 font-bold border border-green-900/50 font-script uppercase">
                                Presale Live
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-xs mb-2 font-script">
                                <span className="text-gray-400">RAISED: $2,450,000</span>
                                <span className="text-white font-bold">GOAL: $5,000,000</span>
                            </div>
                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-movi-green to-movi-purple w-[49%] relative">
                                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/80 blur-[1px] animate-pulse"></div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-right font-script">49% COMPLETE</p>
                        </div>

                        {/* Input Fields */}
                        <div className="space-y-4 mb-6">
                            <div className="bg-black p-4 border border-gray-800 focus-within:border-movi-green transition-colors">
                                <div className="flex justify-between mb-2">
                                    <label className="text-xs text-gray-400 uppercase font-bold font-script">You Pay</label>
                                    <span className="text-xs text-gray-500 font-script">BAL: {connected ? '2,450.00' : '0'} USDC</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <input 
                                        type="number" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="bg-transparent text-2xl font-bold text-white focus:outline-none w-full placeholder-gray-600 font-mono"
                                    />
                                    <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-sm">
                                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px]">$</div>
                                        <span className="font-bold">USDC</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center -my-2 z-10 relative">
                                <div className="bg-gray-800 p-2 rounded-full border border-black text-gray-400 hover:text-movi-green cursor-pointer transition-colors">
                                    <ArrowLeft className="rotate-[-90deg]" size={16} />
                                </div>
                            </div>

                            <div className="bg-black p-4 border border-gray-800">
                                <div className="flex justify-between mb-2">
                                    <label className="text-xs text-gray-400 uppercase font-bold font-script">You Receive</label>
                                    <span className="text-xs text-movi-green font-script">RATE: 1 USDC = 12.5 MOVI</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <input 
                                        type="text" 
                                        value={moviAmount}
                                        readOnly
                                        className="bg-transparent text-2xl font-bold text-white focus:outline-none w-full placeholder-gray-600 cursor-default font-mono"
                                    />
                                    <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-sm">
                                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-movi-green to-movi-purple flex items-center justify-center text-[10px] font-bold text-black">M</div>
                                        <span className="font-bold">MOVI</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button 
                            className="w-full py-4 bg-white hover:bg-movi-green text-black font-bold text-lg transition-colors flex items-center justify-center gap-2 uppercase tracking-widest"
                            style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 80%, 95% 100%, 0 100%, 0 20%)' }}
                            onClick={() => setConnected(true)}
                        >
                            <Wallet size={20} />
                            {connected ? 'Confirm Transaction' : 'Connect Wallet'}
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-4 font-script">
                            SECURED BY SOLANA PROTOCOL
                        </p>
                    </div>

                    {/* Tokenomics Chart */}
                    <div className="glass-panel p-6 rounded-xl">
                        <h3 className="text-xl font-bold font-display mb-6 uppercase tracking-wider">Allocation</h3>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={TOKENOMICS_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {TOKENOMICS_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '0px', fontFamily: 'Courier Prime' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs mt-4 font-script">
                            {TOKENOMICS_DATA.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-gray-300">{item.name} ({item.value}%)</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TokenLaunch;