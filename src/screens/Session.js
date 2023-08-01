import React, { useState, useEffect }from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { StepCard } from '../components/Cards';
import { screenWidth, screenHeight } from '../components/Dimensions';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Stopwatch } from 'react-native-stopwatch-timer';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import FlipCard from 'react-native-flip-card';

import music from '../../assets/images/music.png';
import text from '../../assets/images/text.png';
import stop from '../../assets/images/stop.png';
import videoImg from '../../assets/images/video.png';
import bible from '../../assets/images/bible.png';
import close from '../../assets/images/close.png';

import { styles } from '../../assets/css/Style';
import { getGuide } from '../Data/Practices/GuideDB';
import { getReligionByPractice, timeDB, timeDB2, timeDB3 } from '../Data/LocalDB';
import { getTimeModel, getTimeModel2, getTimesPracticed, timeToMilliseconds } from '../models/TimeModel';
import { StackActions } from '@react-navigation/native';
import Bible from './Extensions/Bible';
import VideoPlayer from './Extensions/Video';
import Slider from '@react-native-community/slider';

export default function Session({ navigation, route }) {
    const data = route.params

    const practiceTitle = data.title
    const bia = data?.bia
    const imgGuide = data.img

    const religion = getReligionByPractice(practiceTitle)

    // Modals for Summary and BGM Selection
    const [bgmVisible, setBgmVisible] = useState(false);

    // Set Value for guide content and time
    const [ guide, setGuide ] = useState();
    const [ time, setTime ] = useState(999);
    const [timerRunning, setTimerRunning] = useState(true);
    const [stopwatchTime, setStopwatchTime] = useState('00:99:99')

    // Use State for Text-To-Speech
    const [isSpeaking, setIsSpeaking] = useState(true);

    // Use States for flippable components
    const [guideFlipped, setGuideFlipped] = useState(false);
    const [textFlipped, setTextFlipped] = useState(false);

    // Use States for sounds and selected sounds
    const [sounds, setSounds] = useState([]);
    const [clickedIndexes, setClickedIndexes] = useState([]);

    const [bibleDisabled, setbibleDisabled] = useState(false);
    const [videoDisabled, setvideoDisabled] = useState(false);

    useEffect(() => {
        const loadSounds = async () => {
            try {
                const loadedSounds = await Promise.all(
                    soundFiles.map(async (soundFile) => {
                        const { sound } = await Audio.Sound.createAsync(soundFile);
                        return sound;
                    })
                );
                setSounds(loadedSounds);
            } catch (error) {
                console.error('Error loading sounds:', error);
            }
        };
        loadSounds();
    }, []);

    useEffect(() => {
        const fetchGuideAndTime = () => {
            if (!timerRunning) {
                // Timer finished, stop the useEffect
                return;
            }
            setGuide(getGuide(practiceTitle, religion))
            // evaluate if practice 
            const inTimeDB = Object.keys(timeDB).includes(practiceTitle);
            const inTimeDB2 = Object.keys(timeDB2).includes(practiceTitle);
            const inTimeDB3 = Object.keys(timeDB3).includes(practiceTitle);
            if (inTimeDB) {
                // console.log('active: timeDB')
                setTime(getTimeModel(practiceTitle))
            } else if (inTimeDB2) {
                // console.log('active: timeDB2')
                setTime(getTimeModel2(practiceTitle,bia))
            } else if (inTimeDB3) {
                // console.log('active: timeDB3')
                setTime(0)
            }
            // console.log(time)
        };
        fetchGuideAndTime();
    }, [])

    useEffect(() => {
        const religion = getReligionByPractice(practiceTitle);
        if (religion && religion.key === 'Christianity') {
            if (practiceTitle === 'Rosary') {
                setbibleDisabled(true);
            } else {
                setvideoDisabled(true);
            }
        } else {
            setbibleDisabled(true);
            setvideoDisabled(true);
        }
    }, [practiceTitle]);

    useEffect(()=>{
        try{
            let tick = timeToMilliseconds(stopwatchTime)
            // console.log('Stopwatch:', tick)
            if(tick == time && bia >= 0){
                console.log('=====================\n\n\n\n\n           TRUE\n\n\n\n=====================')
                // alert('it worked')
                // handleDone()
                concludeSession()
            }
        } catch (error) {
          console.log(error)
        }
    },[stopwatchTime])

    const showGuide = () => {
        const steps = [];
        let stepCount = 1
        let count = ''
        for (const property in guide){
            count = ('Step ' + stepCount)
            steps.push(
                <StepCard count={count} desc={property} detailedDesc={guide[property]}></StepCard>
            );
            stepCount++
        }
        return steps;
    }

    const toggleItem = (index) => {
        if (clickedIndexes.includes(index)) {
            setClickedIndexes(clickedIndexes.filter((clickedIndex) => clickedIndex !== index));
        } else {
            setClickedIndexes([...clickedIndexes, index]);
        }
    };

    const soundFiles = [
        require('./../../assets/sounds/campfire.wav'),
        require('./../../assets/sounds/night.wav'),
        require('./../../assets/sounds/rain.wav'),
        require('./../../assets/sounds/waves.wav')
    ];

    const soundFilesName = [
        'Campfire',
        'Night',
        'Rain',
        'Waves'
    ];

    const playSound = async (index) => {
        try {
            const sound = sounds[index];
            await sound.replayAsync();
            
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                  // Sound finished playing, replay it
                  playSound(index);
                }
            });

            toggleItem(index);
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };

    const stopSound = async (index) => {
        try {
            const sound = sounds[index];
            await sound.stopAsync();
            setClickedIndexes(clickedIndexes.filter((clickedIndex) => clickedIndex !== index));
        } catch (error) {
            console.error('Error stopping sound:', error);
        }
    };

    const stopAllSounds = async () => {
        try {
            await Promise.all(sounds.map((sound) => sound.stopAsync()));
            setSounds([]);
            setClickedIndexes([]);
        } catch (error) {
            console.error('Error stopping all sounds:', error);
        }
    };

    useEffect(() => {
        return () => {
            stopAllSounds();
        };
    }, []);

    const handlePlaySound = (index) => {
        playSound(index);
    };

    const handleStopSound = (index) => {
        stopSound(index);
    };

    const callStopwatch = () => {
        const clock = [];
        clock.push(
            <Stopwatch
                start={timerRunning}
                startTime={0}
                options= {{
                    container: inStyles.duration,
                    text: inStyles.durationText,
                }}
                getTime={(time) => {
                    setStopwatchTime(time)
                }}
            />
        )
        return clock
    }

    const callBibleOrVideoPlayer = () => {
        const religion = getReligionByPractice(practiceTitle);
        if (religion && religion.key === 'Christianity') {
            if (practiceTitle === 'Rosary') {
                return <VideoPlayer />;
            } else {
                return <Bible />;
            }
        } else {
            return <VideoPlayer />;
        }
    };

    useEffect(() => {
        if (!isSpeaking) {
            flipText();
        }
    }, [isSpeaking]);

    const speak = () => {
        let thingsToSay = []
        for (const property in guide){
            thingsToSay.push(guide[property])
        }
        const options = {
            voice: 'Microsoft Zira - English (United States)',
            rate: 0.9,
            onStart: () => setIsSpeaking(true),
            onDone: () => setIsSpeaking(false),
        }
        if (thingsToSay) {
            let thingToSay = ''
            thingsToSay.forEach((item)=>{
                thingToSay = thingToSay + item + '\n '
                // console.log('(loop is running) thingToSay:',thingToSay)    
                // console.log('(loop is running) item:',item)    
            })
            flipText()
            // console.log('\nthingToSay',thingToSay)
            if (thingToSay.length) {
                Speech.speak(thingToSay, options);
            }
        }
    };

    const stopSpeech = () => {
        Speech.stop();
        flipText();
    };

    const flipGuide = () => {
        setGuideFlipped(!guideFlipped);
    };

    const flipText = () => {
        setTextFlipped(!textFlipped);
    };

    const showBgmModal = () => {
        setBgmVisible(true);
    };
    
    const hideBgmModal = () => {
        setBgmVisible(false);
    };

    const concludeSession = async () => {
        stopAllSounds();
        setTimerRunning(false);
        Speech.stop();
        // console.log('getTimesPracticed:', getTimesPracticed(practiceTitle))
        const data = {
            practiceTitle: practiceTitle,
            stopwatchTime: timeToMilliseconds(stopwatchTime),
            // meditation type
            // times practiced
            timesPracticed: await getTimesPracticed(practiceTitle) + 1
        };
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate('ConcludeSession', {data});
    };

    return (
        <SafeAreaView style={[styles.screen, styles.bgColorPrimary]}>
            <View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={[inStyles.imageContainer, styles.dropShadow]}>
                        <Image style={[{ width: '100%', height: '100%' }]} source={imgGuide}></Image>
                    
                        <View style={inStyles.headerContainer}>
                            <View style={{ gap: 5 }}>
                                <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(1.5), alignSelf: 'center' }]}>{practiceTitle}</Text>
                                <View style={inStyles.timerContainer}>
                                    {callStopwatch()}
                                </View>
                            </View>
                            
                            <View style={inStyles.optionsContainer}>
                                <TouchableOpacity style={[styles.dropShadow, inStyles.btnMedia]} onPress={showBgmModal}>
                                    <Image style={[{ width: 40, height: 40 }]} source={music}/>
                                </TouchableOpacity>

                                <View>
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
                                </View>
                                

                                <TouchableOpacity
                                    style={[styles.dropShadow, inStyles.btnMedia, bibleDisabled && inStyles.disabledButtonContainer]}
                                    onPress={flipGuide}
                                    disabled={bibleDisabled}>
                                    <Image style={[{ width: 35, height: 35 }]} source={bible}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.dropShadow, inStyles.btnMedia, videoDisabled && inStyles.disabledButtonContainer]}
                                    onPress={flipGuide}
                                    disabled={videoDisabled}>
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

                                
                            {/* front */}
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {showGuide()}
                            </ScrollView>

                            {/* back */}
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {callBibleOrVideoPlayer()}
                            </ScrollView>
                        </FlipCard>
                    </View>

                    <View style={inStyles.bottomContainer}>      
                        <TouchableOpacity style={[styles.dropShadow, styles.bgColorPrimary, inStyles.btnEnd]} onPress={() => {concludeSession()}}>
                            <Text style={[{ fontSize: RFPercentage(3) }, styles.colorWhite, styles.bold]}>Conclude Session</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal visible={bgmVisible} animationType='slide' transparent={true}>
                        <View style={inStyles.bgmContainer}>
                            <View style={[inStyles.bgmContent, { gap: 15 }]}>
                                <Text style={[styles.bold, { fontSize: RFPercentage(2.5) }]}>Ambient Sound</Text>
                                <ScrollView style={inStyles.bgmListContainer} showsVerticalScrollIndicator={false}>
                                    {sounds.map((sound, index) => (
                                        <View key={index}>
                                            <TouchableOpacity style={inStyles.soundContainer} onPress={() => {
                                                if (clickedIndexes.includes(index)) {handleStopSound(index);}
                                                else {handlePlaySound(index);}}}>
                                                <Text style={[inStyles.itemText, styles.bold, clickedIndexes.includes(index) && inStyles.selectedItemText]}>
                                                    {soundFilesName[index]}
                                                </Text>
                                                <Slider
                                                    style={inStyles.volSlider}
                                                    value={0.5}
                                                    minimumValue={0}
                                                    maximumValue={1}
                                                    step={0.1}
                                                    onValueChange={(value)=>sound.setVolumeAsync(value)}
                                                    thumbTintColor='#2EC4B6'>
                                                </Slider>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </ScrollView>
                                <TouchableOpacity onPress={hideBgmModal} style={{ top: 15, right: 15, position: 'absolute' }}>
                                    <Image style={[{ width: 25, height: 25 }]} source={close}/>
                                    {/* <Text style={[styles.bold, { fontSize: RFPercentage(2) }]}>Close</Text> */}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </SafeAreaView>
    )
}

const inStyles = StyleSheet.create({
    imageContainer: {
        width: screenWidth('100%'),
        height: screenHeight('40%'),
        zIndex: 1,
    },

    headerContainer: {
        width: screenWidth('80%'),
        height: screenHeight('10%'),
        padding: 15,
        marginTop:30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
    },

    optionsContainer: {
        flexDirection: 'row',
        gap: 10,
        position: 'relative',
        right: -35
    },

    guideContainer: {
        width: screenWidth('90%'),
        height: screenHeight('54.2%'),
        alignItems: 'center',
    },

    bottomContainer: {
        width: screenWidth('100%'),
        height: screenHeight('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(35, 35, 35, 0.5)',
        shadowOpacity: 3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: -3 },
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
        width: screenWidth('90%'),
        height: screenHeight('7%'),
        borderRadius: 30,
        padding: 10,
    },

    duration: {
        width: screenWidth('24%'),
    },

    durationText: {
        justifyContent:'center',
        color: '#2EC4B6',
        fontSize: RFPercentage(1.5),
        fontWeight: 'bold',
        textAlign: 'center',
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
        height: screenHeight('45%'),
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
        height: screenHeight('5%'),
        padding: 15,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#2EC4B6',
    },

    itemText: {
        fontSize: RFPercentage(2.2),
        // justifyContent:'center',
        paddingVertical: 10,
        margin: 5,
        flex: 1,
        textAlign: 'center',
    },
    
    selectedItemText: {
        color: '#FFFFFF',
        backgroundColor: '#FFBF69',
        borderRadius: 20,
    },

    disabledButtonContainer: {
        opacity: 0.5,
    },

    volSlider: {
        width: 150,
        height: 50,
        right: 10,
        // position: 'absolute',
        alignSelf:'center',
    },

    soundContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    }

});