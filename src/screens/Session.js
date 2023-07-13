import React, { useState, useEffect }from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { StepCard } from '../components/cards';
import { screenWidth, screenHeight } from '../components/dimensions';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { PrimaryButton } from '../components/buttons';

import { Video, ResizeMode } from 'expo-av';
import { Sounds } from './TestSound';

import FlipCard from 'react-native-flip-card';

import music from '../../assets/images/music.png';
import text from '../../assets/images/text.png';
import stop from '../../assets/images/stop.png';
import videoImg from '../../assets/images/video.png';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

import night from './../../assets/sounds/night.wav'

import christianity_1 from '../../assets/images/christianity/christianity_1.png';

import { styles } from '../../assets/css/Style';
import { getGuide } from '../Data/Practices/GuideDB';
import { getReligionByPractice } from '../Data/LocalDB';
import { getTimeModel } from '../models/TimeModel';

export default function Session({ navigation, route }) {
    const data = route.params
    const practiceTitle = data.title
    const religion = getReligionByPractice(practiceTitle)

    const [isFlipped, setIsFlipped] = useState(false);
    const [msgVisible, setMsgVisible] = useState(false);
    const [bgmVisible, setBgmVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const [ guide, setGuide ] = useState({'key':'value'})
    const [ time, setTime ] = useState(Number)
    const [isPlaying, setIsPlaying] = useState(false);
    const [sounds, setSounds] = useState([]);

    const playSound = async (soundFile) => {
        console.log('hello from playsound')
        try {
            const { sound } = await Audio.Sound.createAsync(soundFile);
            console.log('hello from Audio.Sound.createAsync')
            setSounds((prevSounds) => [...prevSounds, sound]);
            sound.setOnPlaybackStatusUpdate((status) => {
                console.log('hello from setOnPlaybackStatusUpdate')
                if (status.didJustFinish) {
                    console.log('hello from didJustFinish')
                    sound.replayAsync(); // Replay the sound
                }
            });
            sound.playAsync();
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };
    
    
    const stopSound = async (sound) => {
        console.log('hello from stopSound')
        try {
            await sound.stopAsync();
            setSounds((prevSounds) => prevSounds.filter((s) => s !== sound));
        } catch (error) {
            console.log('Error stopping sound:', error);
        }
    };
    
    const stopAllSounds = async () => {
        try {
            await Promise.all(sounds.map((sound) => sound.stopAsync()));
            setSounds([]);
        } catch (error) {
            console.log('Error stopping sounds:', error);
        }
    };
      
    const playSound0 = () => {
        console.log('hello from playSound0')
        playSound(require('./../../assets/sounds/alarm-clock.wav'));
    };
    
    const playSound1 = () => {
        stopSound(require('./../../assets/sounds/alarm-clock.wav'))
    };
    
    const playSound2 = () => {
        playSound(require('./../../assets/sounds/rain.wav'));
    };
    
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

    const showGuide = () => {
        const steps = [];
        let stepCount = 1
        let count = ''
        for (const property in guide){
            count = ('Step ' + stepCount)
            steps.push(
                <StepCard title={count} desc={property}></StepCard>
            );
            stepCount++
        }
        return steps;
    }

    const callStopwatch = () => {
        const clock = [];
        clock.push(
            <Stopwatch
                start={true}
                startTime={time}
                options= {{
                    container: inStyles.duration,
                    text: inStyles.durationText,
                }}
            />
        )
        return clock
    }

    const callTimer = () => {
        const clock = [];
        console.log('time: ',time)
        clock.push(
            <Timer
                start={true}
                totalDuration={time}
                options={{
                    container: inStyles.duration,
                    text: inStyles.durationText,
                }}
                handleFinish={() => {
                    alert('Meditation Session Finished');
                }}
            />
        )
        return clock
    }

    const speak = () => {
        let thingToSay = []
        for (const property in guide){
            thingToSay.push(guide[property])
        }
        const options = {
            voice: 'Microsoft Zira - English (United States)',
            rate: 0.9
        }
        Speech.speak(thingToSay, options);
        flipText();
    };

    const stopSpeech = () => {
        Speech.stop();
        flipText();
    }; 

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});


    const [guideFlipped, setGuideFlipped] = useState(false);
    const [textFlipped, setTextFlipped] = useState(false);

    const flipGuide = () => {
        setGuideFlipped(!guideFlipped);
    };

    const flipText = () => {
        setTextFlipped(!textFlipped);
    };

    const showMsgModal = () => {
        setMsgVisible(true);
    };
    
    const backToHome = () => {
        navigation.navigate('Home');
    };

    const showBgmModal = () => {
        setBgmVisible(true);
        Sounds.loadSounds
    };
    
    const hideBgmModal = () => {
        setBgmVisible(false);
    };

    const toggleItem = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={inStyles.imageContainer}>
                        <Image style={[{ width: '100%', height: '100%' }]} source={christianity_1}></Image>
                    
                        <View style={inStyles.headerContainer}>
                            <View style={{ gap: 5 }}>
                                <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>{practiceTitle}</Text>
                                <View style={inStyles.timerContainer}>
                                    {time === 0 ? callStopwatch() : callTimer()}
                                </View>
                            </View>
                            
                            <View style={inStyles.optionsContainer}>
                                <TouchableOpacity style={[styles.dropShadow, inStyles.btnMedia]} onPress={showBgmModal}>
                                    <Image style={[{ width: 40, height: 40 }]} source={music}/>
                                </TouchableOpacity>

                                <FlipCard
                                    flipHorizontal={true}
                                    flipVertical={false}
                                    flip={textFlipped}
                                    clickable={false}>
                                    <TouchableOpacity style={[styles.dropShadow, inStyles.btnMedia]} onPress={speak}>
                                        <Image style={[{ width: 40, height: 40 }]} source={text}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.dropShadow, inStyles.btnMedia]} onPress={stopSpeech}>
                                    <Image style={[{ width: 40, height: 40 }]} source={stop}/>
                                    </TouchableOpacity>
                                </FlipCard>

                                {/* <TouchableOpacity style={[styles.dropShadow, inStyles.btnMedia]} onPress={playSound}>
                                    <Text>SOUND</Text>
                                </TouchableOpacity> */}

                                <TouchableOpacity style={[styles.dropShadow, inStyles.btnMedia]} onPress={flipGuide}>
                                    <Image style={[{ width: 40, height: 40 }]} source={videoImg}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>        
                    <View style={inStyles.guideContainer}>
                        <FlipCard
                            friction={6}
                            perspective={1000}
                            flipHorizontal={true}
                            flipVertical={false}
                            flip={guideFlipped}
                            clickable={false}>
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 5 }}>
                                {showGuide()}
                            </ScrollView>
                            <View style={styles.back}>
                                <Video
                                    ref={video}
                                    style={{ width: screenWidth('82%'), height: screenHeight('35%'), borderRadius: 10, aspectRatio: 1 / 1  }}
                                    source={require('../../assets/videos/hehehhehee.mp4')}
                                    useNativeControls
                                    resizeMode={Video.RESIZE_MODE_CONTAIN}
                                    onPlaybackStatusUpdate={(status) => setStatus(status)}
                                />
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        if (status.isPlaying) {
                                        video.current.pauseAsync();
                                        } else {
                                        video.current.playAsync();
                                        }
                                        }}>
                                        <Image style={{ width: 40, height: 40 }} source={videoImg}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </FlipCard>
                    </View>

                    <View style={inStyles.bottomContainer}>      
                        <TouchableOpacity style={[styles.dropShadow, inStyles.btnEnd]} onPress={showMsgModal}>
                            <Text style={[{ fontSize: RFPercentage(3) }, styles.colorPrimary, styles.bold]}>Done</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal visible={msgVisible} animationType='fade' transparent={true}>
                        <View style={inStyles.summaryContainer}>
                            <View style={[inStyles.summaryContent, styles.dropShadow, { gap: 15 }]}>
                                <Text style={[styles.bold, { fontSize: RFPercentage(3) }]}>Session Done!</Text>

                                <View style={{ gap: 5 }}>
                                    <Text style={{ fontSize: RFPercentage(2) }}>Title</Text>
                                    <View style={inStyles.infoContainer}>
                                        <Text style={{ fontSize: RFPercentage(2) }}>Meditation Type:</Text>
                                        <Text style={{ fontSize: RFPercentage(2) }}>Spiritual</Text>
                                    </View>
                                    <View style={inStyles.infoContainer}>
                                        <Text style={{ fontSize: RFPercentage(2) }}>Duration:</Text>
                                        <Text style={{ fontSize: RFPercentage(2) }}>10 minutes</Text>
                                    </View>
                                    <View style={inStyles.infoContainer}>
                                        <Text style={{ fontSize: RFPercentage(2) }}>Times Practiced:</Text>
                                        <Text style={{ fontSize: RFPercentage(2) }}>5</Text>
                                    </View>
                                </View>

                                <PrimaryButton
                                    text='Back to Home'
                                    textColor= '#FFFFFF'
                                    textSize={RFPercentage(2.2)}
                                    width={screenWidth('70%')}
                                    height={screenHeight('7%')}
                                    borderRad={30}
                                    onPress={backToHome}>
                                </PrimaryButton>
                            </View>
                        </View>
                    </Modal>

                    <Modal visible={bgmVisible} animationType='slide' transparent={true}>
                        <View style={inStyles.bgmContainer}>
                            <View style={[inStyles.bgmContent, { gap: 15 }]}>
                                <Text style={[styles.bold, { fontSize: RFPercentage(2) }]}>Background Music</Text>
                                <ScrollView style={inStyles.bgmListContainer}>
                                    <Sounds/>
                                </ScrollView>

                                <TouchableOpacity onPress={hideBgmModal}>
                                    <Text style={[styles.bold, { fontSize: RFPercentage(2) }]}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const inStyles = StyleSheet.create({
    imageContainer: {
        width: screenWidth('100%'),
        height: screenHeight('40%'),
    },

    headerContainer: {
        width: screenWidth('100%'),
        height: screenHeight('10%'),
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
    },

    optionsContainer: {
        flexDirection: 'row',
        gap: 15,
    },

    guideContainer: {
        width: screenWidth('90%'),
        height: screenHeight('45%'),
        padding: 15,
        margin: 15,
        borderWidth: 2,
        borderColor: '#2EC4B6',
        borderRadius: 20,
    },

    bottomContainer: {
        width: screenWidth('90%'),
        height: screenHeight('10%'),
        paddingVertical: 15,
    },

    timerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth('25%'),
        height: screenHeight('3%'),
        borderRadius: 20,
        borderColor: '#2EC4B6',
        borderWidth: 2,
        backgroundColor: '#FFFFFF',
    },

    btnMedia: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#2EC4B6',
        backgroundColor: '#FFFFFF',
    },

    btnEnd: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#2EC4B6',
        padding: 15,
    },

    duration: {
        padding: 15,
        width: screenWidth('24%'),
    },

    durationText: {
        color: '#2EC4B6',
        fontSize: RFPercentage(1.5),
        fontWeight: 'bold',
        textAlign: 'center',
    },

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
    
    bgmContainer: {
        textAlign: 'center',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },

    bgmContent: {
        bottom: 0,
        width: screenWidth('100%'),
        height: screenHeight('40%'),
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },

    bgmListContainer: {
        width: screenWidth('90%'),
        height: screenHeight('15%'),
        padding: 15,
        gap: 15,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#2EC4B6',
    },

    itemText: {
        fontSize: RFPercentage(2),
        paddingVertical: 5,
        flex: 1,
    },
    
    selectedItemText: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        backgroundColor: '#FFBF69',
        borderRadius: 20,
    },
    
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 75,
    }
});
