import React from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, FileText, Target, ShieldAlert, BarChart3, Users } from 'lucide-react';

interface WhitepaperProps {
    onBack: () => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode; id?: string }> = ({ title, children, id }) => (
    <div className="mb-16 scroll-mt-24" id={id}>
        <h2 className="text-3xl font-display font-bold mb-6 text-white border-b border-white/10 pb-4 flex items-baseline gap-3">
            {title}
        </h2>
        <div className="text-gray-300 leading-relaxed space-y-4 font-light text-lg">
            {children}
        </div>
    </div>
);

const Subsection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8 pl-6 border-l-2 border-movi-green/30">
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
                        <span className="font-display font-bold tracking-tight uppercase">Business Plan</span>
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
                        Confidential // V2.0
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-tighter">MoviAI <span className="text-gray-700">Masterplan</span></h1>
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
                        <a href="#team" className="hover:text-movi-green transition-colors flex justify-between"><span>8. Team & Risk</span> <span>25</span></a>
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
                    <p className="mb-6">
                        The decline in the quality and purpose of contemporary Hollywood content stems from a profound philosophical shift: the transition from filmmaking as an art form guided by humanistic ideals to a data-driven business model optimized for maximum financial return. Hollywood effectively lost its North Star—the commitment to inspiring, morally challenging, and elevating the human spirit.
                    </p>
                    
                    <Subsection title="The Shift: Art to Algorithm">
                        <p>
                            In its earlier eras, mainstream Hollywood maintained a discernible commitment to moral clarity, aspiration, and collective hope. The heroes typically fought for a recognizable good. But with the rise of the Corporate Blockbuster Era, the focus shifted from what content should be (inspiring) to what content will sell (predictable).
                        </p>
                        <div className="mt-4 overflow-x-auto border border-white/10 rounded">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/10">
                                        <th className="py-3 pl-4 text-gray-400 font-mono uppercase tracking-wider">What Was Lost</th>
                                        <th className="py-3 pl-4 text-gray-400 font-mono uppercase tracking-wider">The Replacement</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 font-mono text-xs md:text-sm">
                                    <tr>
                                        <td className="py-4 pl-4 pr-4 font-bold text-white">Inspiration & Hope</td>
                                        <td className="py-4 pl-4 text-gray-400">Optimization for Spectacle (VFX over soul)</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 pl-4 pr-4 font-bold text-white">Moral Clarity</td>
                                        <td className="py-4 pl-4 text-gray-400">The Ambiguous Anti-Hero (Cynicism)</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 pl-4 pr-4 font-bold text-white">Human Spirit</td>
                                        <td className="py-4 pl-4 text-gray-400">Algorithmic Storytelling (Data dictates art)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Subsection>

                    <Subsection title="The Four Pillars of Meaningful Entertainment">
                        <ul className="space-y-4">
                            <li>
                                <strong className="text-white block mb-1">1. Inspiration & The Heroic Journey</strong>
                                <span className="text-gray-400 text-sm">Heroes must model moral courage, not just power. Audiences should leave wanting to be braver.</span>
                            </li>
                            <li>
                                <strong className="text-white block mb-1">2. Love & Human Connection</strong>
                                <span className="text-gray-400 text-sm">Love is a force that redeems and complicates. We reject transactional romance for genuine connection.</span>
                            </li>
                            <li>
                                <strong className="text-white block mb-1">3. Moral Complexity & Ethical Struggle</strong>
                                <span className="text-gray-400 text-sm">Stories must wrestle with right and wrong. Consequences must follow choices.</span>
                            </li>
                            <li>
                                <strong className="text-white block mb-1">4. Hope & The Human Spirit</strong>
                                <span className="text-gray-400 text-sm">Even in darkness, we affirm resilience. Struggle has meaning; tomorrow can be better.</span>
                            </li>
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
                                    <p className="text-sm text-gray-400 mt-1">Studios prioritize "safe" IP over original storytelling. Audiences reject formulaic content.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <AlertTriangle className="text-movi-gold shrink-0 mt-1" size={20} />
                                <div>
                                    <strong className="text-white font-display uppercase">Economic Dysfunction</strong>
                                    <p className="text-sm text-gray-400 mt-1">Streaming prices up 30%+. "Hollywood accounting" prevents creator compensation.</p>
                                </div>
                            </li>
                        </ul>
                    </Subsection>
                    <Subsection title="Market Opportunity">
                        <p className="text-sm">
                            <strong className="text-white">Gen Z/Alpha:</strong> Expect interactive, remixable content.<br/>
                            <strong className="text-white">Indie Creators:</strong> Locked out of traditional gatekeepers.<br/>
                            <strong className="text-white">Market Size:</strong> $500B+ Global Streaming + $250B+ User-Generated Content Economy.
                        </p>
                    </Subsection>
                </Section>

                <Section title="4. Product Architecture" id="product-arch">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="glass-panel p-6 rounded-sm border-t-2 border-t-movi-purple">
                            <h4 className="text-lg font-bold text-white mb-2 font-display uppercase">1. Greenlight DAO</h4>
                            <p className="text-sm text-gray-400">Decentralized project funding. $MOVI token holders vote on projects using the North Star Criteria (60% weight).</p>
                        </div>
                        <div className="glass-panel p-6 rounded-sm border-t-2 border-t-movi-green">
                            <h4 className="text-lg font-bold text-white mb-2 font-display uppercase">2. Genesis Engine</h4>
                            <p className="text-sm text-gray-400">Browser-based AI production suite. Scene generation, remix tools, and digital replica studio with ethical safeguards.</p>
                        </div>
                        <div className="glass-panel p-6 rounded-sm border-t-2 border-t-blue-500">
                            <h4 className="text-lg font-bold text-white mb-2 font-display uppercase">3. Smart Royalties</h4>
                            <p className="text-sm text-gray-400">Blockchain layer for transparent compensation. Automated payments for views, remixes, and asset usage.</p>
                        </div>
                        <div className="glass-panel p-6 rounded-sm border-t-2 border-t-pink-500">
                            <h4 className="text-lg font-bold text-white mb-2 font-display uppercase">4. Metaverse Theater</h4>
                            <p className="text-sm text-gray-400">Social viewing experiences. VR/AR watch parties with interactive UI and gamified rewards.</p>
                        </div>
                    </div>
                </Section>

                <Section title="5. Revenue Model" id="revenue">
                    <p>MoviAI operates on a transaction economy rather than just subscription lock-in.</p>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="p-4 bg-white/5 rounded border border-white/5">
                            <h5 className="font-bold text-movi-green uppercase mb-2">Platform Fees</h5>
                            <p className="text-sm text-gray-400">1.5% fee on all transactions (DAO voting, content purchases, remixes). Low friction encourages volume.</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded border border-white/5">
                            <h5 className="font-bold text-movi-purple uppercase mb-2">Asset Marketplace</h5>
                            <p className="text-sm text-gray-400">8-12% commission on sales of 3D models, sound effects, and scripts.</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded border border-white/5">
                            <h5 className="font-bold text-blue-400 uppercase mb-2">Enterprise Licensing</h5>
                            <p className="text-sm text-gray-400">B2B SaaS licensing of the Genesis Engine to traditional studios ($5k-$50k/month).</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded border border-white/5">
                            <h5 className="font-bold text-white uppercase mb-2">Subscriptions</h5>
                            <p className="text-sm text-gray-400">Hybrid tiers: Free (Ads), Base ($4.99/mo + tokens), Creator Pro ($19.99/mo + full tools).</p>
                        </div>
                    </div>
                </Section>

                <Section title="6. Go-To-Market Strategy" id="gtm">
                    <div className="border-l-2 border-gray-700 ml-2 space-y-12 relative">
                         {[
                             { phase: "Phase 1 (Months 1-6)", title: "Community Building", desc: "Partner with indie filmmakers. Launch $MOVI token. Recruit 10k beta users." },
                             { phase: "Phase 2 (Months 7-12)", title: "Technology Validation", desc: "Release Genesis Engine beta. Produce 3 full-length films. Test smart contracts." },
                             { phase: "Phase 3 (Year 2)", title: "Mainstream Push", desc: "Major marketing campaign. Gaming partnerships (Roblox/Fortnite). Mobile apps with AR." },
                             { phase: "Phase 4 (Year 3+)", title: "Ecosystem Maturity", desc: "VR theater integration. Expansion to music/gaming. International DAOs." }
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
                        <div className="grid grid-cols-4 gap-4 text-center border-b border-gray-800 pb-4 mb-4 font-bold text-gray-500 uppercase">
                            <div className="text-left pl-4">Year</div>
                            <div>Users</div>
                            <div>Revenue</div>
                            <div>Net Profit</div>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-4 gap-4 text-center items-center">
                                <div className="text-left pl-4 font-semibold text-white">Year 1</div>
                                <div>50k</div>
                                <div>$900k</div>
                                <div className="text-red-500">-$1.6M</div>
                            </div>
                            <div className="grid grid-cols-4 gap-4 text-center items-center">
                                <div className="text-left pl-4 font-semibold text-white">Year 2</div>
                                <div>500k</div>
                                <div>$9M</div>
                                <div className="text-movi-green">+$2M</div>
                            </div>
                            <div className="grid grid-cols-4 gap-4 text-center items-center">
                                <div className="text-left pl-4 font-semibold text-white">Year 3</div>
                                <div>2M</div>
                                <div>$36M</div>
                                <div className="text-movi-green">+$16M</div>
                            </div>
                        </div>
                    </div>
                </Section>

                <Section title="8. Team & Risk Analysis" id="team">
                    <Subsection title="Key Risks & Mitigation">
                        <ul className="space-y-4">
                            <li className="flex gap-4 items-start">
                                <ShieldAlert className="text-movi-purple shrink-0 mt-1" size={20} />
                                <div>
                                    <strong className="text-white font-display uppercase text-sm">Technical Risk</strong>
                                    <p className="text-sm text-gray-400">AI quality issues. Mitigation: Hybrid model (Human+AI), "Human-First" badge system.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <ShieldAlert className="text-movi-purple shrink-0 mt-1" size={20} />
                                <div>
                                    <strong className="text-white font-display uppercase text-sm">Regulatory Risk</strong>
                                    <p className="text-sm text-gray-400">Crypto regulations. Mitigation: Dual-token model, legal structure in crypto-friendly jurisdiction.</p>
                                </div>
                            </li>
                        </ul>
                    </Subsection>
                    
                    <div className="mt-8 grid md:grid-cols-2 gap-4">
                        <div className="p-5 bg-white/5 border border-white/5 rounded-lg">
                            <h5 className="font-bold text-white font-display uppercase mb-1">Founding Team</h5>
                            <p className="text-xs text-gray-400 font-mono">CEO (Web3 Vet), CTO (AI/Blockchain), CCO (Filmmaker), Head of Community.</p>
                        </div>
                        <div className="p-5 bg-white/5 border border-white/5 rounded-lg">
                            <h5 className="font-bold text-white font-display uppercase mb-1">Success Metrics</h5>
                            <p className="text-xs text-gray-400 font-mono">MAU, Remix Rate, Creator Earnings, DAO Participation.</p>
                        </div>
                    </div>
                </Section>

                <div className="mt-20 pt-10 border-t border-white/10 text-center">
                    <p className="text-2xl font-display font-bold mb-6 text-gray-500">END OF PLAN</p>
                    <button onClick={onBack} className="text-white border border-white/30 px-8 py-3 hover:bg-white hover:text-black transition-all font-bold uppercase tracking-widest text-sm">
                        Return to Studio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Whitepaper;