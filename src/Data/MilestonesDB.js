const generalMDB = {
   'The Meditator': 'Achieve by performing at least one meditation practice from each religion',
   'Spiritual Meditation Expert': 'Achieve by finishing all the meditation practices of all religions' ,
   'Spiritual Commitment': 'Achieve by performing 1 meditation session everyday for 50 consecutive days'
}

const christianityMDB = {
   'Scripture Master' : 'Perform all the meditation practices in Christianity.',
   'Dual Deliberation': 'Achieve by practicing Examen twice in one day',
   'Rosary Devotee' : 'Perform all the rosary mysteries in the range of 1 week.',
   'Man of Scriptures' : 'Perform 31 consecutive Lectio Divina sessions for 1 month (1 session per day).',
   'Bible Meditation Expert' : 'Reach a total of 100 hours in Christian Meditation.',
}

const islamMDB = {
   'Islamic Knowledge' : 'Perform all meditation practices in Islam.',
   'Dhikr Devotee' : 'Achieve this milestone by performing 100 hours of Dhikr Meditation',
   'Muraqaba Mastery' : 'Achieve this milestone by performing Muraqaba at least 20 minutes in 1 session',
   'Taffakur Insight' : 'Achieve this by consistently performing Taffakur in 5 days.',
   'Sufi Breathing Prowess' : 'Achieve by performing 50 Sufi Breathing Meditation in 1 month'
}

const hinduismMDB = {
   'Enlightened Explorer' : 'Completed all the meditation practices in Hinduism.',
   'Hindu Hobbyist' : 'Completed by spending 7 consecutive days of Chakra meditation',
   'Asana Apprentice' : 'Completed all the beginner level yoga poses of Hatha Yoga',
   'Pose Prodigy' : 'Completed all the intermediate level yoga poses of Hatha Yoga',
   'Supreme Serenity' : 'Completed all the advanced level yoga poses of Hatha Yoga',
   'Hathathon' : 'Completed 5 consecutive Hatha Yoga poses for a duration of at least 24 hours',
   'Prana Pinnacle' : 'Completed the first stage of Kriya Yoga',
   'Chakra Champion' : 'Completed the second stage of Kriya Yoga',
   'Heart Harmony' : 'Completed the third stage of Kriya Yoga',
   'Muladhara Marvel' : 'Completed the fourth stage of Kriya Yoga',
   'Transcendental Transcender' : 'Completed the fifth stage of Kriya Yoga',
   'Samadhi Seeker' : 'Completed the sixth stage of Kriya Yoga',
   'Synchronized Serenity' : 'Completed all the stages of Kriya Yoga in a single day',
}

const buddhismMDB = {
   'Way of the Buddha' : 'Perform all meditation practices in Buddhism',
   '30 Minutes of Stillness': 'spend an uninterrupted 30 minutes of breath meditation ',
   'Mindful Steps': 'spend at least 30 mins in Walking Meditation',
   'Hundred Acts of Compassion': 'engage in a 100 deliberate acts of compassion through the practice of Tonglen for 100 mins',
   'Month-long Body Scan Mastery': 'The goal is to engage in the Body Scan practice daily for 30 days',
   'Boundless Heart': 'Accumulate 500 minutes of dedicated practice of Metta, Loving-Kindness',
}

const judaismMDB = {
   'Ethical Living' : 'Perform all meditation practices in Judaism.',
   'Mystical Reflector': 'Perform Kabbalistic/Chassidic Meditation for 2 consecutive weeks',
   'Shema Contemplator': 'Achieve by performing Shema Meditation 3 times in one day.',
   'Hitbodedut Dedication': 'Achieve by performing 30 min Hitbodedut sessions for 3 times.',
}

const milestoneReligionDB = {
   'Lectio Divina' : 'Man of Scriptures',
   'Christian Meditation': 'Scripture Master',
   'Examen' : 'Bible Meditation Expert',
   'Rosary' : 'Rosary Devotee',
   // =================================== to be udpate
   'Taffakur' : 'Taffakur Insight',
   'Dhikr' : 'Dhikr Devotee',
   'Muraqaba' : 'Muraqaba Mastery',
   'Sufi Breathing' : 'Sufi Breathing Prowess',
   // =========================
   'Hatha Yoga' : 'Enlightened Explorer',
   'Kriya Yoga' : 'Enlightened Explorer',
   'Chakra' : 'Enlightened Explorer',
   'Breath' : 'Way of the Buddha',
   'Walk' : 'Way of the Buddha',
   'Tonglen' : 'Way of the Buddha',
   'Metta' : 'Way of the Buddha',
   'Body Scan': 'Way of the Buddha',
   'Hitbodedut' : 'Ethical Living',
   'Kabbalistic/Chassidic' : 'Ethical Living', 
   'Shema' : 'Ethical Living',
   // =================================== to be udpate
}

const genMilestoneReligionDB = {
   'Christianity': 'Scripture Master',
   'Islam' : 'Islamic Knowledge',
   'Hinduism' : 'Enlightened Explorer',
   'Buddhism' : 'Way of the Buddha',
   'Judaism' : 'Ethical Living',
}

export { christianityMDB, islamMDB, hinduismMDB, buddhismMDB, judaismMDB, milestoneReligionDB, genMilestoneReligionDB, generalMDB };