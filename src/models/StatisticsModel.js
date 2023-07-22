import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { equalTo, get, onValue, orderByChild, query, ref } from 'firebase/database'

const getTotalMeditationSession = async (dbRef,uid) => {
    console.log('\n\n\n TEST START \n\n\n')
    const totalMeditationSession = 111111

    const historiesRef = ref(dbRef, 'histories');

    // Create a query to get all documents with the specified uid
    // const userHistoriesQuery = query(historiesRef, orderByChild('uid'), equalTo(uid));
    const queryRef = orderByChild(historiesRef, 'uid').equalTo(uidToSearch);

    try {
        onValue(queryRef, (snapshot) => {
            const historiesData = snapshot.val();
            if (historiesData) {
                console.log()
                // const sessionIDs = Object.keys(historiesData);
                // console.log('List of session IDs with the same uid:', sessionIDs);
            } else {
                console.log('No session IDs found with the specified uid.');
            }
        });        
    } catch (error) {
        console.error('Error fetching user histories:', error);
        return [];
    }


    // console.log('===uid',uid)
    // console.log('===test',child(dbRef, `histories`))
    // console.log('======test2',get(child(dbRef, `histories`)))
    // get(child(dbRef, `histories/${uid}`)).then((snapshot) => {
    //     if (snapshot.exists()) {
    //       snapshot.val().firstName
    //     } else {
    //       console.log("No data available");
    //     }
    // }).catch((error) => {
    // console.error(error);
    // });

    // ... code here
    
    return totalMeditationSession
}

const getTotalMeditationDuration = (user) => {
    const totalMeditationDuration = 222

    // ... code here

    return totalMeditationDuration
}

const getTotalMeditationSessionPerReligion = (user) => {
    const totalMeditationSessionPerReligion = [] // [CH, IS, HI, BU, JU]

    // ... code here
    
    return totalMeditationSessionPerReligion
}

const getTopReligionsBySession = (unsortedDictionary) => {
    console.log('unsortedDictionary',unsortedDictionary)
    try {
        const sortedArray = Object.entries(unsortedDictionary).sort((a, b) => b[1] - a[1]);
        // Create a new object from the sorted array
        const sortedDictionary = Object.fromEntries(sortedArray);
        console.log('sortedDictionary',sortedDictionary)
        return(sortedDictionary)
    } catch (error) {
        console.log(error)
        console.log(error.stack)
        return {
            'key1': 1,
            'key2': 2,
            'key3': 3,
          };
      
    }
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