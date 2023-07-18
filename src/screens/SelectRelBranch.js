import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { screenWidth, screenHeight } from '../components/dimensions';
import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';

import christianity_1 from '../../assets/images/christianity/christianity_1.png';
import christianity_2 from '../../assets/images/christianity/christianity_2.png';

export default function SelectRelBranch({ navigation }) {

    const goToSelectMedType = (religion) => {
        navigation.navigate('SelectMedType', { religion });
    };

    const goToGuide = (title, guideImg, bia) => {
        const data = {
            title: title, 
            guideImg: guideImg,
            bia: bia
        };
        navigation.navigate('Guide', {data});
    };

    return (
        <View style={styles.screenCenter}>
            <View style={inStyles.religionContainer}>
                <View style={inStyles.row}>
                    <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => goToSelectMedType('C1')}>
                        <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>Roman Catholic</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => goToSelectMedType('C1')}>
                        <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>Aglipayan</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={inStyles.row}>
                    <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => {goToGuide('Christian Meditation',christianity_2)}}>
                        <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>Iglesia ni Cristo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => {goToGuide('Christian Meditation',christianity_2)}}>
                        <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>Baptist</Text>
                    </TouchableOpacity>
                </View>

                <View style={inStyles.row}>
                    <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => goToSelectMedType('C2')}>
                        <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>Seventh-Day Adventist</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => {goToGuide('Lectio Divina',christianity_1)}}>
                        <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>Evangelical</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const inStyles = StyleSheet.create({
    religionCard: {
        padding: 15,
        width: screenWidth('40%'),
        height: screenHeight('18%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        textAlign: 'center',
        gap: 5,
    },

    religionContainer: {
        padding: 15,
        width: screenWidth('100%'),
        height: screenHeight('90%'),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },

});