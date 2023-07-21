import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { screenWidth, screenHeight } from './Dimensions';
import * as Speech from 'expo-speech';

import text from '../../assets/images/text.png';
import stop from '../../assets/images/stop.png';
import { styles } from '../../assets/css/Style';
import FlipCard from 'react-native-flip-card';

// Cards
export const ImageCard = ({ title, type, width, height, titleSize, typeSize, image, onPress }) => {

    return (
        <TouchableOpacity onPress={onPress}> 
            <View>
              <ImageBackground style={[inStyles.libItem]} 
                imageStyle={{ borderRadius: 15 }} 
                source={image}
                >
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
      <TouchableOpacity onPress={onPress} style={{paddingBottom:10}}> 
          <View>
            <ImageBackground style={[inStyles.searchItem]} imageStyle={{ borderRadius: 10 }} source={image}>
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
    <TouchableOpacity style={[inStyles.milestoneItem, styles.bgColorPrimary, styles.dropShadow]} onPress={onPress}>
      <View style={inStyles.milestoneContent}>
        <Text style={[styles.colorWhite, styles.bold, { fontSize: 16 }]}>{title}</Text>
        <Text style={styles.colorWhite}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const IconCard = ({ title, desc, icon, onPress }) => {

  return (
    <TouchableOpacity style={[inStyles.milestoneLockedItem, styles.dropShadow]} onPress={onPress}>
      <View style={inStyles.milestoneContent}>
        <Text style={[styles.colorWhite, styles.bold, { fontSize: 16 }]}>{title}</Text>
        <Text style={styles.colorWhite}>{desc}</Text>
      </View>
      <Image style={[{ width: 12, height: 16 }]} source={icon}/>
    </TouchableOpacity>
  );
};

export const StepCard = ({ count, desc, detailedDesc }) => {
  const [textFlipped, setTextFlipped] = useState(false);
  const [currentText, setCurrentText] = useState(desc);
  const [isSpeaking, setIsSpeaking] = useState(true);

  useEffect(() => {
    if (!isSpeaking) {
      flipText();
    }
  }, [isSpeaking]);

  const speakStep = () => {
    flipText();
    const options = {
      voice: 'Microsoft Zira - English (United States)',
      rate: 0.9,
      onStart: () => setIsSpeaking(true),
      onDone: () => setIsSpeaking(false),
    };
    Speech.speak(detailedDesc, options);
  };


  const stopSpeech = () => {
    Speech.stop();
    flipText();
  };

  const flipText = () => {
    setTextFlipped(!textFlipped);
  };

  const replaceText = () => {
    if (currentText === detailedDesc) {
      setCurrentText(desc);
    } else {
      setCurrentText(detailedDesc);
    }
  };
  
  return (
    <TouchableOpacity style={[inStyles.stepsItemContainer, styles.dropShadow]} onPress={replaceText}>
      <View style={inStyles.stepHeader}>
        <View style={[inStyles.stepTitle, styles.bgColorPrimary]}>
          <Text style={styles.colorWhite}>{count}</Text>
        </View>

        <FlipCard
          flipHorizontal={true}
          flipVertical={false}
          flip={textFlipped}
          clickable={false}
          style={{ width: 20, height: 20, right: 15, position: 'absolute' }}>
          <TouchableOpacity style={[styles.dropShadow, inStyles.btnMedia]} onPress={speakStep}>
            <Image style={[{ width: 20, height: 20 }]} source={text}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dropShadow, inStyles.btnMedia]} onPress={stopSpeech}>
            <Image style={[{ width: 20, height: 20 }]} source={stop}/>
          </TouchableOpacity>
        </FlipCard>
      </View>
      
      <Text style={inStyles.stepContent}>{currentText}</Text>
    </TouchableOpacity>
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
      width: screenWidth('90%'),
      marginVertical: 10,
      marginHorizontal: 5,
      gap: 5,
      borderRadius: 20,
      backgroundColor: '#FFFFFF',

    },

    stepHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
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
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      borderWidth: 2,
      borderColor: '#2EC4B6',
      backgroundColor: '#FFFFFF',
    },
});
