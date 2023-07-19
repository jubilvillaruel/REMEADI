import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { screenWidth, screenHeight } from '../components/dimensions';
import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const MedTypes = ({ meditationTypes, religion, navigation }) => {
  const goToQuestions = (type) => {
    navigation.navigate('Questions', { religion, type });
  };

  const createRows = () => {
    if (meditationTypes && meditationTypes.length > 0) {
      return meditationTypes.map((types, index) => (
        <View key={index} style={inStyles.row}>
          {types.map((medType) => (
            <TouchableOpacity key={medType.id} style={[inStyles.typeCard, styles.bgColorPrimary]} onPress={() => {goToQuestions(medType.name)}}>
              <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>
                {medType.name}
              </Text>
            </TouchableOpacity>
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
      <View style={inStyles.typeContainer}>{createRows()}</View>
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
  typeCard: {
    padding: 15,
    width: screenWidth('40%'),
    height: screenHeight('18%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    textAlign: 'center',
    gap: 5,
  },

  typeContainer: {
    padding: 15,
    width: screenWidth('100%'),
    height: screenHeight('90%'),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
});
