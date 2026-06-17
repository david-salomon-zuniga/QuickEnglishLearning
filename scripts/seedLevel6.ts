import { createClient } from '@supabase/supabase-js';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env.local');

dotenv.config({ path: envPath });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Specifically seeds the expanded narrative paragraphs into Level 6
 */
async function seedLevel6Narrative() {
    console.log("🚀 Starting specialized seeding for Level 6 Narrative...");

    const targetLevelId = 6;

    // The sequential paragraphs provided in the source text
    const paragraphs = [
        "An absent, abstract, and absurd thought suddenly becomes accessible, accountable, and accused when the acid of reality scorches every acre with an acute and adequate fire.",

    ];

    try {
        // 1. Fetch current Level 6 content
        const { data: existingContent, error: fetchError } = await supabase
            .from('level_content')
            .select('*')
            .eq('level_id', targetLevelId)
            .order('order_index', { ascending: true });

        if (fetchError || !existingContent) {
            throw new Error(`Failed to fetch Level 6 content: ${fetchError?.message}`);
        }

        // 2. Locate the starting index based on the specific words provided
        const startTarget = "Absent, Abstract, Absurd, Accessible, Accountable";
        const startIndex = existingContent.findIndex(item => item.item_a === startTarget);

        if (startIndex === -1) {
            throw new Error(`Target item_a text "${startTarget}" not found in Level 6 content.`);
        }

        console.log(`📍 Found start point at index ${startIndex}. Preparing updates for ${paragraphs.length} items.`);

        // 3. Prepare updates
        for (let i = 0; i < paragraphs.length; i++) {
            const currentItem = existingContent[startIndex + i];

            if (!currentItem) {
                console.warn(`⚠️ Narrative paragraph ${i} has no matching row in level_content at index ${startIndex + i}. Stopping.`);
                break;
            }

            const { error: updateError } = await supabase
                .from('level_content')
                .update({ item_b: paragraphs[i] })
                .eq('id', currentItem.id);

            if (updateError) {
                console.error(`❌ Error updating row ${currentItem.id} (item_a: ${currentItem.item_a}):`, updateError.message);
            }
        }

        console.log('✨ Level 6 Narrative update finished successfully!');

    } catch (err) {
        console.error('💀 Seeding failed:', err);
    }
}

seedLevel6Narrative();