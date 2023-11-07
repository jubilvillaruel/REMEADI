import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { screenWidth, screenHeight } from '../components/Dimensions';
import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as Speech from 'expo-speech';

// Religion logos
import christianity_logo_w from '../../assets/images/religion/christianity_logo.png';
import islam_logo_w from '../../assets/images/religion/islam_logo.png';
import hinduism_logo_w from '../../assets/images/religion/hinduism_logo.png';
import buddhism_logo_w from '../../assets/images/religion/buddhism_logo.png';
import judaism_logo_w from '../../assets/images/religion/judaism_logo.png';
import faith_bg from '../../assets/images/expert_system/faith_option.jpg'
import method_bg from '../../assets/images/expert_system/method_option.jpg'
import { ReligionButton } from '../components/Buttons';
import { FeatureCardWide } from '../components/Cards';

export default function SelectReligion({ navigation, route }) {
    const data = route.params;
    const expertBase = data.base;

    const goToSelectMedType = (religion) => {
        if (expertBase === 'Faith-based') {
            if (religion === 'Christianity') {
                navigation.navigate('SelectRelBranch', { religion });
            } else {
                navigation.navigate('SelectMedType', { religion });
            }
        }
        else {
            navigation.navigate('SelectMethod', { religion });
        }
    };

    const source = expertBase === 'Faith-based' ? faith_bg : method_bg;

    return (
        <View style={styles.screenCenter}>
             <ImageBackground
                source={source}
                style={inStyles.backgroundImage}
                blurRadius={5} 
            >
                <View style={{backgroundColor:'white', height: screenHeight('95%'), opacity:1, justifyContent:'center', alignItems:'center'}}>
                    <View style={[inStyles.religionContainer]}>
                        <View style={{ padding: 15, marginBottom: 10}}>
                            <Text style={[styles.bold, { color:'black', fontSize: RFPercentage(4), textAlign: 'center', fontWeight:'300', marginBottom:10, textAlign:'center'}]}>
                                {(expertBase === 'Faith-based') ?
                                    ( 'Choose your Faith.' ) :
                                    ( 'Choose a Meditation Style.' )
                                }
                            </Text>
                        </View>

                        {(expertBase === 'Faith-based') ? (
                            <View style={{ gap: 15 }}>
                                <ReligionButton
                                    text='Christianity'
                                    onPress={() => goToSelectMedType('Christianity')}
                                    icon={christianity_logo_w}
                                    width={28}
                                    height={40}
                                />

                                <ReligionButton
                                    text='Islam'
                                    onPress={() => goToSelectMedType('Islam')}
                                    icon={islam_logo_w}
                                    width={36}
                                    height={40}
                                />

                                <ReligionButton
                                    text='Hinduism'
                                    onPress={() => goToSelectMedType('Hinduism')}
                                    icon={hinduism_logo_w}
                                    width={40}
                                    height={41}
                                />

                                <ReligionButton
                                    text='Buddhism'
                                    onPress={() => goToSelectMedType('Buddhism')}
                                    icon={buddhism_logo_w}
                                    width={40}
                                    height={40}
                                />

                                <ReligionButton
                                    text='Judaism'
                                    onPress={() => goToSelectMedType('Judaism')}
                                    icon={judaism_logo_w}
                                    width={35}
                                    height={40}
                                />

                                {/* <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary, { marginTop: -10 }]} onPress={() => goToSelectMedType('Christianity')}>
                                    <Image style={[{ width: 30, height: 40, position: 'absolute', left: 18 }]} source={christianity_logo_w}/>
                                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5), position: 'absolute', left: 65 }]}>Christianity</Text>
                                </TouchableOpacity> */}

                                {/* <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => goToSelectMedType('Islam')}>
                                    <Image style={[{ width: 35, height: 40, position: 'absolute', left: 15 }]} source={islam_logo_w}/>
                                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5), position: 'absolute', left: 65 }]}>Islam</Text>
                                </TouchableOpacity> */}
                            
                                {/* <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => goToSelectMedType('Hinduism')}>
                                    <Image style={[{ width: 40, height: 41, position: 'absolute', left: 15 }]} source={hinduism_logo_w}/>
                                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5), position: 'absolute', left: 65 }]}>Hinduism</Text>
                                </TouchableOpacity> */}

                                {/* <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => goToSelectMedType('Buddhism')}>
                                    <Image style={[{ width: 40, height: 40, position: 'absolute', left: 15 }]} source={buddhism_logo_w}/>
                                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5), position: 'absolute', left: 65 }]}>Buddhism</Text>
                                </TouchableOpacity> */}

                                {/* <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={() => goToSelectMedType('Judaism')}>
                                    <Image style={[{ width: 35, height: 40, position: 'absolute', left: 18 }]} source={judaism_logo_w}/>
                                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5), position: 'absolute', left: 65 }]}>Judaism</Text>
                                </TouchableOpacity> */}
                            </View>
                        ) : (
                            <View style={{ gap: 15 }}>
                                <FeatureCardWide
                                    title = "Stillness-based"
                                    desc = "Calm your mind through mindful breathing and quiet contemplation."
                                    // image = {faith}
                                    onPress={() => {
                                        Speech.stop();
                                        goToSelectMedType('Stillness-based');
                                    }}
                                />
                                <FeatureCardWide
                                    title = "Movement-based"
                                    desc = "Attain mindfulness while moving your body with purpose and flow."
                                    // image = {faith}
                                    onPress={() => {
                                        Speech.stop();
                                        goToSelectMedType('Movement-based');
                                    }}
                                />
                                {/* <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary, { marginTop: -10, justifyContent: 'center' }]} onPress={() => goToSelectMedType('Stillness-based')}>
                                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5) }]}>Stillness-based</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary, { justifyContent: 'center' }]} onPress={() => goToSelectMedType('Movement-based')}>
                                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2.5) }]}>Movement-based</Text>
                                </TouchableOpacity> */}
                            </View>
                        )}
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const inStyles = StyleSheet.create({
    religionCard: {
        padding: 15,
        flexDirection: 'row',
        width: screenWidth('82%'),
        // height: screenHeight('9%'),
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 35,
        textAlign: 'center',
        gap: 5,
    },

    religionContainer: {
        padding: 15,
        width: screenWidth('100%'),
        // height: screenHeight('70%'),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Adjust as needed (contain, stretch, etc.)
    },
});