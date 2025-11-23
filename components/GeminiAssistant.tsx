import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { streamChatResponse } from '../services/geminiService';
import { ChatMessage, ChatRole } from '../types';

const GeminiAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: ChatRole.MODEL, text: "Welcome to MoviAI. I am the ecosystem architect. Ask me about our DAO, tokenomics, or the Genesis Engine." }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: ChatRole.USER, text: userMsg }]);
        setIsLoading(true);

        let fullResponse = '';
        
        // Create a placeholder message for the stream
        setMessages(prev => [...prev, { role: ChatRole.MODEL, text: '' }]);

        await streamChatResponse(
            messages,
            userMsg,
            (chunk) => {
                fullResponse += chunk;
                setMessages(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1].text = fullResponse;
                    return newHistory;
                });
            }
        );

        setIsLoading(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-movi-purple hover:bg-movi-green text-white p-4 rounded-full shadow-lg shadow-purple-500/30 transition-all hover:scale-110 flex items-center gap-2"
                >
                    <Sparkles size={24} />
                    <span className="font-bold hidden md:inline">Ask MoviAI</span>
                </button>
            )}

            {isOpen && (
                <div className="bg-movi-dark border border-gray-800 w-[350px] md:w-[400px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in">
                    {/* Header */}
                    <div className="bg-black/50 p-4 flex justify-between items-center border-b border-gray-800 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-movi-green rounded-full animate-pulse"></div>
                            <span className="font-display font-bold text-white">MoviAI Intelligence</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/80">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
                                    msg.role === ChatRole.USER 
                                        ? 'bg-movi-purple text-white rounded-tr-none' 
                                        : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-4 bg-black/50 border-t border-gray-800 flex gap-2">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about our roadmap..."
                            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-movi-green transition-colors"
                            disabled={isLoading}
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading || !input.trim()}
                            className="bg-movi-green text-black p-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                        >
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default GeminiAssistant;