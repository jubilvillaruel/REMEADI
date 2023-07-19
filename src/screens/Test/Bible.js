import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import { screenHeight, screenWidth } from '../../components/Dimensions';

const Bible = () => {
  const API_KEY = 'eff4aca3a4849507b3543eb77a152e1a'
  const bibleVersionID = '55212e3cf5d04d49-01'

  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);

  const getResults = async (text) => {
    setSearchText(text)
    const response = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${searchText}`,
      {
        headers: {
          'api-key': API_KEY,
        },
      }
    );

    if (response.status === 200) {
      console.log('fetching data...')
      const data = await response.json();
      const verses = data.data.verses
      console.log(verses)
      setResults(verses)

      {verses.map((verse) => {
        console.log('Reference: ',verse.reference)
        console.log('Verse: ',verse.text)
        console.log('--------------------------')
      })}
    }
  };

  const renderedItems = results.map((verse) => (
    <>
      <Text>{verse.reference}</Text>
      <Text>{verse.text}</Text>
    </>
  ));
  

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.inputContainer}
        placeholder="Search for a verse or passage"
        // value={searchText}
        onChangeText={(text) => {getResults(text)}}
      />
      <TouchableOpacity
        onPress={getResults}>
        <Text>
          Search
        </Text>
      </TouchableOpacity>
      {renderedItems}
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  inputContainer: {
    marginTop: 15,
    width: screenWidth('80%'),
    height: screenHeight('7%'),
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 30,
    fontSize: 14,
},

});

export default Bible;
