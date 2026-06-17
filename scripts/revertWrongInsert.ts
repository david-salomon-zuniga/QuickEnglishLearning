import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'apps/web/frontend/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// The exact item_a strings we inserted by mistake
const itemsToDelete = [
    "These cannot take a direct object. ",
    "The action starts and ends with the subject.",
    "These require an object. You can put the object at the end or in the middle.",
    "Rule: If the object is a pronoun (it, me, them), it must go in the middle.",
    "These require an object, but you cannot put the object in the middle.",
    "The verb and particle must stay together.",
    "These consist of a Verb + Particle + Preposition.",
    "They are always transitive and always stay together.",
    "Here are the most essential phrasal verbs categorized by their function."
    // The last 4 all had the same itemA, 'in' will catch them all
];

async function revertLevel33() {
    console.log("🧹 Reverting Level 33 insertion...");

    const { data, error } = await supabase
        .from('level_content')
        .delete()
        .eq('level_id', 33)
        .in('item_a', itemsToDelete);

    if (error) {
        console.error("💀 Error during revert:", error);
    } else {
        console.log("✅ Successfully removed the mistaken items from Level 33.");
        console.log("Note: The original 7 phrasal verb items should still be there.");
    }
}

revertLevel33();