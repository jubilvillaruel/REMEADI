import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { PrimaryButton } from '../components/Buttons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { screenHeight, screenWidth } from '../components/Dimensions';
import { styles } from '../../assets/css/Style';
import appLogo from '../../assets/images/app_logo.png';
import { meditationTypeDB } from '../Data/TypeDB';

export default function ConcludeSession({ navigation, route }) {
    const {data} = route.params;
    const practiceTitle = data.practiceTitle;
    const stopwatchTime = data.stopwatchTime;
    const medType = meditationTypeDB[data.practiceTitle];

    const gotoHome = () => {
        navigation.navigate('HomeScreen')
    }

    return (
        <View style={styles.screenCenter}>
            <View style={[inStyles.summaryContainer, styles.dropShadow, { gap: 15 }]}>
                <View style={inStyles.headerContainer}>
                    <Image style={{ margin: 15, height: screenHeight('22%'), width: screenWidth('60%') }} source={appLogo} />
                    <Text style={[styles.bold, styles.colorPrimary, { fontSize: RFPercentage(3.5) }]}>{practiceTitle}</Text>
                    <Text style={[styles.colorPrimary, { fontSize: RFPercentage(2.5), marginTop: -8 }]}>Session Done!</Text>
                </View>

                <View style={inStyles.summaryContent}>
                    <View style={inStyles.infoContainer}>
                        <Text style={[ styles.bold, { fontSize: RFPercentage(2) }]}>Meditation Type</Text>
                        <Text style={[ styles.bold, styles.colorPrimary, { fontSize: RFPercentage(2) }]}>{medType}</Text>
                    </View>
                    <View style={inStyles.infoContainer}>
                        <Text style={[ styles.bold, { fontSize: RFPercentage(2) }]}>Meditation Duration</Text>
                        <Text style={[ styles.bold, styles.colorPrimary, { fontSize: RFPercentage(2) }]}>{stopwatchTime}</Text>
                    </View>
                    <View style={inStyles.infoContainer}>
                        <Text style={[ styles.bold, { fontSize: RFPercentage(2) }]}>Times Practiced</Text>
                        <Text style={[ styles.bold, styles.colorPrimary, { fontSize: RFPercentage(2) }]}>5</Text>
                    </View>
                </View>

                <View style={inStyles.btnContainer}>
                    <PrimaryButton
                        text='Back to Home'
                        textColor= '#FFFFFF'
                        textSize={RFPercentage(2.2)}
                        width={screenWidth('65%')}
                        height={screenHeight('5%')}
                        borderRad={30}
                        onPress={gotoHome}>
                    </PrimaryButton>
                </View>
            </View>
        </View>
    )
}

const inStyles = StyleSheet.create({
    summaryContainer: {
        width: screenWidth('90%'),
        height: screenHeight('95%'),
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#FFBF69',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerContainer: {
        width: screenWidth('80%'),
        height: screenHeight('25%'),
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        margin: 15,
    },

    summaryContent: {
        width: screenWidth('80%'),
        height: screenHeight('40%'),
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },

    infoContainer: {
        width: screenWidth('80%'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
      },
      

    btnContainer: {
        padding: 15,
        width: screenWidth('80%'),
        height: screenHeight('15%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
})