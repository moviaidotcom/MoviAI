import React from 'react';
import { FeatureCardProps } from '../types';

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
    return (
        <div className="relative group h-[400px] cursor-pointer perspective-1000">
            {/* Poster Frame Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-b from-movi-green to-movi-purple rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
            
            <div className="relative h-full bg-movi-dark rounded-xl overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-500">
                
                {/* Background "Image" Placeholder with Zoom Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-50 group-hover:scale-110 transition-transform duration-[2s] ease-out"></div>
                
                {/* Film Grain Overlay on Card */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                {/* Content Container */}
                <div className="relative h-full flex flex-col p-8 z-10 bg-gradient-to-t from-black via-black/50 to-transparent">
                    
                    {/* Top Labels */}
                    <div className="flex justify-between items-start">
                        <div className="px-2 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-widest text-white/70 group-hover:bg-movi-green group-hover:text-black transition-colors">
                            Now Showing
                        </div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    {/* Icon as "Hero Image" */}
                    <div className="mt-auto mb-6 text-movi-purple group-hover:text-movi-green transition-colors duration-500 transform group-hover:scale-110 group-hover:-translate-y-2 origin-left">
                        {icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-3xl font-display font-bold mb-2 text-white leading-none uppercase tracking-tighter">
                        {title.split(' ')[0]}<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 group-hover:from-movi-green group-hover:to-movi-blue transition-all">
                            {title.split(' ').slice(1).join(' ')}
                        </span>
                    </h3>
                    
                    {/* Description (Initially hidden or faded, fully reveals on hover) */}
                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <p className="text-gray-300 text-sm leading-relaxed font-light mt-4 border-l-2 border-movi-green pl-3">
                            {description}
                        </p>
                    </div>

                    {/* Viewfinder Corners */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/10 group-hover:border-movi-green transition-colors"></div>
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/10 group-hover:border-movi-green transition-colors"></div>
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/10 group-hover:border-movi-green transition-colors"></div>
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/10 group-hover:border-movi-green transition-colors"></div>
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;