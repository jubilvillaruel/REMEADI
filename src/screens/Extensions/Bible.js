import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import { screenHeight, screenWidth } from '../../components/Dimensions';
import { styles } from '../../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Bible = () => {
  const API_KEY = 'eff4aca3a4849507b3543eb77a152e1a';
  const bibleVersionID = '55212e3cf5d04d49-01';
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('')
  const [showLoad, setShowLoad] = useState(false)

  const getResults = async () => {
    setResults([])
    console.log('fetching data...');
    setShowLoad(true)
    const response = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${search}`,
      {
        headers: {
          'api-key': API_KEY,
        },
      }
    );

  if (response.status === 200) {
    setShowLoad(false)
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
    <View style={[inStyles.bibleContainer2]}>
      <View style={[styles.dropShadow, styles.passwordInputContainer, {borderWidth:0, paddingHorizontal:2}, inStyles.bibleSearch]}>
        <TextInput
          style={[styles.dropShadow, styles.passwordInput, {paddingHorizontal:0, marginLeft:6}]}
          placeholder="Search for a Bible verse or passage"
          onChangeText={(text) => {setSearch(text)}}
          />
        <TouchableOpacity 
          onPress={getResults} 
          style={[styles.dropShadow, inStyles.bibleSearchBtn]}>
          <Text style={{textAlign: 'center',}}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
      <ActivityIndicator style={[{marginTop:120, display:'none'},(showLoad) && {display:'flex'}]} size="large" />

      <ScrollView contentContainerStyle={inStyles.bibleResultsContainer} showsVerticalScrollIndicator={false}>
        {renderedItems}
      </ScrollView>
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
    width: screenWidth('80%'),
    height: screenHeight('5%'),
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#FFBF69',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
    fontSize: RFPercentage(1.8),
    marginBottom:10,
  },

  bibleSearchBtn: {
    backgroundColor: '#f2f2f2',
    padding:7,
    paddingHorizontal:15,
    borderRadius: 50
  },

  bibleContainer2: {
    width: screenWidth('90%'),
    minHeight: screenHeight('51%'),
    alignItems: 'center',
    backgroundColor:'#ffffff',
    borderRadius: 20,
    marginVertical:10,
    paddingVertical: 10,
    // borderWidth: 2,
    // borderColor: 'red',
  },

  bibleResultsContainer: {
    width: screenWidth('90%'),
    alignItems: 'center',
    // backgroundColor:'#ffffff',
    borderRadius: 20,
    marginTop:0,
    paddingVertical: 10,
  },

  verseItem: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 5,
    // borderWidth: 2,
    borderRadius: 20,
    borderColor: '#FFBF69',
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth('80%')
  },

  verseContent: {
    flex: 1,
  },
});

export default Bible;