import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Modal, TouchableOpacityBase } from 'react-native';
import { millisecondsToTime } from '../models/TimeModel';
import { religionDB } from '../Data/LocalDB';
import { screenHeight, screenWidth } from '../components/Dimensions';

import { styles } from './../../assets/css/Style';
import appLogo from './../../assets/images/app_logo.png';
import PieChart from 'react-native-pie-chart';

import { getDatabase, onValue, ref} from 'firebase/database';
import { auth } from '../../firebase';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { StatisticsHeader } from '../components/StatisticsComponents';

export default function Statistics() {
    const widthAndHeight = 160;
    const [ data, setData ] = useState();
    const [ totalMeditationSession, setTotalMeditationSession ] = useState(0);
    const [ totalMeditationDuration, setTotalMeditationDuration ] = useState(0);
    
    const religions = ['Christianity', 'Islam', 'Hinduism', 'Buddhism', 'Judaism'];
    const [ totalMeditationSessionPerReligion, setTotalMeditationSessionPerReligion ] = useState([1,1,1,1,1]);
    const [ totalMeditationSessionPerReligionBoolean, setTotalMeditationSessionPerReligionBoolean ] = useState(false);
    const colorMapping = { Christianity: '#04BFDA', Islam: '#8FD3D2', Hinduism: '#F27F77', Buddhism: '#FF9F1C', Judaism: '#FF0000'};

    const [selectedLegend, setSelectedLegend] = useState(null);
    const [practiceCounts, setPracticeCounts] = useState({});

    const [topThreeReligions, setTopThreeReligions] = useState([]);
    const btnReligions = Object.keys(colorMapping);
    const [dataLoaded, setDataLoaded] = useState(false);

    const [selectedReligionVisible, setSelectedReligionVisible] = useState(false);
    const [pieChartVisible, setPieChartVisible] = useState(true);

    const openSelectedReligion = (religion) => {
        setSelectedLegend(religion);
        setSelectedReligionVisible(!selectedReligionVisible);
        setPieChartVisible(!pieChartVisible);
    };

    const closeSelectedReligion = () => {
        setSelectedReligionVisible(!selectedReligionVisible);
        setPieChartVisible(!pieChartVisible);
    };

    useEffect(() => {
        const fetchMeditationSession = async () => {
            const uid = auth.currentUser.uid
            const historyRef = ref(getDatabase(), 'histories/'+uid);

            onValue(historyRef, (snapshot) => {
                const dataFromFirebase = snapshot.val();
                // Check if dataFromFirebase is not null before proceeding
                if (dataFromFirebase) {
                    const sessionData = Object.keys(dataFromFirebase)
                        .map((sessionId) => ({
                            sessionId,
                            uid: dataFromFirebase[sessionId].uid,
                            religion: dataFromFirebase[sessionId].religion,
                            practiceTitle: dataFromFirebase[sessionId].practiceTitle,
                            duration: dataFromFirebase[sessionId].duration,
                        }));

                    // console.log('===sessionData===\n'+sessionData.map((item)=>{return item}))

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
            setTotalMeditationDuration(Math.floor(duration/1000/60))
        }
        fetchTotalMeditationSession();
    }, [data]);

    useEffect(() => {
        // Fetch practice counts from the database and update state
        const fetchPracticeCounts = async () => {
            const uid = auth.currentUser.uid;
            const historyRef = ref(getDatabase(), 'histories/' + uid);

            onValue(historyRef, (snapshot) => {
                const dataFromFirebase = snapshot.val();
                if (dataFromFirebase) {
                    const counts = {};

                    // Count instances of each practice
                    Object.values(dataFromFirebase).forEach((session) => {
                        const practice = session.practiceTitle;
                        counts[practice] = (counts[practice] || 0) + 1;
                    });

                    // Update state with practice counts
                    setPracticeCounts(counts);
                }
            });
        };

        fetchPracticeCounts();
    }, []);

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

    function hexToRGBA(hex, alpha) {
        // Remove the hash (#) if it exists in the hex string
        hex = hex.replace(/^#/, '');
      
        // Parse the hex string into red, green, and blue values
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
      
        // Return the RGBA color value
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      

    return (
        <SafeAreaView style={[styles.screen, { paddingTop: 45 }]}>
            <View style={inStyles.titleContainer}>
                <Text style={[styles.colorPrimary, inStyles.title]}>Statistics</Text>
            </View>

            <View style={{ width: screenWidth('90%'), flexDirection: 'row', height: screenHeight('15%') }}>
                <StatisticsHeader int={totalMeditationSession} label="" descs="Total Sessions" />
                <StatisticsHeader int={totalMeditationDuration} label="mins" descs="Total Duration" />
            </View>

            <View style={{ width: screenWidth('90%'), height: screenHeight('40%'), }}>
                <View style={{ width: screenWidth('90%'), height: screenHeight('40%') }}>
                    {dataLoaded && !totalMeditationSessionPerReligionBoolean ? (
                        <View style={[styles.sectionContainer, { gap: 25 }]}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={[styles.colorPrimary, styles.bold, { fontSize: RFPercentage(1.8) }]}>
                                    No meditation data available
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View style={[styles.sectionContainer, { gap: 25 }]}>
                            <Text style={[styles.colorPrimary, inStyles.header, styles.bold, { fontSize: RFPercentage(2.2) }]}>Sessions per Religion</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 35 }}>
                                <PieChart
                                    widthAndHeight={widthAndHeight}
                                    series={totalMeditationSessionPerReligion}
                                    sliceColor={Object.values(colorMapping)}
                                    coverRadius={0.6}
                                />
                                <View style={inStyles.legendContainer}>
                                    {btnReligions.map((religion) => (
                                        <TouchableOpacity style={[inStyles.legendBtn, { backgroundColor: colorMapping[religion] }]} onPress={() => openSelectedReligion(religion)}>
                                            <Text key={religion} style={[styles.bold, { color: 'white', textAlign: 'center' }]}>
                                                {religion}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={selectedReligionVisible}
                    onRequestClose={closeSelectedReligion}>

                    <TouchableOpacity onPress={closeSelectedReligion}>
                        {selectedLegend && (
                            <View style={{ width: screenWidth('90%'), height: screenHeight('40%'), alignSelf: 'center', marginVertical: screenHeight('21.7%'), backgroundColor: 'white' }}>
                                <View style={[styles.sectionContainer, { gap: 15 }]}>
                                    <Text style={[styles.bold, { fontSize: RFPercentage(2.2), color: colorMapping[selectedLegend] }]}>{selectedLegend}</Text>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        {religionDB[selectedLegend] && religionDB[selectedLegend].map((practice, index) => (
                                            <View style={[inStyles.topContainer, { width: screenWidth('70%') }]} key={index}>
                                                <Text style={[styles.bold, { color: colorMapping[selectedLegend] }]}>
                                                    {practice}
                                                </Text>
                                                <Text style={[styles.bold, { color: colorMapping[selectedLegend] }]}>
                                                    {practiceCounts[practice] || 0} {/* Display practice count */}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </Modal>
            </View>

            <View style={{ width: screenWidth('90%'), height: screenHeight('28.5%') }}>
                <View style={[styles.sectionContainer]}>
                    <Text style={[styles.colorPrimary, styles.bold, { top: 20, marginBottom: 25, marginTop: -10, fontSize: RFPercentage(2.2) }]}>Top 3 Religions</Text>
                    {totalMeditationSessionPerReligionBoolean ? (
                        topThreeReligions.map((religion, index) => {
                        const religionIndex = religions.indexOf(religion);
                        const sessionCount = totalMeditationSessionPerReligion[religionIndex];
                        // Check if the session count for the religion is greater than or equal to 1
                        if (sessionCount >= 1) {
                            return (
                                <View style={[inStyles.topContainer, { backgroundColor: hexToRGBA(colorMapping[religion], 0.7), color: 'white', borderRadius:15, marginTop:5 }]} key={religion}>
                                    <Text style={[styles.bold, { color: 'white' }]}>{religion}</Text>
                                    <Text style={[styles.bold, { color: 'white' }]}>{sessionCount}</Text>
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
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 8,
    },

    legendBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 30,
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