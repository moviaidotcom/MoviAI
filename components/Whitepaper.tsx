import React from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

interface WhitepaperProps {
    onBack: () => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode; id?: string }> = ({ title, children, id }) => (
    <div className="mb-16 scroll-mt-24" id={id}>
        <h2 className="text-3xl font-display font-bold mb-6 text-white border-b border-white/10 pb-4 flex items-baseline gap-3">
            {title}
        </h2>
        <div className="text-gray-300 leading-relaxed space-y-4">
            {children}
        </div>
    </div>
);

const Subsection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8 pl-4 border-l border-movi-green/30">
        <h3 className="text-xl font-bold mb-3 text-movi-green font-display tracking-wide">{title}</h3>
        <div className="space-y-3">{children}</div>
    </div>
);

const Whitepaper: React.FC<WhitepaperProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-movi-purple selection:text-white relative">
            {/* Lighting */}
            <div className="stage-light" style={{ opacity: 0.15, width: '100vw' }}></div>

            {/* Header */}
            <div className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-lg border-b border-white/10 z-50">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button 
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white text-black rounded flex items-center justify-center font-bold text-xs">
                            <FileText size={14} />
                        </div>
                        <span className="font-display font-bold tracking-tight uppercase">Protocol Script</span>
                    </div>
                    <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-colors uppercase tracking-wider font-display">
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block px-3 py-1 mb-4 border border-movi-green/50 text-movi-green text-xs font-bold uppercase tracking-[0.2em] font-script">
                        Confidential // V1.0
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-tighter">MoviAI <span className="text-gray-700">Docs</span></h1>
                    <p className="text-2xl text-gray-400 font-light italic font-serif">"Don't just watch the story. Own it. Remix it."</p>
                </div>

                <div className="p-8 bg-surface/50 border border-white/10 rounded-sm mb-16">
                    <h3 className="font-bold text-sm mb-6 text-gray-500 font-script uppercase tracking-widest">Table of Contents</h3>
                    <div className="grid md:grid-cols-2 gap-y-3 gap-x-8 text-sm text-gray-300 font-mono">
                        <a href="#exec-summary" className="hover:text-movi-green transition-colors flex justify-between"><span>1. Executive Summary</span> <span>01</span></a>
                        <a href="#lost-north-star" className="hover:text-movi-green transition-colors flex justify-between"><span>2. The Lost North Star</span> <span>03</span></a>
                        <a href="#market-analysis" className="hover:text-movi-green transition-colors flex justify-between"><span>3. Market Analysis</span> <span>08</span></a>
                        <a href="#product-arch" className="hover:text-movi-green transition-colors flex justify-between"><span>4. Product Architecture</span> <span>12</span></a>
                        <a href="#revenue" className="hover:text-movi-green transition-colors flex justify-between"><span>5. Revenue Model</span> <span>15</span></a>
                        <a href="#gtm" className="hover:text-movi-green transition-colors flex justify-between"><span>6. Go-To-Market</span> <span>18</span></a>
                        <a href="#financials" className="hover:text-movi-green transition-colors flex justify-between"><span>7. Financial Projections</span> <span>22</span></a>
                        <a href="#team" className="hover:text-movi-green transition-colors flex justify-between"><span>8. Team Requirements</span> <span>25</span></a>
                    </div>
                </div>

                <Section title="1. Executive Summary" id="exec-summary">
                    <p>
                        MoviAI is a decentralized entertainment platform that fundamentally reimagines content creation, distribution, and ownership by addressing Hollywood’s current crisis: franchise fatigue, risk aversion, streamflation, and labor exploitation. By combining Web3 infrastructure, generative AI, blockchain-based royalties, and community governance, MoviAI transforms passive audiences into active co-creators, investors, and rights holders.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-red-900/10 border border-red-900/30 p-6 rounded-xl">
                            <h4 className="font-bold text-red-400 mb-3 font-display uppercase tracking-wide">The Problem</h4>
                            <p className="text-sm leading-relaxed">Traditional Hollywood suffers from creative bankruptcy (endless sequels/reboots), economic inefficiency (studios gatekeep funding while talent goes unpaid), and audience alienation (subscription fatigue, cancelled shows, no creative input).</p>
                        </div>
                        <div className="bg-movi-green/10 border border-movi-green/30 p-6 rounded-xl">
                            <h4 className="font-bold text-movi-green mb-3 font-display uppercase tracking-wide">The Solution</h4>
                            <p className="text-sm leading-relaxed">MoviAI creates a decentralized creative ecosystem where communities greenlight projects through DAO voting, AI tools democratize production, smart contracts ensure transparent royalties, and viewers can remix content while compensating original creators.</p>
                        </div>
                    </div>
                </Section>

                <Section title="2. The Lost North Star" id="lost-north-star">
                    <p>The decline in the quality and purpose of contemporary Hollywood content stems from a profound philosophical shift: the transition from filmmaking as an art form guided by humanistic ideals to a data-driven business model optimized for maximum financial return. Hollywood effectively lost its North Star—the commitment to inspiring, morally challenging, and elevating the human spirit.</p>
                    
                    <Subsection title="The Shift: Money, Data, and the Death of Risk">
                        <div className="overflow-x-auto border border-white/10 rounded">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/10">
                                        <th className="py-3 pl-4 text-gray-400 font-mono uppercase tracking-wider">Loss of North Star</th>
                                        <th className="py-3 pl-4 text-gray-400 font-mono uppercase tracking-wider">The Money-Driven Replacement</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 font-mono text-xs md:text-sm">
                                    <tr>
                                        <td className="py-4 pl-4 pr-4 font-bold text-white">Loss of Inspiration</td>
                                        <td className="py-4 pl-4 text-gray-400">Optimization for Spectacle (VFX over drama)</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 pl-4 pr-4 font-bold text-white">Loss of Moral Clarity</td>
                                        <td className="py-4 pl-4 text-gray-400">The Ambiguous Anti-Hero (Cynicism over framework)</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 pl-4 pr-4 font-bold text-white">Loss of Human Spirit</td>
                                        <td className="py-4 pl-4 text-gray-400">Algorithmic Storytelling (Data dictates tropes)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Subsection>

                    <Subsection title="Implementing the North Star: DAO Governance">
                        <p>To prevent MoviAI from succumbing to the same economic pressures, we embed ethical evaluation into our funding mechanism. Projects are scored on:</p>
                        <ul className="list-none space-y-2 mt-4 font-mono text-sm">
                            <li className="flex gap-3"><span className="text-movi-green">01.</span> <span>Commercial Viability (40%)</span></li>
                            <li className="flex gap-3"><span className="text-movi-green">02.</span> <span>North Star Alignment (60%)</span></li>
                        </ul>
                    </Subsection>
                </Section>

                <Section title="3. Market Analysis" id="market-analysis">
                    <Subsection title="Industry Pain Points">
                        <ul className="space-y-4">
                            <li className="flex gap-4 items-start">
                                <AlertTriangle className="text-movi-gold shrink-0 mt-1" size={20} />
                                <div>
                                    <strong className="text-white font-display uppercase">Creative Crisis</strong>
                                    <p className="text-sm text-gray-400 mt-1">Studios prioritize "safe" IP over original storytelling.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <AlertTriangle className="text-movi-gold shrink-0 mt-1" size={20} />
                                <div>
                                    <strong className="text-white font-display uppercase">Economic Dysfunction</strong>
                                    <p className="text-sm text-gray-400 mt-1">Streaming prices increased 30%+ while quality declined.</p>
                                </div>
                            </li>
                        </ul>
                    </Subsection>
                </Section>

                <Section title="4. Product Architecture" id="product-arch">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="glass-panel p-6 rounded-sm border-t-2 border-t-movi-purple">
                            <h4 className="text-lg font-bold text-white mb-2 font-display uppercase">1. Greenlight DAO</h4>
                            <p className="text-sm text-gray-400">Decentralized project funding. $MOVI token holders vote on projects.</p>
                        </div>
                        <div className="glass-panel p-6 rounded-sm border-t-2 border-t-movi-green">
                            <h4 className="text-lg font-bold text-white mb-2 font-display uppercase">2. Genesis Engine</h4>
                            <p className="text-sm text-gray-400">Browser-based AI production suite. Scene generation & remix tools.</p>
                        </div>
                        <div className="glass-panel p-6 rounded-sm border-t-2 border-t-blue-500">
                            <h4 className="text-lg font-bold text-white mb-2 font-display uppercase">3. Smart Royalties</h4>
                            <p className="text-sm text-gray-400">Blockchain layer for transparent compensation & instant micropayments.</p>
                        </div>
                        <div className="glass-panel p-6 rounded-sm border-t-2 border-t-pink-500">
                            <h4 className="text-lg font-bold text-white mb-2 font-display uppercase">4. Metaverse Theater</h4>
                            <p className="text-sm text-gray-400">Social viewing experiences. VR/AR watch parties with interactive UI.</p>
                        </div>
                    </div>
                </Section>

                <Section title="5. Revenue Model" id="revenue">
                    <p>MoviAI operates on a transaction economy rather than subscription lock-in.</p>
                    <ul className="space-y-4 mt-6">
                        <li className="flex items-start gap-3 p-4 bg-white/5 rounded">
                            <CheckCircle2 className="text-movi-green mt-1" size={18} />
                            <div>
                                <strong className="text-white font-display uppercase tracking-wide text-sm block mb-1">Platform Transaction Fees (Primary)</strong>
                                <span className="text-sm text-gray-400">1.5% fee on all transactions (DAO voting, content purchases, remixes).</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 p-4 bg-white/5 rounded">
                            <CheckCircle2 className="text-movi-green mt-1" size={18} />
                            <div>
                                <strong className="text-white font-display uppercase tracking-wide text-sm block mb-1">Asset Marketplace Commission</strong>
                                <span className="text-sm text-gray-400">8-12% commission on sales of 3D models, scripts, and sound effects.</span>
                            </div>
                        </li>
                    </ul>
                </Section>

                <Section title="6. Go-To-Market Strategy" id="gtm">
                    <div className="border-l-2 border-gray-700 ml-2 space-y-12 relative">
                         {[
                             { phase: "Phase 1 (Months 1-6)", title: "Community Building", desc: "Partner with indie filmmakers. Launch $MOVI token." },
                             { phase: "Phase 2 (Months 7-12)", title: "Technology Validation", desc: "Release Genesis Engine beta. Produce 3 films." },
                             { phase: "Phase 3 (Year 2)", title: "Mainstream Push", desc: "Mobile apps. Enterprise licensing deals." }
                         ].map((item, i) => (
                             <div key={i} className="relative pl-8">
                                 <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-movi-black border-2 border-movi-purple"></div>
                                 <span className="text-xs font-bold text-movi-purple uppercase tracking-wider font-mono mb-1 block">{item.phase}</span>
                                 <h4 className="text-xl font-bold text-white mb-2 font-display">{item.title}</h4>
                                 <p className="text-sm text-gray-400">{item.desc}</p>
                             </div>
                         ))}
                    </div>
                </Section>

                <Section title="7. Financial Projections" id="financials">
                    <div className="bg-black p-6 rounded-xl border border-white/10 font-mono text-sm">
                        <div className="grid grid-cols-3 gap-4 text-center border-b border-gray-800 pb-4 mb-4 font-bold text-gray-500 uppercase">
                            <div className="text-left pl-4">Metric</div>
                            <div>Year 1</div>
                            <div>Year 3</div>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="text-left pl-4 font-semibold text-white">Users</div>
                                <div>50,000</div>
                                <div>2,000,000</div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="text-left pl-4 font-semibold text-white">Revenue</div>
                                <div>$900k</div>
                                <div>$36M</div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="text-left pl-4 font-semibold text-white">Net Profit</div>
                                <div className="text-red-500">-$1.6M</div>
                                <div className="text-movi-green">+$16M</div>
                            </div>
                        </div>
                    </div>
                </Section>

                 <Section title="8. Team Requirements" id="team">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-5 bg-white/5 border border-white/5 hover:border-movi-purple/50 transition-colors rounded-lg group">
                            <h5 className="font-bold text-white font-display uppercase mb-1 group-hover:text-movi-purple">CEO / Co-Founder</h5>
                            <p className="text-xs text-gray-400 font-mono">Entertainment veteran with Web3 fluency.</p>
                        </div>
                        <div className="p-5 bg-white/5 border border-white/5 hover:border-movi-green/50 transition-colors rounded-lg group">
                            <h5 className="font-bold text-white font-display uppercase mb-1 group-hover:text-movi-green">CTO / Co-Founder</h5>
                            <p className="text-xs text-gray-400 font-mono">Blockchain/AI engineer with product vision.</p>
                        </div>
                    </div>
                </Section>

                <div className="mt-20 pt-10 border-t border-white/10 text-center">
                    <p className="text-2xl font-display font-bold mb-6 text-gray-500">END OF SCRIPT</p>
                    <button onClick={onBack} className="text-white border border-white/30 px-8 py-3 hover:bg-white hover:text-black transition-all font-bold uppercase tracking-widest text-sm">
                        Return to Studio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Whitepaper;