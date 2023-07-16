import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Sounds = () => {
    const soundFiles = [
        require('./../../assets/sounds/alarm-clock.wav'),
        require('./../../assets/sounds/campfire.wav'),
        require('./../../assets/sounds/night.wav'),
        require('./../../assets/sounds/rain.wav'),
        require('./../../assets/sounds/waves.wav')
      ];
    const soundFilesName = [
        'Alarm-clock',
        'Campfire',
        'Night',
        'Rain',
        'Waves'
    ]
    

  const [sounds, setSounds] = useState([]);

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


  const playSound = async (index) => {
    try {
      const sound = sounds[index];
      await sound.replayAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };


  const stopSound = async (index) => {
    try {
      const sound = sounds[index];
      await sound.stopAsync();
    } catch (error) {
      console.error('Error stopping sound:', error);
    }
  };


  const stopAllSounds = async () => {
    try {
      await Promise.all(sounds.map((sound) => sound.stopAsync()));
      setSounds([]);
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

  const handleStopAllSounds = () => {
    stopAllSounds();
  };

  return (
    <View>
      <Button title="Load Sounds" onPress={loadSounds} />

      {sounds.map((sound, index) => (
        <View style={{ flexDirection: 'row', gap: 15, }} key={index}>
          <TouchableOpacity onPress={() => playSound(index)}>
            <Text style={[inStyles.itemText, inStyles.selectedItemText]}>
                {`Play ${soundFilesName[index]}`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => stopSound(index)}>
            <Text style={[inStyles.itemText, inStyles.selectedItemText]}>
                {`Stop ${soundFilesName[index]}`}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {sounds.length > 0 && (
        <Button title="Stop All Sounds" onPress={stopAllSounds} />
      )}
    </View>
  );
}

const inStyles = StyleSheet.create({
    itemText: {
        fontSize: RFPercentage(2),
        paddingVertical: 5,
        flex: 1,
    },

    selectedItemText: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        backgroundColor: '#FFBF69',
    },
})


export {Sounds}