import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { screenHeight, screenWidth } from './Dimensions';
import { styles } from '../../assets/css/Style';

const TopReligions = ({series}) => {
    
    const religions = ['Christianity', 'Islam', 'Hinduism', 'Buddhism', 'Judaism']
    const [ getTopThreeReligions, setTopThreeReligions ] = useState()

    // try {
        // Create an array of objects where each object contains religion and its corresponding value
        const religionValues = religions.map((religion, index) => ({
            religion,
            value: series[index],
        }));   
        
        // Sort the array in descending order based on the value
        religionValues.sort((a, b) => b.value - a.value);

        // Get the top three elements from the sorted array
        const topThreeReligions = religionValues.slice(0, 3);   

        setTopThreeReligions(topThreeReligions)

    // } catch (error) {
    //     console.log(error.stack)
    // }

    // console.log(getTopThreeReligions)

    // return (
    //     <View>
    //         {/* {getTopThreeReligions.map((item, index) => (
    //             <View key={index}>
    //             <Text>{item.religion}</Text>
    //             <Text>{item.value}</Text>
    //             </View>
    //         ))} */}
    //     </View>
    // )
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