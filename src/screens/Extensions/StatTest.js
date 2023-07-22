import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { styles } from '../../../assets/css/Style';
import { getDatabase, ref, onValue, Database, get, child } from 'firebase/database';
import { auth } from '../../../firebase';

const StatTest = () => {
  const [data, setData] = useState(null);
  const uid = auth.currentUser.uid

  useEffect(() => {
    // Function to fetch data from Firebase
    const fetchData = () => {
      const historyRef = ref(getDatabase(), 'histories');

      onValue(historyRef, (snapshot) => {
        const dataFromFirebase = snapshot.val();

        // Extracting session IDs and uids into an array of objects
        const sessionData = Object.keys(dataFromFirebase)
        .filter((sessionId) => dataFromFirebase[sessionId].uid === uid)
        .map((sessionId) => ({
          sessionId,
          uid: dataFromFirebase[sessionId].uid,
          religion: dataFromFirebase[sessionId].religion,
          practiceTitle: dataFromFirebase[sessionId].practiceTitle,
        }));

        setData(sessionData);
      });
    };

    fetchData(); // Call the function to fetch data from Firebase
  }, []); // The empty dependency array ensures the effect runs only once on component mount


  return (
    <ScrollView>
      <Text>hehe</Text>
      {data &&
        data.map((item) => (
          <View key={item.sessionId}>
            <Text>Session ID: {item.sessionId}</Text>
            <Text>UID: {item.uid}</Text>
            <Text>religion: {item.religion}</Text>
            <Text>practice: {item.practiceTitle}</Text>
          </View>
        ))}
    </ScrollView>
  );
};

const inStyles = StyleSheet.create({
  // Your additional styles here
});

export default StatTest;
