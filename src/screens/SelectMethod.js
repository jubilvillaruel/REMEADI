import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/css/Style';

import { RFPercentage } from 'react-native-responsive-fontsize';
import { screenWidth, screenHeight } from '../components/Dimensions';

export default function SelectMethod ({ navigation, route }) {
    const { religion } = route.params;

    const goToQuestions = (type) => {
        navigation.navigate('Questions', { religion, type });
    };

    return (
        <View style={styles.screenCenter}>
            <View style={inStyles.typeContainer}>
                <View style={{ padding: 15, marginBottom: 10 }}>
                    <Text style={[styles.bold, styles.colorPrimary, { fontSize: RFPercentage(3.2), textAlign: 'center' }]}>Please choose from the options below.</Text>
                </View>

                <View style={{ marginBottom: 10, gap: 10 }}>
                    <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary, { marginTop: -10, justifyContent: 'center' }]} onPress={() => goToQuestions('Stress Reduction')}>
                        <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5) }]}>Stress Reduction</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary, { justifyContent: 'center' }]} onPress={() => goToQuestions('Spiritual Growth')}>
                        <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5) }]}>Spiritual Growth</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary, { justifyContent: 'center' }]} onPress={() => goToQuestions('Physical Health')}>
                        <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5) }]}>Physical Health</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary, { justifyContent: 'center' }]} onPress={() => goToQuestions('Mental Health')}>
                        <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5) }]}>Mental Health</Text>
                    </TouchableOpacity>
                </View>
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
