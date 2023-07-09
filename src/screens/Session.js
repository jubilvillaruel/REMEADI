import React, { useState }from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { StepCard } from '../components/cards';
import { screenWidth, screenHeight } from '../components/dimensions';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import FlipCard from 'react-native-flip-card';
import music from '../../assets/images/music.png';
import text from '../../assets/images/text.png';
import video from '../../assets/images/video.png';

import { styles } from '../../assets/css/Style';

export default function Session({  }) {
    const [isFlipped, setIsFlipped] = useState(false);
    // Set either stopwatch or timer to true based on practice.
    const [isStopwatchVisible] = useState(true);
    const [isTimerVisible] = useState(false);


    const flip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <SafeAreaView style={styles.screen}>
            <Text style={[styles.bold, styles.colorPrimary, { fontSize: RFPercentage(3), margin: 15 }]}>Title</Text>

            <View style={inStyles.headerContainer}>
                <View style={[styles.dropShadow, styles.bgColorPrimary, inStyles.timerContainer]}>
                    {isStopwatchVisible && (
                        <Stopwatch
                            start={true}
                            startTime={0}
                            options= {{
                                container: inStyles.duration,
                                text: inStyles.durationText,
                            }}
                        />
                    )}
                    {isTimerVisible && (
                        <Timer
                            start={true}
                            totalDuration={61000}
                            options={{
                                container: inStyles.duration,
                                text: inStyles.durationText,
                            }}
                        />
                    )}
                </View>
                <View style={inStyles.mediaContainer}>
                    <TouchableOpacity style={[styles.dropShadow, inStyles.btnMedia]}>
                        <Image style={[{ width: 40, height: 40 }]} source={music}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.dropShadow, inStyles.btnMedia]}>
                    <Image style={[{ width: 40, height: 40 }]} source={text}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.dropShadow, inStyles.btnMedia]} onPress={flip}>
                        <Image style={[{ width: 40, height: 40 }]} source={video}/>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={[styles.dropShadow, inStyles.guideContainer]}>
                <FlipCard
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={isFlipped}
                    clickable={false}>
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
                    <View style={styles.back}>
                        <Text>The Back</Text>
                    </View>
                </FlipCard>
            </View>

            <View style={inStyles.bottomContainer}>
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
        height: screenHeight('70%'),
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
        height: screenHeight('10%'),
        paddingVertical: 15,
    },

    timerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth('30%'),
        height: screenHeight('5%'),
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
        height: '100%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#2EC4B6',
        padding: 15,
    },

    duration: {
        padding: 15,
        width: screenWidth('24%'),
    },

    durationText: {
        color: '#CBF3F0',
        fontSize: RFPercentage(2),
        fontWeight: 'bold',
    },
});
