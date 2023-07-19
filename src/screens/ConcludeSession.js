import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PrimaryButton } from '../components/Buttons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { screenHeight, screenWidth } from '../components/Dimensions';
import { styles } from '../../assets/css/Style';

export default function ConcludeSession({ navigation, route }) {
    const {data} = route.params;
    const practiceTitle = data.practiceTitle;
    const stopwatchTime = data.stopwatchTime;
    // console.log('practiceTitle:',practiceTitle,'\nstopwatchTime',stopwatchTime)

    const gotoHome = () => {
        navigation.navigate('HomeScreen')
    }

    return (
        <View style={inStyles.summaryContainer}>
            <View style={[inStyles.summaryContent, styles.dropShadow]}>
                <Text>Session Done!</Text>
                <View>
                    <Text>{practiceTitle}</Text>
                    <View>
                        <Text>Meditation Type:</Text>
                        <Text>Spiritual</Text>
                    </View>
                    <View>
                        <Text>Duration:</Text>
                        <Text>{stopwatchTime} Minute/s</Text>
                    </View>
                    <View>
                        <Text>Times Practiced:</Text>
                        <Text>5</Text>
                    </View>
                </View>
                {/* <TouchableOpacity onPress={gotoHome}>
                    <Text>
                        Go To Home
                    </Text>
                </TouchableOpacity> */}

                <PrimaryButton
                    text='Back to Home'
                    textColor= '#FFFFFF'
                    textSize={RFPercentage(2.2)}
                    width={screenWidth('70%')}
                    height={screenHeight('7%')}
                    borderRad={30}
                    onPress={gotoHome}>
                </PrimaryButton>
            </View>
        </View>
    )
}

const inStyles = StyleSheet.create({
    summaryContainer: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },

    summaryContent: {
        width: screenWidth('90%'),
        height: screenHeight('40%'),
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})