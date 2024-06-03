import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import { PrimaryButton } from '../components/Buttons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { screenHeight, screenWidth } from '../components/Dimensions';
import { styles } from '../../assets/css/Style';
import appLogo from '../../assets/images/app_logo.png';
import { meditationTypeDB } from '../Data/TypeDB';
import { getCategoryByPractice } from '../Data/LocalDB';

import { auth } from '../../firebase';
import { getDatabase, push, ref, set } from 'firebase/database';

import moment from "moment";
import { millisecondsToTime } from '../models/TimeModel';
import { checkAndUpdateMilestone, updateMilestoneToTrue } from '../models/MilestonesModel';


export default function ConcludeSession({ navigation, route }) {
    const {data} = route?.params;
    const practiceTitle = data?.practiceTitle;
    const duration = data?.stopwatchTime;
    const medType = meditationTypeDB[data?.practiceTitle];
    const timesPracticed = data?.timesPracticed
    const subPracticeTitle = data?.subCategory
    
    const [ uid, setUID ] = useState();
    const [ religion, setReligion ] = useState();
    const [ currentDate, setCurrentDate ] = useState();
    

    useEffect(() => {
        const retrieveAllData = () => {
            const id = auth.currentUser.uid
            setUID(id)

            try {
                // setReligion based on practice title with meditationReligionDB
                let rel = getCategoryByPractice(practiceTitle)
                setReligion(rel.key)

                // missing [set practice title]
                // ... code here

                const date = new Date().toISOString()
                setCurrentDate(date)
            } catch (error) {
                console.log(error.message)
                console.log(error.stack)
            }
            
        };
        retrieveAllData();
    }, [])

    useEffect(() => {
        const displayData = () => {
            if (uid && practiceTitle && religion && duration && currentDate) {
                console.log(
                    'uid:', uid,
                    '\npractice title:', practiceTitle,
                    '\nsub practice title:', subPracticeTitle,
                    '\nreligion:', religion,
                    '\nduration:', duration,
                    '\ndate:', currentDate
                )

                // store data to history
                storeSessionToHistory();
            } else {
                console.log('... fetching other data')
            }
        };
        displayData();
    }, [uid, practiceTitle, religion, duration, currentDate])

    const storeSessionToHistory = () => {
        console.log('=====storeSessionToHistory=====')
        const realtimeDB = getDatabase()
        const historyId = push(ref(realtimeDB, 'histories/'+uid)).key;

        try {
            set(ref(realtimeDB, 'histories/' + uid + '/' + historyId), {
                currentDate: currentDate,
                duration: duration,
                practiceTitle: practiceTitle,
                religion: religion,
                subPracticeTitle: subPracticeTitle,
                // uid: uid,
            }).then(checkAndUpdateMilestone(practiceTitle))            
        } catch (error) {
            console.log(error.message)
            console.log(error.stack)
        }
    }

    
    
    // CALCULATE DATE DIFFERENCE
    // const [date1, setDate1] = useState(new Date());
    // const [date2, setDate2] = useState(new Date());

    // const calculateDifference = () => {
    //     const difference = date1 - date2;
    //     const days = difference / (1000 * 60 * 60 * 24);
    //     return days;
    // };

    const addTimes = (timeStr1, timeStr2) => {
        const time1 = moment.duration(timeStr1);
        const time2 = moment.duration(timeStr2);
        const sum = time1.add(time2);
      
        const resultTimeStr = moment(sum.asMilliseconds()).format('HH:mm:ss');
        return resultTimeStr;
    };

    const gotoHome = () => {
        navigation.navigate('HomeScreen')
    }

    return (
        <View style={styles.screenCenter}>
            <View style={[inStyles.summaryContainer, , { gap: 15, marginTop: 35 }]}>
                <View style={inStyles.headerContainer}>
                    <Image style={{ margin: 15, height: screenHeight('22%'), width: screenWidth('60%') }} source={appLogo} />
                    <Text style={[styles.bold, styles.colorPrimary, { fontSize: RFPercentage(3.5) }]}>{practiceTitle}</Text>
                    <Text style={[styles.colorPrimary, { fontSize: RFPercentage(2.5), marginTop: -8 }]}>Session Done!</Text>
                </View>

                <View style={inStyles.summaryContent}>
                    <View style={inStyles.infoContainer}>
                        <Text style={[ styles.bold, { fontSize: RFPercentage(2) }]}>Meditation Type</Text>
                        <Text style={[ styles.bold, styles.colorPrimary, { fontSize: RFPercentage(2), textAlign: 'center' }]}>{medType}</Text>
                    </View>
                    <View style={inStyles.infoContainer}>
                        <Text style={[ styles.bold, { fontSize: RFPercentage(2) }]}>Meditation Duration</Text>
                        <Text style={[ styles.bold, styles.colorPrimary, { fontSize: RFPercentage(2) }]}>{millisecondsToTime(duration)}</Text>
                    </View>
                    <View style={inStyles.infoContainer}>
                        <Text style={[ styles.bold, { fontSize: RFPercentage(2) }]}>Times Practiced</Text>
                        <Text style={[ styles.bold, styles.colorPrimary, { fontSize: RFPercentage(2) }]}>{timesPracticed}</Text>
                    </View>
                </View>

                <View style={inStyles.btnContainer}>
                    <PrimaryButton
                        text='Back to Home'
                        textColor= '#FFFFFF'
                        textSize={RFPercentage(2.2)}
                        width={screenWidth('65%')}
                        height={screenHeight('7%')}
                        borderRad={30}
                        onPress={gotoHome}>
                    </PrimaryButton>

                </View>
            </View>
        </View>
    )
}

const inStyles = StyleSheet.create({
    summaryContainer: {
        width: screenWidth('90%'),
        height: screenHeight('95%'),
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#FFBF69',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerContainer: {
        width: screenWidth('80%'),
        height: screenHeight('25%'),
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        margin: 15,
    },

    summaryContent: {
        width: screenWidth('80%'),
        height: screenHeight('40%'),
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },

    infoContainer: {
        width: screenWidth('80%'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
      },
      

    btnContainer: {
        padding: 15,
        width: screenWidth('80%'),
        height: screenHeight('15%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
})