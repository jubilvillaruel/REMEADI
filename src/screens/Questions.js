import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { screenWidth, screenHeight } from '../components/Dimensions';
import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { meditationImgDB } from '../Data/ImageDB';
import { FeatureCardWide } from '../components/Cards';
import * as Speech from 'expo-speech';

const followUpQuestions1 = {
    'Stillness-based': {
        'Stress Reduction': {
            question: 'Are you looking for a meditation practice that focuses on breath?',
            options: [
                {
                    label: 'Yes',
                    description: '"Yes, I\'m seeking a meditation practice that places a strong focus on the breath as a central element of mindfulness."',
                    title: 'Breath',
                    guideImg: meditationImgDB['Breath'],
                    bia: true,
                },
                {
                    label: 'No',
                    description: '"No, I prefer a meditation practice that doesn\'t place a specific emphasis on the breath, opting for a different approach to mindfulness."',
                    question: 'Do you want a meditation practice that promotes relaxation of the body?',
                    options: [
                        {
                            label: 'Yes',
                            description: '"I\'m looking for a meditation practice that promotes relaxation of the body, helping me unwind and release physical tension."',
                            title: 'Body Scan',
                            guideImg: meditationImgDB['Body Scan'],
                            bia: true,
                        },
                        {
                            label: 'No',
                            description: '"I prefer a meditation practice with a different focus, not specifically geared toward body relaxation."',
                            question: 'Do you want a meditation practice that cultivates love, kindness, and goodwill?',
                            options: [
                                {
                                    label: 'Yes',
                                    description: '"I\'m seeking a meditation practice that cultivates love, kindness, and goodwill, promoting positive feelings and intentions."',
                                    title: 'Metta',
                                    guideImg: meditationImgDB['Metta'],
                                    bia: true,
                                },
                                {
                                    label: 'No',
                                    description: '"I prefer a meditation practice with a different focus, not specifically geared toward cultivating love, kindness, and goodwill."',
                                    question: 'Do you want a meditation practice that visualizes and works with energy centers?',
                                    options: [
                                        {
                                            label: 'Yes',
                                            description: '"I\'m interested in a meditation practice that visualizes and works with energy centers to enhance my overall well-being."',
                                            title: 'Chakra',
                                            guideImg: meditationImgDB['Chakra'],
                                            bia: '',
                                        },
                                        {
                                            label: 'No',
                                            description: '"I prefer a meditation practice without a specific focus on visualizing and working with energy centers."',
                                            title: 'Sufi Breathing',
                                            guideImg: meditationImgDB['Sufi Breathing'],
                                            bia: '',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        'Spiritual Growth': {
            question: 'Do you want to meditate around reading and reflecting on biblical texts?',
            options: [
                {
                    label: 'Yes',
                    description: '"I would like to incorporate biblical texts into my meditation practice for a faith-based and reflective experience."',
                    title: 'Lectio Divina',
                    guideImg: meditationImgDB['Lectio Divina'],
                    bia: '',
                },
                {
                    label: 'No',
                    description: '"I prefer meditation without the specific focus on biblical texts, seeking a more general or open approach to mindfulness."',
                    question: 'Are you interested in repeating meditation phrases?',
                    options: [
                        {
                            label: 'Yes',
                            title: 'Christian Meditation',
                            description: '"I find value in repeating meditation phrases, as they help me focus my mind and cultivate positive intentions during my practice."',
                            guideImg: meditationImgDB['Christian Meditation'],
                            bia: '',
                        },
                        {
                            label: 'No',
                            description: '"I prefer meditation without the repetition of phrases, opting for a more silent and contemplative approach to mindfulness."',
                            question: 'Do you want to reflect on the events of the day?',
                            options: [
                                {
                                    label: 'Yes',
                                    description: '"I want to reflect on the events of the day, seeking understanding and insight."',
                                    title: 'Examen',
                                    guideImg: meditationImgDB['Examen'],
                                    bia: '',
                                },
                                {
                                    label: 'No',
                                    description: '"I prefer a meditation practice without specific reflection on daily events."',
                                    question: 'Do you want contemplative reflection and a pondering meditation session?',
                                    options: [
                                        {
                                            label: 'Yes',
                                            description: '"I want contemplative reflection and a pondering meditation session to explore my thoughts and emotions."',
                                            title: 'Taffakur',
                                            guideImg: meditationImgDB['Taffakur'],
                                            bia: '',
                                        },
                                        {
                                            label: 'No',
                                            description: '"I prefer a meditation practice without specific contemplative reflection and pondering."',
                                            question: 'Do you want a deep contemplation and reflection of inner self?',
                                            options: [
                                                {
                                                    label: 'Yes',
                                                    description: '"I want a deep contemplation and reflection of the inner self to explore my thoughts, emotions, and inner wisdom."',
                                                    title: 'Muraqaba',
                                                    guideImg: meditationImgDB['Muraqaba'],
                                                    bia: true,
                                                },
                                                {
                                                    label: 'No',
                                                    description: '"I prefer a meditation practice without specific deep contemplation and reflection of the inner self."',
                                                    question: 'Do you want to incorporate teachings of Kabbalah and Chassidic philosophy?',
                                                    options: [
                                                        {
                                                            label: 'Yes',
                                                            description: '"I want to incorporate teachings of Kabbalah and Chassidic philosophy into my meditation practice for a deeper and more mystical connection."',
                                                            title: 'Kabbalistic/Chassidic',
                                                            guideImg: meditationImgDB['Kabbalistic/Chassidic'],
                                                            bia: true,
                                                        },
                                                        {
                                                            label: 'No',
                                                            description: '"I choose a meditation practice without specific incorporation of teachings from Kabbalah and Chassidic philosophy."',
                                                            title: 'Shema',
                                                            guideImg: meditationImgDB['Shema'],
                                                            bia: true,
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        'Physical Health': {
            question: 'Do you want a meditation practice that promotes relaxation of the body?',
            options: [
                {
                    label: 'Yes',
                    description: '"I\'m looking for a meditation practice that promotes relaxation of the body, helping me unwind and release physical tension."',
                    title: 'Body Scan',
                    guideImg: meditationImgDB['Body Scan'],
                    bia: true,
                },
                {
                    label: 'No',
                    description: '"I prefer a meditation practice with a different focus, not specifically geared toward body relaxation."',
                    title: 'Chakra',
                    guideImg: meditationImgDB['Chakra'],
                    bia: '',
                },
            ],
        },
        'Mental Health': {
            title: 'Breath',
            guideImg: meditationImgDB['Breath'],
            bia: true,
        },
    },

    'Movement-based': {
        'Stress Reduction': {
            question: 'Are you looking for a meditation practice that brings attention to your feet, body, and the ground?',
            options: [
                {
                    label: 'Yes',
                    description: '"I\'m interested in a meditation practice that brings attention to my feet, body, and the ground, promoting grounded mindfulness."',
                    title: 'Walk',
                    guideImg: meditationImgDB['Walk'],
                    bia: true,
                },
                {
                    label: 'No',
                    description: '"I prefer a meditation practice without a specific focus on feet, body, and the ground."',
                    title: 'Dhikr',
                    guideImg: meditationImgDB['Dhikr'],
                    bia: true,
                },
            ],
        },
        'Spiritual Growth': {
            question: 'What meditation approach do you prefer?',
            options: [
                {
                    label: 'Transcend the Physical',
                    description: '"I want to dive into a spiritual journey beyond the physical world, delving into inner wisdom and universal mysteries."',
                    title: 'Kriya Yoga',
                    guideImg: meditationImgDB['Kriya Yoga'],
                    bia: '',
                },
                {
                    label: 'Move for Well-being',
                    description: '"I want to integrate mindful movement into my practice for enhanced physical and mental well-being."',
                    title: 'Hatha Yoga',
                    guideImg: meditationImgDB['Hatha Yoga'],
                    bia: true,
                },
            ],
        },
        'Physical Health': {
            title: 'Hatha Yoga',
            guideImg: meditationImgDB['Hatha Yoga'],
            bia: true,
        },
        'Mental Health': {
            title: 'Walk',
            guideImg: meditationImgDB['Walk'],
            bia: true,
        },
    },
};

const followUpQuestions2 = {
    C1: {
        Mindfulness: {
            question: 'Do you want to follow specific steps during your meditation session?',
            options: [
                {
                    label: 'Yes',
                    description: '"Guided steps and structure help me stay focused and find tranquility in my meditation practice."',
                    question: 'Do you want to meditate around reading and reflecting on biblical texts?',
                    options: [
                        {
                            label: 'Yes',
                            description: '"I would like to incorporate biblical texts into my meditation practice for a faith-based and reflective experience."',
                            title: 'Lectio Divina',
                            guideImg: meditationImgDB['Lectio Divina'],
                            bia: '',
                        },
                        {
                            label: 'No',
                            description: '"I prefer meditation without the specific focus on biblical texts, seeking a more general or open approach to mindfulness."',
                            title: 'Examen',
                            guideImg: meditationImgDB['Examen'],
                            bia: '',
                        },
                    ],
                },
                {
                    label: 'No',
                    description:'"I prefer a more open and unstructured meditation, allowing my thoughts to flow naturally during the session."',
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
                    description: '"Guided steps and structure help me stay focused and find tranquility in my meditation practice."',
                    question: 'Do you want to meditate around reading and reflecting on biblical texts?',
                    options: [
                        {
                            label: 'Yes',
                            description: '"I\'m interested in incorporating biblical texts into my meditation practice, seeking spiritual guidance and reflection."',
                            title: 'Lectio Divina',
                            guideImg: meditationImgDB['Lectio Divina'],
                            bia: '',
                        },
                        {
                            label: 'No',
                            description: '"I prefer meditation without a specific focus on biblical texts, opting for a more general or secular approach to mindfulness."',
                            question: 'Are you interested in repeating meditation phrases?',
                            options: [
                                {
                                    label: 'Yes',
                                    description: '"I find value in repeating meditation phrases, as they help me focus my mind and cultivate positive intentions during my practice."',
                                    title: 'Rosary',
                                    guideImg: meditationImgDB['Rosary'],
                                    bia: '',
                                },
                                {
                                    label: 'No',
                                    description: '"I prefer meditation without the repetition of phrases, opting for a more silent and contemplative approach to mindfulness."',
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
                    description:'"I prefer a more open and unstructured meditation, allowing my thoughts to flow naturally during the session."',
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
                    description: '"I would like to incorporate biblical texts into my meditation practice for a faith-based and reflective experience."',
                    title: 'Lectio Divina',
                    guideImg: meditationImgDB['Lectio Divina'],
                    bia: '',
                },
                {
                    label: 'No',
                    description: '"I prefer meditation without the specific focus on biblical texts, seeking a more general or open approach to mindfulness."',
                    question: 'Are you interested in repeating meditation phrases?',
                    options: [
                        {
                            label: 'Yes',
                            description: '"I find value in repeating meditation phrases, as they help me focus my mind and cultivate positive intentions during my practice."',
                            title: 'Rosary',
                            guideImg: meditationImgDB['Rosary'],
                            bia: '',
                        },
                        {
                            label: 'No',
                            description: '"I prefer meditation without the repetition of phrases, opting for a more silent and contemplative approach to mindfulness."',
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
                    description:'"I would like to incorporate rosary beads into my meditation practice, following a structured and contemplative approach."',
                    title: 'Rosary',
                    guideImg: meditationImgDB['Rosary'],
                    bia: '',
                },
                {
                    label: 'No',
                    description:'"I prefer meditation without the use of rosary beads, opting for a more open and unstructured mindfulness practice."',
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
                    description: '"Guided steps and structure help me stay focused and find tranquility in my meditation practice."',
                    title: 'Lectio Divina',
                    guideImg: meditationImgDB['Lectio Divina'],
                    bia: '',
                },
                {
                    label: 'No',
                    description:'"I prefer a more open and unstructured meditation, allowing my thoughts to flow naturally during the session."',
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
                    description: '"Guided steps and structure help me stay focused and find tranquility in my meditation practice."',
                    title: 'Lectio Divina',
                    guideImg: meditationImgDB['Lectio Divina'],
                    bia: '',
                },
                {
                    label: 'No',
                    description:'"I prefer a more open and unstructured meditation, allowing my thoughts to flow naturally during the session."',
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

    C5: {
        Mindfulness: {
            question: 'Do you want to follow specific steps during your meditation session?',
            options: [
                {
                    label: 'Yes',
                    description: '"Guided steps and structure help me stay focused and find tranquility in my meditation practice."',
                    title: 'Lectio Divina',
                    guideImg: meditationImgDB['Lectio Divina'],
                    bia: '',
                },
                {
                    label: 'No',
                    description:'"I prefer a more open and unstructured meditation, allowing my thoughts to flow naturally during the session."',
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
                    description: '"Guided steps and structure help me stay focused and find tranquility in my meditation practice."',
                    title: 'Lectio Divina',
                    guideImg: meditationImgDB['Lectio Divina'],
                    bia: '',
                },
                {
                    label: 'No',
                    description:'"I prefer a more open and unstructured meditation, allowing my thoughts to flow naturally during the session."',
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
                    description:'"I seek contemplative reflection and a meditation session that encourages deep thought and introspection."',
                    title: 'Taffakur',
                    guideImg: meditationImgDB['Taffakur'],
                    bia: '',
                },
                {
                    label: 'No',
                    description: '"I prefer meditation without a specific focus on contemplative reflection, opting for a different approach to mindfulness."',
                    question: 'Do you want repetitive alliteration of phrases to remember Allah (God) and His attributes?',
                    options: [
                        {
                            label: 'Yes',
                            description: '"I would like to engage in repetitive alliteration of phrases to remember Allah (God) and His attributes in my meditation practice, seeking spiritual connection and mindfulness."',
                            title: 'Dhikr',
                            guideImg: meditationImgDB['Dhikr'],
                            bia: true,
                        },
                        {
                            label: 'No',
                            description: '"I prefer meditation without the repetitive alliteration of phrases, opting for a different approach to mindfulness."',
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
                    description: '"I seek to engage in the repetitive alliteration of phrases to remember Allah (God) and His attributes in my meditation practice, aiming for spiritual connection and mindfulness."',
                    title: 'Dhikr',
                    guideImg: meditationImgDB['Dhikr'],
                    bia: true,
                },
                {
                    label: 'No',
                    description: '"I prefer meditation without the repetitive alliteration of phrases, choosing a different approach to mindfulness."',
                    question: 'Do you want a deep contemplation and reflection of inner self?',
                    options: [
                        {
                            label: 'Yes',
                            description: '"I seek a meditation experience that encourages deep contemplation and inner self-reflection, allowing me to explore my thoughts and emotions."',
                            title: 'Muraqaba',
                            guideImg: meditationImgDB['Muraqaba'],
                            bia: true,
                        },
                        {
                            label: 'No',
                            description: '"I seek a meditation experience that encourages deep contemplation and inner self-reflection, allowing me to explore my thoughts and emotions."',
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
                    description: '"I\'m interested in combining breath control techniques with the recitation of specific phrases or names of Allah (God) to enhance my meditation practice and spiritual connection."',
                    title: 'Sufi Breathing',
                    guideImg: meditationImgDB['Sufi Breathing'],
                    bia: '',
                },
                {
                    label: 'No',
                    description: '"I prefer meditation without the combination of breath control techniques and specific recitations, choosing a different approach to mindfulness."',
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
                    description: '"I\'m interested in combining breath control techniques with the recitation of specific phrases or names of Allah (God) to enhance my meditation practice and spiritual connection."',
                    title: 'Sufi Breathing',
                    guideImg: meditationImgDB['Sufi Breathing'],
                    bia: '',
                },
                {
                    label: 'No',
                    description: '"I prefer meditation without the combination of breath control techniques and specific recitations, choosing a different approach to mindfulness."',
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
            bia: true,
        },

        Spiritual: {
            question: 'What meditation approach do you prefer?',
            options: [
                {
                    label: 'Transcendental',
                    description: '"I want to deepen my connection to something beyond the physical realm."',
                    title: 'Kriya Yoga',
                    guideImg: meditationImgDB['Kriya Yoga'],
                    bia: '',
                },
                {
                    label: 'Mindful Movement',
                    description: '"I\'m interested in incorporating movement to improve my overall well-being."',
                    title: 'Hatha Yoga',
                    guideImg: meditationImgDB['Hatha Yoga'],
                    bia: true,
                },
            ],
        },

        Focused: {
            question: 'Do you seek a practice that involves physical postures and movements to promote strength and flexibility?',
            options: [
                {
                    label: 'Yes',
                    description: '"Yes, I seek a practice that involves physical postures and movements to promote strength and flexibility."',
                    title: 'Hatha Yoga',
                    guideImg: meditationImgDB['Hatha Yoga'],
                    bia: true,
                },
                {
                    label: 'No',
                    description: '"No, I prefer a different approach that doesn\'t emphasize physical postures and movements."',
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
            bia: true,
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
                    description: '"I aim to enhance my self-awareness through meditation, fostering a deeper understanding of my thoughts, emotions, and inner self."',
                    question: 'Are you looking for a meditation practice that incorporates movement?',
                    options: [
                        {
                            label: 'Yes',
                            description: '"Yes, I\'m interested in a meditation practice that incorporates movement as part of the mindfulness experience."',
                            title: 'Walk',
                            guideImg: meditationImgDB['Walk'],
                            bia: true,
                        },
                        {
                            label: 'No',
                            description: '"No, I prefer a meditation practice without a specific emphasis on movement, seeking a different approach to mindfulness."',
                            question: 'Are you looking for a meditation practice that focuses on breath?',
                            options: [
                                {
                                    label: 'Yes',
                                    description: '"Yes, I\'m seeking a meditation practice that places a strong focus on the breath as a central element of mindfulness."',
                                    title: 'Breath',
                                    guideImg: meditationImgDB['Breath'],
                                    bia: true,
                                },
                                {
                                    label: 'No',
                                    description: '"No, I prefer a meditation practice that doesn\'t place a specific emphasis on the breath, opting for a different approach to mindfulness."',
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
                    description: '"I seek to cultivate compassion and empathy towards myself and others, making these qualities central to my meditation practice."',
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
                    description: '"I\'m looking for a meditation practice that helps me cultivate compassion and empathy, fostering understanding and connection with others."',
                    title: 'Tonglen',
                    guideImg: meditationImgDB['Tonglen'],
                    bia: true,
                },
                {
                    label: 'Cultivates love, kindness, and goodwill',
                    description: '"I seek a meditation practice that focuses on cultivating love, kindness, and goodwill, promoting positive feelings and intentions towards myself and others."',
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
                    description: '"I\'m looking for a meditation practice that helps me achieve a deep sense of inner calm and tranquility."',
                    title: 'Breath',
                    guideImg: meditationImgDB['Breath'],
                    bia: true,
                },
                {
                    label: 'Cultivates compassion and empathy',
                    description: '"I seek a meditation practice that focuses on cultivating compassion and empathy, fostering understanding and connection with others."',
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
                    description: '"I\'m looking for a meditation practice that promotes relaxation, helping me unwind and reduce stress."',
                    title: 'Body Scan',
                    guideImg: meditationImgDB['Body Scan'],
                    bia: true,
                },
                {
                    label: 'Incorporates movement',
                    description: '"I\'m interested in a meditation practice that incorporates movement as a part of the mindfulness experience."',
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
                    description: '"I seek a meditation practice that focuses on cultivating love, kindness, and goodwill, promoting positive feelings and intentions towards myself and others."',
                    title: 'Metta',
                    guideImg: meditationImgDB['Metta'],
                    bia: true,
                },
                {
                    label: 'Cultivates compassion and empathy',
                    description: '"I seek a meditation practice that focuses on cultivating compassion and empathy, fostering understanding and connection with others."',
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
                    description: '"I prefer a meditation approach that incorporates mystical teachings from Kabbalah and Chassidic philosophy, seeking a deeper spiritual connection."',
                    title: 'Kabbalistic/Chassidic',
                    guideImg: meditationImgDB['Kabbalistic/Chassidic'],
                    bia: true,
                },
                {
                    label: 'Centers around the recitation and contemplation of the Shema',
                    description: '"I prefer a meditation approach that centers around the recitation and contemplation of the Shema, focusing on its spiritual significance and meaning."',
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
                    description: '"I prefer a meditation approach that centers around personalized prayer, allowing me to connect with the divine through my own words and intentions."',
                    title: 'Hitbodedut',
                    guideImg: meditationImgDB['Hitbodedut'],
                    bia: '',
                },
                {
                    label: 'Incorporates mystical elements',
                    description: '"I prefer a meditation approach that incorporates mystical elements, seeking a deeper and more mystical connection with the spiritual realm."',
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
                    description: '"I prefer a meditation approach that centers around personalized prayer, allowing me to connect with the divine through my own words and intentions."',
                    title: 'Hitbodedut',
                    guideImg: meditationImgDB['Hitbodedut'],
                    bia: '',
                },
                {
                    label: 'Incorporates mystical elements',
                    description: '"I prefer a meditation approach that incorporates mystical elements, seeking a deeper and more mystical connection with the spiritual realm."',
                    question: 'What meditation approach do you prefer?',
                    options: [
                        {
                            label: 'Incorporates teachings of Kabbalah and Chassidic philosophy',
                            description: '"I prefer a meditation approach that incorporates the teachings of Kabbalah and Chassidic philosophy, seeking a deep and mystical connection with spirituality and inner wisdom."',
                            title: 'Kabbalistic/Chassidic',
                            guideImg: meditationImgDB['Kabbalistic/Chassidic'],
                            bia: true,
                        },
                        {
                            label: 'Centers around the recitation and contemplation of the Shema',
                            description: '"I prefer a meditation approach that centers around the recitation and contemplation of the Shema, focusing on its spiritual significance and meaning."',
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
                    description: '"I prefer a meditation approach that incorporates mystical teachings from Kabbalah and Chassidic philosophy, seeking a deeper spiritual connection."',
                    title: 'Kabbalistic/Chassidic',
                    guideImg: meditationImgDB['Kabbalistic/Chassidic'],
                    bia: true,
                },
                {
                    label: 'Centers around the recitation and contemplation of the Shema',
                    description: '"I prefer a meditation approach that centers around the recitation and contemplation of the Shema, focusing on its spiritual significance and meaning."',
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
    console.log(religion, type);
    let questionData = '';

    if (religion == 'Stillness-based' || religion == 'Movement-based') {
        questionData = followUpQuestions1[religion][type];
    }
    else {
        questionData = followUpQuestions2[religion][type];
    }

    const [selectedOption, setSelectedOption] = useState(null);
    const [additionalQuestion, setAdditionalQuestion] = useState(null);
    const [secondOptions, setSecondOptions] = useState(null);
    const [thirdOptions, setThirdOptions] = useState(null);
    const [fourthOptions, setFourthOptions] = useState(null);
    const [fifthOptions, setFifthOptions] = useState(null);
    const [sixthOptions, setSixthOptions] = useState(null);
    const [seventhOptions, setSeventhOptions] = useState(null);
    
    const goToResult = (title, guideImg, bia) => {
        const data = {
            title: title, 
            guideImg: guideImg,
            bia: bia
        };
        navigation.navigate('ExpertResult', {data});
    };

    useEffect(() => {
        if (!questionData.options) {
            navigation.pop();
            goToResult(questionData.title, questionData.guideImg, questionData.bia);
        }
    }, [questionData.options]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setAdditionalQuestion(option.question || null);
        setSecondOptions(option.options || null);
        setThirdOptions(null);
        setFourthOptions(null);
        setFifthOptions(null);
        setSixthOptions(null);
        setSeventhOptions(null);

        if (option.title) {
            goToResult(option.title, option.guideImg, option.bia);
        }
    };

    return (
        <SafeAreaView style={styles.screenCenter}>
            <View style={[styles.containerCentered, inStyles.questionContainer]}>
                {additionalQuestion ? (
                <Text style={[{color: 'black', fontWeight:'300', marginBottom:30 , fontSize: RFPercentage(4), textAlign: 'center' }]}>
                    {additionalQuestion}
                </Text>
                ) : (
                <>
                    <Text style={[{color: 'black', fontWeight:'300', marginBottom:30 ,fontSize: RFPercentage(4), textAlign: 'center' }]}>
                        {questionData.question}
                    </Text>
    
                    {questionData.options && (
                        <View style={inStyles.optionsContainer}>
                            {questionData.options.map((option) => (
                                <FeatureCardWide
                                    title = {option.label}
                                    desc = {option.description}
                                    onPress={() => {
                                        Speech.stop();
                                        handleOptionSelect(option);
                                    }}
                                />
                            ))}
                        </View>
                    )}
                </>
                )}
    
                {secondOptions && (
                <>
                <View style={inStyles.optionsContainer}>
                    {secondOptions.map((option) => (
                        <FeatureCardWide
                        title = {option.label}
                        desc = {option.description}
                        onPress={() => {
                            Speech.stop();
                            handleOptionSelect(option);
                        }}
                    />
                    //     <TouchableOpacity
                    //         key={option.label}
                    //         style={[inStyles.optionButton, styles.bgColorPrimary]}
                    //         onPress={() => handleOptionSelect(option)}>
                    //         <Text style={[
                    //             styles.colorWhite,
                    //             inStyles.optionText,
                    //             styles.bold,
                    //             {
                    //                 fontSize: option.label.length > 10 ? RFPercentage(1.8) : RFPercentage(2.5)
                    //             }
                    //         ]}>{option.label}</Text>
                    //     </TouchableOpacity>
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
                                onPress={() => {
                                    Speech.stop();
                                    handleOptionSelect(option);
                                }}>
                                <Text style={[
                                    styles.colorWhite,
                                    inStyles.optionText,
                                    styles.bold,
                                    {
                                        fontSize: option.label.length > 10 ? RFPercentage(1.8) : RFPercentage(2.5)
                                    }
                                ]}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
                )}

                {fourthOptions && (
                <>
                    <View style={inStyles.optionsContainer}>
                        {fourthOptions.map((option) => (
                            <TouchableOpacity
                                key={option.label}
                                style={[inStyles.optionButton, styles.bgColorPrimary]}
                                onPress={() => {
                                    Speech.stop();
                                    handleOptionSelect(option);
                                }}>
                                <Text style={[
                                    styles.colorWhite,
                                    inStyles.optionText,
                                    styles.bold,
                                    {
                                        fontSize: option.label.length > 10 ? RFPercentage(1.8) : RFPercentage(2.5)
                                    }
                                ]}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
                )}

                {fifthOptions && (
                <>
                    <View style={inStyles.optionsContainer}>
                        {fifthOptions.map((option) => (
                            <TouchableOpacity
                                key={option.label}
                                style={[inStyles.optionButton, styles.bgColorPrimary]}
                                onPress={() => {
                                    Speech.stop();
                                    handleOptionSelect(option);
                                }}>
                                <Text style={[
                                    styles.colorWhite,
                                    inStyles.optionText,
                                    styles.bold,
                                    {
                                        fontSize: option.label.length > 10 ? RFPercentage(1.8) : RFPercentage(2.5)
                                    }
                                ]}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
                )}

                {sixthOptions && (
                <>
                    <View style={inStyles.optionsContainer}>
                        {sixthOptions.map((option) => (
                            <TouchableOpacity
                                key={option.label}
                                style={[inStyles.optionButton, styles.bgColorPrimary]}
                                onPress={() => {
                                    Speech.stop();
                                    handleOptionSelect(option);
                                }}>
                                <Text style={[
                                    styles.colorWhite,
                                    inStyles.optionText,
                                    styles.bold,
                                    {
                                        fontSize: option.label.length > 10 ? RFPercentage(1.8) : RFPercentage(2.5)
                                    }
                                ]}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
                )}

                {seventhOptions && (
                <>
                    <View style={inStyles.optionsContainer}>
                        {seventhOptions.map((option) => (
                            <TouchableOpacity
                                key={option.label}
                                style={[inStyles.optionButton, styles.bgColorPrimary]}
                                onPress={() => {
                                    Speech.stop();
                                    handleOptionSelect(option);
                                }}>
                                <Text style={[
                                    styles.colorWhite,
                                    inStyles.optionText,
                                    styles.bold,
                                    {
                                        fontSize: option.label.length > 10 ? RFPercentage(1.8) : RFPercentage(2.5)
                                    }
                                ]}>{option.label}</Text>
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