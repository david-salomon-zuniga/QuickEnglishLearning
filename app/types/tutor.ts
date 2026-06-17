// src/app/types/tutor.ts

export interface LevelStat {
    level: number;
    errors: number;
    success: number;
    created_at: string;
    updated_at?: string;
}

export interface TutorMetrics {
    score: number;
    successes: number;
    mistakes: number;
}

export interface TutorResponse {
    transcript: string;
    analysis: string;
    is_correct: boolean;
    score: number;
}

export interface LevelContent {
    level: number;
    title: string;
    description: string;
    content: Array<{
        itemA: string;
        itemB: string;
        itemC: string;
        itemD: string;
    }>;
}