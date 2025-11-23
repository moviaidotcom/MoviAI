import { ReactNode } from 'react';

export type ViewState = 'landing' | 'whitepaper' | 'token-launch' | 'dao' | 'genesis';

export interface SectionProps {
    id?: string;
    className?: string;
    children: ReactNode;
}

export interface FeatureCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    onClick?: () => void;
}

export enum ChatRole {
    USER = 'user',
    MODEL = 'model'
}

export interface ChatMessage {
    role: ChatRole;
    text: string;
}

export interface NorthStarMetrics {
    inspiration: number;
    connection: number;
    complexity: number;
    hope: number;
}

export interface FinancialMetric {
    year: string;
    revenue: number;
    costs: number;
    net: number;
}