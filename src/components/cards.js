import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { screenWidth, screenHeight } from '../components/dimensions';
import * as Speech from 'expo-speech';

import text from '../../assets/images/text.png';

import { styles } from './../../assets/css/Style';
import { getGuide } from '../Data/Practices/GuideDB';

// Cards
export const ImageCard = ({ title, type, width, height, titleSize, typeSize, image, onPress }) => {

    return (
        <TouchableOpacity onPress={onPress}> 
            <View>
              <ImageBackground style={[inStyles.libItem, { width: width, height: height }]} imageStyle={{ borderRadius: 10 }} source={image}>
                <View style={inStyles.libContent}>
                  <Text style={[styles.colorWhite, styles.bold, { fontSize: titleSize }]}>{title}</Text>
                  <Text style={[styles.colorWhite, { fontSize: typeSize }]}>{type}</Text>
                </View>
              </ImageBackground>
            </View>
        </TouchableOpacity>
    );
};

export const SearchCard = ({ title, type, width, height, titleSize, typeSize, image, onPress }) => {

  return (
      <TouchableOpacity onPress={onPress}> 
          <View>
            <ImageBackground style={[inStyles.searchItem, { width: width, height: height }]} imageStyle={{ borderRadius: 10 }} source={image}>
              <View style={inStyles.libContent}>
                <Text style={[styles.colorWhite, styles.bold, { fontSize: titleSize }]}>{title}</Text>
                <Text style={[styles.colorWhite, { fontSize: typeSize }]}>{type}</Text>
              </View>
            </ImageBackground>
          </View>
      </TouchableOpacity>
  );
};

export const TextCard = ({ title, desc, onPress }) => {

  return (
    <TouchableOpacity style={[inStyles.milestoneItem, styles.bgColorPrimary]} onPress={onPress}>
      <View style={inStyles.milestoneContent}>
        <Text style={[styles.colorWhite, styles.bold, { fontSize: 16 }]}>{title}</Text>
        <Text style={styles.colorWhite}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const IconCard = ({ title, desc, icon, onPress }) => {

  return (
    <TouchableOpacity style={inStyles.milestoneLockedItem} onPress={onPress}>
      <View style={inStyles.milestoneContent}>
        <Text style={[styles.colorWhite, styles.bold, { fontSize: 16 }]}>{title}</Text>
        <Text style={styles.colorWhite}>{desc}</Text>
      </View>
      <Image style={[{ width: 12, height: 16 }]} source={icon}/>
    </TouchableOpacity>
  );
};

export const StepCard = ({ count, desc, detailedDesc }) => {
  const [ guide, setGuide ] = useState({'key':'value'});

  const speakStep = () => {
    const options = {
        voice: 'Microsoft Zira - English (United States)',
        rate: 0.9
    }
    Speech.speak(detailedDesc, options);
    // flipTextStep();
  };

  return (
    <View style={inStyles.stepsItemContainer}>     
      <View style={[inStyles.stepTitle, styles.bgColorPrimary]}>
        <Text style={styles.colorWhite}>{count}</Text>
      </View>
      <Text style={inStyles.stepContent}>{desc}</Text>
      <TouchableOpacity style={[styles.dropShadow, inStyles.btnMedia]} onPress={() => {speakStep()}}>
          <Image style={[{ width: 40, height: 40 }]} source={text}/>
      </TouchableOpacity>
    </View>
  );
};

const inStyles = StyleSheet.create({
    libItem: {
        width: screenWidth('41%'),
        height: screenHeight('18%'),
        justifyContent: 'center',
        alignItems: 'center',
    },

    searchItem: {
      width: screenWidth('82%'),
      height: screenHeight('9%'),
      justifyContent: 'center',
      alignItems: 'center',
    },

    libContent: {
        position: 'absolute',
        left: 15,
        bottom: 15,
    },

    milestoneItem: {
      flexDirection: 'row',
      borderRadius: 10,
      padding: 15,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },

    milestoneLockedItem: {
      flexDirection: 'row',
      borderRadius: 10,
      padding: 15,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#8FD3D2',
    },

    milestoneContent: {
      flex: 1,
    },

    stepsItemContainer: {
      padding: 15,
      marginVertical: 10,
      gap: 5,
      borderRadius: 20,
      backgroundColor: '#FFFFFF',

    },

    stepTitle: {
      borderRadius: 20,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width: '25%',
    },

    stepContent: {
      textAlign: 'justify',
      color: '#757575',
    },
    
    btnMedia: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      borderWidth: 2,
      borderColor: '#2EC4B6',
      backgroundColor: '#FFFFFF',
    },
});