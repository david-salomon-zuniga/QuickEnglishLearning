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

async function globalUpdateItemD() {
    console.log("🚀 STARTING BULK PAGINATED UPDATE...");

    const instruction = " Don't repeat the same question always. Never use the same words and try to vary the concepts and the words that are going to be used.";
    const BATCH_SIZE = 1000;
    let from = 0;
    let to = BATCH_SIZE - 1;
    let finished = false;
    let totalUpdated = 0;

    try {
        while (!finished) {
            console.log(`Fetching rows ${from} to ${to}...`);

            // 1. Fetch exactly 1000 rows at a time
            const { data: rows, error: fetchError } = await supabase
                .from('level_content')
                .select('id, item_d')
                .range(from, to);

            if (fetchError) throw fetchError;

            if (!rows || rows.length === 0) {
                finished = true;
                break;
            }

            // 2. Process this batch
            for (const row of rows) {
                const currentContent = row.item_d || "";

                // Precise check: If it doesn't already end with your instruction, update it
                if (!currentContent.endsWith(instruction)) {
                    const updatedContent = currentContent + instruction;

                    const { error: updateError } = await supabase
                        .from('level_content')
                        .update({ item_d: updatedContent })
                        .eq('id', row.id);

                    if (updateError) {
                        console.error(`❌ Error on ID ${row.id}:`, updateError.message);
                    } else {
                        totalUpdated++;
                    }
                }
            }

            // 3. Move to the next 1000 rows
            if (rows.length < BATCH_SIZE) {
                finished = true;
            } else {
                from += BATCH_SIZE;
                to += BATCH_SIZE;
            }
        }

        console.log(`\n✨ DONE! Total rows modified this run: ${totalUpdated}`);
        console.log("All rows in the table now contain the instruction.");

    } catch (err) {
        console.error('💀 Failed:', err);
    }
}

globalUpdateItemD();