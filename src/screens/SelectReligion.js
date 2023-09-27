import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { screenWidth, screenHeight } from '../components/Dimensions';
import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';

// Religion logos
import christianity_logo_w from '../../assets/images/religion/christianity_logo_w.png';
import islam_logo_w from '../../assets/images/religion/islam_logo_w.png';
import hinduism_logo_w from '../../assets/images/religion/hinduism_logo_w.png';
import buddhism_logo_w from '../../assets/images/religion/buddhism_logo_w.png';
import judaism_logo_w from '../../assets/images/religion/judaism_logo_w.png';

export default function SelectReligion({ navigation }) {

    const goToSelectMedType = (religion) => {
        if (religion === 'Christianity') {
            navigation.navigate('SelectRelBranch', { religion });
        } else {
            navigation.navigate('SelectMedType', { religion });
        }
    };

    return (
        <View style={styles.screenCenter}>
            <View style={inStyles.religionContainer}>
                <View style={{ padding: 15, marginBottom: 10 }}>
                    <Text style={[styles.bold, styles.colorPrimary, { fontSize: RFPercentage(3.2), textAlign: 'center' }]}>Please choose from the five major religions.</Text>
                </View>

                <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => goToSelectMedType('Christianity')}>
                    <Image style={[{ width: 30, height: 40, position: 'absolute', left: 15 }]} source={christianity_logo_w}/>
                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5), position: 'absolute', left: 65 }]}>Christianity</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => goToSelectMedType('Islam')}>
                    <Image style={[{ width: 35, height: 40, position: 'absolute', left: 15 }]} source={islam_logo_w}/>
                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5), position: 'absolute', left: 65 }]}>Islam</Text>
                </TouchableOpacity>
            
                <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => goToSelectMedType('Hinduism')}>
                    <Image style={[{ width: 40, height: 41, position: 'absolute', left: 15 }]} source={hinduism_logo_w}/>
                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5), position: 'absolute', left: 65 }]}>Hinduism</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => goToSelectMedType('Buddhism')}>
                    <Image style={[{ width: 40, height: 40, position: 'absolute', left: 15 }]} source={buddhism_logo_w}/>
                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5), position: 'absolute', left: 65 }]}>Buddhism</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => goToSelectMedType('Judaism')}>
                    <Image style={[{ width: 35, height: 40, position: 'absolute', left: 15 }]} source={judaism_logo_w}/>
                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5), position: 'absolute', left: 65 }]}>Judaism</Text>
                </TouchableOpacity>
                
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
        justifyContent: 'flex-start',
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
        gap: 15,
    },
});