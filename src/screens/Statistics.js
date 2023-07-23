import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { styles } from './../../assets/css/Style';
import appLogo from './../../assets/images/app_logo.png';

import { screenHeight, screenWidth } from '../components/Dimensions';

import { getDatabase, onValue, ref} from 'firebase/database'
import { auth } from '../../firebase';

import { millisecondsToTime } from '../models/TimeModel';

export default function Statistics() {
    const [ data, setData ] = useState()
    const [ totalMeditationSession, setTotalMeditationSession ] = useState(0)
    const [ totalMeditationDuration, setTotalMeditationDuration ] = useState(0)
    const [ totalMeditationSessionPerReligion, setTotalMeditationSessionPerReligion ] = useState([ 1, 0, 0, 0, 0]) // series
    const [ getTopThreeReligions, setTopThreeReligions ] = useState([
        { "religion": "Christianity", "value": 65 },
        { "religion": "Islam", "value": 177 },
        { "religion": "Buddhism", "value": 121 }
    ])

    const [ ch, setCh ] = useState(Number)
    const [ is, setIs ] = useState(Number)
    const [ hi, setHi ] = useState(Number)
    const [ bu, setBu ] = useState(Number)
    const [ ju, setJu ] = useState(Number)


    const realtimeDB = getDatabase()
    const dbRef = ref(realtimeDB);
    const uid = auth.currentUser.uid

    const widthAndHeight = 200
    // const series = [177, 121, 65, 43, 43] // [CH, IS, HI, BU, JU]
    const sliceColor = ['#04BFDA', '#8FD3D2', '#F27F77', '#FF9F1C', '#FF0000']
    

    // 
    useEffect(()=>{
        console.log('========================\n\n\n\n\n\n\n\n\n\nfetching meditation session\n\n\n\n\n\n\n\n\n')
        const fetchMeditationSession = async () => {
            const historyRef = ref(getDatabase(), 'histories');

            onValue(historyRef, (snapshot) => {
                const dataFromFirebase = snapshot.val();
                const uid = auth.currentUser.uid

                // Extracting session IDs and uids into an array of objects
                const sessionData = Object.keys(dataFromFirebase)
                .filter((sessionId) => dataFromFirebase[sessionId].uid === uid)
                .map((sessionId) => ({
                    sessionId,
                    uid: dataFromFirebase[sessionId].uid,
                    religion: dataFromFirebase[sessionId].religion,
                    practiceTitle: dataFromFirebase[sessionId].practiceTitle,
                    duration: dataFromFirebase[sessionId].duration,
                }));
                setData(sessionData)
                setTotalMeditationSession(sessionData.length)
                console.log('Total Sessions:',totalMeditationSession)
            });
        }
        fetchMeditationSession()
    }, [])

    useEffect(()=>{
        const fetchTotalMeditationSession = () => {
            let duration = 0
            {data &&
                data.map((item) => (
                    duration = duration + item.duration
                ))
            }
            setTotalMeditationDuration(millisecondsToTime(duration))
            // console.log('Meditation Duration:',totalMeditationDuration)
        }
        fetchTotalMeditationSession();
    }, [data]) 

    useEffect(()=>{
        const fetchSessionsPerReligion = () => {
            let rel = ''
            let series = [0,0,0,0,0]
            {data &&
                data.map((item) => {
                    rel = item.religion
                    switch (rel) {
                        case 'Christianity':
                            series[0] = series[0] + 1
                            break;
                        case 'Islam':
                            series[1] = series[1] + 1
                            break;
                        case 'Hinduism':
                            series[2] = series[2] + 1
                            break;
                        case 'Buddhism':
                            series[3] = series[3] + 1
                            break;
                        case 'Judaism':
                            series[4] = series[4] + 1
                            break;
                        default:
                            console.log('ERROR')
                            break;
                    }
                })
            }
            // console.log(series)
            if (!series.includes(0)){
                setTotalMeditationSessionPerReligion(series)
            } else {
                // console.log('ERROR: Invalid series: sum of series is zero')
            }
            console.log('=========================================================\ntotalMeditationSessionPerReligion:',totalMeditationSessionPerReligion)
        }
        fetchSessionsPerReligion();
    }, [data]) 

    useEffect(()=>{
        const fetchTopThreeReligionBySession = () => {
            const religions = ['Christianity', 'Islam', 'Hinduism', 'Buddhism', 'Judaism']
            let topThreeReligions = []
            try {
                // Create an array of objects where each object contains religion and its corresponding value
                const religionValues = religions.map((religion, index) => ({
                    religion,
                    value: totalMeditationSessionPerReligion[index],
                }));   
                
                // Sort the array in descending order based on the value
                religionValues.sort((a, b) => b.value - a.value);

                // Get the top three elements from the sorted array
                topThreeReligions = religionValues.slice(0, 3);   
                console.log('===============================topthreereligions:',topThreeReligions)

            } catch (error) {
                console.log(error.stack)
            }
            if ((topThreeReligions) && topThreeReligions != undefined){
                setTopThreeReligions(topThreeReligions)
            }
        }
        fetchTopThreeReligionBySession();
    }, [data]) 

    const renderTopThree = () => {
        console.log('RENDER ME BABY')
        return getTopThreeReligions.map((religion, index) => (
            <View key={index} style={inStyles.topContainer}>
                <Text>{religion.religion}</Text>
                <Text>{religion.value}</Text>
            </View>
        ))
    }

    return (
        <SafeAreaView style={[styles.screen, { padding: 15, marginTop:20 }]}>
            <View style={inStyles.titleContainer}>
                <Text style={[styles.colorPrimary, inStyles.title]}>Statistics</Text>
            </View>

            <View style={{ width: screenWidth('90%'), flexDirection: 'row', height: screenHeight('15%') }}>
                <View style={[styles.sectionContainer, styles.dropShadow]}>
                    <Text style={[styles.colorPrimary, inStyles.header,styles.bold]}>Total Sessions</Text>
                    <Text style={styles.bold}>{totalMeditationSession}</Text>
                </View>
                <View style={[styles.sectionContainer, styles.dropShadow]}>
                    <Text style={[styles.colorPrimary, inStyles.header, styles.bold]}>Meditation Duration</Text>
                    <Text style={styles.bold}>{(totalMeditationDuration)}</Text>
                </View>
            </View>

            <View style={{ width: screenWidth('90%'), height: screenHeight('40%') }}>
                <View style={[styles.sectionContainer, styles.dropShadow, { gap: 5 }]}>
                    <Text style={[styles.colorPrimary, inStyles.header, styles.bold]}>Sessions per Religion</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={[{ width: 60, height: 45, position: 'absolute' }]} source={appLogo}/>
                        <PieChart
                            widthAndHeight={widthAndHeight}
                            series={totalMeditationSessionPerReligion}
                            sliceColor={sliceColor}
                            coverRadius={0.60}
                        />
                    </View>
                    <View>
                        <View style={inStyles.legendContainer}>
                            <Text style={[styles.bold, { color: '#04BFDA' }]}>○ Christianity    </Text>
                            <Text style={[styles.bold, { color: '#8FD3D2' }]}>○ Islam   </Text>
                            <Text style={[styles.bold, { color: '#F27F77' }]}>○ Hinduism    </Text>
                        </View>
                        <View style={inStyles.legendContainer}>
                            <Text style={[styles.bold, { color: '#FF9F1C' }]}>○ Buddhism    </Text>
                            <Text style={[styles.bold, { color: '#FF0000' }]}>○ Judaism </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ width: screenWidth('90%'), height: screenHeight('27%') }}>
                <View style={[styles.sectionContainer, styles.dropShadow]}>
                    <Text style={[styles.colorPrimary, styles.bold]}>Top 3 Religions</Text>

                    {renderTopThree()}

                </View>
            </View>
        </SafeAreaView>
    );
}

const inStyles = StyleSheet.create({
    titleContainer: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    header: {
        fontSize: 18,
        textAlign: 'center'
    },

    legendContainer: {
        // width: '100%',
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // height: 30,
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