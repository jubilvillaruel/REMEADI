const meditationDescDB = {
    'Lectio Divina' : "A contemplative way of reading the Bible. It dates back to the early centuries of the Christian Church and was established as a monastic practice by Benedict in the 6th century. It is a way of praying the scriptures that leads us deeper into God's word.",
    'Christian Meditation' : "Meditation is above all a quest …To the extent that we are humble and faithful, we discover in meditation the movements that stir the heart and we are able to discern them. It is a question of acting truthfully in order to come into the light: “Lord, what do you want me to do?",
    'Examen' : "The Daily Examen is a technique of prayerful reflection on the events of the day in order to detect God’s presence and discern his direction for us. The Examen is an ancient practice in the Church that can help us see God’s hand at work in our whole experience.",
    'Rosary' : "The Rosary is the most excellent form of prayer and the most efficacious means of attaining eternal life. It is the remedy for all our evils, the root of all our blessings. There is no more excellent way of praying.",
    'Taffakur' : "Tafakkur is an important act of worship in Islam. Tafakkur is to meditate over your sins, creation, yourself and to take lessons from the things Allahu ta’âlâ has created.",
    'Dhikr' : "A form of worship that comes after the ritual Prayer (salah) and reading Qur’an in importance. While salah has to be performed at certain times and under certain conditions of purity, dhikr can be made any time, any place.",
    'Muraqaba' : "An Arabic word for “meditation”, usually a variety performed in Sufi Islam. Muraqabah is slightly different from meditation, since it is a religious practice, while meditation is for the peace of mind. Prophet Muhammad SAW performed this practice when he retreated to the Cave of Hira.",
    'Sufi Breathing' : "A central component of Islamic spirituality. The Sufi tradition centres on developing a personal relationship with God through self-knowledge and self-inquiry. It uses Zikr (chanting) and Muraqba (meditation) to empty the mind and heart of spiritual pollutants.",
    'Hatha Yoga' : "Hatha yoga can be described as a set of willful and active practices that aim to achieve harmony and balance in the mind, body, and spirit.",
    'Kriya Yoga' : "Is believed to originate in divinity, not in human creation. The two syllables in the word Kriya each help to indicate its meaning. “Kri” means karma dhatu (the action of the elements), while “ya” means soul. Thus, the word kriya literally translates to action of the soul.",
    'Chakra' : "Focusing on one of your energy centers to unblock it, restore balance, or address specific associated issues. You can do it on your own or take part in guided chakra meditations.",
    'Breath' : "A very basic yet powerful mindfulness meditation practice. The idea is simply to focus your attention on your breathing—to its natural rhythm and flow and the way it feels on each inhale and exhale. ",
    'Walk' : "Walking meditation is simply bringing your attention to your feet, your body and the ground below you and focusing your mind on what it feels like to walk.",
    'Tonglen' : "Also known as “taking and sending,” reverses our usual logic of avoiding suffering and seeking pleasure. In tonglen practice, we visualize taking in the pain of others with every in-breath and sending out whatever will benefit them on the out-breath. In the process, we become liberated from age- old patterns of selfishness.",
    'Metta' : "A Buddhist practice for cultivating compassion for ourselves and others through directing loving, friendly phrases and goodwill. The word “metta” is a Pali word, most often translated as loving-kindness, but has also been translated as universal goodwill or loving-friendliness. ",
    'Body Scan' : "Designed to counteract these negative feelings toward our bodies. This practice may also increase our general attunement to our physical needs and sensations, which can in turn help us take better care of our bodies and make healthier decisions about eating, sleep, and exercise.",
    'Hitbodedut' : "A style of prayer first popularized by Rebbe Nachman of Breslov, is the act of open, spontaneous, and direct communication with God, and is accessible to all, regardless of how deeply one is engaged in Judaism.",
    'Kabbalistic/Chassidic' : "Kabbalistic meditation is a form of spiritual practice rooted in the Jewish mystical tradition of Kabbalah. It combines various techniques, including visualization, breathwork, and contemplation, to connect with the divine and gain insight into the nature of reality.",
    'Shema' : "Shema meditation refers to the practice of meditating on the Shema, which is one of the most important prayers in Judaism. The Shema is a central declaration of faith and devotion to God, traditionally recited twice daily by Jewish individuals.",
}

const religionDB = {
    'Christianity': ['Lectio Divina','Christian Meditation','Examen','Rosary'],
    'Islam': ['Taffakur','Dhikr','Muraqaba','Sufi Breathing'],
    'Hinduism': ['Hatha Yoga','Kriya Yoga','Chakra'],
    'Buddhism': ['Breath','Walk','Tonglen','Metta','Body Scan'],
    'Judaism': ['Hitbodedut','Kabbalistic/Chassidic','Shema'],
}

const timeDB = {
    'Lectio Divina' : 0,
    'Christian Meditation' : 0,
    'Examen' : 0,
    'Rosary' : 1200000, // 20 mins
    'Taffakur' : 0,
    'Sufi Breathing' : 600000, //10 mins
    'Chakra' : 0,
    'Hitbodedut' : 0,
    'Rosary' : 0,
    'Hatha Yoga': 0,
    'Kriya Yoga' : 0,
}

const timeDB2 = {
    'Dhikr' : [5,10,15],
    'Muraqaba' : [1,5,10],
    'Breath' : [5,15,30],
    'Walk' : [10,20,30],
    'Tonglen' : [5,15,30],
    'Metta' : [10,15,20],
    'Body Scan' : [20,30,45],
    'Kabbalistic/Chassidic' : [10,20,30],
    'Shema' : [10,20,30]
}

const timeDB3 = {
    'Rosary' : 1200000, // 20 mins
    'Hatha Yoga': null,
    'Kriya Yoga' : null,
}



const getCategoryByPractice = (title) => {
    // loop through religionDB and return key if value matched with title
    for(let [key,value] of Object.entries(religionDB))
    {
        let matchFound=false;
        for(var i in value){
            const practiceTitle = value[i];
            // console.log(`Checking ${practiceTitle}`);
            if((new RegExp('^'+practiceTitle+'$', "gi")).test(title)){
                // console.log(`${title}: Matched to Practice: "${practiceTitle}" under Religion:${key}`)
                matchFound=true;
                break;
            }  
        }
        if(matchFound== true )return  {key};
    };
    return 'General' ;
}

export { meditationDescDB, religionDB, getCategoryByPractice, timeDB, timeDB2, timeDB3 } 