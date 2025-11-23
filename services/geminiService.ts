import { GoogleGenAI, Modality, Type } from "@google/genai";
import { ChatMessage, ChatRole } from "../types";

const SYSTEM_INSTRUCTION = `
You are the MoviAI Assistant, an AI spokesperson for the MoviAI decentralized entertainment platform.
Your goal is to explain the MoviAI business plan to potential investors and users.

Key details about MoviAI:
- Tagline: "Don’t just watch the story. Own it. Remix it."
- Problem: Hollywood has lost its way (franchise fatigue, risk aversion, loss of the "North Star" of moral storytelling).
- Solution: A DAO-governed ecosystem where users own, remix, and profit from content.
- Pillars: The Greenlight DAO (voting), Genesis Engine (AI tools), Smart Royalties (Blockchain), Metaverse Theater.
- The "North Star" Criteria: Projects are judged on Inspiration, Human Connection, Moral Complexity, and Hope.
- Token: $MOVI.

Tone: Futuristic, confident, professional, yet rebellious against the traditional Hollywood studio system.
Keep answers concise (under 150 words unless asked for detail).
`;

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
    if (!aiClient) {
        aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return aiClient;
};

// --- Chat Helper ---
export const streamChatResponse = async (
    history: ChatMessage[],
    newMessage: string,
    onChunk: (text: string) => void
) => {
    const client = getClient();
    // Using Pro for the chatbot as requested
    const chat = client.chats.create({
        model: "gemini-3-pro-preview",
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: history.map(h => ({
            role: h.role,
            parts: [{ text: h.text }]
        }))
    });

    try {
        const result = await chat.sendMessageStream({ message: newMessage });
        
        for await (const chunk of result) {
            if (chunk.text) {
                onChunk(chunk.text);
            }
        }
    } catch (error) {
        console.error("Error streaming chat:", error);
        onChunk("\n[System Error: Unable to contact MoviAI Core. Please check your connection.]");
    }
};

// --- Veo Video Generation ---
export const generateVeoVideo = async (
    prompt: string, 
    aspectRatio: '16:9' | '9:16' | '1:1' | '21:9' | '4:3' | '2.35:1',
    imageBase64?: string,
    imageMimeType?: string
) => {
    // Use fresh client to ensure we get the latest selected API key
    const client = new GoogleGenAI({ apiKey: process.env.API_KEY });
    let operation;

    const commonConfig = {
        numberOfVideos: 1,
        resolution: '1080p', // Explicitly set high quality
        aspectRatio: aspectRatio,
    };

    if (imageBase64 && imageMimeType) {
        // Image-to-Video
        operation = await client.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt, 
            image: {
                imageBytes: imageBase64,
                mimeType: imageMimeType,
            },
            config: commonConfig
        });
    } else {
        // Text-to-Video
        operation = await client.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            config: commonConfig
        });
    }

    // Poll for completion with 10s interval as per guidelines
    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await client.operations.getVideosOperation({ operation: operation });
    }

    if (operation.response?.generatedVideos?.[0]?.video?.uri) {
        const downloadLink = operation.response.generatedVideos[0].video.uri;
        // Append API key to fetch the actual video bytes
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        return await response.blob();
    }
    
    throw new Error("Video generation failed");
};

// --- Image Generation (Pro) ---
export const generateProImage = async (
    prompt: string,
    aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9",
    imageSize: "1K" | "2K" | "4K" = "1K"
) => {
    const client = getClient();
    const response = await client.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
            parts: [{ text: prompt }],
        },
        config: {
            imageConfig: {
                aspectRatio: aspectRatio,
                imageSize: imageSize
            }
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
        }
    }
    throw new Error("No image generated");
};

// --- Multimodal Analysis (Video/Image Understanding) ---
export const analyzeMedia = async (
    prompt: string,
    mediaBase64: string,
    mimeType: string
) => {
    const client = getClient();
    // Using Gemini 3 Pro for deep understanding
    const response = await client.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: {
            parts: [
                {
                    inlineData: {
                        mimeType: mimeType,
                        data: mediaBase64
                    }
                },
                { text: prompt }
            ]
        }
    });
    return response.text;
};

// --- Google Maps Grounding ---
export const queryMaps = async (prompt: string, userLocation?: { lat: number, lng: number }) => {
    const client = getClient();
    const config: any = {
        tools: [{ googleMaps: {} }],
    };

    if (userLocation) {
        config.toolConfig = {
            retrievalConfig: {
                latLng: {
                    latitude: userLocation.lat,
                    longitude: userLocation.lng
                }
            }
        };
    }

    const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: config,
    });

    // Extract text and any grounding metadata URLs
    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return { text, groundingChunks };
};

// --- Thinking Mode (Reasoning) ---
export const queryThinking = async (prompt: string) => {
    const client = getClient();
    const response = await client.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: prompt,
        config: {
            thinkingConfig: { thinkingBudget: 32768 } // Max budget
            // Do not set maxOutputTokens as per rules
        }
    });
    return response.text;
};

// --- Audio Transcription ---
export const transcribeAudio = async (audioBase64: string, mimeType: string) => {
    const client = getClient();
    const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: {
            parts: [
                {
                    inlineData: {
                        mimeType: mimeType,
                        data: audioBase64
                    }
                },
                { text: "Transcribe this audio exactly." }
            ]
        }
    });
    return response.text;
};

// --- Text to Speech ---
export const generateSpeech = async (text: string) => {
    const client = getClient();
    const response = await client.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Fenrir' }, // Deep, cinematic voice
                },
            },
        },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("No audio generated");
    
    return base64Audio; // Returns base64 PCM
};