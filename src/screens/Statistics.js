import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { millisecondsToTime } from '../models/TimeModel';
import { screenHeight, screenWidth } from '../components/Dimensions';

import { styles } from './../../assets/css/Style';
import appLogo from './../../assets/images/app_logo.png';

import { getDatabase, onValue, ref} from 'firebase/database';
import { auth } from '../../firebase';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default function Statistics() {
    const widthAndHeight = 160;
    const [ data, setData ] = useState();
    const [ totalMeditationSession, setTotalMeditationSession ] = useState(0);
    const [ totalMeditationDuration, setTotalMeditationDuration ] = useState(0);
    
    const religions = ['Christianity', 'Islam', 'Hinduism', 'Buddhism', 'Judaism'];
    const [ totalMeditationSessionPerReligion, setTotalMeditationSessionPerReligion ] = useState([1,1,1,1,1]);
    const [ totalMeditationSessionPerReligionBoolean, setTotalMeditationSessionPerReligionBoolean ] = useState(false);
    const colorMapping = { Christianity: '#04BFDA', Islam: '#8FD3D2', Hinduism: '#F27F77', Buddhism: '#FF9F1C', Judaism: '#FF0000'};

    const [topThreeReligions, setTopThreeReligions] = useState([]);
    const firstThreeReligions = Object.keys(colorMapping).slice(0, 3);
    const lastTwoReligions = Object.keys(colorMapping).slice(3);
    const [dataLoaded, setDataLoaded] = useState(false);
    

    useEffect(() => {
        const fetchMeditationSession = async () => {
            const historyRef = ref(getDatabase(), 'histories');

            onValue(historyRef, (snapshot) => {
                const dataFromFirebase = snapshot.val();
                // Check if dataFromFirebase is not null before proceeding
                if (dataFromFirebase) {
                    const uid = auth.currentUser.uid;
                    const sessionData = Object.keys(dataFromFirebase)
                        .filter((sessionId) => dataFromFirebase[sessionId].uid === uid)
                        .map((sessionId) => ({
                            sessionId,
                            uid: dataFromFirebase[sessionId].uid,
                            religion: dataFromFirebase[sessionId].religion,
                            practiceTitle: dataFromFirebase[sessionId].practiceTitle,
                            duration: dataFromFirebase[sessionId].duration,
                        }));

                    setData(sessionData);
                    setTotalMeditationSession(sessionData.length);

                    // Calculate count of sessions per religion
                    const religionCount = {};
                    sessionData.forEach((session) => {
                        religionCount[session.religion] = (religionCount[session.religion] || 0) + 1;
                    });

                    // Ensure the series has a length of 5
                    const religionCountArray = religions.map((religion) => religionCount[religion] || 0);
                    if (religionCountArray.every((count) => count === 0)) {
                        setTotalMeditationSessionPerReligionBoolean(false);
                    } else {
                        setTotalMeditationSessionPerReligionBoolean(true);
                        setTotalMeditationSessionPerReligion(religionCountArray);
                    }

                    console.log('Total Sessions:', religionCountArray);

                    // Set the top 3 religions
                    const topThree = getTopThreeReligions(religions, religionCountArray);
                    setTopThreeReligions(topThree);

                    // Data is loaded, set the flag to true
                    setDataLoaded(true);
                } else {
                // Handle the case when dataFromFirebase is null (no data available)
                    setDataLoaded(true);
                    setTotalMeditationSession(0);
                    setTotalMeditationSessionPerReligion(false);
                    setTopThreeReligions([]);
                }
            });

        };
        fetchMeditationSession();
    }, []);

    useEffect(()=>{
        const fetchTotalMeditationSession = () => {
            let duration = 0;
            {data && data.map((item) => (duration = duration + item.duration))};
            setTotalMeditationDuration(millisecondsToTime(duration))
        }
        fetchTotalMeditationSession();
    }, [data]);

    const getTopThreeReligions = (religionsArray, sessionsArray) => {
        // Combine the religions array and sessions array into an object
        const religionSessions = religionsArray.reduce((obj, religion, index) => {
            obj[religion] = sessionsArray[index];
            return obj;
        }, {});

        // Sort the object by the number of sessions in descending order and
        // then by the order in the 'religions' array
        const sortedReligions = Object.keys(religionSessions).sort((a, b) => {
            if (religionSessions[b] !== religionSessions[a]) {
                return religionSessions[b] - religionSessions[a]; // Sort by value if not a tie
            } else {
                return religionsArray.indexOf(a) - religionsArray.indexOf(b); // Sort by order in array if a tie
            }
        });

        // Extract the top 3 religions
        const topThree = sortedReligions.slice(0, 3);
        return topThree;
    };

    return (
        <SafeAreaView style={[styles.screen, { paddingTop: 45 }]}>
            <View style={inStyles.titleContainer}>
                <Text style={[styles.colorPrimary, inStyles.title]}>Statistics</Text>
            </View>

            <View style={{ width: screenWidth('90%'), flexDirection: 'row', height: screenHeight('15%') }}>
                <View style={[styles.sectionContainer, styles.dropShadow]}>
                    <Text style={[styles.colorPrimary, inStyles.header, styles.bold]}>Total Sessions</Text>
                    <Text style={styles.bold}>{totalMeditationSession}</Text>
                </View>
                <View style={[styles.sectionContainer, styles.dropShadow]}>
                    <Text style={[styles.colorPrimary, inStyles.header, styles.bold]}>Meditation Duration</Text>
                    <Text style={styles.bold}>{(totalMeditationDuration)}</Text>
                </View>
            </View>

            <View style={{ width: screenWidth('90%'), height: screenHeight('40%') }}>      
                {dataLoaded && !totalMeditationSessionPerReligionBoolean ? (
                    <View style={[styles.sectionContainer, styles.dropShadow, { gap: 25 }]}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.colorPrimary, styles.bold, { fontSize: RFPercentage(1.8) }]}>
                                No meditation data available
                            </Text>
                        </View>
                    </View>
                ) : (
                    <View style={[styles.sectionContainer, styles.dropShadow, { gap: 25 }]}>
                        <Text style={[styles.colorPrimary, inStyles.header, styles.bold]}>Sessions per Religion</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <PieChart
                                widthAndHeight={widthAndHeight}
                                series={totalMeditationSessionPerReligion}
                                sliceColor={Object.values(colorMapping)}
                                coverRadius={0.6}
                            />
                            <View style={{ position: 'absolute', top: '50%', marginLeft: -75, marginTop: -55 }}>
                                <Image style={{ width: 60, height: 45 }} source={appLogo} />
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <View style={inStyles.legendContainer}>
                                    {firstThreeReligions.map((religion) => (
                                        <Text
                                            key={religion}
                                            style={[styles.bold, { color: colorMapping[religion] }]}
                                        >
                                            ○ {religion}{' '}
                                        </Text>
                                    ))}
                                </View>
                                <View style={inStyles.legendContainer}>
                                    {lastTwoReligions.map((religion) => (
                                        <Text
                                            key={religion}
                                            style={[styles.bold, { color: colorMapping[religion] }]}
                                        >
                                            ○ {religion}{' '}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </View>

            <View style={{ width: screenWidth('90%'), height: screenHeight('27%') }}>
                <View style={[styles.sectionContainer, styles.dropShadow]}>
                    <Text style={[styles.colorPrimary, styles.bold, { top: 20, marginBottom: 25, marginTop: -10 }]}>Top 3 Religions</Text>
                    {totalMeditationSessionPerReligionBoolean ? (
                        topThreeReligions.map((religion, index) => {
                        const religionIndex = religions.indexOf(religion);
                        const sessionCount = totalMeditationSessionPerReligion[religionIndex];
                        // Check if the session count for the religion is greater than or equal to 1
                        if (sessionCount >= 1) {
                            return (
                                <View style={inStyles.topContainer} key={religion}>
                                    <Text style={[styles.bold, { color: colorMapping[religion] }]}>{religion}</Text>
                                    <Text style={[styles.bold, { color: colorMapping[religion] }]}>
                                    {sessionCount}
                                    </Text>
                                </View>
                            );
                        }
                        // Return null if the session count is less than 1 (will not render this religion)
                            return null;
                        })
                    ) : (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.colorPrimary, styles.bold, { fontSize: RFPercentage(1.8) }]}>
                                No meditation data available
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const inStyles = StyleSheet.create({
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },

    title: {
        fontSize: RFPercentage(3),
        fontWeight: 'bold',
    },

    header: {
        fontSize: RFPercentage(1.8),
        textAlign: 'center',
    },

    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 2,
    },

    topContainer: {
        flexDirection: 'row',
        marginHorizontal: 5,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
});