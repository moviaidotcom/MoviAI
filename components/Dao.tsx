
import React, { useState } from 'react';
import { ArrowLeft, Vote, Wallet, Users, Film, CheckCircle2, XCircle, Clock, FileText, UserPlus, Check, AlertTriangle, Loader2, Plus, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DaoProps {
    onBack: () => void;
}

interface Proposal {
    id: string;
    title: string;
    slugline: string;
    category: string;
    status: string;
    votesFor: number;
    votesAgainst: number;
    timeLeft: string;
    description: string;
    tags: string[];
}

const INITIAL_PROPOSALS: Proposal[] = [
    {
        id: "EXT. PROJECT #042",
        title: "The Last Analog",
        slugline: "SCI-FI / NOIR • FEATURE FILM",
        category: "Greenlight",
        status: "Active",
        votesFor: 1250000,
        votesAgainst: 45000,
        timeLeft: "2 days",
        description: "A sci-fi noir about the last human film projectionist in a world of AI content. Requesting $150k budget from treasury.",
        tags: ["High Concept", "Human Spirit Badge"]
    },
    {
        id: "INT. PROTOCOL #041",
        title: "Remix Fee Adjustment",
        slugline: "ECONOMICS • UPDATE",
        category: "Governance",
        status: "Active",
        votesFor: 890000,
        votesAgainst: 920000,
        timeLeft: "5 hours",
        description: "Proposal to lower the platform transaction fee for remixes from 1.5% to 1.0% to stimulate higher volume of user-generated content.",
        tags: ["Economy", "Platform"]
    },
    {
        id: "INT. TREASURY #040",
        title: "Indie Creator Fund Q3",
        slugline: "GRANT • ALLOCATION",
        category: "Treasury",
        status: "Passed",
        votesFor: 3500000,
        votesAgainst: 12000,
        timeLeft: "Ended",
        description: "Allocate 500,000 USDC to the quarterly micro-grant program for underrepresented storytellers.",
        tags: ["Community"]
    }
];

const TREASURY_DATA = [
    { name: 'USDC', value: 4500000, color: '#2775CA' },
    { name: 'MOVI', value: 2500000, color: '#14F195' },
    { name: 'SOL', value: 1200000, color: '#9945FF' }
];

const Dao: React.FC<DaoProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'proposals' | 'treasury'>('proposals');
    const [proposals, setProposals] = useState<Proposal[]>(INITIAL_PROPOSALS);
    const [isConnected, setIsConnected] = useState(false);
    const [votingPower, setVotingPower] = useState(0);
    const [userVotes, setUserVotes] = useState<Record<string, 'for' | 'against'>>({});
    
    // Delegation State
    const [showDelegateModal, setShowDelegateModal] = useState(false);
    const [delegateAddress, setDelegateAddress] = useState('');
    const [delegation, setDelegation] = useState<{address: string, active: boolean} | null>(null);

    // Submission State
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submission, setSubmission] = useState({
        title: '',
        slugline: '',
        description: '',
        budget: '',
        tags: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleConnect = () => {
        if (!isConnected) {
            setIsConnected(true);
            // Simulate fetching VP
            setVotingPower(Math.floor(Math.random() * 50000) + 1000);
        } else {
            setIsConnected(false);
            setVotingPower(0);
            setDelegation(null);
            setUserVotes({});
        }
    };

    const handleDelegate = () => {
        if (delegateAddress) {
            setDelegation({ address: delegateAddress, active: true });
            setShowDelegateModal(false);
            setDelegateAddress('');
        }
    };

    const handleVote = (proposalId: string, side: 'for' | 'against') => {
        if (!isConnected) {
            alert("Please connect your wallet to vote.");
            return;
        }
        
        if (delegation?.active) {
            alert("You have delegated your voting power. Revoke delegation to vote manually.");
            return;
        }

        if (userVotes[proposalId]) return; // Already voted

        // Update proposals state
        setProposals(currentProposals => 
            currentProposals.map(p => {
                if (p.id === proposalId) {
                    return {
                        ...p,
                        votesFor: side === 'for' ? p.votesFor + votingPower : p.votesFor,
                        votesAgainst: side === 'against' ? p.votesAgainst + votingPower : p.votesAgainst
                    };
                }
                return p;
            })
        );

        // Record user vote
        setUserVotes(prev => ({
            ...prev,
            [proposalId]: side
        }));
    };

    const handleInputChange = (field: string, value: string) => {
        setSubmission(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!submission.title.trim()) newErrors.title = "Title is required";
        if (!submission.slugline.trim()) newErrors.slugline = "Slugline/Genre is required";
        if (!submission.description.trim()) newErrors.description = "Synopsis is required";
        if (!submission.budget || isNaN(Number(submission.budget)) || Number(submission.budget) <= 0) newErrors.budget = "Valid budget required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProposalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        // Simulate API delay
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            // Reset after delay
            setTimeout(() => {
                setSubmitSuccess(false);
                setShowSubmitModal(false);
                setSubmission({ title: '', slugline: '', description: '', budget: '', tags: '' });
                
                // Add new proposal to list
                setProposals(prev => [{
                    id: `EXT. PROJECT #${Math.floor(Math.random() * 1000)}`,
                    title: submission.title,
                    slugline: submission.slugline,
                    category: "Greenlight",
                    status: "Active",
                    votesFor: 0,
                    votesAgainst: 0,
                    timeLeft: "7 days",
                    description: submission.description,
                    tags: submission.tags.split(',').map(t => t.trim())
                }, ...prev]);
            }, 2000);
        }, 1500);
    };

    const openSubmitModal = () => {
        if (!isConnected) {
            alert("Please connect your wallet to submit a proposal.");
            return;
        }
        setShowSubmitModal(true);
    };

    return (
        <div className="min-h-screen bg-movi-black text-white pt-24 pb-12 relative overflow-hidden">
            {/* Cinematic Background */}
            <div className="stage-light" style={{ opacity: 0.3 }}></div>
            
            {/* Delegation Modal */}
            {showDelegateModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-movi-dark border border-gray-700 p-8 rounded-xl max-w-md w-full relative shadow-[0_0_50px_rgba(153,69,255,0.2)]">
                        <h3 className="text-2xl font-display font-bold mb-2 text-white">Delegate Voting Power</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Assign your <span className="text-white font-bold">{votingPower.toLocaleString()} VP</span> to another address. 
                            You retain ownership of your tokens, but they will vote on your behalf.
                        </p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-script text-gray-500 uppercase block mb-2">Delegate Address (SOL)</label>
                                <input 
                                    type="text" 
                                    value={delegateAddress}
                                    onChange={(e) => setDelegateAddress(e.target.value)}
                                    className="w-full bg-black border border-gray-800 p-3 text-white focus:border-movi-purple focus:outline-none font-mono text-sm rounded placeholder-gray-700 transition-colors"
                                    placeholder="Ex: 7xKXtg..."
                                    autoFocus
                                />
                            </div>
                            
                            <div className="flex gap-3 mt-6">
                                <button 
                                    onClick={() => setShowDelegateModal(false)}
                                    className="flex-1 py-3 border border-gray-700 hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-widest transition-colors rounded-sm"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleDelegate}
                                    disabled={!delegateAddress}
                                    className="flex-1 py-3 bg-movi-purple hover:bg-white hover:text-black text-white font-bold text-xs uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm shadow-[0_0_20px_rgba(153,69,255,0.3)] hover:shadow-[0_0_30px_rgba(153,69,255,0.5)]"
                                >
                                    Confirm Delegation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Proposal Submission Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in p-4">
                    <div className="bg-movi-dark border border-white/10 p-0 rounded-xl max-w-2xl w-full relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
                             <div>
                                <h3 className="text-2xl font-display font-bold text-white">Submit Script</h3>
                                <p className="text-xs font-script text-gray-500 uppercase tracking-widest mt-1">Project Greenlight Protocol</p>
                             </div>
                             <button onClick={() => setShowSubmitModal(false)} className="text-gray-500 hover:text-white">
                                <X size={24} />
                             </button>
                        </div>

                        {/* Form Content */}
                        {!submitSuccess ? (
                            <form onSubmit={handleProposalSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                                
                                {/* Title & Slugline */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs font-script text-gray-500 uppercase block mb-2">Title</label>
                                        <input 
                                            type="text" 
                                            value={submission.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            className={`w-full bg-black border ${errors.title ? 'border-red-500' : 'border-gray-800'} p-3 text-white focus:border-movi-green focus:outline-none font-display font-bold text-lg rounded transition-colors`}
                                            placeholder="ENTER TITLE"
                                        />
                                        {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title}</span>}
                                    </div>
                                    <div>
                                        <label className="text-xs font-script text-gray-500 uppercase block mb-2">Slugline / Genre</label>
                                        <input 
                                            type="text" 
                                            value={submission.slugline}
                                            onChange={(e) => handleInputChange('slugline', e.target.value)}
                                            className={`w-full bg-black border ${errors.slugline ? 'border-red-500' : 'border-gray-800'} p-3 text-white focus:border-movi-green focus:outline-none font-script text-sm rounded transition-colors`}
                                            placeholder="SCI-FI / THRILLER"
                                        />
                                        {errors.slugline && <span className="text-red-500 text-xs mt-1">{errors.slugline}</span>}
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="text-xs font-script text-gray-500 uppercase block mb-2">Logline / Synopsis</label>
                                    <textarea 
                                        value={submission.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        className={`w-full bg-black border ${errors.description ? 'border-red-500' : 'border-gray-800'} p-4 text-gray-300 focus:border-movi-green focus:outline-none font-script text-sm rounded transition-colors h-32 resize-none leading-relaxed`}
                                        placeholder="Fade in on..."
                                    />
                                    {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description}</span>}
                                </div>

                                {/* Budget & Tags */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs font-script text-gray-500 uppercase block mb-2">Requested Budget (USDC)</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                            <input 
                                                type="number" 
                                                value={submission.budget}
                                                onChange={(e) => handleInputChange('budget', e.target.value)}
                                                className={`w-full bg-black border ${errors.budget ? 'border-red-500' : 'border-gray-800'} p-3 pl-8 text-white focus:border-movi-green focus:outline-none font-mono text-sm rounded transition-colors`}
                                                placeholder="0.00"
                                            />
                                        </div>
                                        {errors.budget && <span className="text-red-500 text-xs mt-1">{errors.budget}</span>}
                                    </div>
                                    <div>
                                        <label className="text-xs font-script text-gray-500 uppercase block mb-2">Tags (Comma Separated)</label>
                                        <input 
                                            type="text" 
                                            value={submission.tags}
                                            onChange={(e) => handleInputChange('tags', e.target.value)}
                                            className="w-full bg-black border border-gray-800 p-3 text-white focus:border-movi-green focus:outline-none font-script text-sm rounded transition-colors"
                                            placeholder="Indie, Short, Animation"
                                        />
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="pt-6 border-t border-white/10 flex gap-4">
                                     <button 
                                        type="button"
                                        onClick={() => setShowSubmitModal(false)}
                                        className="flex-1 py-3 border border-gray-700 hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-widest transition-colors rounded-sm font-display"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 py-3 bg-movi-green hover:bg-white hover:text-black text-black font-bold text-xs uppercase tracking-widest transition-colors rounded-sm flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <><FileText size={16} /> Submit Proposal</>}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="p-12 flex flex-col items-center justify-center text-center h-96 animate-in zoom-in duration-300">
                                <div className="w-20 h-20 bg-movi-green/20 rounded-full flex items-center justify-center mb-6 text-movi-green border border-movi-green">
                                    <Check size={40} />
                                </div>
                                <h3 className="text-3xl font-display font-bold text-white mb-2">Submission Received</h3>
                                <p className="text-gray-400 max-w-sm font-script text-sm">
                                    Your script has been added to the queue. It will appear on the dashboard once the initial automated review is complete.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Header / Nav */}
            <div className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-md border-b border-white/10 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button 
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group uppercase tracking-wider font-display"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Studio
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white text-black rounded-sm flex items-center justify-center font-bold">
                            <Film size={16} />
                        </div>
                        <span className="font-display font-bold text-lg tracking-tight uppercase">Production DAO</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Voting Power Indicator in Navbar */}
                        {isConnected && (
                            <div className="hidden md:block text-right mr-2 animate-in fade-in">
                                <p className="text-[10px] text-gray-400 font-script uppercase tracking-wider">Voting Power</p>
                                <div className="flex items-center justify-end gap-2">
                                    <p className="text-movi-purple font-bold font-display">{votingPower.toLocaleString()} VP</p>
                                    {delegation?.active && (
                                        <span className="px-1.5 py-0.5 bg-red-500/20 border border-red-500 text-[10px] text-red-500 rounded font-bold uppercase">Delegated</span>
                                    )}
                                </div>
                            </div>
                        )}

                        <button 
                            onClick={handleConnect}
                            className={`px-6 py-2 rounded-sm text-sm font-bold transition-colors flex items-center gap-2 uppercase tracking-wider border ${isConnected ? 'bg-movi-green/10 border-movi-green text-movi-green' : 'bg-movi-green text-black border-movi-green hover:bg-white'}`}
                            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)' }}
                        >
                            <Wallet size={14} />
                            {isConnected ? '0x82...39a' : 'Connect'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Dashboard Header */}
                <div className="mb-12 border-b border-white/10 pb-8">
                    <h1 className="text-4xl font-display font-bold mb-2">Executive Dashboard</h1>
                    <p className="font-script text-gray-500 text-xs uppercase tracking-widest">Governance Protocol v1.2 // Solana Mainnet</p>
                </div>

                {/* Hero Stats - Technical Look */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-800 border border-gray-800 rounded-xl overflow-hidden mb-12">
                    <div className="bg-movi-dark p-8 relative group hover:bg-surface transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-gray-500 font-script text-xs uppercase tracking-widest">Treasury</p>
                            <Wallet size={20} className="text-movi-green opacity-50" />
                        </div>
                        <h2 className="text-4xl font-display font-bold text-white group-hover:text-movi-green transition-colors">$8.2M</h2>
                        <p className="text-gray-500 text-xs font-script mt-2">USDC/MOVI/SOL</p>
                    </div>
                    <div className="bg-movi-dark p-8 relative group hover:bg-surface transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-gray-500 font-script text-xs uppercase tracking-widest">Production Queue</p>
                            <Vote size={20} className="text-movi-purple opacity-50" />
                        </div>
                        <h2 className="text-4xl font-display font-bold text-white group-hover:text-movi-purple transition-colors">{proposals.length}</h2>
                        <p className="text-gray-500 text-xs font-script mt-2">Scripts in Review</p>
                    </div>
                    <div className="bg-movi-dark p-8 relative group hover:bg-surface transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-gray-500 font-script text-xs uppercase tracking-widest">Producers</p>
                            <Users size={20} className="text-blue-400 opacity-50" />
                        </div>
                        <h2 className="text-4xl font-display font-bold text-white group-hover:text-blue-400 transition-colors">12.4k</h2>
                        <p className="text-gray-500 text-xs font-script mt-2">Active Voters</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Tabs */}
                        <div className="flex gap-8 border-b border-gray-800">
                            <button 
                                onClick={() => setActiveTab('proposals')}
                                className={`pb-4 font-display font-bold text-sm tracking-widest uppercase transition-colors border-b-2 ${activeTab === 'proposals' ? 'text-white border-movi-green' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
                            >
                                Screenplays & Votes
                            </button>
                            <button 
                                onClick={() => setActiveTab('treasury')}
                                className={`pb-4 font-display font-bold text-sm tracking-widest uppercase transition-colors border-b-2 ${activeTab === 'treasury' ? 'text-white border-movi-purple' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
                            >
                                Budget Analytics
                            </button>
                        </div>

                        {/* Proposal List - Script Style */}
                        {activeTab === 'proposals' && (
                            <div className="space-y-6">
                                {proposals.map((prop) => (
                                    <div key={prop.id} className="bg-surface border-l-4 border-l-gray-700 hover:border-l-movi-green transition-all duration-300 p-6 rounded-r-xl group relative">
                                        
                                        {/* Header */}
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-script text-gray-500 text-sm font-bold tracking-tight">{prop.id}</span>
                                            <div className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest border ${prop.status === 'Active' ? 'text-movi-green border-movi-green' : 'text-gray-500 border-gray-600'}`}>
                                                {prop.status}
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-movi-green transition-colors">{prop.title}</h3>
                                        <p className="text-xs font-script text-gray-400 uppercase tracking-wider mb-4">{prop.slugline}</p>
                                        
                                        <p className="text-gray-300 font-light leading-relaxed mb-6 pl-4 border-l border-gray-700 font-script text-sm">
                                            "{prop.description}"
                                        </p>

                                        {/* Voting Stats */}
                                        <div className="bg-black/30 p-4 rounded-lg mb-4">
                                            <div className="flex justify-between text-xs font-script mb-2">
                                                <span className="text-movi-green flex items-center gap-1"><ThumbsUp size={10} /> GREENLIGHT: {(prop.votesFor / 1000).toFixed(1)}k</span>
                                                <span className="text-red-500 flex items-center gap-1"><ThumbsDown size={10} /> PASS: {(prop.votesAgainst / 1000).toFixed(1)}k</span>
                                            </div>
                                            <div className="w-full h-1 bg-gray-800 flex">
                                                <div style={{ width: `${(prop.votesFor / (prop.votesFor + prop.votesAgainst)) * 100}%` }} className="bg-movi-green shadow-[0_0_10px_rgba(20,241,149,0.5)] transition-all duration-500"></div>
                                                <div style={{ width: `${(prop.votesAgainst / (prop.votesFor + prop.votesAgainst)) * 100}%` }} className="bg-red-500 transition-all duration-500"></div>
                                            </div>
                                        </div>

                                        {/* Action Buttons - Only show if active */}
                                        {prop.status === 'Active' && (
                                            <div className="flex gap-3 pt-4 border-t border-white/5">
                                                {userVotes[prop.id] ? (
                                                    <div className={`w-full py-2 text-center font-script text-xs font-bold uppercase border ${userVotes[prop.id] === 'for' ? 'border-movi-green text-movi-green' : 'border-red-500 text-red-500'}`}>
                                                        Vote Cast: {userVotes[prop.id].toUpperCase()}
                                                    </div>
                                                ) : (
                                                    <>
                                                        <button 
                                                            onClick={() => handleVote(prop.id, 'for')}
                                                            disabled={!isConnected}
                                                            className="flex-1 py-2 bg-movi-green/10 hover:bg-movi-green text-movi-green hover:text-black border border-movi-green/50 font-display text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                        >
                                                            <Check size={14} /> Approve
                                                        </button>
                                                        <button 
                                                            onClick={() => handleVote(prop.id, 'against')}
                                                            disabled={!isConnected}
                                                            className="flex-1 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 font-display text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                        >
                                                            <X size={14} /> Reject
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Treasury View */}
                        {activeTab === 'treasury' && (
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="glass-panel p-6 rounded-xl h-[350px]">
                                    <h4 className="font-bold font-script text-xs uppercase mb-6 text-center text-gray-400">Asset Allocation</h4>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={TREASURY_DATA}
                                                cx="50%"
                                                cy="45%"
                                                innerRadius={70}
                                                outerRadius={90}
                                                paddingAngle={2}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {TREASURY_DATA.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontFamily: 'Courier Prime' }} itemStyle={{ color: '#fff' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="glass-panel p-6 rounded-xl">
                                    <h4 className="font-bold font-script text-xs uppercase mb-6 text-gray-400">Recent Disbursements</h4>
                                    <div className="space-y-4 font-script text-xs">
                                        {[1,2,3,4].map((_, i) => (
                                            <div key={i} className="flex justify-between items-center border-b border-gray-800 pb-3 last:border-0">
                                                <div>
                                                    <p className="text-white mb-1">PROJECT_NEON_DREAMS</p>
                                                    <p className="text-gray-500">0x82...39a</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-red-400">-50,000.00 USDC</p>
                                                    <p className="text-gray-600">14:00:22</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="glass-panel p-8 rounded-xl border border-movi-green/20 relative overflow-hidden group">
                            {isConnected && <div className="absolute top-0 left-0 w-full h-1 bg-movi-green shadow-[0_0_10px_#14F195]"></div>}
                            
                            <h3 className="text-lg font-bold font-display mb-6 uppercase tracking-widest">Voting Terminal</h3>
                            
                            <div className="bg-black p-4 rounded border border-gray-800 mb-6 font-script text-sm relative overflow-hidden">
                                <div className="flex justify-between text-gray-500 mb-2 items-center">
                                    <span>STATUS:</span>
                                    <span className={`flex items-center gap-2 ${isConnected ? "text-movi-green" : "text-red-500"}`}>
                                        <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-movi-green animate-pulse" : "bg-red-500"}`}></span>
                                        {isConnected ? "ONLINE" : "DISCONNECTED"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-end text-gray-500">
                                    <span>POWER:</span>
                                    <span className={`text-2xl font-bold font-display ${isConnected ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "text-gray-700"}`}>
                                        {votingPower.toLocaleString()} <span className="text-xs font-normal font-script">VP</span>
                                    </span>
                                </div>

                                {delegation?.active && isConnected && (
                                    <div className="mt-3 pt-3 border-t border-gray-800 text-[10px] text-movi-purple flex items-start gap-1 animate-in fade-in slide-in-from-top-2">
                                        <AlertTriangle size={12} className="mt-0.5" />
                                        <div>
                                            <p className="font-bold">VOTING POWER DELEGATED</p>
                                            <p className="text-gray-400 truncate w-40">{delegation.address}</p>
                                        </div>
                                        <button 
                                            onClick={() => setDelegation(null)}
                                            className="ml-auto text-red-500 hover:text-white underline"
                                        >
                                            Revoke
                                        </button>
                                    </div>
                                )}

                                {/* Dedicated Delegate Button inside Terminal */}
                                {isConnected && !delegation?.active && (
                                    <button 
                                        onClick={() => setShowDelegateModal(true)}
                                        className="mt-4 w-full py-2 bg-movi-purple/20 hover:bg-movi-purple/30 text-movi-purple text-xs font-bold uppercase tracking-wider border border-movi-purple/50 rounded-sm transition-colors"
                                    >
                                        Delegate Power
                                    </button>
                                )}
                            </div>
                            
                            {!isConnected ? (
                                <button 
                                    onClick={handleConnect}
                                    className="w-full py-4 bg-movi-dark border border-gray-700 hover:border-movi-green hover:text-movi-green text-gray-400 font-bold font-display uppercase tracking-widest transition-all text-xs"
                                >
                                    Connect Wallet
                                </button>
                            ) : (
                                <div className="text-center text-xs text-gray-500 font-script">
                                    WALLET CONNECTED: 0x82...39a
                                </div>
                            )}
                        </div>
                        
                        <div className="p-6 rounded-xl border border-white/5 bg-surface">
                            <h3 className="font-bold font-display uppercase text-sm text-gray-400 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button 
                                    onClick={openSubmitModal}
                                    className="w-full py-3 border border-gray-800 bg-black/50 hover:bg-gray-800 hover:text-white text-gray-400 font-script text-xs uppercase transition-colors flex items-center justify-center gap-2"
                                >
                                    <FileText size={14} /> Submit Script
                                </button>
                                <button 
                                    onClick={() => setShowDelegateModal(true)}
                                    disabled={!isConnected || delegation?.active}
                                    className="w-full py-3 border border-gray-800 bg-black/50 hover:bg-gray-800 hover:text-white text-gray-400 font-script text-xs uppercase transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <UserPlus size={14} /> Delegate Votes
                                </button>
                                <button className="w-full py-3 border border-gray-800 bg-black/50 hover:bg-gray-800 hover:text-white text-gray-400 font-script text-xs uppercase transition-colors flex items-center justify-center gap-2">
                                    <CheckCircle2 size={14} /> My History
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dao;
