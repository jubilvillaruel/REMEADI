import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../../assets/css/Style';
import * as Speech from 'expo-speech';

import { RFPercentage } from 'react-native-responsive-fontsize';
import { screenWidth, screenHeight } from '../components/Dimensions';
import { FeatureCardWide } from '../components/Cards';

export default function SelectMethod ({ navigation, route }) {
    const { religion } = route.params;

    const goToQuestions = (type) => {
        navigation.navigate('Questions', { religion, type });
    };

    return (
        <View style={styles.screenCenter}>
            <View style={inStyles.typeContainer}>
                <ScrollView  style={{ marginBottom: 10, gap: 10, width:screenWidth('85%') }}>
                    <View style={{ padding: 15, marginBottom: 10 }}>
                        <Text style={[styles.bold, { color:'black', fontSize: RFPercentage(4), textAlign: 'center', fontWeight:'300', marginBottom:10, textAlign:'center'}]}>Choose your Meditation Focus</Text>
                    </View>

                    <FeatureCardWide
                        title = "Stress Reduction"
                        desc = "Discover inner calm and serenity with practices that alleviate stress and bring balance to your life. Let go of worries, find relaxation, and nurture your mental well-being."
                        onPress={() => {
                            Speech.stop();
                            goToQuestions('Stress Reduction');
                        }}
                    />
                    <FeatureCardWide
                        title = "Spiritual Growth"
                        desc = "Embark on a profound journey of self-discovery and spiritual awakening. Explore the depths of your soul, expand your spiritual horizons, and find profound meaning and connection"
                        onPress={() => {
                            Speech.stop();
                            goToQuestions('Spiritual Growth');
                        }}
                    />
                    <FeatureCardWide
                        title = "Physical Health"
                        desc = "Unlock the path to physical well-being and vitality. Embrace fitness, nutrition, and self-care to optimize your physical health, leading to a healthier, more energized you"
                        onPress={() => {
                            Speech.stop();
                            goToQuestions('Physical Health');
                        }}
                    />
                    <FeatureCardWide
                        title = "Mental Health"
                        desc = "Prioritize your mental health and emotional wellness. Cultivate mental strength, balance, and resilience. Learn to navigate life's challenges with a resilient and healthy mindset"
                        onPress={() => {
                            Speech.stop();
                            goToQuestions('Mental Health');
                        }}
                    />
                </ScrollView >
            </View>
        </View>
    );
};

const inStyles = StyleSheet.create({
    typeContainer: {
        padding: 15,
        width: screenWidth('100%'),
        height: screenHeight('90%'),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },

    religionCard: {
        padding: 15,
        flexDirection: 'row',
        width: screenWidth('82%'),
        height: screenHeight('9%'),
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 35,
        textAlign: 'center',
        gap: 5,
    },
});
