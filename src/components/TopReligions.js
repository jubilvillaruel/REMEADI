import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { screenHeight, screenWidth } from './Dimensions';
import { styles } from '../../assets/css/Style';
import { getTopReligionsBySession } from '../models/StatisticsModel';

const TopReligions = () => {
    const [ totalMeditationSessionPerReligion, setTotalMeditationSessionPerReligion ] = useState([])
    const [ topReligionsBySession, setTopReligionsBySession] = useState([])
    const [ topMeditationSessionPerReligion, setTopMeditationSessionPerReligion ] = useState([])

    useEffect(() => {
        console.log('attempting to fetch')
        const fetchTotalMeditationSessionPerReligion = () => {
            console.log('fetching total meditation session per religion')
            // fetch from realtime db
            setTotalMeditationSessionPerReligion([1,2,3,6,5,])
        }
        fetchTotalMeditationSessionPerReligion();
    }, [])

    useEffect(()=>{
        const fetchTopThreeReligionBySession = () => {
            setTopReligionsBySession(getTopReligionsBySession(totalMeditationSessionPerReligion))
            setTopMeditationSessionPerReligion(totalMeditationSessionPerReligion.sort())
            console.log('sort:',totalMeditationSessionPerReligion.sort((a ,b) => b -a))
        }
        fetchTopThreeReligionBySession();
    }, [totalMeditationSessionPerReligion])

    


    const renderedReligions = topReligionsBySession.map((religion, index) => (
        <>
            <View style={inStyles.topContainer}>
                <Text key={index}>{religion}</Text>
                <Text>{topMeditationSessionPerReligion[index]}</Text>
            </View>
        </>
    ));

    return (
        <View style={{ width: screenWidth('90%'), height: screenHeight('27%') }}>
            <View style={[styles.sectionContainer, styles.dropShadow]}>
                <Text style={[styles.colorPrimary, styles.bold]}>Top 3 Religions</Text>
                {/* sort religion by session count */}
                {/* display the first 3 religion */}

                {renderedReligions}
            </View>
        </View>
    )
}

const inStyles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        marginHorizontal: 5,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
})

export default TopReligions;