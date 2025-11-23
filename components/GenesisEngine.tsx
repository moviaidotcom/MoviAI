import React, { useState, useRef } from 'react';
import { ArrowLeft, Film, Image as ImageIcon, Mic, Brain, MapPin, Video, Loader2, Play, Music, Upload } from 'lucide-react';
import { 
    generateVeoVideo, 
    generateProImage, 
    analyzeMedia, 
    queryMaps, 
    queryThinking, 
    generateSpeech, 
    transcribeAudio 
} from '../services/geminiService';

interface GenesisEngineProps {
    onBack: () => void;
}

type EngineTab = 'video' | 'image' | 'audio' | 'intel';

const GenesisEngine: React.FC<GenesisEngineProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<EngineTab>('video');
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [output, setOutput] = useState<any>(null);
    
    // Tool specific states
    const [veoAspectRatio, setVeoAspectRatio] = useState<'16:9' | '9:16' | '1:1' | '21:9' | '4:3' | '2.35:1'>('16:9');
    const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
    const [imageRatio, setImageRatio] = useState<"1:1" | "3:4" | "4:3" | "9:16" | "16:9">("16:9");
    const [uploadedFile, setUploadedFile] = useState<{data: string, mimeType: string} | null>(null);
    const [intelMode, setIntelMode] = useState<'thinking' | 'maps' | 'vision'>('thinking');

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Audio playback helper
    const playPCMAudio = async (base64PCM: string) => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const binaryString = atob(base64PCM);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
        
        const dataInt16 = new Int16Array(bytes.buffer);
        const buffer = audioContext.createBuffer(1, dataInt16.length, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < dataInt16.length; i++) {
            channelData[i] = dataInt16[i] / 32768.0;
        }

        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const base64Data = base64String.split(',')[1];
                setUploadedFile({ data: base64Data, mimeType: file.type });
            };
            reader.readAsDataURL(file);
        }
    };

    const executeAction = async () => {
        setIsLoading(true);
        setOutput(null);

        try {
            if (activeTab === 'video') {
                // Check API Key for Veo as required by guidelines
                const aiWindow = window as any;
                if (aiWindow.aistudio) {
                    const hasKey = await aiWindow.aistudio.hasSelectedApiKey();
                    if (!hasKey) {
                        await aiWindow.aistudio.openSelectKey();
                    }
                }

                // Veo Generation
                const blob = await generateVeoVideo(prompt, veoAspectRatio, uploadedFile?.data, uploadedFile?.mimeType);
                const url = URL.createObjectURL(blob);
                setOutput({ type: 'video', url });
            } 
            else if (activeTab === 'image') {
                // Pro Image Generation
                const base64 = await generateProImage(prompt, imageRatio, imageSize);
                setOutput({ type: 'image', url: base64 });
            }
            else if (activeTab === 'audio') {
                if (uploadedFile && uploadedFile.mimeType.startsWith('audio')) {
                    // Transcription
                    const text = await transcribeAudio(uploadedFile.data, uploadedFile.mimeType);
                    setOutput({ type: 'text', content: text });
                } else {
                    // TTS
                    const pcm = await generateSpeech(prompt);
                    await playPCMAudio(pcm);
                    setOutput({ type: 'audio-msg', content: "Audio generated and playing..." });
                }
            }
            else if (activeTab === 'intel') {
                if (intelMode === 'thinking') {
                    const text = await queryThinking(prompt);
                    setOutput({ type: 'text', content: text });
                } else if (intelMode === 'maps') {
                    // Try to get location
                    let loc;
                    try {
                         // Simple timeout wrapper for geolocation
                         const pos: any = await new Promise((resolve, reject) => {
                            navigator.geolocation.getCurrentPosition(resolve, reject, {timeout: 5000});
                         });
                         loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                    } catch (e) {
                        console.log("Location not available, proceeding without specific coords");
                    }
                    
                    const { text, groundingChunks } = await queryMaps(prompt, loc);
                    setOutput({ type: 'maps', content: text, chunks: groundingChunks });
                } else if (intelMode === 'vision') {
                    if (!uploadedFile) throw new Error("Upload an image or video first");
                    const text = await analyzeMedia(prompt, uploadedFile.data, uploadedFile.mimeType);
                    setOutput({ type: 'text', content: text });
                }
            }
        } catch (error: any) {
            console.error(error);
            setOutput({ type: 'error', content: error.message || "Operation failed" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-movi-black text-white pt-24 pb-12 relative overflow-x-hidden">
            <div className="film-grain"></div>
            
            {/* Header */}
            <div className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-md border-b border-white/10 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white uppercase tracking-wider font-display group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Exit Studio
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-movi-green rounded-full animate-pulse"></div>
                        <span className="font-display font-bold text-lg tracking-tight">GENESIS ENGINE</span>
                    </div>
                    <div className="text-xs font-mono text-gray-500">V3.1 ALPHA</div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-8">
                
                {/* Sidebar Controls */}
                <div className="lg:col-span-3 space-y-2">
                    <button 
                        onClick={() => { setActiveTab('video'); setOutput(null); }}
                        className={`w-full p-4 rounded-xl border flex items-center gap-3 transition-all ${activeTab === 'video' ? 'bg-movi-green/10 border-movi-green text-movi-green shadow-[0_0_15px_rgba(20,241,149,0.2)]' : 'bg-surface border-white/5 text-gray-400 hover:bg-gray-900'}`}
                    >
                        <Video size={20} />
                        <div className="text-left">
                            <div className="font-bold font-display">Veo Director</div>
                            <div className="text-[10px] opacity-60">Video Generation</div>
                        </div>
                    </button>

                    <button 
                        onClick={() => { setActiveTab('image'); setOutput(null); }}
                        className={`w-full p-4 rounded-xl border flex items-center gap-3 transition-all ${activeTab === 'image' ? 'bg-movi-purple/10 border-movi-purple text-movi-purple shadow-[0_0_15px_rgba(153,69,255,0.2)]' : 'bg-surface border-white/5 text-gray-400 hover:bg-gray-900'}`}
                    >
                        <ImageIcon size={20} />
                        <div className="text-left">
                            <div className="font-bold font-display">Art Dept</div>
                            <div className="text-[10px] opacity-60">Pro Image Gen</div>
                        </div>
                    </button>

                    <button 
                        onClick={() => { setActiveTab('audio'); setOutput(null); }}
                        className={`w-full p-4 rounded-xl border flex items-center gap-3 transition-all ${activeTab === 'audio' ? 'bg-blue-500/10 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-surface border-white/5 text-gray-400 hover:bg-gray-900'}`}
                    >
                        <Mic size={20} />
                        <div className="text-left">
                            <div className="font-bold font-display">Sound Stage</div>
                            <div className="text-[10px] opacity-60">TTS & Transcribe</div>
                        </div>
                    </button>

                    <button 
                        onClick={() => { setActiveTab('intel'); setOutput(null); }}
                        className={`w-full p-4 rounded-xl border flex items-center gap-3 transition-all ${activeTab === 'intel' ? 'bg-movi-gold/10 border-movi-gold text-movi-gold shadow-[0_0_15px_rgba(255,215,0,0.2)]' : 'bg-surface border-white/5 text-gray-400 hover:bg-gray-900'}`}
                    >
                        <Brain size={20} />
                        <div className="text-left">
                            <div className="font-bold font-display">Intelligence</div>
                            <div className="text-[10px] opacity-60">Analysis & Maps</div>
                        </div>
                    </button>
                </div>

                {/* Main Work Area */}
                <div className="lg:col-span-9">
                    <div className="bg-surface border border-white/10 rounded-2xl p-8 min-h-[600px] flex flex-col relative overflow-hidden">
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-radial from-white/5 to-transparent opacity-50 pointer-events-none"></div>

                        {/* Input Section */}
                        <div className="space-y-6 z-10">
                            <h2 className="text-3xl font-display font-bold uppercase flex items-center gap-3">
                                {activeTab === 'video' && <><Video className="text-movi-green" /> Veo Generation</>}
                                {activeTab === 'image' && <><ImageIcon className="text-movi-purple" /> Image Studio</>}
                                {activeTab === 'audio' && <><Music className="text-blue-400" /> Audio Lab</>}
                                {activeTab === 'intel' && <><Brain className="text-movi-gold" /> Neural Core</>}
                            </h2>

                            {/* Configuration Area */}
                            <div className="grid md:grid-cols-2 gap-4 bg-black/30 p-4 rounded-xl border border-white/5">
                                {activeTab === 'video' && (
                                    <>
                                        <div>
                                            <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Aspect Ratio</label>
                                            <select 
                                                value={veoAspectRatio}
                                                onChange={(e) => setVeoAspectRatio(e.target.value as any)}
                                                className="w-full bg-black border border-gray-700 rounded p-2 text-sm"
                                            >
                                                <option value="16:9">16:9 (Cinematic)</option>
                                                <option value="9:16">9:16 (Mobile)</option>
                                                <option value="21:9">21:9 (Ultrawide)</option>
                                                <option value="1:1">1:1 (Square)</option>
                                                <option value="4:3">4:3 (Classic TV)</option>
                                                <option value="2.35:1">2.35:1 (Cinemascope)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Reference Image (Optional)</label>
                                            <button onClick={() => fileInputRef.current?.click()} className="w-full bg-black border border-gray-700 rounded p-2 text-sm flex items-center justify-center gap-2 hover:border-white">
                                                <Upload size={14} /> {uploadedFile ? "Image Loaded" : "Upload Source"}
                                            </button>
                                        </div>
                                    </>
                                )}
                                {activeTab === 'image' && (
                                    <>
                                        <div>
                                            <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Dimensions</label>
                                            <select value={imageRatio} onChange={(e) => setImageRatio(e.target.value as any)} className="w-full bg-black border border-gray-700 rounded p-2 text-sm mb-2">
                                                <option value="1:1">1:1 (Square)</option>
                                                <option value="16:9">16:9 (Wide)</option>
                                                <option value="9:16">9:16 (Tall)</option>
                                                <option value="4:3">4:3 (Classic)</option>
                                                <option value="3:4">3:4 (Portrait)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Resolution</label>
                                            <div className="flex gap-2">
                                                {['1K', '2K', '4K'].map(size => (
                                                    <button 
                                                        key={size}
                                                        onClick={() => setImageSize(size as any)}
                                                        className={`flex-1 py-2 text-xs font-bold rounded border ${imageSize === size ? 'bg-movi-purple text-white border-movi-purple' : 'bg-black border-gray-700 text-gray-400'}`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                                {activeTab === 'audio' && (
                                    <div className="col-span-2">
                                        <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Mode: {uploadedFile ? "Transcription" : "Text-to-Speech"}</label>
                                        <button onClick={() => fileInputRef.current?.click()} className="w-full bg-black border border-gray-700 rounded p-2 text-sm flex items-center justify-center gap-2 hover:border-white">
                                            <Upload size={14} /> {uploadedFile ? "Audio File Loaded (Click to change)" : "Upload Audio for Transcription (Optional)"}
                                        </button>
                                        <p className="text-[10px] text-gray-500 mt-1">If no file is uploaded, prompt will be used for Speech Generation.</p>
                                    </div>
                                )}
                                {activeTab === 'intel' && (
                                    <div className="col-span-2">
                                        <div className="flex gap-2 mb-4">
                                            <button onClick={() => setIntelMode('thinking')} className={`flex-1 py-2 text-xs font-bold rounded border ${intelMode === 'thinking' ? 'bg-movi-gold text-black border-movi-gold' : 'bg-black border-gray-700 text-gray-400'}`}>Thinking Mode</button>
                                            <button onClick={() => setIntelMode('maps')} className={`flex-1 py-2 text-xs font-bold rounded border ${intelMode === 'maps' ? 'bg-movi-gold text-black border-movi-gold' : 'bg-black border-gray-700 text-gray-400'}`}>Google Maps</button>
                                            <button onClick={() => setIntelMode('vision')} className={`flex-1 py-2 text-xs font-bold rounded border ${intelMode === 'vision' ? 'bg-movi-gold text-black border-movi-gold' : 'bg-black border-gray-700 text-gray-400'}`}>Visual Analysis</button>
                                        </div>
                                        {intelMode === 'vision' && (
                                             <button onClick={() => fileInputRef.current?.click()} className="w-full bg-black border border-gray-700 rounded p-2 text-sm flex items-center justify-center gap-2 hover:border-white">
                                                <Upload size={14} /> {uploadedFile ? "Media Loaded" : "Upload Image/Video to Analyze"}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept={activeTab === 'video' ? 'image/*' : activeTab === 'audio' ? 'audio/*' : 'image/*,video/*'} />

                            {/* Prompt Input */}
                            <div>
                                <textarea 
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder={
                                        activeTab === 'video' ? "Describe the scene for Veo..." :
                                        activeTab === 'image' ? "Describe the image..." :
                                        activeTab === 'audio' && !uploadedFile ? "Enter text to speak..." :
                                        activeTab === 'audio' && uploadedFile ? "Click Generate to transcribe..." :
                                        "Enter your query..."
                                    }
                                    className="w-full h-32 bg-black border border-gray-700 rounded-xl p-4 text-white font-mono focus:outline-none focus:border-white resize-none"
                                />
                            </div>

                            <button 
                                onClick={executeAction}
                                disabled={isLoading || (!prompt && !uploadedFile)}
                                className="w-full py-4 bg-white hover:bg-gray-200 text-black font-bold text-lg rounded-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-3"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <Play fill="currentColor" />}
                                {isLoading ? "Processing..." : "Generate Output"}
                            </button>
                        </div>

                        {/* Output Area */}
                        {output && (
                            <div className="mt-8 border-t border-white/10 pt-8 animate-in fade-in slide-in-from-bottom-4 z-10">
                                <h3 className="font-bold font-display uppercase mb-4 text-gray-400">System Output</h3>
                                <div className="bg-black rounded-xl overflow-hidden border border-gray-800">
                                    {output.type === 'video' && (
                                        <video src={output.url} controls className="w-full h-auto max-h-[500px]" autoPlay loop />
                                    )}
                                    {output.type === 'image' && (
                                        <img src={output.url} alt="Generated" className="w-full h-auto object-contain max-h-[600px]" />
                                    )}
                                    {output.type === 'text' && (
                                        <div className="p-6 font-mono text-sm text-gray-300 whitespace-pre-wrap max-h-[400px] overflow-y-auto">
                                            {output.content}
                                        </div>
                                    )}
                                    {output.type === 'audio-msg' && (
                                        <div className="p-6 flex items-center gap-4 text-movi-green">
                                            <Music className="animate-bounce" /> {output.content}
                                        </div>
                                    )}
                                    {output.type === 'maps' && (
                                        <div className="p-6">
                                            <div className="font-mono text-sm text-gray-300 mb-4">{output.content}</div>
                                            <div className="grid gap-2">
                                                {output.chunks.map((chunk: any, i: number) => {
                                                    if (chunk.web?.uri) return <a key={i} href={chunk.web.uri} target="_blank" rel="noreferrer" className="text-movi-green hover:underline text-xs truncate block">{chunk.web.title}</a>;
                                                    return null;
                                                })}
                                            </div>
                                        </div>
                                    )}
                                    {output.type === 'error' && (
                                        <div className="p-6 text-red-500 font-mono flex items-center gap-2">
                                            <Loader2 className="animate-spin" /> Error: {output.content}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenesisEngine;