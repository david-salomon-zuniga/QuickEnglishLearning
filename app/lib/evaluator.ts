import nlp from 'compromise';

export interface EvaluationResult {
    score: number;       // 0 to 100
    mistakes: number;
    wordCount: number;
    complexity: string;  // basic, intermediate, advanced
}

export const evaluateInput = (userInput: string, targetText: string): EvaluationResult => {
    const doc = nlp(userInput);
    const targetDoc = nlp(targetText);

    // 1. Basic Mistake Count (Simple comparison)
    const userWords = userInput.toLowerCase().split(' ');
    const targetWords = targetText.toLowerCase().split(' ');

    let mistakes = 0;
    targetWords.forEach((word, index) => {
        if (userWords[index] !== word) mistakes++;
    });

    // 2. Language Complexity (Point #1)
    // We check for verbs, adjectives, and specialized grammar
    const hasVerbs = doc.verbs().json().length > 0;
    const hasAdjectives = doc.adjectives().json().length > 0;

    let complexity = "Basic";
    if (hasVerbs && hasAdjectives) complexity = "Intermediate";
    if (doc.clauses().length > 1) complexity = "Advanced";

    // 3. Calculate Score (Point #2)
    const accuracy = Math.max(0, 100 - (mistakes / targetWords.length) * 100);

    return {
        score: Math.round(accuracy),
        mistakes: mistakes,
        wordCount: userWords.length,
        complexity
    };
};