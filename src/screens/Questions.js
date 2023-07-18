import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { screenWidth, screenHeight } from '../components/dimensions';
import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { meditationImgDB } from '../Data/ImageDB';

const followUpQuestions = {
    C1: {
        Mindfulness: {
            question: 'Do you want to follow specific steps during your meditation session?',
            options: [
                {
                    label: 'Yes',
                    question: 'Do you want to meditate around reading and reflecting on biblical texts?',
                    options: [
                        {
                            label: 'Yes',
                            title: 'Lectio Divina',
                            guideImg: meditationImgDB['Lectio Divina'],
                            bia: '',
                        },
                        {
                            label: 'No',
                            title: 'Examen',
                            guideImg: meditationImgDB['Examen'],
                            bia: '',
                        },
                    ],
                },
                {
                    label: 'No',
                    title: 'Christian Meditation',
                    guideImg: meditationImgDB['Christian Meditation'],
                    bia: '',
                },
            ],
        },

        Spiritual: {
            question: 'Do you want to follow specific steps during your meditation session?',
            options: [
                {
                    label: 'Yes',
                    question: 'Do you want to meditate around reading and reflecting on biblical texts?',
                    options: [
                        {
                            label: 'Yes',
                            title: 'Lectio Divina',
                            guideImg: meditationImgDB['Lectio Divina'],
                            bia: '',
                        },
                        {
                            label: 'No',
                            question: 'Are you interested in repeating meditation phrases?',
                            options: [
                                {
                                    label: 'Yes',
                                    title: 'Rosary',
                                    guideImg: meditationImgDB['Rosary'],
                                    bia: '',
                                },
                                {
                                    label: 'No',
                                    title: 'Examen',
                                    guideImg: meditationImgDB['Examen'],
                                    bia: '',
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'No',
                    title: 'Christian Meditation',
                    guideImg: meditationImgDB['Christian Meditation'],
                    bia: '',
                },
            ],
        },

        Focused: {
            question: 'Do you want to meditate around reading and reflecting on biblical texts?',
            options: [
                {
                    label: 'Yes',
                    title: 'Lectio Divina',
                    guideImg: meditationImgDB['Lectio Divina'],
                    bia: '',
                },
                {
                    label: 'No',
                    question: 'Are you interested in repeating meditation phrases?',
                    options: [
                        {
                            label: 'Yes',
                            title: 'Rosary',
                            guideImg: meditationImgDB['Rosary'],
                            bia: '',
                        },
                        {
                            label: 'No',
                            title: 'Examen',
                            guideImg: meditationImgDB['Examen'],
                            bia: '',
                        },
                    ],
                },
            ],
        },

        Mantra: {
            question: 'Do you want to meditate using rosary beads?',
            options: [
                {
                    label: 'Yes',
                    title: 'Rosary',
                    guideImg: meditationImgDB['Rosary'],
                    bia: '',
                },
                {
                    label: 'No',
                    title: 'Christian Meditation',
                    guideImg: meditationImgDB['Christian Meditation'],
                    bia: '',
                },
            ],
        },

        'Loving-Kindness': {
            title: 'Rosary',
            guideImg: meditationImgDB['Rosary'],
            bia: '',
        },

        'Visualization': {
            title: 'Examen',
            guideImg: meditationImgDB['Examen'],
            bia: '',
        },
    },

    C2: {
        Mindfulness: {
            question: 'Do you want to follow specific steps during your meditation session?',
            options: [
                {
                    label: 'Yes',
                    title: 'Lectio Divina',
                    guideImg: meditationImgDB['Lectio Divina'],
                    bia: '',
                },
                {
                    label: 'No',
                    title: 'Christian Meditation',
                    guideImg: meditationImgDB['Christian Meditation'],
                    bia: '',
                },
            ],
        },

        Spiritual: {
            question: 'Do you want to follow specific steps during your meditation session?',
            options: [
                {
                    label: 'Yes',
                    title: 'Lectio Divina',
                    guideImg: meditationImgDB['Lectio Divina'],
                    bia: '',
                },
                {
                    label: 'No',
                    title: 'Christian Meditation',
                    guideImg: meditationImgDB['Christian Meditation'],
                    bia: '',
                },
            ],
        },

        'Focused': {
            title: 'Lectio Divina',
            guideImg: meditationImgDB['Lectio Divina'],
            bia: '',
        },

        'Mantra': {
            title: 'Christian Meditation',
            guideImg: meditationImgDB['Christian Meditation'],
            bia: '',
        },
    },

    Islam: {
        'Mindfulness': {
            title: 'Taffakur',
            guideImg: meditationImgDB['Taffakur'],
            bia: '',
        },

        Spiritual: {
            question: 'Do you want contemplative reflection and a pondering meditation session?',
            options: [
                {
                    label: 'Yes',
                    title: 'Taffakur',
                    guideImg: meditationImgDB['Taffakur'],
                    bia: '',
                },
                {
                    label: 'No',
                    question: 'Do you want repetitive alliteration of phrases to remember Allah (God) and His attributes?',
                    options: [
                        {
                            label: 'Yes',
                            title: 'Dhikr',
                            guideImg: meditationImgDB['Dhikr'],
                            bia: true,
                        },
                        {
                            label: 'No',
                            title: 'Sufi Breathing',
                            guideImg: meditationImgDB['Sufi Breathing'],
                            bia: '',
                        },
                    ],
                },
            ],
        },

        Focused: {
            question: 'Do you want repetitive alliteration of phrases to remember Allah (God) and His attributes?',
            options: [
                {
                    label: 'Yes',
                    title: 'Dhikr',
                    guideImg: meditationImgDB['Dhikr'],
                    bia: true,
                },
                {
                    label: 'No',
                    question: 'Do you want a deep contemplation and reflection of inner self?',
                    options: [
                        {
                            label: 'Yes',
                            title: 'Muraqaba',
                            guideImg: meditationImgDB['Muraqaba'],
                            bia: true,
                        },
                        {
                            label: 'No',
                            title: 'Taffakur',
                            guideImg: meditationImgDB['Taffakur'],
                            bia: '',
                        },
                    ],
                },
            ],
        },

        Mantra: {
            question: 'Do you want to combine breath control techniques with the recitation of specific phrases or names of Allah (God)?',
            options: [
                {
                    label: 'Yes',
                    title: 'Sufi Breathing',
                    guideImg: meditationImgDB['Sufi Breathing'],
                    bia: '',
                },
                {
                    label: 'No',
                    title: 'Dhikr',
                    guideImg: meditationImgDB['Dhikr'],
                    bia: '',
                },
            ],
        },

        Visualization: {
            question: 'Do you want to combine breath control techniques with the recitation of specific phrases or names of Allah (God)?',
            options: [
                {
                    label: 'Yes',
                    title: 'Sufi Breathing',
                    guideImg: meditationImgDB['Sufi Breathing'],
                    bia: '',
                },
                {
                    label: 'No',
                    title: 'Muraqaba',
                    guideImg: meditationImgDB['Muraqaba'],
                    bia: true,
                },
            ],
        },
    },

    Hinduism: {
        'Mindfulness': {
            title: 'Hatha Yoga',
            guideImg: meditationImgDB['Hatha Yoga'],
            bia: '',
        },

        Spiritual: {
            question: 'What meditation approach do you prefer?',
            options: [
                {
                    label: 'Deepen your connection to something beyond the physical realm',
                    title: 'Kriya Yoga',
                    guideImg: meditationImgDB['Kriya Yoga'],
                    bia: '',
                },
                {
                    label: 'Incorporating movement as a way to improve overall well-being',
                    title: 'Hatha Yoga',
                    guideImg: meditationImgDB['Hatha Yoga'],
                    bia: '',
                },
            ],
        },

        Focused: {
            question: 'Do you seek a practice that involves physical postures and movements to promote strength and flexibility?',
            options: [
                {
                    label: 'Yes',
                    title: 'Hatha Yoga',
                    guideImg: meditationImgDB['Hatha Yoga'],
                    bia: '',
                },
                {
                    label: 'No',
                    question: 'Which approach in focusing attention and concentration do you prefer?',
                    options: [
                        {
                            label: 'Visualizing and working with energy centers',
                            title: 'Chakra',
                            guideImg: meditationImgDB['Chakra'],
                            bia: '',
                        },
                        {
                            label: 'Involves specific techniques for breath control and energy locks',
                            title: 'Kriya Yoga',
                            guideImg: meditationImgDB['Kriya Yoga'],
                            bia: '',
                        },
                    ],
                },
            ],
        },

        'Movement': {
            title: 'Hatha Yoga',
            guideImg: meditationImgDB['Hatha Yoga'],
            bia: '',
        },

        'Visualization': {
            title: 'Chakra',
            guideImg: meditationImgDB['Chakra'],
            bia: '',
        },

        
    },

    Buddhism: {
        Mindfulness: {
            question: 'Are you looking for a meditation practice that brings self-awareness or involves cultivating compassion and empathy?',
            options: [
                {
                    label: 'Self-awareness',
                    question: 'Are you looking for a meditation practice that incorporates movement?',
                    options: [
                        {
                            label: 'Yes',
                            title: 'Walk',
                            guideImg: meditationImgDB['Walk'],
                            bia: '',
                        },
                        {
                            label: 'No',
                            question: 'Are you looking for a meditation practice that focuses on breath?',
                            options: [
                                {
                                    label: 'Yes',
                                    title: 'Breath',
                                    guideImg: meditationImgDB['Breath'],
                                    bia: true,
                                },
                                {
                                    label: 'No',
                                    title: 'Body Scan',
                                    guideImg: meditationImgDB['Body Scan'],
                                    bia: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Compassion and Empathy',
                    title: 'Metta',
                    guideImg: meditationImgDB['Metta'],
                    bia: true,
                },
            ],
        },

        Spiritual: {
            question: 'What kind of meditation practice are you looking for?',
            options: [
                {
                    label: 'Cultivates compassion and empathy',
                    title: 'Tonglen',
                    guideImg: meditationImgDB['Tonglen'],
                    bia: true,
                },
                {
                    label: 'Cultivates love, kindness, and goodwill',
                    title: 'Metta',
                    guideImg: meditationImgDB['Metta'],
                    bia: true,
                },
            ],
        },

        Focused: {
            question: 'What kind of meditation practice are you looking for?',
            options: [
                {
                    label: 'Cultivates a sense of calm',
                    title: 'Breath',
                    guideImg: meditationImgDB['Breath'],
                    bia: true,
                },
                {
                    label: 'Cultivates compassion and empathy',
                    title: 'Tonglen',
                    guideImg: meditationImgDB['Tonglen'],
                    bia: true,
                },
            ],
        },

        'Mantra': {
            title: 'Metta',
            guideImg: meditationImgDB['Metta'],
            bia: true,
        },

        'Visualization': {
            title: 'Tonglen',
            guideImg: meditationImgDB['Tonglen'],
            bia: true,
        },

        Movement: {
            question: 'What kind of meditation practice are you looking for?',
            options: [
                {
                    label: 'Promotes relaxation',
                    title: 'Body Scan',
                    guideImg: meditationImgDB['Body Scan'],
                    bia: true,
                },
                {
                    label: 'Incorporates movement',
                    title: 'Walk',
                    guideImg: meditationImgDB['Walk'],
                    bia: true,
                },
            ],
        },

        'Loving-Kindness': {
            question: 'What kind of meditation practice are you looking for?',
            options: [
                {
                    label: 'Cultivates love, kindness, and goodwill',
                    title: 'Metta',
                    guideImg: meditationImgDB['Metta'],
                    bia: true,
                },
                {
                    label: 'Cultivates compassion and empathy',
                    title: 'Tonglen',
                    guideImg: meditationImgDB['Tonglen'],
                    bia: true,
                },
            ],
        },

        'Progressive Relaxation': {
            title: 'Body Scan',
            guideImg: meditationImgDB['Body Scan'],
            bia: true,
        },

    },

    Judaism: {
        Mindfulness: {
            question: 'What meditation approach do you prefer?',
            options: [
                {
                    label: 'Incorporates mystical teachings of Kabbalah and Chassidic philosophy',
                    title: 'Kabbalistic/Chassidic',
                    guideImg: meditationImgDB['Kabbalistic/Chassidic'],
                    bia: true,
                },
                {
                    label: 'Centers around the recitation and contemplation of the Shema',
                    title: 'Shema',
                    guideImg: meditationImgDB['Shema'],
                    bia: true,
                },
            ],
        },

        Spiritual: {
            question: 'What meditation approach do you prefer?',
            options: [
                {
                    label: 'Focuses on personalized prayer',
                    title: 'Hitbodedut',
                    guideImg: meditationImgDB['Hitbodedut'],
                    bia: '',
                },
                {
                    label: 'Incorporates mystical elements',
                    title: 'Kabbalistic/Chassidic',
                    guideImg: meditationImgDB['Kabbalistic/Chassidic'],
                    bia: true,
                },
            ],
        },

        Focused: {
            question: 'What meditation approach do you prefer?',
            options: [
                {
                    label: 'Focuses on personalized prayer',
                    title: 'Hitbodedut',
                    guideImg: meditationImgDB['Hitbodedut'],
                    bia: '',
                },
                {
                    label: 'Incorporates mystical elements',
                    question: 'What meditation approach do you prefer?',
                    options: [
                        {
                            label: 'Incorporates teachings of Kabbalahand Chassidic philosophy',
                            title: 'Kabbalistic/Chassidic',
                            guideImg: meditationImgDB['Kabbalistic/Chassidic'],
                            bia: true,
                        },
                        {
                            label: 'Centers around the recitation and contemplation of the Shema',
                            title: 'Shema',
                            guideImg: meditationImgDB['Shema'],
                            bia: true,
                        },
                    ],
                },
            ],
        },

        Visualization: {
            question: 'What meditation approach do you prefer?',
            options: [
                {
                    label: 'Incorporates mystical teachings of Kabbalah and Chassidic philosophy',
                    title: 'Kabbalistic/Chassidic',
                    guideImg: meditationImgDB['Kabbalistic/Chassidic'],
                    bia: true,
                },
                {
                    label: 'Centers around the recitation and contemplation of the Shema',
                    title: 'Shema',
                    guideImg: meditationImgDB['Shema'],
                    bia: true,
                },
            ],
        },



    },
};
  
  
export default function Questions({ navigation, route }) {
    const { religion, type } = route.params;
    const questionData = followUpQuestions[religion][type];
    const [selectedOption, setSelectedOption] = useState(null);
    const [additionalQuestion, setAdditionalQuestion] = useState(null);
    const [secondOptions, setSecondOptions] = useState(null);
    const [thirdOptions, setThirdOptions] = useState(null);

    const goToGuide = (title, guideImg, bia) => {
        const data = {
            title: title, 
            guideImg: guideImg,
            bia: bia
        };
        navigation.navigate('Guide', {data});
    };

    useEffect(() => {
        if (!questionData.options) {
            goToGuide(questionData.title, questionData.guideImg, questionData.bia);
        }
    }, [questionData.options]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setAdditionalQuestion(option.question || null);
        setSecondOptions(option.options || null);
        setThirdOptions(null);

        if (option.title) {
            goToGuide(option.title, option.guideImg, option.bia);
        }
    };

    return (
        <SafeAreaView style={styles.screenCenter}>
            <View style={[styles.containerCentered, inStyles.questionContainer]}>
                {additionalQuestion ? (
                <Text style={[styles.colorPrimary, styles.bold, { fontSize: RFPercentage(3), textAlign: 'center' }]}>
                    {additionalQuestion}
                </Text>
                ) : (
                <>
                    <Text style={[styles.colorPrimary, styles.bold, { fontSize: RFPercentage(3), textAlign: 'center' }]}>
                        {questionData.question}
                    </Text>

                    {questionData.options && (
                        <View style={inStyles.optionsContainer}>
                            {questionData.options.map((option) => (
                                <TouchableOpacity
                                    key={option.label}
                                    style={[inStyles.optionButton, styles.bgColorPrimary]}
                                    onPress={() => handleOptionSelect(option)}>
                                    <Text style={[styles.colorWhite, inStyles.optionText, styles.bold, { fontSize: RFPercentage(2.2) }]}>{option.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </>
                )}

                {secondOptions && (
                <>
                <View style={inStyles.optionsContainer}>
                    {secondOptions.map((option) => (
                        <TouchableOpacity
                            key={option.label}
                            style={[inStyles.optionButton, styles.bgColorPrimary]}
                            onPress={() => handleOptionSelect(option)}>
                            <Text style={[styles.colorWhite, inStyles.optionText, styles.bold, { fontSize: RFPercentage(2.2) }]}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                </>
                )}

                {thirdOptions && (
                <>
                    <View style={inStyles.optionsContainer}>
                        {thirdOptions.map((option) => (
                            <TouchableOpacity
                                key={option.label}
                                style={[inStyles.optionButton, styles.bgColorPrimary]}
                                onPress={() => handleOptionSelect(option)}>
                                <Text style={[styles.colorWhite, inStyles.optionText, styles.bold, { fontSize: RFPercentage(2.2) }]}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
                )}
            </View>
        </SafeAreaView>
    );
}

const inStyles = StyleSheet.create({
    questionContainer: {
        padding: 15,
        width: screenWidth('90%'),
        height: screenHeight('50%'),
    },

    optionsContainer: {
        marginTop: 20,
        gap: 15,
        width: screenWidth('90%'),
        justifyContent: 'center',
        alignItems: 'center',
    },

    optionButton: {
        padding: 15,
        borderRadius: 40,
        width: screenWidth('70%'),
        height: screenHeight('10%'),
        justifyContent: 'center',
        alignItems: 'center',
    },

    optionText: {
        textAlign: 'center',
    }
});