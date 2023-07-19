import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TextInput } from 'react-native';
import { styles } from '../../assets/css/Style';
import { ImageCard, SearchCard } from '../components/Cards';
import { screenWidth } from '../components/Dimensions';
import { RFPercentage } from 'react-native-responsive-fontsize';
import React, { useState } from 'react';


// Religion logos
import christianity_logo from '../../assets/images/religion/christianity_logo.png';
import islam_logo from '../../assets/images/religion/islam_logo.png';
import hinduism_logo from '../../assets/images/religion/hinduism_logo.png';
import buddhism_logo from '../../assets/images/religion/buddhism_logo.png';
import judaism_logo from '../../assets/images/religion/judaism_logo.png';

import { meditationImgDB } from '../Data/ImageDB';
import { meditationTypeDB } from '../Data/TypeDB';

export default function MedLibrary( {navigation}) {

  const [searchInput, setSearchInput] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);

  const goToGuide = (title, guideImg, bia) => {
    const data = {
      title: title, 
      guideImg: guideImg,
      bia: bia
    };
    navigation.navigate('Guide', {data});
  };

  const allCards = [
    // Christianity
    {
      title: 'Lectio Divina',
      type: 'Spiritual',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Lectio Divina'],
    },
    {
      title: 'Christian Meditation',
      type: 'Mantra',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Christian Meditation'],
    },
    {
      title: 'Examen',
      type: 'Mindfulness, Visualization',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Examen'],
    },
    {
      title: 'Rosary',
      type: 'Focused, Loving-kindness',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Rosary'],
    },
    // Add more Christianity cards here if needed

    // Islam
    {
      title: 'Taffakur',
      type: 'Mindfulness, Spiritual',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Taffakur'],
    },
    {
      title: 'Dhikr',
      type: 'Mantra',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Dhikr'],
    },
    {
      title: 'Muraqaba',
      type: 'Focused',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Muraqaba'],
    },
    {
      title: 'Sufi Breathing',
      type: 'Visualization',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Sufi Breathing'],
    },
    // Add more Islam cards here if needed

    // Hinduism
    {
      title: 'Hatha Yoga',
      type: 'Movement, Mindfulness, Spiritual',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.1),
      image: meditationImgDB['Hatha Yoga'],
    },
    {
      title: 'Kriya Yoga',
      type: 'Focused',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Kriya Yoga'],
    },
    {
      title: 'Chakra',
      type: 'Visualization',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Chakra'],
    },
    // Add more Hinduism cards here if needed

    // Buddhism
    {
      title: 'Breath',
      type: 'Focused',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Breath'],
    },
    {
      title: 'Walk',
      type: 'Movement',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Walk'],
    },
    {
      title: 'Tonglen',
      type: 'Loving-kindness, Visualization',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Tonglen'],
    },
    {
      title: 'Metta',
      type: 'Spiritual, Mantra',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Metta'],
    },
    {
      title: 'Body Scan',
      type: 'Mindfulness, Relaxation',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Body Scan'],
    },
    // Add more Buddhism cards here if needed

    // Judaism
    {
      title: 'Hitbodedut',
      type: 'Spiritual',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Hitbodedut'],
    },
    {
      title: 'Kabbalistic/Chassidic',
      type: 'Visualization',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Kabbalistic/Chassidic'],
    },
    {
      title: 'Shema',
      type: 'Focused',
      titleSize: RFPercentage(1.6),
      typeSize: RFPercentage(1.2),
      image: meditationImgDB['Shema'],
    },
    // Add more Judaism cards here if needed
  ];

  const handleSearchInputChange = (text) => {
    setSearchInput(text);
    // Filter the cards based on the search input
    const filtered = allCards.filter((card) =>
      card.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCards(filtered);
  };

  return (
    <SafeAreaView style={styles.screenCenter}>
      <ScrollView showsVerticalScrollIndicator={false} style={[{ marginBottom: 15 }]}>
        <View style={[{ marginTop: 15 }]}>
          <TextInput
            style={inStyles.searchBox}
            placeholder="Search a meditation practice..."
            onChangeText={handleSearchInputChange}
            value={searchInput}
          />
        </View>

        <View style={[{ marginTop: 10 }]}>
          {searchInput !== '' && filteredCards.length === 0 ? (
            <Text style={{ textAlign: 'center' }}>No results found</Text>
          ) : (
            <View style={[inStyles.medContainer,{flexDirection: 'col'}]}>
              {searchInput === '' ? (
                // Show all cards if search input is empty
                // allCards.map((card, index) => (
                  <View>
                    <Text></Text>
                  </View>
                  
                  // <ImageCard
                  //   key={index}
                  //   title={card.title}
                  //   type={card.type}
                  //   titleSize={card.titleSize}
                  //   typeSize={card.typeSize}
                  //   image={card.image}
                  //   onPress={() => {
                  //     goToGuide(card.title, card.image);
                  //   }}
                  // />
                // )
                // )
              ) : (
                // Show filtered cards based on search input
                filteredCards.map((card, index) => (
                  <SearchCard
                    key={index}
                    title={card.title}
                    type={card.type}
                    titleSize={card.titleSize}
                    typeSize={card.typeSize}
                    image={card.image}
                    onPress={() => {
                      goToGuide(card.title, card.image);
                    }}
                  />
                ))
              )}
            </View>
          )}
        </View>

        <View>
          <View style={inStyles.religionContainer}>
            <View style={inStyles.religionContent}>
              <Image style={[{ width: 23, height: 32 }]} source={christianity_logo}/>
              <Text style={[styles.colorPrimary, { fontSize: RFPercentage(3), fontWeight: 'bold', marginHorizontal: 10 }]}>Christianity</Text>
            </View>
          </View>

          <View style={inStyles.medContainer}>
            <ImageCard title='Lectio Divina' type={meditationTypeDB['Lectio Divina']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Lectio Divina']} onPress={() => {
              goToGuide('Lectio Divina', meditationImgDB['Lectio Divina'])}}></ImageCard>
            <ImageCard title='Christian Meditation' type={meditationTypeDB['Christian Meditation']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Christian Meditation']} onPress={() => {goToGuide('Christian Meditation',meditationImgDB['Christian Meditation'])}}></ImageCard>
          </View>

          <View style={inStyles.medContainer}>
            <ImageCard title='Examen' type={meditationTypeDB['Examen']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Examen']} onPress={() => {goToGuide('Examen',meditationImgDB['Examen'])}}></ImageCard>
            <ImageCard title='Rosary' type={meditationTypeDB['Rosary']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Rosary']} onPress={() => {goToGuide('Rosary',meditationImgDB['Rosary'])}}></ImageCard>
          </View>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={inStyles.religionContainer}>
            <View style={inStyles.religionContent}>
              <Image style={[{ width: 33, height: 36 }]} source={islam_logo}/>
              <Text style={[styles.colorPrimary, { fontSize: RFPercentage(3), fontWeight: 'bold', marginHorizontal: 10 }]}>Islam</Text>
            </View>
          </View>

          <View style={inStyles.medContainer}>
            <ImageCard title='Taffakur' type={meditationTypeDB['Taffakur']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Taffakur']} onPress={() => {goToGuide('Taffakur',meditationImgDB['Taffakur'],false)}}></ImageCard>
            <ImageCard title='Dhikr' type={meditationTypeDB['Dhikr']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Dhikr']} onPress={() => {goToGuide('Dhikr',meditationImgDB['Dhikr'],true)}}></ImageCard>
          </View>

          <View style={inStyles.medContainer}>
            <ImageCard title='Muraqaba' type={meditationTypeDB['Muraqaba']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Muraqaba']} onPress={() => {goToGuide('Muraqaba',meditationImgDB['Muraqaba'],true)}}></ImageCard>
            <ImageCard title='Sufi Breathing' type={meditationTypeDB['Sufi Breathing']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Sufi Breathing']} onPress={() => {goToGuide('Sufi Breathing',meditationImgDB['Sufi Breathing'])}}></ImageCard>
          </View>
        </View>

          <View style={[{ marginTop: 15 }]}>
            <View style={inStyles.religionContainer}>
              <View style={inStyles.religionContent}>
                <Image style={[{ width: 35, height: 36 }]} source={hinduism_logo}/>
                <Text style={[styles.colorPrimary, { fontSize: RFPercentage(3), fontWeight: 'bold', marginHorizontal: 10 }]}>Hinduism</Text>
              </View>
            </View>

          <View style={inStyles.medContainer}>
            <ImageCard title='Hatha Yoga' type={meditationTypeDB['Hatha Yoga']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.1)} image={meditationImgDB['Hatha Yoga']} onPress={() => {goToGuide('Hatha Yoga',meditationImgDB['Hatha Yoga'])}}></ImageCard>
            <ImageCard title='Kriya Yoga' type={meditationTypeDB['Kriya Yoga']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Kriya Yoga']} onPress={() => {goToGuide('Kriya Yoga',meditationImgDB['Kriya Yoga'])}}></ImageCard>
          </View>

          <View style={{ marginTop: 5, paddingHorizontal: 13.5, width: screenWidth('90%') }}>
            <ImageCard title='Chakra' type={meditationTypeDB['Chakra']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Chakra']} onPress={() => {goToGuide('Chakra',meditationImgDB['Chakra'])}}></ImageCard>
          </View>
        </View>

          <View style={[{ marginTop: 15 }]}>
            <View style={inStyles.religionContainer}>
              <View style={inStyles.religionContent}>
                <Image style={[{ width: 36, height: 36 }]} source={buddhism_logo}/>
                <Text style={[styles.colorPrimary, { fontSize: RFPercentage(3), fontWeight: 'bold', marginHorizontal: 10 }]}>Buddhism</Text>
              </View>
            </View>

          <View style={inStyles.medContainer}>
            <ImageCard title='Breath' type={meditationTypeDB['Breath']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Breath']} onPress={() => {goToGuide('Breath',meditationImgDB['Breath'],true)}}></ImageCard>
            <ImageCard title='Walk' type={meditationTypeDB['Walk']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Walk']} onPress={() => {goToGuide('Walk',meditationImgDB['Walk'],true)}}></ImageCard>
          </View>

          <View style={inStyles.medContainer}>
            <ImageCard title='Tonglen' type={meditationTypeDB['Tonglen']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Tonglen']} onPress={() => {goToGuide('Tonglen',meditationImgDB['Tonglen'],true)}}></ImageCard>
            <ImageCard title='Metta' type={meditationTypeDB['Metta']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Metta']} onPress={() => {goToGuide('Metta',meditationImgDB['Metta'],true)}}></ImageCard>
          </View>

          <View style={{ marginTop: 5, paddingHorizontal: 13.5, width: screenWidth('90%') }}>
            <ImageCard title='Body Scan' type={meditationTypeDB['Body Scan']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Body Scan']} onPress={() => {goToGuide('Body Scan',meditationImgDB['Body Scan'],true)}}></ImageCard>
          </View>
        </View>

          <View style={[{ marginTop: 15 }]}>
            <View style={inStyles.religionContainer}>
              <View style={inStyles.religionContent}>
                <Image style={[{ width: 32, height: 36 }]} source={judaism_logo}/>
                <Text style={[styles.colorPrimary, { fontSize: RFPercentage(3), fontWeight: 'bold', marginHorizontal: 10 }]}>Judaism</Text>
              </View>
            </View>

          <View style={inStyles.medContainer}>
            <ImageCard title='Hitbodedut' type={meditationTypeDB['Hitbodedut']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Hitbodedut']} onPress={() => {goToGuide('Hitbodedut',meditationImgDB['Hitbodedut'])}}></ImageCard>
            <ImageCard title='Kabbalistic/Chassidic' type={meditationTypeDB['Kabbalistic/Chassidic']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Kabbalistic/Chassidic']} onPress={() => {goToGuide('Kabbalistic/Chassidic',meditationImgDB['Kabbalistic/Chassidic'],true)}}></ImageCard>
          </View>

          <View style={{ marginTop: 5, paddingHorizontal: 13.5, width: screenWidth('90%') }}>
            <ImageCard title='Shema' type={meditationTypeDB['Shema']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={meditationImgDB['Shema']} onPress={() => {goToGuide('Shema',meditationImgDB['Shema'],true)}}></ImageCard>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const inStyles = StyleSheet.create({
  religionContainer: {
    paddingTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: screenWidth('90%'),
  },

  religionContent: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },

  medContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 5,
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth('90%'),
  },

  searchBox:{
    width: screenWidth('80%'),
    height: 50,
    backgroundColor: '#8FD3D2',
    borderRadius: 10,
    borderColor: '#FFFFFF',
    paddingLeft: 10
  }
});