import React, { useState, useMemo } from 'react';
import { NorthStarMetrics } from '../types';
import { Heart, Shield, Zap, Lightbulb, AlertCircle } from 'lucide-react';

const NorthStarEvaluator: React.FC = () => {
    const [metrics, setMetrics] = useState<NorthStarMetrics>({
        inspiration: 5,
        connection: 5,
        complexity: 5,
        hope: 5
    });

    const handleChange = (key: keyof NorthStarMetrics, value: number) => {
        setMetrics(prev => ({ ...prev, [key]: value }));
    };

    const score = useMemo(() => {
        const avg = (metrics.inspiration + metrics.connection + metrics.complexity + metrics.hope) / 4;
        return (avg * 10).toFixed(1); // Scale to 100 for display logic, output as 0-10 float
    }, [metrics]);

    const getBadge = () => {
        const numScore = parseFloat(score);
        if (numScore >= 9) return { label: "Human Spirit Badge", color: "text-movi-green", border: "border-movi-green" };
        if (numScore >= 7) return { label: "Greenlight Candidate", color: "text-movi-purple", border: "border-movi-purple" };
        return { label: "Needs Revision", color: "text-red-500", border: "border-red-500" };
    };

    const badge = getBadge();

    return (
        <div className="glass-panel p-8 rounded-3xl max-w-4xl mx-auto border-t border-movi-purple/20">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6">
                    <h3 className="text-2xl font-display font-bold mb-6">North Star Evaluator</h3>
                    <p className="text-sm text-gray-400 mb-4">Rate your concept against the 4 Pillars to see if it qualifies for funding.</p>
                    
                    <div className="space-y-4">
                        <RangeInput 
                            label="Inspiration & Heroism" 
                            icon={<Zap size={16} />}
                            value={metrics.inspiration} 
                            onChange={(v) => handleChange('inspiration', v)}
                            desc="Does it model behavior worth emulating?"
                        />
                        <RangeInput 
                            label="Love & Connection" 
                            icon={<Heart size={16} />}
                            value={metrics.connection} 
                            onChange={(v) => handleChange('connection', v)}
                            desc="Is connection transformative?"
                        />
                        <RangeInput 
                            label="Moral Complexity" 
                            icon={<Shield size={16} />}
                            value={metrics.complexity} 
                            onChange={(v) => handleChange('complexity', v)}
                            desc="Are there hard ethical choices?"
                        />
                        <RangeInput 
                            label="Hope & Spirit" 
                            icon={<Lightbulb size={16} />}
                            value={metrics.hope} 
                            onChange={(v) => handleChange('hope', v)}
                            desc="Does it affirm that struggle has meaning?"
                        />
                    </div>
                </div>

                <div className="w-full md:w-1/3 flex flex-col justify-center items-center bg-black/40 rounded-2xl p-6 border border-white/5 relative overflow-hidden">
                    <div className={`absolute inset-0 opacity-10 bg-${badge.color.split('-')[1]}-500 blur-3xl pointer-events-none`}></div>
                    <span className="text-gray-400 text-sm uppercase tracking-widest mb-2">North Star Score</span>
                    <div className="text-7xl font-display font-bold gradient-text mb-4">
                        {score}
                    </div>
                    <div className={`px-4 py-2 rounded-full border ${badge.border} ${badge.color} bg-black/50 text-sm font-bold backdrop-blur-md`}>
                        {badge.label}
                    </div>
                    {parseFloat(score) < 5 && (
                        <div className="mt-6 flex items-start gap-2 text-xs text-gray-400">
                            <AlertCircle size={14} className="mt-0.5 text-red-500" />
                            <p>Project deemed too cynical or algorithmically driven.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

interface RangeInputProps {
    label: string;
    value: number;
    onChange: (val: number) => void;
    desc: string;
    icon: React.ReactNode;
}

const RangeInput: React.FC<RangeInputProps> = ({ label, value, onChange, desc, icon }) => {
    return (
        <div className="group">
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2 text-white font-semibold">
                    {icon}
                    <span>{label}</span>
                </div>
                <span className="text-movi-green font-mono">{value}/10</span>
            </div>
            <input 
                type="range" 
                min="1" 
                max="10" 
                step="1" 
                value={value} 
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-movi-purple hover:accent-movi-green transition-all"
            />
            <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-300 transition-colors">{desc}</p>
        </div>
    );
};

export default NorthStarEvaluator;