import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { screenWidth, screenHeight } from '../components/Dimensions';
import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';

import christianity_1 from '../../assets/images/christianity/christianity_1.png';
import christianity_2 from '../../assets/images/christianity/christianity_2.png';
import { ReligionButton } from '../components/Buttons';

export default function SelectRelBranch({ navigation }) {

    const goToSelectMedType = (religion) => {
        navigation.navigate('SelectMedType', { religion });
    };

    const goToResult= (title, guideImg, bia) => {
        const data = {
            title: title, 
            guideImg: guideImg,
            bia: bia
        };
        navigation.navigate('ExpertResult', {data});
    };

    return (
        <View style={styles.screenCenter}>
            <View style={inStyles.religionContainer}>
                <View style={{ padding: 15, marginBottom: 10 }}>
                    <Text style={[styles.bold, { color:'black', fontSize: RFPercentage(4), textAlign: 'center', fontWeight:'300', marginBottom:10, textAlign:'center'}]}>Choose your Christian Denomination.</Text>
                </View>

                <ReligionButton
                    text='Roman Catholic'
                    onPress={() => goToSelectMedType('C1')}
                />

                <ReligionButton
                    text='Aglipayan'
                    onPress={() => goToSelectMedType('C2')}
                />

                <ReligionButton
                    text='Iglesia ni Cristo'
                    onPress={() => goToSelectMedType('C3')}
                />

                <ReligionButton
                    text='Baptist'
                    onPress={() => goToSelectMedType('C4')}
                />

                <ReligionButton
                    text='Seventh-Day Adventist'
                    onPress={() => goToSelectMedType('C5')}
                />

                <ReligionButton
                    text='Evangelical'
                    onPress={() => goToSelectMedType('C6')}
                />

                {/* <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => goToSelectMedType('C1')}>
                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5) }]}>Roman Catholic</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => goToSelectMedType('C1')}>
                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5) }]}>Aglipayan</Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => {goToResult('Christian Meditation',christianity_2)}}>
                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5) }]}>Iglesia ni Cristo</Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => {goToResult('Christian Meditation',christianity_2)}}>
                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5) }]}>Baptist</Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => goToSelectMedType('C2')}>
                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5) }]}>Seventh-Day Adventist</Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => {goToResult('Lectio Divina',christianity_1)}}>
                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5) }]}>Evangelical</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
}

const inStyles = StyleSheet.create({
    religionCard: {
        padding: 15,
        flexDirection: 'row',
        width: screenWidth('82%'),
        height: screenHeight('9%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
        textAlign: 'center',
        gap: 5,
    },

    religionContainer: {
        padding: 15,
        width: screenWidth('100%'),
        height: screenHeight('90%'),
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
    },
});