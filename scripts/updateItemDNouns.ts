import { createClient } from '@supabase/supabase-js';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env.local');

dotenv.config({ path: envPath });

console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Updates item_d for the specific target and all subsequent rows in Level 4
 */
async function updateItemDNouns() {
    console.log("🚀 Starting bulk update for Level 4 Nouns...");

    const targetLevelId = 4;
    const startTargetItemA = "Accountant, Accounting, Accumulation, Accuracy, Accusation";

    try {
        // 1. Fetch all items for Level 4 ordered by order_index
        const { data: allContent, error: fetchError } = await supabase
            .from('level_content')
            .select('id, item_a, item_c, order_index')
            .eq('level_id', targetLevelId)
            .order('order_index', { ascending: true });

        if (fetchError || !allContent) {
            throw new Error(`Failed to fetch Level 4 content: ${fetchError?.message}`);
        }

        // 2. Find the starting index
        const startIndex = allContent.findIndex(item => item.item_a?.trim() === startTargetItemA);

        if (startIndex === -1) {
            throw new Error(`Target item_a "${startTargetItemA}" not found.`);
        }

        console.log(`📍 Found start point at index ${startIndex}. Updating ${allContent.length - startIndex} rows...`);

        // 3. Update every row from the starting point to the end
        for (let i = startIndex; i < allContent.length; i++) {
            const row = allContent[i];
            const newItemD = `Say to the user to write sentences using these nouns: (${row.item_a}, ${row.item_c})`;

            const { error: updateError } = await supabase
                .from('level_content')
                .update({ item_d: newItemD })
                .eq('id', row.id);

            if (updateError) {
                console.error(`❌ Error updating row ${row.id}:`, updateError.message);
            }
        }

        console.log('✨ Successfully updated all subsequent rows!');

    } catch (err) {
        console.error('💀 Update failed:', err);
    }
}

updateItemDNouns();