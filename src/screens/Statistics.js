import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { styles } from './../../assets/css/Style';
import appLogo from './../../assets/images/app_logo.png';
import { screenHeight, screenWidth } from '../components/Dimensions';
import { getTopReligionsBySession, getTotalMeditationSession } from '../models/StatisticsModel';
import TopReligions from '../components/TopReligions';
import { getDatabase, ref} from 'firebase/database'
import { auth } from '../../firebase';

export default function Statistics() {
    const [ totalMeditationSession, setTotalMeditationSession ] = useState()
    const [ totalMeditationDuration, setTotalMeditationDuration ] = useState()
    const [ totalMeditationSessionPerReligion, setTotalMeditationSessionPerReligion ] = useState([ 65, 177, 43, 121, 43])
    const [ topThreeReligionBySession, setTopThreeReligionBySession ] = useState(15)

    const realtimeDB = getDatabase()
    const dbRef = ref(realtimeDB);
    const uid = auth.currentUser.uid

    const widthAndHeight = 200
    // const series = [177, 121, 65, 43, 43] // [CH, IS, HI, BU, JU]
    const sliceColor = ['#04BFDA', '#8FD3D2', '#F27F77', '#FF9F1C', '#FF0000']

    useEffect(()=>{
        console.log('fetching total meditation session')
        const fetchTotalMeditationSession = () => {
            try{
                // console.log('getting total med ses:',getTotalMeditationSession(dbRef,uid))
            } catch (error) {
                console.log(error.stack)
            }
        }
        fetchTotalMeditationSession()
    })

    useEffect(()=>{
        const fetchTopThreeReligionBySession = () => {
            // setTopThreeReligionBySession(getTopReligionsBySession(totalMeditationSessionPerReligion))
        }
        fetchTopThreeReligionBySession();
    }, []) 



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
                    <Text style={styles.bold}>{totalMeditationDuration} min</Text>
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
                {/* sort religion by session count */}
                {/* display the first 3 religion */}
                <View style={inStyles.topContainer}>
                    <Text>insert religion here</Text>
                    <Text>session count</Text>
                </View>
                <View style={inStyles.topContainer}>
                    <Text>insert religion here</Text>
                    <Text>session count</Text>
                </View>
                <View style={inStyles.topContainer}>
                    <Text>insert religion here</Text>
                    <Text>session count</Text>
                </View>
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