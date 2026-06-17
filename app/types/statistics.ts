export interface LevelStat {
    level: number;
    errors: number;
    success: number;
    step: number;      // Added for Slide 1
    substep: number;   // Added for Slide 1
    complexity: string;
    created_at: string; // Added for Slide 2 (Time)
}