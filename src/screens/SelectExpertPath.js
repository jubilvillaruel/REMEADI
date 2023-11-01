import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { styles } from '../../assets/css/Style';

import { PrimaryButton } from '../components/Buttons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { screenWidth, screenHeight } from '../components/Dimensions';
import { FeatureCardWide } from '../components/Cards';
// import icon1 from '../../assets/images/avatar/avatar2.png'
import faith from '../../assets/images/expert_system/faith.jpg'
import method from '../../assets/images/expert_system/method.jpg'

export default function SelectExpertPath ({ navigation }) {
  return (
    <View style={[styles.screenCenter]}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <Text style={[{fontSize:RFPercentage(4), fontWeight:'300', marginBottom:10, textAlign:'center', marginTop:40}]}>Choose Your Meditation Path</Text>

        <View style={ [inStyles.buttonContainer] }>
          <FeatureCardWide
            title = "Faith-based"
            desc = "We'll consider your faith's teachings and practices to create a meditation experience that aligns with your beliefs and values."
            image = {faith}
            onPress={() => {
              navigation.navigate('SelectExpertPath2', { base: 'Faith-based' });
            }}
          />

          <FeatureCardWide
            title = "Method-based"
            desc = "we won't focus on your religion but instead dive into the methods of meditation. We'll ask about your preferences for stillness, movement, and other meditation techniques."
            image = {method}
            onPress={() => {
              navigation.navigate('SelectExpertPath2', { base: 'Method-based' });
            }}
          />
          
        </View>
      </ScrollView>
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
    // height: screenHeight('20%'),
    flexDirection: 'column',
    alignItems: 'center',
  },
});