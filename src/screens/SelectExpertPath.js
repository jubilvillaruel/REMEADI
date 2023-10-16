import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from '../../assets/css/Style';

import { PrimaryButton } from '../components/Buttons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { screenWidth, screenHeight } from '../components/Dimensions';

export default function SelectExpertPath ({ navigation }) {
  return (
    <View style={styles.screenCenter}>
      <View style={ inStyles.textContainer }>
        <Text style={[styles.bold, styles.colorPrimary, { fontSize: RFPercentage(3), textAlign: 'justify' }]}>
          We want to tailor our recommendations to your preferences. Should we base them on faith or method?
        </Text>
      </View>

      <View style={ inStyles.buttonContainer }>
        <PrimaryButton
          text='Faith-based'
          textColor= '#FFFFFF'
          textSize={RFPercentage(2.2)}
          width={screenWidth('80%')}
          height={screenHeight('7%')}
          borderRad={30}
          onPress={() => {
            navigation.navigate('SelectExpertPath2', { base: 'Faith-based' });
          }}>
        </PrimaryButton>

        <PrimaryButton
          text='Method-based'
          textColor= '#FFFFFF'
          textSize={RFPercentage(2.2)}
          width={screenWidth('80%')}
          height={screenHeight('7%')}
          borderRad={30}
          onPress={() => {
            navigation.navigate('SelectExpertPath2', { base: 'Method-based' });
          }}>
        </PrimaryButton>
      </View>
    </View>
  );
};

const inStyles = StyleSheet.create({
  textContainer: {
    padding: 5,
    width: screenWidth('85%'),
    height: screenHeight('20%'),
    alignItems: 'center',
  },

  buttonContainer: {
    padding: 15,
    width: screenWidth('100%'),
    height: screenHeight('20%'),
    flexDirection: 'column',
    alignItems: 'center',
  },
});