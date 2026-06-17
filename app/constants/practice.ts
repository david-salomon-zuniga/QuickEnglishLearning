import { shuffleArray } from "@/app/lib/utils";

export enum PracticeType {
    IMAGE_PARAGRAPH = 'IMAGE_PARAGRAPH',
    ACTION_REACTION = 'ACTION_REACTION',
    LISTEN_SPEAK = 'LISTEN_SPEAK',
    LISTENING_COMPREHENSION = 'LISTENING_COMPREHENSION',
    VIDEO = 'VIDEO',
    TEXT = 'TEXT'
}

export const PLACEHOLDER_QUESTIONS = [
    "What is your favorite food?",
    "Where do you live?",
    "Why are you studying English?",
    "What did you do yesterday?",
    "How do you feel today?",
    "What is your dream job?",
    "Do you prefer coffee or tea?",
    "What is the last book you read?",
    "What kind of music do you like?",
    "What is your favorite movie?",
    "Do you have any pets?",
    "What is your favorite season?",
    "How do you relax after work?",
    "What is your favorite hobby?",
    "Where would you like to travel next?",
    "What is your favorite childhood memory?",
    "Do you like to cook?",
    "What is your favorite sport?",
    "Are you a morning person or a night owl?",
    "What is the best gift you ever received?",
    "What is your favorite color?",
    "Do you prefer the beach or the mountains?",
    "What is your greatest achievement?",
    "What is your favorite holiday?",
    "How many languages can you speak?",
    "What is your favorite animal?",
    "Do you enjoy exercising?",
    "What is your favorite city in the world?",
    "What is the most interesting place you’ve visited?",
    "What is your favorite TV show?",
    "Do you like to dance?",
    "What is your favorite dessert?",
    "How do you spend your weekends?",
    "What is your favorite way to travel?",
    "Do you play any musical instruments?",
    "What is your favorite restaurant?",
    "What is your favorite app on your phone?",
    "Do you like to take photos?",
    "What is your favorite weather?",
    "What is your favorite board game?",
    "Do you prefer physical books or e-books?",
    "What is your favorite flower?",
    "What is your favorite fruit?",
    "Do you like to go to the cinema?",
    "What is your favorite video game?",
    "What is your favorite memory from school?",
    "Do you have a favorite quote?",
    "What is your favorite ice cream flavor?",
    "Do you like to go camping?",
    "What is your favorite shopping mall?",
    "What is your favorite breakfast?",
    "Do you prefer cats or dogs?",
    "What is your favorite way to stay active?",
    "What is your favorite piece of clothing?",
    "Do you like to watch the news?",
    "What is your favorite scent?",
    "What is your favorite kind of bread?",
    "Do you like to go to museums?",
    "What is your favorite pizza topping?",
    "What is your favorite type of art?",
    "Do you like to garden?",
    "What is your favorite snack?",
    "What is your favorite time of day?",
    "Do you like to go to concerts?",
    "What is your favorite vegetable?",
    "What is your favorite subject to learn about?",
    "Do you prefer sweet or salty snacks?",
    "What is your favorite type of car?",
    "Do you like to write?",
    "What is your favorite public park?",
    "What is your favorite holiday tradition?",
    "Do you like to swim?",
    "What is your favorite drink?",
    "What is your favorite souvenir?",
    "Do you like to visit zoos?",
    "What is your favorite historical era?",
    "What is your favorite type of tea?",
    "Do you prefer silver or gold jewelry?",
    "What is your favorite street in your city?",
    "Do you like to go to the theater?",
    "What is your favorite magazine?",
    "What is your favorite hairstyle?",
    "Do you like to play cards?",
    "What is your favorite month of the year?",
    "What is your favorite way to celebrate your birthday?",
    "Do you prefer hot or cold weather?",
    "What is your favorite sandwich?",
    "Do you like to visit libraries?",
    "What is your favorite way to commute?",
    "What is your favorite kitchen appliance?",
    "Do you like to watch documentaries?",
    "What is your favorite planet?",
    "What is your favorite emoji?",
    "Do you prefer jeans or sweatpants?",
    "What is your favorite type of pasta?",
    "Do you like to go to art galleries?",
    "What is your favorite instrument to listen to?",
    "What is your favorite way to help others?",
    "Do you like to solve puzzles?",
    "What is the first thing you do when you wake up?"
];

// --- FUENTES LIBRES ---
// Audio: Wikimedia Commons / VOA Learning English (Public Domain)
// Video: YouTube (Creative Commons / Educational Reuse)

export const AUDIO_PRACTICE_DATA = [
    {
        id: 1,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Alessia_Cara%27s_%22Here%22_on_VOA%27s_Top_5_Countdown_for_Week_End_Feb._6_%28February_2%2C_2016%29.mp3",
        questions: [
            "1. Talk using the last mentioned words you just learned.",
            "2. Create a paragraph using your imagination.",
            "3. Get your attitude up high and do it without hesitating."
        ]
    },
    {
        id: 2,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9d/VOA_Learning_English_Trending_Today-_Puppy_Bowl.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 3,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/6/63/VOA_Learning_English_-_UN-_Technology_Threatens_Whistled_Language_in_Turkey_%28crop%29.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 4,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Machine_learning_uses_computer_algorithms_to_teach_machines_to_make_independent_decisions_by_learning_from_earlier_or_existing_behavior.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 5,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/6/68/This_is_a_machine_learning_method_that_includes_speech_and_facial_recognition_systems.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 6,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/Machine_learning_was_the_most_common_method_of_AI_listed_in_patent_requests.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 7,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/It_noted_China_was_especially_strong_in_the_fast-growing_area_of_%E2%80%9Cdeep_learning.%E2%80%9D.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 8,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/4/43/Another_kind_of_machine_learning%2C_called_neural_networks%2C_is_also_%E2%80%9Crevolutionizing%E2%80%9D_AI%2C_the_report_said.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 9,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/It_includes_patent_requests_in_machine_learning_through_2016%2C_the_last_year_for_which_details_are_available.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 10,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Patent_requests_for_machine_learning_activities_grew_on_average_by_28_percent_a_year_between_2013_and_2016%2C_the_study_found.ogghttps://www.learningenglish.voanews.com/podcasts/embed/5193076.html", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 11,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/The_report_said_that_deep_learning_methods_increased_from_just_118_patent_requests_in_2013_to_nearly_2%2C400_in_2016.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 12,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/7/78/Much_of_today%E2%80%99s_AI-related_technologies_are_powered_by_machine_learning.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 13,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/0/03/Ashley_Johnson_is_an_energy%2C_trade_and_economics_expert.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 14,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c7/The_team_uses_special_equipment_to_collect_data_on_temperature%2C_wind_speed_and_rainfall.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 15,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/d/db/%E2%80%9CThat%E2%80%99s_heightened_by_the_impact_of_climate_change%2C%E2%80%9D_she_added.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 16,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/d/da/Oh%2C_Pete._This_is_not_the_gym.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 17,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/People_in_Washington_like_to_work_out%21.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 18,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/a/af/Baishui_is_about_as_close_to_the_equator_as_Tampa%2C_Florida.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 19,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/%E2%80%9COnly_when_we_climb_up_can_we_see_it%2C%E2%80%9D_he_said_sadly.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 20,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/6/68/Hi%2C_Anne._Are_you_busy_-_Hi%2C_Anna._Yes._At_10_a.m._I_am_writing.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 21,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/Even_when_teams_are_not_providing_vaccinations%2C.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 22,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/Scientists_say_it_is_one_of_the_world%E2%80%99s_fastest-melting_glaciers.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 23,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/China_plans_to_create_snow_there_and_block_streams_to_increase_the_amount_of_water_in_the_air%2C_which_slows_melting.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 24,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/6/68/The_single_most_popular_AI_technology_identified_in_the_report_was_computer_vision.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 25,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f8/WIPO_reported_that_China_had_17_of_the_top_20_academic_organizations_filing_for_AI-related_patents_%26_2_other_sentences.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 26,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/4/43/He_says_the_CDC_uses_technology_to_track_migrant_groups.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 27,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/One_recent_morning_the_team_had_to_replace_a_broken_weather_research_station.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 28,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4e/The_images_it_captured_help_tell_a_story.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 29,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/6/66/In_other_areas%2C_glacier_loss_creates_serious_risk_of_a_dry_period_across_the_Third_Pole%2C_Wang_said.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 30,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/3/38/The_organization_says_on_its_website_that_WIPO_aims_to_%E2%80%9Clead_the_development_of_a_balanced_and_effective_international_intellectual_property_system.%E2%80%9D.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 31,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/Anna_Where_are_you_Marsha%2C_I_am_in_the_bathroom%21.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 32,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/They_also_have_to_deliver_several_doses_of_the_vaccine.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 33,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/%E2%80%9CI_don%E2%80%99t_think_about_it_now_because_it_still_has_a_long_way_to_go%2C%E2%80%9D_he_said.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 34,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/3/39/And_medical_teams_cannot_always_track_the_migrants.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 35,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/1/10/But_unrest%2C_conflict_and_the_extreme_remoteness.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 36,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/He_said%2C_%E2%80%9CWhere_we%E2%80%99re_at_right_now_was.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 37,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Go_that_way.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 38,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Marsha%27s_work_number_is_555-8986.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 39,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Oh%2C_hi%2C_Pete._How%E2%80%99s_it_going.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 40,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/How%27s_the_new_apartment.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 41,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/Yang_says_he_remembers_being_able_to_see_the_glacier%E2%80%99s_lowest_edge_from_his_home_village.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 42,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Anna._-_Yes%2C_Ms._Weaver._-_Are_you_busy_-_Yes%2C_Ms._Weaver._I_am_busy._-_My_office._500_p.m._-_500_p.m.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 43,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/8/89/The_research_station_that_houses_Wang_and_his_team_is_outside_Lijiang.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 44,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Come_in._%E2%80%A6_Well%2C_Anna%2C_welcome._%E2%80%95_Thank_you.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 45,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Financial_supporters%2C_leaders%2C_health_workers_and_the_public_are_tired.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 46,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f1/But_when_it_comes_to_actually_vaccinating_people%2C.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 47,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Wang_notes_that_flowers_have_rooted_and_grow_in_the_area_once_covered_with_ice.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 48,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/1/11/I_am_sorry._You_have_the_wrong_number.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 49,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Johnson_said%2C_%E2%80%9CDepending_on_how_it_melts%2C.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    },
    {
        id: 50,
        type: "audio",
        audioUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/A_United_Nations_agency_says_the_United_States%2C_China_and_Japan_are_leading_the_world_in_developing_artificial_intelligence%2C_or_AI%2C_technology.ogg", // Ejemplo de VOA
        questions: ["What is the main topic of the news?", "Summarize the speaker's opinion.", "Explain one new word you heard."]
    }
];

export const VIDEO_PRACTICE_DATA = [
    {
        id: 1,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/a0ySbCIgEZQ?si=exI9jufwXjv-Wgn",
        title: "Video Activity",
        description: "Listen to the dialogue about daily habits.",
        questions: "What's the video about?"
    },
    {
        id: 2,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/_Sl8diqCAFw?si=iDhRLjkiDq0gwW0Q",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 3,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/rwYbZ5JHOKw?si=cG5c0nkSjLFmknTN",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 4,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/XqXZ4beoHvs?si=uVFCR2dYQJ0IBRqs",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 5,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/DHg1zb1Yfv0?si=242v6NuoEcMTMRH0",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 6,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/9LxkSNmb8oo?si=NX9F8dq2a3V8P1La",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 7,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/LSssKRamPJ4?si=iWDqmjvoBCoQpz6L",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 8,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/RHx7d4-r_Sw?si=6if6mQi1OlvEJl3L",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 9,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/7mL2OuT1Vnc?si=XV73DtBBMcVbIehE",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 10,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/olsuNnTnhaU?si=Xyy_Jm8rb3tH_yEl",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 11,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/8TQCamqQXnM?si=qIM-iT4n0aAcWtbq",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 12,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/osgCLMWhHmk?si=foQy2fIBzH_iK4Ua",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 13,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/81PLKhBMyi0?si=wHqgDaQpIjtdGUvT",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 14,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/qDo-64aDu-0?si=YU3nvvqvxomcuU75",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 15,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/isDNTh4rZe0?si=0nI_a8c_JHZmg8Q9",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 16,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/o_ntKabOTIU?si=eZFTlUSDtoXz44yB",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 17,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/4ELEOYXr8vU?si=gxvoRj7uBQhQbozj",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 18,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/WzpHmjKGcYM?si=qxGMHFickIvCpO9j",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 19,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/hZ-6aS67ASw?si=yljT5lYA92_4_qEJ",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 20,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/MEgWJ0N8zvo?si=BvRF30nTc7E6Bu18",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 21,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/AWc7aKgS0LI?si=7iKVyruFGjcIgYMY",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 22,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/LUPQ9JPd7Es?si=RmtBrLqeBpRXUOYx",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 23,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/p5bqu-JEXkY?si=ndJ2cf0ElNbNwxcm",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 24,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/G-0DGYQPkao?si=I4g4OoGyXyfIWi37",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 25,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/at9QsLWJsl8?si=r4ffxbIabNNW9Wmt",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 26,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/rtoflJsluoU?si=H5PkcIpldGbZ4BMZ",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 27,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/Jg8GrcQPbVw?si=03HqaK3AhmVidm38",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 28,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/81PLKhBMyi0?si=2JAofc4pUsqP0DA8",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 29,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/dmtF_4XxpRA?si=vWb_wLLnySiHK3Dp",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 30,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/0fyNm1nHAcI?si=5RcQ7Di5YfRr1HHA",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 31,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/ZARRCOb0P_o?si=1X6e0VxE-4_znB24",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 32,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/beSQ_ISZODo?si=761Gnk4aQWpqMq-X",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 33,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/nWq0y2BJ-9o?si=MAcVt6Wt1A-IrQzU",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 34,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/LWmvnqX7-t0?si=uJclqWclIQ60zD4e",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 35,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/Scqj5TAEpRk?si=iCKxW2Z_XEOqU4HI",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 36,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/s8kFIvMeN1I?si=jfhwOT04Y76m_dBW",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 37,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/8CJ5a_Wbbz8?si=dXV0KNhR5NOGksza",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 38,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/yZz1NfYwgaE?si=szd4pCnKU_X4jg_R",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 39,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/ZgzTjnL4PYI?si=Jow_okYXd2Wgcho_",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 40,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/NFQpo6xkYQk?si=8kYOMRtVtc4-FCCt",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 41,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/bcDh2ACCwbk?si=Rzecs-sCxKA__uIC",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 42,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/M_ybRj-oLVk?si=FF4h-HCHEzhFHEia",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 43,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/l2IKFrczAcI?si=QswNK31RLIqx6Zfu",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 44,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/1dYlJBKVeWU?si=OuFBDYDFIW2M-W0Y",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 45,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/MGLJkvkPCbY?si=XgdZl5iJBH1FxeWA",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 46,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/S_I_6U2YV70https://www.youtube.com/embed/FI_eXRU-aRg?si=KAO9-UY3cZycc2WY",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 47,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/2GE5uA61NwQ?si=TKVluqSIufuAR_2e",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 48,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/rrdgmILElx4?si=ZffNQHcFMZI8w4H9",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 49,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/XoS8bYaqlHE?si=Rt_hWxxNxmVU0amI",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    },
    {
        id: 50,
        type: "youtube",
        videoUrl: "https://www.youtube.com/embed/ANkZYCa6_kA?si=Zlrv1LjRL9LExGrh",
        title: "Video Activity",
        description: "Practice travel-related vocabulary.",
        questions: "What's the video about?"
    }
];

// Función para obtener datos aleatorios y evitar que se repitan en la misma sesión
export const getShuffledVideoData = () => shuffleArray(VIDEO_PRACTICE_DATA);
export const getShuffledAudioData = () => shuffleArray(AUDIO_PRACTICE_DATA);

