import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// 1. Manually resolve the path to your .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This moves up from 'scripts' to 'frontend' where .env.local lives
const envPath = path.resolve(__dirname, '../.env.local');

dotenv.config({ path: envPath });

console.log("Checking Env Variables...");
console.log("URL exists:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Key exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * 1. Handles alphabet.json (Standard letters/alphabet structure)
 */
async function migrateAlphabet(filePath: string) {
    console.log(`🚀 Starting Alphabet Migration: ${filePath}`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const levels = Array.isArray(data) ? data : data.levels;
    console.log(`levels migrateAlphabet: ${levels}`);

    for (const level of levels) {
        // Upsert Level Metadata
        await supabase.from('levels').upsert({
            level_number: level.level,
            title: level.title,
            description: level.description
        });

        // Cleanup: Remove old content for this level before re-inserting
        await supabase.from('level_content').delete().eq('level_id', level.level);

        const content = level.content.map((item: any, index: number) => ({
            level_id: level.level,
            item_a: item.itemA,
            item_b: item.itemB,
            item_c: item.itemC,
            order_index: index
        }));

        const { error } = await supabase.from('level_content').insert(content);
        if (error) console.error(`❌ Error Alphabet Lvl ${level.level}:`, error.message);
        else console.log(`✅ Alphabet Level ${level.level} seeded.`);
    }
}

/**
 * 2. Handles proAlphabet.json (Pronunciation rules & Audio files)
 */
async function migrateProAlphabet(filePath: string) {
    console.log(`🚀 Starting ProAlphabet Migration: ${filePath}`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const levels = Array.isArray(data) ? data : data.levels;
    console.log(`levels migrateProAlphabet: ${levels}`);

    for (const level of levels) {
        await supabase.from('levels').upsert({
            level_number: level.level,
            title: level.title,
            description: level.description
        });

        // Cleanup
        await supabase.from('level_content').delete().eq('level_id', level.level);

        const content = level.content.map((item: any, index: number) => ({
            level_id: level.level,
            item_a: item.itemA,
            item_b: item.itemB,
            item_c: item.itemC,
            item_d: item.itemD || null, // Captures AI Tutor instructions
            audio_url: item.audioFile || null,
            order_index: index
        }));

        const { error } = await supabase.from('level_content').insert(content);
        if (error) console.error(`❌ Error ProAlphabet Lvl ${level.level}:`, error.message);
        else console.log(`✅ ProAlphabet Level ${level.level} seeded.`);
    }
}

/**
 * 3. Handles practice.json (Articles, Nouns, and Oxford 5000 lists)
 */
/**
 * 3. Handles practice.json (Quiz structure with topic, explanation, and questions)
 */
async function migratePractice(filePath: string) {
    console.log(`🚀 Starting Practice Migration: ${filePath}`);

    // Read and parse the JSON file
    const rawData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(rawData);

    // Support both a raw array or a { levels: [] } wrapper
    const levels = Array.isArray(data) ? data : data.levels;

    for (const item of levels) {
        // 1. Insert/Update the Practice Header
        // Maps 'topic' and 'explanation' from JSON to your Supabase columns
        const { error: practiceErr } = await supabase.from('practice').upsert({
            level_number: item.level,
            topic: item.topic,
            explanation: item.explanation
        }, { onConflict: 'level_number' });

        if (practiceErr) {
            console.error(`❌ Error in 'practice' table Lvl ${item.level}:`, practiceErr.message);
            continue; // Skip to next level if the header fails
        }

        // 2. Cleanup: Remove old questions for this level to avoid duplicates
        await supabase.from('practice_questions').delete().eq('practice_id', item.level);

        // 3. Extract and map Question objects (questionA, questionB, etc.)
        const questionKeys = Object.keys(item).filter(key => key.startsWith('question'));

        const questionsToInsert = questionKeys.map((key) => {
            const q = item[key]; // Accesses the object e.g., item['questionA']

            // Safety check: Ensure the object has the expected 'options' structure
            if (!q || !q.options) {
                console.warn(`⚠️ Skipping key "${key}" in Level ${item.level} - Not a valid question object.`);
                return null;
            }

            return {
                practice_id: item.level,      // Foreign key to practice table
                question_label: key,          // e.g., "questionA"
                question_text: q.question,    // The actual question string
                option_a: q.options.A,        // Maps JSON options to flat columns
                option_b: q.options.B,
                option_c: q.options.C,
                option_d: q.options.D,
                correct_answer: q.answer      // The 'answer' key from JSON
            };
        }).filter(q => q !== null) as any[]; // Remove any null entries from the array

        // 4. Bulk insert questions for this level
        if (questionsToInsert.length > 0) {
            const { error: qError } = await supabase.from('practice_questions').insert(questionsToInsert);

            if (qError) {
                console.error(`❌ Error in 'practice_questions' Lvl ${item.level}:`, qError.message);
            } else {
                console.log(`✅ Practice Level ${item.level} ("${item.topic}") seeded successfully.`);
            }
        } else {
            console.log(`ℹ️ Level ${item.level} has no questions to seed.`);
        }
    }
}

/**
 * Execution Orchestrator
 */
async function runAllMigrations() {
    try {
        // Resolve paths relative to this script file
        const alphabetPath = path.resolve(__dirname, '../app/data/alphabet.json');
        const proPath = path.resolve(__dirname, '../app/data/proAlphabet.json');
        const practicePath = path.resolve(__dirname, '../app/data/practice.json');

        if (fs.existsSync(alphabetPath)) {
            await migrateAlphabet(alphabetPath);
        } else {
            console.error("❌ Could not find alphabet.json at:", alphabetPath);
        }

        if (fs.existsSync(proPath)) {
            await migrateProAlphabet(proPath);
        } else {
            console.error("❌ Could not find proAlphabet.json at:", proPath);
        }

        if (fs.existsSync(practicePath)) {
            await migratePractice(practicePath);
        } else {
            console.error("❌ Could not find practice.json at:", practicePath);
        }

        console.log('✨ All migrations finished successfully!');
    } catch (err) {
        console.error('💀 Migration failed:', err);
    }
}

runAllMigrations();