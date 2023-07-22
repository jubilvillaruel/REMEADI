import { Text, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { ImageCard } from '../components/Cards';

import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { timeDB2 } from '../Data/LocalDB';
import { meditationImgDB } from '../Data/ImageDB';
import { meditationReligionDB, meditationTypeDB } from '../Data/TypeDB';
import { screenWidth, screenHeight } from '../components/Dimensions';

export default function ExpertResult({ navigation, route }) {
  const { data } = route.params;

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

  const getOtherPracticesFromSameReligion = () => {
    const religion = getMeditationReligion(data.title);
    const practices = Object.keys(meditationReligionDB);
  
    if (practices && practices.length > 0) {
      const otherPractices = practices
        .filter((practice) => meditationReligionDB[practice] === religion && practice !== data.title);
      
      const rows = chunkArray(otherPractices, 2);
  
      return rows.map((row, index) => (
        <View key={index} style={inStyles.practiceRow}>
          {row.map((practice) => (
            <View key={practice} style={inStyles.practiceCard}>
              <ImageCard
                title={practice}
                type={getMeditationType(practice)}
                titleSize={RFPercentage(1.6)}
                typeSize={RFPercentage(1.2)}
                image={meditationImgDB[practice]}
                onPress={() => { goToGuide(practice, meditationImgDB[practice], Object.keys(timeDB2).includes(practice)) }}
              />
            </View>
          ))}
        </View>
      ));
    }
  
    return null;
  };
  
  const getOtherPracticesFromSameType = () => {
    const meditationType = getMeditationType(data.title);
    const practices = Object.keys(meditationTypeDB);
  
    if (practices && practices.length > 0) {
      const otherPractices = practices
        .filter((practice) => {
          const practiceType = getMeditationType(practice);
          const practiceTypes = practiceType.split(',').map((type) => type.trim());
          return (
            practice !== data.title &&
            (practiceTypes.includes(meditationType) ||
              (meditationType.includes(',') &&
                meditationType.split(',').some((type) => practiceTypes.includes(type.trim()))))
          );
        });
      
      const rows = chunkArray(otherPractices, 2);
  
      return rows.map((row, index) => (
        <View key={index} style={inStyles.practiceRow}>
          {row.map((practice) => (
            <View key={practice} style={inStyles.practiceCard}>
              <ImageCard
                title={practice}
                type={getMeditationType(practice)}
                titleSize={RFPercentage(1.6)}
                typeSize={RFPercentage(1.2)}
                image={meditationImgDB[practice]}
                onPress={() => { goToGuide(practice, meditationImgDB[practice], Object.keys(timeDB2).includes(practice)) }}
              />
            </View>
          ))}
        </View>
      ));
    }
  
    return null;
  };
  
  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };
  
  return (
    <SafeAreaView style={styles.screenCenter}>
      <ScrollView showsVerticalScrollIndicator={false} style={[{ marginBottom: 15 }]}>
        <View style={[{ marginTop: 15 }]}>
          <View style={styles.medContainer}>
            <TouchableOpacity onPress={() => { goToGuide(data.title, data.guideImg, data.bia) }}> 
              <View>
                <ImageBackground style={inStyles.mainItem} 
                  imageStyle={{ borderRadius: 15 }} 
                  source={data.guideImg}>
                  <View style={inStyles.mainContent}>
                    <Text style={[styles.colorWhite, styles.bold, { fontSize: RFPercentage(3) }]}>{data.title}</Text>
                    <Text style={[styles.colorWhite, { fontSize: RFPercentage(2.2) }]}>{getMeditationType(data.title)}</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={styles.religionContainer}>
            <View style={styles.religionContent}>
              <Text style={[styles.colorPrimary, { fontSize: RFPercentage(2.5), fontWeight: 'bold', marginBottom: 15, textAlign: 'center' }]}>Other Practices under {getMeditationReligion(data.title)}</Text>
            </View>
          </View>
        </View>

        <View>
          {getOtherPracticesFromSameReligion()}
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={styles.religionContainer}>
            <View style={styles.religionContent}>
              <Text style={[styles.colorPrimary, { fontSize: RFPercentage(2.5), fontWeight: 'bold', marginBottom: 15, textAlign: 'center' }]}>{'Other Practices under '}{getMeditationType(data.title)}</Text>
            </View>
          </View>
        </View>

        <View>
          {getOtherPracticesFromSameType()}
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
    height: screenHeight('40%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainContent: {
    position: 'absolute',
    left: 15,
    bottom: 15,
  },
});