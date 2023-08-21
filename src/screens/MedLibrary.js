import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TextInput } from 'react-native';
import { styles } from '../../assets/css/Style';
import { ImageCard, SearchCard } from '../components/Cards';
import { screenHeight, screenWidth } from '../components/Dimensions';
import { RFPercentage } from 'react-native-responsive-fontsize';
import React, { useState } from 'react';

// Religion logos
import christianity_logo from '../../assets/images/religion/christianity_logo.png';
import islam_logo from '../../assets/images/religion/islam_logo.png';
import hinduism_logo from '../../assets/images/religion/hinduism_logo.png';
import buddhism_logo from '../../assets/images/religion/buddhism_logo.png';
import judaism_logo from '../../assets/images/religion/judaism_logo.png';

import { meditationImgDB } from '../Data/ImageDB';
import { meditationReligionDB, meditationTypeDB } from '../Data/TypeDB';
import { ChristianityDB } from '../Data/Practices/ChristianityDB';
import { IslamDB } from '../Data/Practices/IslamDB';
import { HinduismDB } from '../Data/Practices/HinduismDB';
import { BuddhismDB } from '../Data/Practices/BuddhismDB';
import { JudaismDB } from '../Data/Practices/JudaismDB';

export default function MedLibrary({ navigation }) {
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
      type: meditationTypeDB['Lectio Divina'],
      image: meditationImgDB['Lectio Divina'],
      bia: '',
      desc: ChristianityDB['Lectio Divina'],
    },
    {
      title: 'Christian Meditation',
      type: meditationTypeDB['Christian Meditation'],
      image: meditationImgDB['Christian Meditation'],
      bia: '',
      desc: ChristianityDB['Christian Meditation']
    },
    {
      title: 'Examen',
      type: meditationTypeDB['Examen'],
      image: meditationImgDB['Examen'],
      bia: '',
      desc: ChristianityDB['Examen']
    },
    {
      title: 'Rosary',
      type: meditationTypeDB['Rosary'],
      image: meditationImgDB['Rosary'],
      bia: '',
      desc: ChristianityDB['Rosary']
    },

    // Islam
    {
      title: 'Taffakur',
      type: meditationTypeDB['Taffakur'],
      image: meditationImgDB['Taffakur'],
      bia: '',
      desc: IslamDB['Taffakur']
    },
    {
      title: 'Dhikr',
      type: meditationTypeDB['Dhikr'],
      image: meditationImgDB['Dhikr'],
      bia: true,
      desc: IslamDB['Dhikr']
    },
    {
      title: 'Muraqaba',
      type: meditationTypeDB['Muraqaba'],
      image: meditationImgDB['Muraqaba'],
      bia: true,
      desc: IslamDB['Muraqaba']
    },
    {
      title: 'Sufi Breathing',
      type: meditationTypeDB['Sufi Breathing'],
      image: meditationImgDB['Sufi Breathing'],
      bia: '',
      desc: IslamDB['Sufi Breathing']
    },

    // Hinduism
    {
      title: 'Hatha Yoga',
      type: meditationTypeDB['Hatha Yoga'],
      image: meditationImgDB['Hatha Yoga'],
      bia: '',
      desc: HinduismDB['Hatha Yoga']
    },
    {
      title: 'Kriya Yoga',
      type: meditationTypeDB['Kriya Yoga'],
      image: meditationImgDB['Kriya Yoga'],
      bia: '',
      desc: HinduismDB['Kriya Yoga']
    },
    {
      title: 'Chakra',
      type: meditationTypeDB['Chakra'],
      image: meditationImgDB['Chakra'],
      bia: '',
      desc: HinduismDB['Chakra']
    },

    // Buddhism
    {
      title: 'Breath',
      type: meditationTypeDB['Breath'],
      image: meditationImgDB['Breath'],
      bia: true,
      desc: BuddhismDB['Breath']
    },
    {
      title: 'Walk',
      type: meditationTypeDB['Walk'],
      image: meditationImgDB['Walk'],
      bia: true,
      desc: BuddhismDB['Walk']
    },
    {
      title: 'Tonglen',
      type: meditationTypeDB['Tonglen'],
      image: meditationImgDB['Tonglen'],
      bia: true,
      desc: BuddhismDB['Tonglen']
    },
    {
      title: 'Metta',
      type: meditationTypeDB['Metta'],
      image: meditationImgDB['Metta'],
      bia: true,
      desc: BuddhismDB['Metta']
    },
    {
      title: 'Body Scan',
      type: meditationTypeDB['Body Scan'],
      image: meditationImgDB['Body Scan'],
      bia: true,
      desc: BuddhismDB['Body Scan']
    },

    // Judaism
    {
      title: 'Hitbodedut',
      type: meditationTypeDB['Hitbodedut'],
      image: meditationImgDB['Hitbodedut'],
      bia: '',
      desc: JudaismDB['Hitbodedut']
    },
    {
      title: 'Kabbalistic/Chassidic',
      type: meditationTypeDB['Kabbalistic/Chassidic'],
      image: meditationImgDB['Kabbalistic/Chassidic'],
      bia: true,
      desc: JudaismDB['Kabbalistic/Chassidic']
    },
    {
      title: 'Shema',
      type: meditationTypeDB['Shema'],
      image: meditationImgDB['Shema'],
      bia: true,
      desc: JudaismDB['Shema']
    },
  ];

  const handleSearchInputChange = (text) => {
    setSearchInput(text);
    try {
      // Filter the cards based on the search input
      const filtered = allCards.filter((card) =>{
        const titleMatch = card.title.toLowerCase().includes(text.toLowerCase());
        const descMatch = Object.values(card.desc).some((sentence) =>
          sentence.toLowerCase().includes(text.toLowerCase())
        );
        const typeMatch = meditationTypeDB[card.title].toLowerCase().includes(text.toLowerCase());
        const typeReligion = meditationReligionDB[card.title].toLowerCase().includes(text.toLowerCase());

        // return titleMatch || descMatch || typeMatch || typeReligion;
        return titleMatch || typeMatch || typeReligion;
      });
      console.log(filtered)
      setFilteredCards(filtered);
    } catch (error) {
      console.log(error.stack)
    }
  };

  return (
    <SafeAreaView style={styles.screenCenter}>
      <View style={[inStyles.searchBoxContainer, styles.dropShadow]}>
        <TextInput
          style={[inStyles.searchBox, styles.dropShadow]}
          placeholder="Search a meditation practice"
          onChangeText={handleSearchInputChange}
          value={searchInput}/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={[{ marginBottom: 15 }]}>
        <View style={[{ marginTop: 10 }]}>
          {searchInput !== '' && filteredCards.length === 0 ? (
            <View></View>
          ) : (
            <View style={[inStyles.medContainer]}>
              {searchInput === '' ? (
                  <View>
                    <View>
                      <View style={inStyles.religionContainer}>
                        <View style={inStyles.religionContent}>
                          <Image style={[{ width: 23, height: 32 }]} source={christianity_logo}/>
                          <Text style={[styles.colorPrimary, { fontSize: RFPercentage(3), fontWeight: 'bold', marginHorizontal: 10 }]}>Christianity</Text>
                        </View>
                      </View>
          
                      <View style={inStyles.medContainer}>
                        <ImageCard title='Lectio Divina' type={meditationTypeDB['Lectio Divina']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Lectio Divina']} onPress={() => {
                          goToGuide('Lectio Divina', meditationImgDB['Lectio Divina'])}}></ImageCard>
                        <ImageCard title='Christian Meditation' type={meditationTypeDB['Christian Meditation']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Christian Meditation']} onPress={() => {goToGuide('Christian Meditation',meditationImgDB['Christian Meditation'])}}></ImageCard>
                      </View>
          
                      <View style={inStyles.medContainer}>
                        <ImageCard title='Examen' type={meditationTypeDB['Examen']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Examen']} onPress={() => {goToGuide('Examen',meditationImgDB['Examen'])}}></ImageCard>
                        <ImageCard title='Rosary' type={meditationTypeDB['Rosary']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Rosary']} onPress={() => {goToGuide('Rosary',meditationImgDB['Rosary'])}}></ImageCard>
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
                        <ImageCard title='Taffakur' type={meditationTypeDB['Taffakur']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Taffakur']} onPress={() => {goToGuide('Taffakur',meditationImgDB['Taffakur'],false)}}></ImageCard>
                        <ImageCard title='Dhikr' type={meditationTypeDB['Dhikr']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Dhikr']} onPress={() => {goToGuide('Dhikr',meditationImgDB['Dhikr'],true)}}></ImageCard>
                      </View>
          
                      <View style={inStyles.medContainer}>
                        <ImageCard title='Muraqaba' type={meditationTypeDB['Muraqaba']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Muraqaba']} onPress={() => {goToGuide('Muraqaba',meditationImgDB['Muraqaba'],true)}}></ImageCard>
                        <ImageCard title='Sufi Breathing' type={meditationTypeDB['Sufi Breathing']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Sufi Breathing']} onPress={() => {goToGuide('Sufi Breathing',meditationImgDB['Sufi Breathing'])}}></ImageCard>
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
                        <ImageCard title='Hatha Yoga' type={meditationTypeDB['Hatha Yoga']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Hatha Yoga']} onPress={() => {goToGuide('Hatha Yoga',meditationImgDB['Hatha Yoga'], true)}}></ImageCard>
                        <ImageCard title='Kriya Yoga' type={meditationTypeDB['Kriya Yoga']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Kriya Yoga']} onPress={() => {goToGuide('Kriya Yoga',meditationImgDB['Kriya Yoga'])}}></ImageCard>
                      </View>
          
                      <View style={{ marginTop: 5, paddingHorizontal: 13.5, width: screenWidth('90%') }}>
                        <ImageCard title='Chakra' type={meditationTypeDB['Chakra']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Chakra']} onPress={() => {goToGuide('Chakra',meditationImgDB['Chakra'])}}></ImageCard>
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
                        <ImageCard title='Breath' type={meditationTypeDB['Breath']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Breath']} onPress={() => {goToGuide('Breath',meditationImgDB['Breath'],true)}}></ImageCard>
                        <ImageCard title='Walk' type={meditationTypeDB['Walk']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Walk']} onPress={() => {goToGuide('Walk',meditationImgDB['Walk'],true)}}></ImageCard>
                      </View>
          
                      <View style={inStyles.medContainer}>
                        <ImageCard title='Tonglen' type={meditationTypeDB['Tonglen']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Tonglen']} onPress={() => {goToGuide('Tonglen',meditationImgDB['Tonglen'],true)}}></ImageCard>
                        <ImageCard title='Metta' type={meditationTypeDB['Metta']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Metta']} onPress={() => {goToGuide('Metta',meditationImgDB['Metta'],true)}}></ImageCard>
                      </View>
          
                      <View style={{ marginTop: 5, paddingHorizontal: 13.5, width: screenWidth('90%') }}>
                        <ImageCard title='Body Scan' type={meditationTypeDB['Body Scan']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Body Scan']} onPress={() => {goToGuide('Body Scan',meditationImgDB['Body Scan'],true)}}></ImageCard>
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
                        <ImageCard title='Hitbodedut' type={meditationTypeDB['Hitbodedut']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Hitbodedut']} onPress={() => {goToGuide('Hitbodedut',meditationImgDB['Hitbodedut'])}}></ImageCard>
                        <ImageCard title='Kabbalistic/Chassidic' type={meditationTypeDB['Kabbalistic/Chassidic']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Kabbalistic/Chassidic']} onPress={() => {goToGuide('Kabbalistic/Chassidic',meditationImgDB['Kabbalistic/Chassidic'],true)}}></ImageCard>
                      </View>
          
                      <View style={{ marginTop: 5, paddingHorizontal: 13.5, width: screenWidth('90%') }}>
                        <ImageCard title='Shema' type={meditationTypeDB['Shema']} titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1)} image={meditationImgDB['Shema']} onPress={() => {goToGuide('Shema',meditationImgDB['Shema'],true)}}></ImageCard>
                      </View>
                    </View>
                  </View>
              ) : (
                <View>
                  {filteredCards.map((card, index) => (
                    <SearchCard  
                      key={index}
                      title={card.title}
                      type={card.type}
                      titleSize={RFPercentage(2)}
                      typeSize={RFPercentage(1.8)}
                      height={screenHeight('18%')}
                      image={card.image}
                      onPress={() => {
                        goToGuide(card.title, card.image, card.bia);
                      }}
                    />
                  ))}
                </View>
              )}
            </View>
          )}
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

  searchBoxContainer:{
    width: screenWidth('100%'),
    height: screenHeight('10%'),
    justifyContent: 'center',
    zIndex: 1,
  },

  searchBox:{
    width: screenWidth('85%'),
    height: screenHeight('5%'),
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#2EC4B6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: RFPercentage(1.8),
  },
});