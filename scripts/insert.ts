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

const fullData = [
    {
        "level": 8,
        "content": [
            { "itemA": "Used specifically to ask questions(Who, Whom, Whose, Which, What).", "itemB": "Whom did you send the invitation to?, Whose guitar is sitting in the studio?", "itemC": "Interrogative Pronouns", "itemD": "Ask him to write a phrase using Interrogative Pronouns." },
            { "itemA": "Used when two or more subjects act in the same way toward each other[Each other (two people),One another (more than two)].", "itemB": "The two brothers always help each other. The team members collaborated with one another to finish the app.", "itemC": "Reciprocal Pronouns", "itemD": "Ask him to write a phrase using Reciprocal Pronouns." }
        ]
    },
    {
        "level": 9,
        "content": [
            { "itemA": "Of: Belonging or connection, With: Accompaniment or instrument, By: Proximity or method, About: Concerning a subject.", "itemB": "The cover of the book, With a friend, with a pen, By the door, by bus, A book about history.", "itemC": "Other Important Prepositions", "itemD": "Say to the user to repeat the phonetic sound of this letter." }
        ]
    },
    {
        "level": 10,
        "content": [
            { "itemA": "Technically adverbs, but they function as connectors between two independent sentences. However, therefore, meanwhile, consequently, furthermore, otherwise.", "itemB": "I worked late; however, I finished the project. I have the results; therefore, I can proceed. The water is boiling; meanwhile, I will prep the vegetables. The power went out; consequently, the server shut down. The design is clean; furthermore, it is very user-friendly. You must save your progress; otherwise, you will lose your work.", "itemC": "Conjunctive Adverbs (Transition Words)", "itemD": "Say to the user to repeat the phonetic sound of this letter." }
        ]
    },
    {
        "level": 11,
        "content": [
            { "itemA": "When we want to express bad about something.", "itemB": "Ugh! I only heard from him Blah! Blah! Blah!. Ew! That food looks disgusting! Yuck! I can't eat that. Phew! That was a close call. Bah! I don't care about that.", "itemC": "Disgust and Boredom. Ugh! Ew! Yuck! Phew! Blah! Bah!", "itemD": "Say to the user to repeat the phonetic sound of this letter." }
        ]
    },
    {
        "level": 17,
        "content": [
            { "itemA": "Work/Worked, Play/Played, Study/Studied, Live/Lived, Walk/Walked, Talk/Talked.", "itemB": "Stop/Stopped, Want/Wanted, Look/Looked, Call/Called, Help/Helped, Use/Used.", "itemC": "Some of the Regular Verbs Samples", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Buy/Bought/Bought, Say/Said/Said, Make/Made/Made, Find/Found/Found, Keep/Kept/Kept, Think/Thought/Thought, Feel/Felt/Felt, Lead/Led/Led.", "itemB": "Cake, Lake, Game, Date.", "itemC": "Be/Was-Were/Been, Go/Went/Gone, Do/Did/Done, See/Saw/Seen, Take/Took/Taken, Eat/Ate/Eaten.", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Let/Let/Let, Read/Read/Read, Shut/Shut/Shut.", "itemB": "Drive/Drove/Driven, Write/Wrote/Written, Sing/Sang/Sung, Fly/Flew/Flown.", "itemC": "Some of the Irregular Variations Samples", "itemD": "Say to the user to repeat the phonetic sound of this letter." }
        ]
    },
    {
        "level": 23,
        "content": [
            { "itemA": "Could/Couldn't (Possibility & Past Ability) are used for things that are possible but not certain, or abilities you had in the past. Would/Wouldn't (Conditional & Intent) are used to describe hypothetical situations (if something were different) or repeated past actions.", "itemB": "I could finish the track today if the MIDI works, but I couldn't play the piano at all when I was younger. I would buy that studio gear if I had the budget, but I wouldn't recommend it for beginners.", "itemC": "Could/Couldn't, Would/Wouldn't", "itemD": "Ask him to write a phrase using Modal Verbs." },
            { "itemA": "May/Might (Possibility) are used to express uncertainty or possibility, are used for things that are likely to happen (May) or slightly less likely (Might). Must (Necessity) is used for strong obligations or logical certainties.", "itemB": "I may have time to work on the project later, but I might be busy with other tasks. You must submit your work by the deadline to receive credit.", "itemC": "May/Might, Must", "itemD": "Say to the user to repeat the phonetic sound of this letter." }
        ]
    },
    {
        "level": 28,
        "content": [
            { "itemA": "If the main verb is in the Present or Future, the following verbs stay in their natural tense to reflect when the action actually occurs.", "itemB": "I believe that he is working, they think the server will crash, and she says she has finished the code.", "itemC": "The Present Anchor", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "If the main verb is in the Past, subordinate verbs usually shift one step further into the past to maintain logical order.", "itemB": "Present becomes Past: He said (past) he was (shifted) busy. Will becomes Would: They knew (past) it would (shifted) rain. Past/Present Perfect becomes Past Perfect: I realized (past) I had lost (shifted) the file.", "itemC": "The Past Anchor (Backshifting)", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "If the statement is a permanent fact, you do not have to shift the tense even if the anchor is in the past.", "itemB": "The professor proved that water boils at 100°C.", "itemC": "The Universal Truth Exception", "itemD": "Say to the user to repeat the phonetic sound of this letter." }
        ]
    },
    {
        "level": 31,
        "content": [
            { "itemA": "The target of the action is a person or thing, followed by their required action. Verbs: Advise, allow, ask, beg, cause, challenge, convince, dare, enable, encourage, expect, forbid, force, hire, instruct, invite, order, permit, persuade, remind, teach, tell, urge, want, warn.", "itemB": "The client persuaded me to redesign the dashboard. The manager ordered the team to meet the deadline. I encouraged my friend to apply for the job. The teacher reminded the students to submit their assignments.", "itemC": "Verb + Object + To-Infinitive", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "You can use either form without changing the message. Both the Gerund and To-Infinitive can function as the object of the verb, and they often convey the same meaning. Verbs: Begin, can't bear, can't stand, continue, hate, like, love, prefer, propose, start.", "itemB": "It started raining or It started to rain. I like swimming or I like to swim. She prefers working from home or She prefers to work from home.", "itemC": "Verb + Gerund OR To-Infinitive (Same Meaning)", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "The choice of form fundamentally changes the logic of the sentence. Some are used for stop, remember, try, mean and regret.", "itemB": "I stopped working (I am no longer working). I stopped to work (I paused another activity in order to start working). I remember meeting him (A past memory). I remembered to meet him (I didn't forget the appointment). Try restarting the router (Experiment to see if it solves the problem). Try to restart the router (Make an effort to do a difficult task). Coding means solving puzzles (Involves/results in). I meant to call you (Intended to). I regret buying this (I am sorry for a past action). I regret to inform you (I am sorry to give this news now).", "itemC": "Verb + Gerund OR To-Infinitive (Different Meaning)", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "These are specific 'helper' or 'causative' verbs. Verbs: Let, make, help (can take 'to' as well), watch, hear, feel, see.", "itemB": "I saw the meter clip during the chorus. Don't let the noise distract you. The teacher made the students rewrite their essays. She helped me to finish the project or She helped me finish the project.", "itemC": "Verb + Bare Infinitive (No 'To')", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Every time a verb follows a preposition, it must end in -ing. Combinations: Adapt to, apologize for, approve of, believe in, care for, complain about, consist of, decide on, depend on, dream of, feel like, insist on, look forward to, object to, pay for, rely on, succeed in, think about, worry about.", "itemB": "I'm looking forward to seeing the final render. She apologized for being late. They succeeded in completing the project on time. We rely on our team to deliver quality work. He insisted on meeting the deadline.", "itemC": "Verb + Preposition + Gerund", "itemD": "Say to the user to repeat the phonetic sound of this letter." }
        ]
    },
    {
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
    },
    {
        "level": 44,
        "content": [
            { "itemA": "To master numbers in English, follow this logical progression from individual symbols to complex data.", "itemB": "0–12: Unique names (Zero, One, Two... Eleven, Twelve). 13–19: The '-teen' suffix (Thirteen, Fourteen). Stress the ending. 20–90: The '-ty' suffix (Twenty, Thirty). Compound Numbers: Join tens and units with a hyphen (Twenty-five, Ninety-nine).", "itemC": "Numbers. General Rules. The Building Blocks (0–99)", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "The 'And' Rule: In British English, use 'and' after the hundred (One hundred and five). In American English, it is often omitted.", "itemB": "100: One hundred. 1,000: One thousand. 1,000,000: One million.", "itemC": "Large Numbers (100+)", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Used for dates, floors, or rankings.", "itemB": "Rule: Add '-th' to the number (Fourth, Tenth). Exceptions: 1st (First), 2nd (Second), 3rd (Third).", "itemC": "Ordinal Numbers (Position)", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Watch for these slight changes when adding the suffix", "itemB": "5th: Fifth (not 'fiveth'), 8th: Eighth (only one 't'), 9th: Ninth (drop the 'e'), 12th: Twelfth (change 'v' to 'f')", "itemC": "Ordinal Numbers (Position). Spelling Adjustments", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "When a number ends in -y, change the -y to -ie before adding -th.", "itemB": "20th: Twentieth, 30th: Thirtieth, 50th: Fiftieth", "itemC": "Ordinal Numbers (Position). The Tens (Ending in '-ty')", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Only the last digit becomes an ordinal number. Use a hyphen.", "itemB": "21st: Twenty-first, 32nd: Thirty-second, 43rd: Forty-third, 54th: Fifty-fourth", "itemC": "Ordinal Numbers (Position). Compound Numbers", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Dates, Sequences, Floors and Centuries", "itemB": "May 4th or The 4th of May. This is my second attempt. I live on the third floor. The 21st century.", "itemC": "Ordinal Numbers (Position). Usage Cases", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Grouped in pairs. Years 2000–2009 are usually 'Two thousand and [number] or in pairs (after 2000).', Decimals: Use the word 'point'. Fractions: Numerator is a cardinal number, denominator is ordinal. , Money: Say the currency after the main number. and Zero: Zero: Scientific/Formal. Oh: Phone numbers/Years (2005 = Twenty-oh-five). Nil: Sports scores. Love: Tennis.", "itemB": "(1998 = Nineteen ninety-eight). Two thousand and five or Twenty twenty five. 5.2 = Five point two. 1/4 = One fourth/quarter. $50.25 = Fifty dollars and twenty-five cents.", "itemC": "Special Categories", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Cardinal (Counting), Ordinal (Dates/Order), Decimals & Percentages and Large Scale (Currency & Statistics)", "itemB": "I have three brothers and twelve acoustic guitars in the studio. My next production deadline is on May 4th, which is the first Monday of the month. The inflation rate increased by 3.5% (three point five percent) this quarter. The government invested $2,500,000 (two million five hundred thousand dollars) into the new tech corridor.", "itemC": "Order of Mastery", "itemD": "Say to the user to repeat the phonetic sound of this letter." }
        ]
    },
    {
        "level": 45,
        "content": [
            { "itemA": "To master general symbols in English, focus on their names in technical, digital, and everyday contexts.", "itemB": ". – Period (US) / Full stop (UK) , – Comma ; – Semicolon : – Colon ! – Exclamation point ? – Question mark ' – Apostrophe (e.g., it's) or Single quote \" – Quotation marks / Double quotes", "itemC": "General Symbols. Punctuation & Writing", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "There are lot's of them, but these are the most common ones you will encounter in digital communication and technical contexts.", "itemB": "@ – At (used in emails and handles) # – Hashtag / Number sign / Pound _ – Underscore - – Hyphen (joining words) or Dash (separating thoughts) / – Slash / Forward slash  – Backslash (mostly used in file paths) ~ – Tilde", "itemC": "Digital & Social Media", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Master the language by studying everyday.", "itemB": "+ – Plus - – Minus * – Asterisk (or Times in math) / – Divided by = – Equals % – Percent < > – Less than / Greater than ± – Plus-minus", "itemC": "Math & Logic", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Your commitment to mastering English is commendable. To further enhance your skills, focus on learning the names and uses of general symbols in various contexts. This will not only improve your writing but also help you navigate digital communication more effectively.", "itemB": "( ) – Parentheses (US) / Round brackets (UK) [ ] – Brackets (US) / Square brackets (UK) { } – Braces / Curly brackets < > – Angle brackets", "itemC": "Brackets (Groupings)", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Learn about business and finance always helps to understand how the world works and moves.", "itemB": "$ – Dollar sign & – Ampersand (means 'and') © – Copyright ® – Registered trademark *– Bullet point ¶ – Paragraph mark / Pilcrow", "itemC": "Financial & Reference", "itemD": "Say to the user to repeat the phonetic sound of this letter." }
        ]
    },
    {
        "level": 46,
        "content": [
            { "itemA": "Country / Nation: The sovereign state. State: A territory with its own government, typical of federations. Province: A primary administrative division, common in unitary or Commonwealth countries. Region: A broader area often based on geography or culture. Department (Departamento): Common in Latin American and French systems. Territory: An area managed by the national government that isn't a state.", "itemB": "Costa Rica, Colombia, USA. Florida, Texas, Antioquia. San José, Ontario, British Columbia. The Andean Region, The Midwest. Atlántico, Colombia. Puerto Rico, Yukon.", "itemC": "Countries. Primary Administrative Terms", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "United States: State, County. Canada: Province, Municipality. Costa Rica: Province, Canton. Colombia: Department, Municipality. United Kingdom: Country, Council Area / County.", "itemB": "New York, Kings County. Quebec, Montreal. San José, Escazú. Atlántico, Barranquilla. Scotland, Edinburgh.", "itemC": "Examples of Hierarchy by Country", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "When describing where a place is located, we use Adjective + Region.", "itemB": "Northern: 'I live in Northern Costa Rica.' Southern: 'The Southern United States is known for its heat.' Eastern / Western: 'The Eastern Seaboard.' Central: 'The Central Valley (Valle Central).'", "itemC": "Compass Directions & Regions", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Some countries use unique names for their regions.", "itemB": "The Caribbean / The Coast: Used in Colombia and Costa Rica for the Atlantic side. The Tri-State Area: (US) Usually referring to New York, New Jersey, and Connecticut. The Maritimes: (Canada) The eastern provinces by the sea. The Outback: (Australia) The remote, dry inland areas.", "itemC": "Specific Regional Terms", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Some examples of how to refer about this topic while we talk to someone.", "itemB": "Question: 'Where are you from?' General Answer: 'I'm from Costa Rica.'Specific Answer: 'I live in San José province, but I'm moving to the department of Atlántico in Colombia.'Clarification: 'Is Barranquilla a state?'-'No, it's a city located in the department of Atlántico.'", "itemC": "How to Ask and Answer", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "This is the largest group. If you aren't sure, this is usually the safest guess.", "itemB": "Costa Rica-Costa Rican, Colombia-Colombian, Brazil-Brazilian, Germany-German, Italy-Italian, Egypt-Egyptian, Canada-Canadian, Australia-Australian, United States-American.", "itemC": "National Adjectives (Demonyms). The '-an' / '-ian' Group (Most Common)", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Commonly used for European and Northern countries.", "itemB": "Spain-Spanish, England-English, Turkey-Turkish, Sweden-Swedish, Poland-Polish, Ireland-Irish, Britain-British.", "itemC": "The '-ish' Group", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Often used for East Asian and some Middle Eastern/African countries.", "itemB": "China-Chinese, Japan-Japanese, Portugal-Portuguese, Vietnam-Vietnamese, Lebanon-Lebanese", "itemC": "The '-ese' Group", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Mostly used for countries in the Middle East and South Asia.", "itemB": "Iraq-Iraqi, Israel-Israeli, Pakistan-Pakistani, Kuwait-Kuwaiti, Saudi Arabia-Saudi (or Saudi Arabian).", "itemC": "The '-i' Group", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Some European countries.", "itemB": "France-French, Greece-Greek, Iceland-Icelandic.", "itemC": "The '-ic' or '-ch' Group", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "These are some rare variations of the names.", "itemB": "The Netherlands (Holland)-Dutch, Switzerland-Swiss, Thailand-Thai, Philippines-Filipino (Male/General) / Filipina (Female), New Zealand-New Zealander", "itemC": "Irregulars & Special Cases", "itemD": "Say to the user to repeat the phonetic sound of this letter." },
            { "itemA": "Capitalization: Nationalities are always capitalized in English. Adjective vs. Noun vary it's meaning. Also there is some Arab distinction.", "itemB": "He is Costarrican. Adjective: 'He is Italian.' (Describes the person). Noun: 'He is an Italian.' (Refers to the person as a member of the group). Arab: Refers to the ethnicity/people group. Arabic: Refers to the language. Saudi / Emirati: Refers to the specific nationality.", "itemC": "Important Grammar Rules", "itemD": "Say to the user to repeat the phonetic sound of this letter." }
        ]
    }
];

async function syncCompleteData() {
    console.log("🔄 Starting deep synchronization of all JSON fields...");

    for (const levelData of fullData) {
        const levelId = levelData.level;

        try {
            // Fetch current items for this level to find matching 'item_c' or 'item_a' to update correctly
            const { data: existingItems } = await supabase
                .from('level_content')
                .select('id, item_a, order_index')
                .eq('level_id', levelId)
                .order('order_index', { ascending: true });

            const payload = levelData.content.map((item, index) => {
                // 1. Use .trim() to ensure strings match even if there are trailing spaces
                const match = existingItems?.find(ei =>
                    ei.item_a?.trim() === item.itemA?.trim()
                );

                // 2. Build the row object clearly
                const row = {
                    level_id: levelId,
                    item_a: item.itemA,
                    item_b: item.itemB,
                    item_c: item.itemC,
                    item_d: item.itemD,
                    order_index: match ? match.order_index : index
                };

                // 3. ONLY add the id property if the match actually exists.
                // If it's a new row, we MUST NOT include the 'id' key at all.
                if (match?.id) {
                    Object.assign(row, { id: match.id });
                }

                return row;
            });

            const { error } = await supabase
                .from('level_content')
                .upsert(payload, { onConflict: 'id' });

            if (error) throw error;
            console.log(`✅ Level ${levelId}: Corrected and synchronized all ${payload.length} items.`);

        } catch (err) {
            console.error(`💀 Failed tactical insertion for Level ${levelId}:`, err);
        }
    }
    console.log("✨ Data sync complete. All fields now match your provided JSON exactly.");
}

syncCompleteData();