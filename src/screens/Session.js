import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native'
import { StepCard } from '../components/cards';
import { screenWidth, screenHeight } from '../components/dimensions';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import music from '../../assets/images/music.png';
import text from '../../assets/images/text.png';
import video from '../../assets/images/video.png';

import { styles } from '../../assets/css/Style';
import { getGuide } from '../Data/Practices/GuideDB';
import { getReligionByPractice } from '../Data/LocalDB';
import { getTimeModel } from '../models/TimeModel';

export default function Session({ navigation, route }) {
    const data = route.params
    const practiceTitle = data.title
    const religion = getReligionByPractice(practiceTitle)

    const [ guide, setGuide ] = useState({'key':'value'})
    const [ time, setTime ] = useState(Number)
    
    useEffect(() => {
        const fetchGuide = () => {
            setGuide(getGuide(practiceTitle, religion))
            // evaluate if practice is time-based or not
            // if time based
            setTime(getTimeModel(practiceTitle))

            // if stage based
            // code here

        };
        fetchGuide();
    }, [guide, practiceTitle, religion])

    useEffect(() => {
        // get duration 
        
        // if duration is applicable: start timer/stopwatch
        // else: display sequence/stages
    }, [])

    const showGuide = () => {
        const steps = [];
        for (const property in guide){
            steps.push(
                <StepCard title={property} desc={guide[property]}></StepCard>
            );
        }
        return steps;
    }

    const callStopwatch = () => {
        const clock = [];
        clock.push(
            <Stopwatch
                start={true}
                startTime={time}
            />
        )
        return clock
    }

    const callTimer = () => {
        const clock = [];
        console.log('time: ',time)
        clock.push(
            <Timer
                totalDuration={time}  
                start={true}
                handleFinish={() => {
                    alert('Meditation Session Finished');
                  }}
      
            />
        )
        return clock
    }
    

    // get meditation video guide
    // if video guide exists: display video guide on click
    // else: disable on click

    // set ambient sounds

    return (
        <SafeAreaView style={styles.screen}>
            <View style={inStyles.headerContainer}>
                <Text style={[styles.bold, styles.colorPrimary, { fontSize: RFPercentage(2.5) }]}>{practiceTitle}</Text>
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
                    {showGuide()}
                </ScrollView>
            </View>

            <View style={inStyles.bottomContainer}>
                <View style={[styles.dropShadow, styles.bgColorPrimary, inStyles.timerContainer]}>
                    {/* <Text style={[{ color: '#CBF3F0', fontSize: RFPercentage(3) }, styles.bold]}>Duration: </Text>
                    <Text style={[{ fontSize: RFPercentage(3) }, styles.colorWhite, styles.bold]}>00:00</Text> */}
                    {time === 0 ? callStopwatch() : callTimer()}
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