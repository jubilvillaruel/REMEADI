import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from '../../assets/css/Style';

import { RFPercentage } from 'react-native-responsive-fontsize';
import { screenWidth, screenHeight } from '../components/Dimensions';
import next from '../../assets/images/right.png'
import med_bg from '../../assets/images/expert_system/meditate_group.jpg'

// import * as Font from 'expo-font';

export default function SelectExpertPathOpening ({ navigation }) {
  return (
    <View style={styles.screenCenter}>
      <ImageBackground
        source={med_bg}
        style={inStyles.backgroundImage}
        blurRadius={5} 
      >
        <View style={{backgroundColor:'white', height: screenHeight('105%'), opacity:0.9, justifyContent:'center',alignItems:'center'}}>

          <View style={ inStyles.textContainer }>
            <Text style={[styles.colorPrimary,{ fontSize: RFPercentage(3), textAlign: 'center', fontWeight:'300' }]}>
              We want to tailor our recommendations to your preferences and create a personalized meditation experience just for you. To do that, we'll be asking you a series of questions, so please answer them carefully. Your input will help us provide you with the perfect meditation journey. Let's get started on this journey together!
            </Text>
          </View>

          <View style={[ inStyles.buttonContainer, {paddingBottom:70}]}>
            <TouchableOpacity style={[inStyles.btn]} onPress={() => {navigation.navigate('SelectExpertPath');}}>
                <Image style={[{ width: 25, height: 25 }]} source={next}/>
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
    </View>
  );
};

const inStyles = StyleSheet.create({
  btn: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#2EC4B6',
  },

  textContainer: {
    padding: 5,
    width: screenWidth('85%'),
    alignItems: 'center',
    paddingBottom:30
  },

  buttonContainer: {
    padding: 15,
    width: screenWidth('100%'),
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Adjust as needed (contain, stretch, etc.)
  },
});