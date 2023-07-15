import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { styles } from '../../assets/css/Style';

const Sounds = () => {
  const [sounds, setSounds] = useState([]);
  const [clickedIndexes, setClickedIndexes] = useState([]);

  const toggleItem = (index) => {
    if (clickedIndexes.includes(index)) {
      setClickedIndexes(clickedIndexes.filter((clickedIndex) => clickedIndex !== index));
    } else {
      setClickedIndexes([...clickedIndexes, index]);
    }
  };

  const soundFiles = [
    require('./../../assets/sounds/alarm-clock.wav'),
    require('./../../assets/sounds/campfire.wav'),
    require('./../../assets/sounds/night.wav'),
    require('./../../assets/sounds/rain.wav')
  ];

  const soundFilesName = [
    'Alarm-clock',
    'Campfire',
    'Night',
    'Rain'
  ];

  useEffect(() => {
    const loadSounds = async () => {
      try {
        const loadedSounds = await Promise.all(
          soundFiles.map(async (soundFile) => {
            const { sound } = await Audio.Sound.createAsync(soundFile);
            return sound;
          })
        );
        setSounds(loadedSounds);
      } catch (error) {
        console.error('Error loading sounds:', error);
      }
    };

    loadSounds();
  }, []);

  const playSound = async (index) => {
    try {
      const sound = sounds[index];
      await sound.replayAsync();
      toggleItem(index);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const stopSound = async (index) => {
    try {
      const sound = sounds[index];
      await sound.stopAsync();
      setClickedIndexes(clickedIndexes.filter((clickedIndex) => clickedIndex !== index));
    } catch (error) {
      console.error('Error stopping sound:', error);
    }
  };

  const stopAllSounds = async () => {
    try {
      await Promise.all(sounds.map((sound) => sound.stopAsync()));
      setSounds([]);
      setClickedIndexes([]);
    } catch (error) {
      console.error('Error stopping all sounds:', error);
    }
  };

  useEffect(() => {
    return () => {
      // Clean up sounds when component unmounts
      stopAllSounds();
    };
  }, []);

  const handlePlaySound = (index) => {
    playSound(index);
  };

  const handleStopSound = (index) => {
    stopSound(index);
  };

  return (
    <View>
      {sounds.map((sound, index) => (
        <View key={index}>
          <TouchableOpacity onPress={() => {
            if (clickedIndexes.includes(index)) {
              handleStopSound(index);
            } else {
              handlePlaySound(index);
            }
            }}>
            <Text style={[inStyles.itemText, styles.bold, clickedIndexes.includes(index) && inStyles.selectedItemText]}>
              {soundFilesName[index]}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const inStyles = StyleSheet.create({
  itemText: {
    fontSize: RFPercentage(2),
    paddingVertical: 5,
    flex: 1,
  },

  selectedItemText: {
    color: '#FFFFFF',
    backgroundColor: '#FFBF69',
    borderRadius: 20,
  },
});

export { Sounds };
