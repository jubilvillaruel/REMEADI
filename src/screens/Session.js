import React, { useState, useEffect, useRef }from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, Modal, ImageBackground } from 'react-native';
import { StepCard } from '../components/Cards';
import { screenWidth, screenHeight } from '../components/Dimensions';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Stopwatch } from 'react-native-stopwatch-timer';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import FlipCard from 'react-native-flip-card';

import steps from '../../assets/images/question.png';
import music from '../../assets/images/headphones.png';
import text from '../../assets/images/speak.png';
import stop from '../../assets/images/stop.png';
import videoImg from '../../assets/images/play.png';
import bible from '../../assets/images/book.png';
import close from '../../assets/images/down.png';

import { styles } from '../../assets/css/Style';
import { getGuide } from '../Data/Practices/GuideDB';
import { HinduismDB } from '../Data/Practices/HinduismDB';
import { dayOfWeekMap, getCategoryByPractice, timeDB, timeDB2, timeDB3 } from '../Data/LocalDB';
import { getTimeModel, getTimeModel2, getTimesPracticed, timeToMilliseconds } from '../models/TimeModel';
import { StackActions } from '@react-navigation/native';
import Bible from './Extensions/Bible';
import VideoPlayer from './Extensions/Video';
import Slider from '@react-native-community/slider';

export default function Session({ navigation, route }) {
    const data = route.params

    const practiceTitle = data.title
    const bia = data?.bia

    let biaLevel = '';
    if (practiceTitle === 'Hatha Yoga') {
        if (bia === 0) {
            biaLevel = 'Beginner';
        } else if (bia === 1) {
            biaLevel = 'Intermediate';
        } else if (bia === 2) {
            biaLevel = 'Advanced';
        }
    }
    else if (practiceTitle === 'Kriya Yoga') {
        if (bia === 0) {
            biaLevel = 'Level1';
        } else if (bia === 1) {
            biaLevel = 'Level2';
        } else if (bia === 2) {
            biaLevel = 'Level3';
        } else if (bia === 3) {
            biaLevel = 'Level4';
        } else if (bia === 4) {
            biaLevel = 'Level5';
        } else if (bia === 5) {
            biaLevel = 'Level6';
        }
    }
    else if (practiceTitle === 'Chakra') {
        if (bia === 0) {
            biaLevel = 'Root';
        } else if (bia === 1) {
            biaLevel = 'Sacral';
        } else if (bia === 2) {
            biaLevel = 'SolarPlexus';
        } else if (bia === 3) {
            biaLevel = 'Heart';
        } else if (bia === 4) {
            biaLevel = 'Throat';
        } else if (bia === 5) {
            biaLevel = 'ThirdEye';
        } else if (bia === 6) {
            biaLevel = 'Crown';
        }
    }

    const imgGuide = data.img
    const selectedSteps = biaLevel ? HinduismDB[practiceTitle][biaLevel] : null;

    const religion = getCategoryByPractice(practiceTitle)

    // Modals for Summary and BGM Selection
    const [bgmVisible, setBgmVisible] = useState(false);

    // Modals for Guide Display
    const [guideVisible, setGuideVisible] = useState(false);

    // Modals for Verse Search
    const [verserVisible, setVerserVisible] = useState(false);

    // Modals for Video
    const [videoVisible, setVideoVisible] = useState(false);

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
                // return;
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

    const [prevStopwatchTime, setPrevStopwatchTime] = useState(null);

    useEffect(() => {
        const religion = getCategoryByPractice(practiceTitle);
        if (religion && religion.key === 'Christianity') {
            if (practiceTitle === 'Rosary') {
                setbibleDisabled(true);
            } else {
                setvideoDisabled(true);
            }
        }
        else if (practiceTitle === 'Chakra') {
            setbibleDisabled(true);
            setvideoDisabled(false);
        }
        else if (religion && religion.key === 'Buddhism') {
            setbibleDisabled(true);
            setvideoDisabled(false);
        } else {
            setbibleDisabled(true);
            setvideoDisabled(true);
        }
    }, [practiceTitle]);

    useEffect(() => {
        const checkElapsedTime = () => {
          try {
            const currentStopwatchTime = stopwatchRef.current.formatTime();
            if (currentStopwatchTime !== prevStopwatchTime) {
              // Update the previous stopwatch time
              setPrevStopwatchTime(currentStopwatchTime);
    
              // Convert time to milliseconds for comparison
              const tick = timeToMilliseconds(currentStopwatchTime);
    
              // Replace 'time' with your desired time in milliseconds
              if (tick === time && bia >= 0) {
                console.log(
                  '=====================\n\n\n\n\n           TRUE\n\n\n\n====================='
                );
                // alert('it worked')
                // handleDone()
                concludeSession();
              }
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        const interval = setInterval(checkElapsedTime, 1000);
    
        return () => {
            clearInterval(interval);
        };
    }, [prevStopwatchTime]);



    const showGuide = () => {
        const steps = [];
        let stepCount = 1;
        let count = '';
    
        const stepsToRender = selectedSteps || guide;
        
        for (const property in stepsToRender) {
            if (practiceTitle == 'Hatha Yoga') {
                count = ('Pose ' + stepCount);
            }
            else {
                count = ('Step ' + stepCount);
            }

            steps.push(
                <StepCard key={property} count={count} desc={property} detailedDesc={stepsToRender[property]}></StepCard>
            );
            stepCount++;
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
        require('./../../assets/sounds/campfire.mp3'),
        require('./../../assets/sounds/night.mp3'),
        require('./../../assets/sounds/rain.mp3'),
        require('./../../assets/sounds/waves.mp3')
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

    // Create a ref for accessing the stopwatch time value
    const stopwatchRef = useRef();

    const callStopwatch = () => {
        const clocks = [];
        clocks.push(
            <Stopwatch
                ref={stopwatchRef} // Assign the ref to the StopWatch component
                key={0} // Add a unique key prop here
                start={timerRunning}
                startTime={0}
                options= {{
                    container: inStyles.duration,
                    text: inStyles.durationText,
                }}
                // getTime={(time) => {
                //     setStopwatchTime(time)
                // }}
            />
        )
        return clocks
    }   

    const callVideoPlayer = () => {
        try {
            const religion = getCategoryByPractice(practiceTitle);
            if (practiceTitle === 'Rosary') {
                return <VideoPlayer title={practiceTitle}></VideoPlayer>;
            } else if (practiceTitle === 'Chakra') {
                return <VideoPlayer title={biaLevel}></VideoPlayer>;
            } else {
                return <VideoPlayer title={practiceTitle}></VideoPlayer>;
            }
        } catch (error) {
            console.log(error.stack)
        }  
    };

    useEffect(() => {
        if (!isSpeaking) {
            flipText();
        }
    }, [isSpeaking]);

    const speak = () => {
        let thingsToSay = []
        const stepsToRender = selectedSteps || guide;

        for (const property in stepsToRender){
            thingsToSay.push(stepsToRender[property])
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

    const showGuideModal = () => {
        setGuideVisible(true);
    };
    
    const hideGuideModal = () => {
        setGuideVisible(false);
    };

    const showVerseModal = () => {
        setVerserVisible(true);
    };
    
    const hideVerseModal = () => {
        setVerserVisible(false);
    };

    const showVideoModal = () => {
        setVideoVisible(true);
    };
    
    const hideVideoModal = () => {
        setVideoVisible(false);
    };

    const concludeSession = async () => {
        const time = stopwatchRef.current.formatTime();
        stopAllSounds();
        setTimerRunning(false);
        Speech.stop();
        // console.log('getTimesPracticed:', getTimesPracticed(practiceTitle))

        // subCategory
        let subCategory = null
        if (practiceTitle == 'Rosary') {
            const currentDayOfWeek = new Date().getDay();
            let mysteryDetails = dayOfWeekMap[currentDayOfWeek];
            let mystery = mysteryDetails.split(" ").slice(0,2).join(" ")
            subCategory = mystery
        }
        
        const data = {
            practiceTitle: practiceTitle,
            stopwatchTime: timeToMilliseconds(time),
            // subTitle
            subCategory: subCategory,
            // meditation type
            // times practiced
            timesPracticed: await getTimesPracticed(practiceTitle) + 1
        };
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate('ConcludeSession', {data});
    };

    return (
        <SafeAreaView style={[styles.screen, styles.bgColorPrimary, {backgroundColor:'#ffffff'}]}>
            <ImageBackground
                source={imgGuide}
                style={inStyles.backgroundImage}
                blurRadius={5} 
            >
                <View style={inStyles.backgroundBody}>
                    <View style={[inStyles.imageContainer, styles.dropShadow]}>
                    
                        <View style={inStyles.headerContainer}>
                            <View style={{ gap: 5, alignItems: 'center', marginBottom:15}}>
                                <Text style={[styles.bold, { fontSize: RFPercentage(4), alignSelf: 'center', color:'#2EC4B6' }]}>
                                    {practiceTitle}
                                </Text>
                                <View style={inStyles.timerContainer}>
                                    {callStopwatch()}
                                </View>
                            </View>
                            
                            <View style={inStyles.optionsContainer}>
                                <TouchableOpacity
                                    style={[{flexDirection: 'row', justifyContent: 'center', gap:10}, styles.dropShadow, inStyles.btnMedia, videoDisabled && inStyles.disabledButtonContainer]}
                                    onPress={showVideoModal}
                                    disabled={videoDisabled}>
                                        <Text style={inStyles.btnHeader}>Video</Text>
                                        <Image style={[{ width: 30, height: 30 }]} source={videoImg}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[{flexDirection: 'row', justifyContent: 'center', gap:10}, styles.dropShadow, inStyles.btnMedia, bibleDisabled && inStyles.disabledButtonContainer]}
                                    onPress={showVerseModal}
                                    disabled={bibleDisabled}>
                                        <Text style={inStyles.btnHeader}>Verse</Text>
                                        <Image style={[{ width: 30, height: 30 }]} source={bible}/>
                                </TouchableOpacity>
                            </View> 
                        </View>

                        <View style={inStyles.bodyContainer}>
                            <Image style={inStyles.img} source={imgGuide}></Image>
                        </View>

                        <View style={inStyles.bottomContainer}>   
                            
                            <View style={inStyles.optionsContainer}>
                                {/* Ambient Sound */}
                                <TouchableOpacity style={[styles.dropShadow, inStyles.btn]} onPress={showBgmModal}>
                                    <Image style={[{ width: 25, height: 25 }]} source={music}/>
                                </TouchableOpacity>

                                {/* Text-to-Speech */}
                                <View>
                                    <FlipCard
                                        flipHorizontal={true}
                                        flipVertical={false}
                                        flip={textFlipped}
                                        clickable={false}>
                                        <TouchableOpacity style={[inStyles.btn, inStyles.btnBig]} onPress={speak}>
                                            <Image style={[{ width: 40, height: 40 }]} source={text}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.dropShadow, inStyles.btn, inStyles.btnBig]} onPress={stopSpeech}>
                                        <Image style={[{ width: 40, height: 40 }]} source={stop}/>
                                        </TouchableOpacity>
                                    </FlipCard>
                                </View>

                                {/* Text Guide */}
                                <TouchableOpacity style={[styles.dropShadow, inStyles.btn]} onPress={showGuideModal}>
                                    <Image style={[{ width: 25, height: 25 }]} source={steps}/>
                                </TouchableOpacity>

                            </View> 
                            {/* --------------------  */}
                            <TouchableOpacity style={[styles.dropShadow, styles.bgColorPrimary, inStyles.btnEnd]} onPress={() => {concludeSession()}}>
                                <Text style={[{ fontSize: RFPercentage(3) }, styles.colorWhite, styles.bold]}>Conclude</Text>
                            </TouchableOpacity>
                        </View>
                    </View> 

                    <Modal visible={guideVisible} animationType='slide' transparent={true}>
                        <View style={inStyles.guideBg}>
                            <View style={inStyles.guideContainer}>
                                    <TouchableOpacity onPress={hideGuideModal} style={[{ top: 15, right: 5, position: 'absolute' }]}>
                                        <Image style={[{ width: 40, height: 40}]} source={close}/>
                                    </TouchableOpacity>
                                        <Text style={{textAlign:'left', marginBottom:20, marginTop:20, fontSize: RFPercentage(3), fontWeight:'bold'}}>
                                            {practiceTitle} Guide
                                        </Text>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        {showGuide()}
                                    </ScrollView>
                            </View>
                        </View>
                    </Modal>

                    <Modal visible={bgmVisible} animationType='slide' transparent={true}>
                        <View style={inStyles.bgmContainer}>
                            <View style={[inStyles.bgmContent, { gap: 15 }]}>
                                <Text style={[styles.bold, {marginBottom:10, marginTop:5, fontSize: RFPercentage(3) }]}>Ambient Sound</Text>
                                <ScrollView style={inStyles.bgmListContainer} showsVerticalScrollIndicator={false}>
                                    <View style={inStyles.soundLabelContainer}>
                                    <Text style={inStyles.soundLabel}>Sound</Text>
                                    <Text style={inStyles.soundLabel}>Volume</Text>
                                    </View>
                                    
                                    {sounds.map((sound, index) => (
                                        <View key={index}>
                                            <TouchableOpacity style={inStyles.soundContainer} onPress={() => {
                                                if (clickedIndexes.includes(index)) {handleStopSound(index);}
                                                else {handlePlaySound(index);}}}>
                                                <Text style={[inStyles.itemText, styles.bold, clickedIndexes.includes(index) && inStyles.selectedItemText,{borderWidth:1, borderColor: '#FFBF69', borderRadius:20}]}>
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
                                    <Image style={[{ width: 40, height: 40 }]} source={close}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* Verse Search */}
                    <Modal visible={verserVisible} animationType='slide' transparent={true}>
                        <View style={inStyles.guideBg}>
                            <View style={inStyles.guideContainer}>
                                <Text style={{marginTop:20, fontSize: RFPercentage(3), fontWeight:'bold'}}>
                                    Verse Search
                                </Text>
                                <Bible />
                                <TouchableOpacity onPress={hideVerseModal} style={[{ top: 15, right: 5, position: 'absolute' }]}>
                                    <Image style={[{ width: 40, height: 40 }]} source={close}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* Video */}
                    <Modal visible={videoVisible} animationType='slide' transparent={true}>
                        <View style={[inStyles.guideBg, {felx:1, justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.9)'}]}>
                                {callVideoPlayer()}
                                <TouchableOpacity onPress={hideVideoModal} style={[{marginTop:30, borderWidth:2, borderColor:'#2EC4B6', borderRadius:50}]}>
                                    <Image style={[{ width: 40, height: 40 }]} source={close}/>
                                </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const inStyles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Adjust as needed (contain, stretch, etc.)
    },

    backgroundBody: {
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    
    imageContainer: {
        width: screenWidth('100%'),
        height: screenHeight('100%'),
        zIndex: 1,
    },

    headerContainer: {
        width: screenWidth('100%'),
        height: screenHeight('16%'),
        padding: 15,
        marginTop:30,
        alignItems: 'center',
    },

    bottomContainer: {
        width: screenWidth('100%'),
        height: screenHeight('20%'),
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth:0.5,
        borderTopColor:'#b0b0b0',
        zIndex: 1,
    },

    optionsContainer: {
        flexDirection: 'row',
        gap: 30,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'relative',
        // right: -35
        margin:0
    },

    bodyContainer: {
        width: screenWidth('100%'),
        height: screenHeight('60%'),
        justifyContent: 'center',
        alignItems: 'center',
    },

    img: {
        borderRadius: 30,
        resizeMode: 'cover',
        width: screenWidth('90%'), 
        height: screenHeight('40%')
    },

    guideBg:{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        alignItems: 'center',
        width: screenWidth('100%'),
        height: screenHeight('100%'),
    },

    guideContainer: {
        alignItems: 'center',
        height: screenHeight('90%'),
        width: screenWidth('100%'),
        position:'absolute',
        bottom:0,
        backgroundColor:'#e8e8e8',
        borderRadius:20
    },

    timerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth('25%'),
        height: screenHeight('4%'),
    },

    btnMedia: {
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#2EC4B6',
        elevation: 20
    },

    btnHeader: {
        fontSize:20, 
        color:'#2EC4B6'
    },

    btn: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#2EC4B6',
    },

    btnBig: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#2EC4B6',
    },

    btnEnd: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth('90%'),
        height: screenHeight('6%'),
        borderRadius: 30,
        padding: 10,
    },

    duration: {
        width: screenWidth('24%'),
        elevation: 5
    },

    durationText: {
        justifyContent:'center',
        color: '#dedede',
        fontSize: RFPercentage(2.5),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    
    bgmContainer: {
        textAlign: 'center',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },

    bgmContent: {
        bottom: 0,
        width: screenWidth('100%'),
        height: screenHeight('45%'),
        padding: 15,
        backgroundColor:'#e8e8e8',
        borderRadius: 20,
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
        padding: 15,
        borderRadius: 20,
        backgroundColor:'white'
    },

    itemText: {
        fontSize: RFPercentage(2.2),
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
        alignSelf:'center',
    },

    soundContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    },

    soundLabelContainer: {
        flexDirection:'row',
        justifyContent:'space-around'
    },

    soundLabel: {
        color:'#FFBF69'
    }

});