/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * The <T> makes this a "Generic" function, allowing it to work 
 * with any type of data (strings, numbers, objects).
 */
export const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
};