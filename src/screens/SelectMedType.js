import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { screenWidth, screenHeight } from '../components/Dimensions';
import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';

import { meditationTypeDescDB } from '../Data/TypeDB';
import { meditationTypeDB } from '../Data/ImageDB';
import { ImageCard } from '../components/Cards';

export const MedTypes = ({ meditationTypes, religion, navigation }) => {
  const goToQuestions = (type) => {
    navigation.navigate('Questions', { religion, type });
  };

  const createRows = () => {
    if (meditationTypes && meditationTypes.length > 0) {
      return meditationTypes.map((types, index) => (
        <View key={index} style={{ marginBottom: 10, gap: 10 }}>
          {types.map((medType) => (
            <ImageCard key={medType.id} title={medType.name} type={meditationTypeDescDB[medType.name]} titleSize={RFPercentage(2.2)} typeSize={RFPercentage(1.5)} image={meditationTypeDB[medType.name]} onPress={() => {goToQuestions(medType.name)}}></ImageCard>
          ))}
        </View>
      ));
    } else {
      console.log('Something went wrong!\n' , meditationTypes);
      return null;
    }
  };

  return (
    <View style={styles.screenCenter}>
      <View style={inStyles.typeContainer}>
        <View style={{ padding: 15, marginBottom: 10 }}>
        <Text style={[styles.bold, { color:'black', fontSize: RFPercentage(4), textAlign: 'center', fontWeight:'300', marginBottom:10, textAlign:'center'}]}>Choose a Meditation Type.</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {createRows()}
        </ScrollView>
      </View>
    </View>
  );
};

export default function SelectMedType({ navigation, route }) {
  const { religion } = route.params;

  const meditationTypes = {
    C1: [
      [
        { id: 1, name: 'Mindfulness' },
        { id: 2, name: 'Spiritual' },
      ],
      [
        { id: 3, name: 'Focused' },
        { id: 4, name: 'Mantra' },
      ],
      [
        { id: 5, name: 'Loving-Kindness' },
        { id: 6, name: 'Visualization' },
      ],
    ],
    C2: [
      [
        { id: 1, name: 'Mindfulness' },
        { id: 2, name: 'Spiritual' },
      ],
      [
        { id: 3, name: 'Focused' },
        { id: 4, name: 'Mantra' },
      ],
    ],
    Islam: [
      [
        { id: 1, name: 'Mindfulness' },
        { id: 2, name: 'Spiritual' },
      ],
      [
        { id: 3, name: 'Focused' },
        { id: 4, name: 'Mantra' },
      ],
      [
        { id: 5, name: 'Visualization' },
      ],
    ],
    Hinduism: [
      [
        { id: 1, name: 'Mindfulness' },
        { id: 2, name: 'Spiritual' },
      ],
      [
        { id: 3, name: 'Focused' },
        { id: 4, name: 'Movement' },
      ],
      [
        { id: 5, name: 'Visualization' },
      ],
    ],
    Buddhism: [
      [
        { id: 1, name: 'Mindfulness' },
        { id: 2, name: 'Spiritual' },
      ],
      [
        { id: 3, name: 'Focused' },
        { id: 4, name: 'Mantra' },
      ],
      [
        { id: 5, name: 'Visualization' },
        { id: 6, name: 'Movement' },
      ],
      [
        { id: 7, name: 'Loving-Kindness' },
        { id: 8, name: 'Progressive Relaxation' },
      ],
    ],
    Judaism: [
      [
        { id: 1, name: 'Mindfulness' },
        { id: 2, name: 'Spiritual' },
      ],
      [
        { id: 3, name: 'Focused' },
        { id: 4, name: 'Visualization' },
      ],
    ],
  };

  return <MedTypes meditationTypes={meditationTypes[religion]} religion={religion} navigation={navigation}/>;
}

const inStyles = StyleSheet.create({
  typeContainer: {
    padding: 15,
    width: screenWidth('100%'),
    height: screenHeight('90%'),
    flexDirection: 'column',
    alignItems: 'center',
  },
});
