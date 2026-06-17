import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Use process.cwd() to get the root of your project/package
dotenv.config({ path: path.resolve(process.cwd(), 'apps/web/frontend/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const level33Data = {
    "level": 33,
    "content": [
        { "itemA": "These cannot take a direct object. ", "itemB": "Show up / Turn up: To arrive. Get away: To escape. Go away: To leave a place. Move out / Move in: To change residence. Back out: To withdraw from an agreement.", "itemC": "Intransitive Phrasal Verbs Subgroup: Movement & Arrival", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
        { "itemA": "The action starts and ends with the subject.", "itemB": "Pass out: To faint/lose consciousness. Grow up: To become an adult. Sit down / Stand up: Basic physical movements. Wake up: To stop sleeping. Break down: To stop functioning (machines) or lose emotional control.", "itemC": "Intransitive Phrasal Verbs Subgroup: Physical & Mental States", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
        { "itemA": "These require an object. You can put the object at the end or in the middle.", "itemB": "Turn on / Turn off: To start/stop a device. Pick up / Drop off: To collect or deliver someone/something. Fill out: To complete a form. Put off: To postpone. Throw away: To discard. Set up: To organize or assemble. Clean up: To tidy a space.", "itemC": "Transitive & Separable Phrasal Verbs. Subgroup: Managing Tasks & Objects", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
        { "itemA": "Rule: If the object is a pronoun (it, me, them), it must go in the middle.", "itemB": "Bring up: To mention a topic. Point out: To draw attention to a fact. Make up: To invent a story or excuse. Write down: To record on paper. Give up: To stop a habit (e.g., give it up).", "itemC": "Transitive & Separable Phrasal Verbs. Subgroup: Communication & Thoughts", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
        { "itemA": "These require an object, but you cannot put the object in the middle.", "itemB": "Look after: To take care of. Run into: To meet someone by chance. Get over: To recover from (a breakup or illness). Wait on: To serve someone (in a restaurant). Call on: To visit someone.", "itemC": "Transitive & Inseparable Phrasal Verbs. Subgroup: People & Relationships", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
        { "itemA": "The verb and particle must stay together.", "itemB": "Look for: To search for something. Go over: To review or examine. Come across: To find something by chance. Look into: To investigate.", "itemC": "Transitive & Inseparable Phrasal Verbs. Subgroup: Discovery & Search", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
        { "itemA": "These consist of a Verb + Particle + Preposition.", "itemB": "Get along with: To have a good relationship. Look up to: To admire someone. Look down on: To feel superior to someone. Put up with: To tolerate. Break up with: To end a relationship.", "itemC": "Three-Word Phrasal Verbs (Always Inseparable). Subgroup: Social Dynamics", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
        { "itemA": "They are always transitive and always stay together.", "itemB": "Run out of: To have no more of something. Catch up with: To reach the same point as someone else. Keep up with: To stay at the same speed/level. Check out of: To leave a hotel. Go through with: To complete a difficult task.", "itemC": "Three-Word Phrasal Verbs (Always Inseparable). Subgroup: Actions & Status", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
        { "itemA": "Here are the most essential phrasal verbs categorized by their function.", "itemB": "Back down: To withdraw from a position/argument. Break in: To enter a building by force. Check in/out: To register at or leave a hotel/airport. Get in/out: To enter or leave a car/small space. Get on/off: To enter or leave a bus, train, or plane. Move in/out: To start or stop living in a house. Show up: To arrive or appear.", "itemC": "The Comprehensive 'Common' List. Movement & Presence", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
        { "itemA": "Here are the most essential phrasal verbs categorized by their function.", "itemB": "Bring up: To mention a topic in conversation. Call off: To cancel something. Carry on: To continue doing something. Clean up: To make a place tidy. Find out: To discover information. Get along: To have a good relationship with someone. Give up: To stop trying or quit a habit. Look after: To take care of someone or something. Look for: To search for something. Put off: To postpone an event or task. Run out of: To have none left (e.g., money, time, milk). Take off: To remove clothing OR for a plane to leave the ground. Turn on/off: To start or stop a device/light.", "itemC": "The Comprehensive 'Common' List. Daily Life & Tasks.", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
        { "itemA": "Here are the most essential phrasal verbs categorized by their function.", "itemB": "Ask out: To invite someone on a date. Break up: To end a relationship. Cheer up: To make someone feel happier. Cut off: To interrupt someone or stop a supply (water/electricity). Hang out: To spend time relaxing with others. Hold on: To wait for a short time. Make up: To invent a story OR to reconcile after a fight. Pass out: To lose consciousness (faint). Speak up: To talk louder.", "itemC": "The Comprehensive 'Common' List. Social & Communication.", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
        { "itemA": "Here are the most essential phrasal verbs categorized by their function.", "itemB": "Back up: To make a copy of data OR to support someone. Fill out: To complete a form. Go over: To review something carefully. Log in/out: To enter or leave a computer system. Set up: To arrange or organize something. Take over: To take control of something. Write down: To record information on paper.", "itemC": "The Comprehensive 'Common' List. Work & Tech", "itemD": "Say to the user to repeat the phonetic sound of this letter." }
    ]
};

async function insertLevel33() {
    console.log("🚀 Starting isolated insertion for Level 33...");

    const payload = level33Data.content.map((item, index) => ({
        level_id: level33Data.level,
        item_a: item.itemA,
        item_b: item.itemB,
        item_c: item.itemC,
        item_d: item.itemD,
        order_index: index
    }));

    const { error } = await supabase
        .from('level_content')
        .insert(payload);

    if (error) {
        console.error("💀 Error inserting Level 33:", error);
    } else {
        console.log("✅ Level 33 successfully populated with 12 items.");
    }
}

insertLevel33();