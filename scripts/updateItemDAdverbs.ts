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

async function updateItemDAdverbs() {
    console.log("🚀 Starting bulk update for Level 7 Adverbs...");

    const targetLevelId = 7;
    const startTargetItemA = "Abnormally, Aboard, About, Above, Abroad";

    try {
        const { data: allContent, error: fetchError } = await supabase
            .from('level_content')
            .select('id, item_a, item_c, order_index')
            .eq('level_id', targetLevelId)
            .order('order_index', { ascending: true });

        if (fetchError || !allContent) throw new Error(`Fetch error: ${fetchError?.message}`);

        const startIndex = allContent.findIndex(item => item.item_a?.trim() === startTargetItemA);
        if (startIndex === -1) throw new Error(`Target "${startTargetItemA}" not found.`);

        for (let i = startIndex; i < allContent.length; i++) {
            const row = allContent[i];
            const newItemD = `Say to the user to write sentences using these adverbs: (${row.item_a}, ${row.item_c})`;

            await supabase.from('level_content').update({ item_d: newItemD }).eq('id', row.id);
        }
        console.log('✨ Level 7 Adverbs update complete!');
    } catch (err) {
        console.error('💀 Failed:', err);
    }
}

updateItemDAdverbs();