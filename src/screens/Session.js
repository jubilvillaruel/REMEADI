import React, { useState }from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { StepCard } from '../components/cards';
import { screenWidth, screenHeight } from '../components/dimensions';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { PrimaryButton } from '../components/buttons';
import FlipCard from 'react-native-flip-card';
import music from '../../assets/images/music.png';
import text from '../../assets/images/text.png';
import video from '../../assets/images/video.png';

import { styles } from '../../assets/css/Style';

export default function Session({ navigation }) {
    const [isFlipped, setIsFlipped] = useState(false);
    // Set either stopwatch or timer to true based on practice.
    const [isStopwatchVisible] = useState(true);
    const [isTimerVisible] = useState(false);
    const [msgVisible, setMsgVisible] = useState(false);
    const [bgmVisible, setBgmVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const flip = () => {
        setIsFlipped(!isFlipped);
    };

    const showMsgModal = () => {
        setMsgVisible(true);
    };
    
    const backToHome = () => {
        navigation.navigate('Home');
    };

    const showBgmModal = () => {
        setBgmVisible(true);
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
            <Text style={[styles.bold, styles.colorPrimary, { fontSize: RFPercentage(3), margin: 15 }]}>Title</Text>

            <View style={inStyles.headerContainer}>
                <View style={[styles.bgColorPrimary, inStyles.timerContainer]}>
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
                <View style={{ flexDirection: 'row', gap: 15, }}>
                    <TouchableOpacity style={[styles.dropShadow, inStyles.btnMedia]} onPress={showBgmModal}>
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
            
            <View style={inStyles.guideContainer}>
                <FlipCard
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={isFlipped}
                    clickable={false}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 5 }}>
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
                            <TouchableOpacity onPress={() => toggleItem('Item 1')}>
                                <Text style={[inStyles.itemText, selectedItems.includes('Item 1') && inStyles.selectedItemText]}>
                                    Item 1
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => toggleItem('Item 2')}>
                                <Text style={[inStyles.itemText, selectedItems.includes('Item 2') && inStyles.selectedItemText]}>
                                    Item 2
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => toggleItem('Item 3')}>
                                <Text style={[inStyles.itemText, selectedItems.includes('Item 3') && inStyles.selectedItemText]}>
                                    Item 3
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>

                        <TouchableOpacity onPress={hideBgmModal}>
                            <Text style={[styles.bold, { fontSize: RFPercentage(2) }]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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

    guideContainer: {
        width: screenWidth('90%'),
        height: screenHeight('70%'),
        padding: 15,
        borderWidth: 2,
        borderColor: '#2EC4B6',
        borderRadius: 10,
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
        borderRadius: 10,
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
    },
    
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 75,
    },
});
