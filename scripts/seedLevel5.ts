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
 * Specifically seeds the expanded narrative paragraphs into Level 5
 */
async function seedLevel5Narrative() {
    console.log("🚀 Starting specialized seeding for Level 5 Narrative...");

    const targetLevelId = 5;

    // The sequential paragraphs provided by the user
    const paragraphs = [
        "Convey the light and convict the dark, convince the heart to cook the feast of life; cool the fire of rage, cooperate with grace, coordinate the stars, cope with the winter, copy the masters, and correct the course toward home.",
        "Correlate the facts and correspond with friends, let the rust of apathy corrode no more and corrupt no joy; cost the price of freedom, cough out the dust, counsel the lost, count the blessings, counter the blow, and counteract the poison of doubt.",

    ];

    try {
        // 1. Fetch current Level 5 content to find the starting point "Convey, Convict, Convince, Cook, Cool"
        const { data: existingContent, error: fetchError } = await supabase
            .from('level_content')
            .select('*')
            .eq('level_id', targetLevelId)
            .order('order_index', { ascending: true });

        if (fetchError || !existingContent) {
            throw new Error(`Failed to fetch Level 5 content: ${fetchError?.message}`);
        }

        // 2. Locate the starting index for the narrative update
        const startTarget = "Convey, Convict, Convince, Cook, Cool";
        const startIndex = existingContent.findIndex(item => item.item_a === startTarget);

        if (startIndex === -1) {
            throw new Error(`Target text "${startTarget}" not found in Level 5 content.`);
        }

        console.log(`📍 Found start point at index ${startIndex}. Preparing updates for ${paragraphs.length} items.`);

        // 3. Prepare updates
        // We iterate through our narrative paragraphs and update the corresponding item_b in the table
        for (let i = 0; i < paragraphs.length; i++) {
            const currentItem = existingContent[startIndex + i];

            if (!currentItem) {
                console.warn(`⚠️ Narrative paragraph ${i} has no matching row in level_content at index ${startIndex + i}. Stopping.`);
                break;
            }

            const { error: updateError } = await supabase
                .from('level_content')
                .update({ item_b: paragraphs[i] })
                .eq('id', currentItem.id); // Using the row ID for precision

            if (updateError) {
                console.error(`❌ Error updating row ${currentItem.id} (item_a: ${currentItem.item_a}):`, updateError.message);
            }
        }

        console.log('✨ Level 5 Narrative update finished successfully!');

    } catch (err) {
        console.error('💀 Seeding failed:', err);
    }
}

seedLevel5Narrative();