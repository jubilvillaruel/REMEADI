import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import { screenHeight, screenWidth } from '../../components/Dimensions';
import { styles } from '../../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Bible = () => {
  const API_KEY = 'eff4aca3a4849507b3543eb77a152e1a';
  const bibleVersionID = '55212e3cf5d04d49-01';
  const [results, setResults] = useState([]);

  const getResults = async (text) => {
    const response = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${text}`,
      {
        headers: {
          'api-key': API_KEY,
        },
      }
    );

  if (response.status === 200) {
    console.log('fetching data...');
    const data = await response.json();
    const verses = data.data.verses;
    console.log(verses);
    setResults(verses);
  }
};

  const renderedItems = results.map((verse) => (
    <>
      <View style={[inStyles.verseItem, styles.dropShadow]}>
        <View style={inStyles.verseContent}>
          <Text style={[styles.bold, styles.colorPrimary, { fontSize: RFPercentage(2) }]}>{verse.reference}</Text>
          <Text style={{ fontSize: RFPercentage(1.8) }}>{verse.text}</Text>
        </View>
      </View>
    </>
  ));
  
  return (
    <View style={inStyles.bibleContainer}>
      <View style={[inStyles.bibleSearchContainer, styles.dropShadow]}>
        <TextInput
          style={[styles.dropShadow, inStyles.bibleSearch]}
          placeholder="Search for a Bible verse or passage"
          onChangeText={(text) => {getResults(text)}}/>
      </View>
      {/* <View style={inStyles.bibleResultsContainer}>   */}
        <ScrollView contentContainerStyle={inStyles.bibleResultsContainer} showsVerticalScrollIndicator={false}>
          {renderedItems}
        </ScrollView>
      {/* </View> */}
    </View>
  );
};

const inStyles = StyleSheet.create({
  bibleContainer: {
    width: screenWidth('90%'),
    height: screenHeight('50%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  bibleSearchContainer:{
    width: screenWidth('85%'),
    height: screenHeight('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    zIndex: 2,
  },

  bibleSearch:{
    width: screenWidth('85%'),
    height: screenHeight('5%'),
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#FFBF69',
    backgroundColor: '#FFFFFF',
    padding: 15,
    fontSize: RFPercentage(1.8),
  },

  bibleResultsContainer: {
    width: screenWidth('85%'),
    alignItems: 'center'
    // height: screenHeight('15%'),
    // padding: 15,
    // borderWidth: 2,
    // borderRadius: 20,
    // borderColor: '#2EC4B6',
  },

  verseItem: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#FFBF69',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth('85%')
  },

  verseContent: {
    flex: 1,
  },
});

export default Bible;