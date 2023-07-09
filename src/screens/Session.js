import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native'
import { StepCard } from '../components/cards';
import { screenWidth, screenHeight } from '../components/dimensions';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import music from '../../assets/images/music.png';
import text from '../../assets/images/text.png';
import video from '../../assets/images/video.png';

import { styles } from '../../assets/css/Style';

export default function Session({  }) {
    return (
        <SafeAreaView style={styles.screen}>
            <View style={inStyles.headerContainer}>
                <Text style={[styles.bold, styles.colorPrimary, { fontSize: RFPercentage(2.5) }]}>Title</Text>
                <View style={inStyles.mediaContainer}>
                    <TouchableOpacity style={[styles.dropShadow, inStyles.btnMedia]}>
                        <Image style={[{ width: 40, height: 40 }]} source={music}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.dropShadow, inStyles.btnMedia]}>
                    <Image style={[{ width: 40, height: 40 }]} source={text}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.dropShadow, inStyles.btnMedia]}>
                        <Image style={[{ width: 40, height: 40 }]} source={video}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.dropShadow, inStyles.guideContainer]}>
                <ScrollView showsVerticalScrollIndicator={false} style={inStyles.stepsContainer}>
                    <StepCard title='Step 1' desc='Content'></StepCard>
                    <StepCard title='Step 1' desc='Content'></StepCard>
                    <StepCard title='Step 1' desc='Content'></StepCard>
                    <StepCard title='Step 1' desc='Content'></StepCard>
                    <StepCard title='Step 1' desc='Content'></StepCard>
                    <StepCard title='Step 1' desc='Content'></StepCard>
                    <StepCard title='Step 1' desc='Content'></StepCard>
                    <StepCard title='Step 1' desc='Content'></StepCard>
                    <StepCard title='Step 1' desc='Content'></StepCard>
                    <StepCard title='Step 1' desc='Content'></StepCard>
                </ScrollView>
            </View>

            <View style={inStyles.bottomContainer}>
                <View style={[styles.dropShadow, styles.bgColorPrimary, inStyles.timerContainer]}>
                    {/* <Text style={[{ color: '#CBF3F0', fontSize: RFPercentage(3) }, styles.bold]}>Duration: </Text>
                    <Text style={[{ fontSize: RFPercentage(3) }, styles.colorWhite, styles.bold]}>00:00</Text> */}
                    <Stopwatch
                         start={true}
                         startTime={0}
                         />
                </View>
                <TouchableOpacity style={[styles.dropShadow, inStyles.btnEnd]}>
                    <Text style={[{ fontSize: RFPercentage(3) }, styles.colorPrimary, styles.bold]}>Finish</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>

        

    )
}

const inStyles = StyleSheet.create({
    headerContainer: {
        width: screenWidth('90%'),
        height: screenHeight('10%'),
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    mediaContainer: {
        flexDirection: 'row',
        gap: 15,
    },

    guideContainer: {
        width: screenWidth('90%'),
        height: screenHeight('60%'),
        padding: 15,
        borderWidth: 2,
        borderColor: '#2EC4B6',
        borderRadius: 10,
    },

    stepsContainer: {
        paddingHorizontal: 5,
    },

    bottomContainer: {
        width: screenWidth('90%'),
        height: screenHeight('30%'),
        paddingVertical: 15,
        gap: 15,
    },

    timerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '45%',
        borderRadius: 10,
        padding: 15,
    },

    btnMedia: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#2EC4B6',
    },

    btnEnd: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '45%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#2EC4B6',
        padding: 15,
    },
});