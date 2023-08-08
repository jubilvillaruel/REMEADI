import { Text, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { PrimaryButton } from '../components/Buttons';

import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { meditationReligionDB, meditationTypeDB } from '../Data/TypeDB';
import { screenWidth, screenHeight } from '../components/Dimensions';

export default function ExpertResult({ navigation, route }) {
  const { data } = route.params;

  const goToExpertReligion = () => {
    navigation.navigate('ExpertReligion', { data });
  };

  const goToExpertType = () => {
    navigation.navigate('ExpertType', { data });
  };

  const goToGuide = (title, guideImg, bia) => {
    const data = {
      title: title, 
      guideImg: guideImg,
      bia: bia
    };
    navigation.navigate('Guide', {data});
  };

  const getMeditationType = (title) => {
    return meditationTypeDB[title] || 'Unknown';
  };

  const getMeditationReligion = (title) => {
    return meditationReligionDB[title] || 'Unknown';
  };
  
  return (
    <SafeAreaView style={styles.screenCenter}>
      <ScrollView showsVerticalScrollIndicator={false} style={[{ marginBottom: 15 }]}>
        <View style={inStyles.messageContainer}>
          <Text style={[styles.bold, { fontSize: RFPercentage(2.5), textAlign: 'justify' }]}>
            Based on your preferences and choices, we recommend the following meditation practice for you:
          </Text>
        </View>

        <View style={[styles.medContainer, { height: screenHeight('56%') }]}>
          <TouchableOpacity onPress={() => { goToGuide(data.title, data.guideImg, data.bia) }}> 
            <View>
              <ImageBackground style={inStyles.mainItem} 
                imageStyle={{ borderRadius: 15 }} 
                source={data.guideImg}>
                <View style={inStyles.mainContent}>
                  <Text style={[styles.colorWhite, styles.bold, { fontSize: RFPercentage(3) }]}>{data.title}</Text>
                  <Text style={[styles.colorWhite, { fontSize: RFPercentage(1.8) }]}>{getMeditationType(data.title)}</Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <PrimaryButton
            text={'More from ' + getMeditationReligion(data.title)}
            textColor='#FFFFFF'
            textSize={RFPercentage(2.2)}
            width={screenWidth('90%')}
            height={screenHeight('7%')}
            borderRad={30}
            onPress={goToExpertReligion}>
          </PrimaryButton>
          <PrimaryButton
            text={'More from ' + getMeditationType(data.title)}
            textColor='#FFFFFF'
            textSize={RFPercentage(1.6)}
            width={screenWidth('90%')}
            height={screenHeight('7%')}
            borderRad={30}
            onPress={goToExpertType}>
          </PrimaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const inStyles = StyleSheet.create({
  practiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth('90%'),
    marginBottom: 10,
  },

  practiceCard: {
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 5,
  },

  mainItem: {
    width: screenWidth('90%'),
    height: screenHeight('56%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainContent: {
    position: 'absolute',
    left: 15,
    bottom: 15,
  },

  messageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth('90%'),
    height: screenHeight('15%'),
  },
});