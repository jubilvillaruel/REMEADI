import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const getTotalMeditationDuration = (user) => {
    const totalMeditationDuration = Number

    // ... code here

    return totalMeditationDuration
}

const getTotalMeditationSession = (user) => {
    const totalMeditationSession = Number

    // ... code here
    
    return totalMeditationSession
}

const getTotalMeditationSessionPerReligion = (user) => {
    const totalMeditationSessionPerReligion = [] // [CH, IS, HI, BU, JU]

    // ... code here
    
    return totalMeditationSessionPerReligion
}

const getTopReligionsBySession = (list) => {
    // const values = [65, 177, 43, 121, 43];
    const religions = ['Christianity', 'Islam', 'Hinduism', 'Buddhism', 'Judaism'];

    // Step 1: Combine the two arrays into an array of objects
    const combinedArray = list.map((value, index) => ({ religion: religions[index], value }));

    // Step 2: Sort the array of objects based on the list in descending order
    combinedArray.sort((a, b) => b.value - a.value);

    // Step 3: Extract the top three religions from the sorted array
    const topReligionsBySession = combinedArray.slice(0, 3).map((item) => item.religion);

    // setResults(topReligionsBySession)

    return(topReligionsBySession)
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

export { 
    getTotalMeditationDuration, 
    getTotalMeditationSession, 
    getTotalMeditationSessionPerReligion,
    getTopReligionsBySession,
}