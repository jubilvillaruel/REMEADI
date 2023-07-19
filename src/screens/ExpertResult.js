import { Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { ImageCard } from '../components/Cards';

import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { meditationImgDB } from '../Data/ImageDB';
import { meditationReligionDB, meditationTypeDB } from '../Data/TypeDB';
import { screenWidth, screenHeight } from '../components/dimensions';

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
                image={meditationImgDB[practice]}
                width={screenWidth('44%')}
                height={screenHeight('17%')}
                onPress={() => { goToGuide(practice, meditationImgDB[practice]) }}
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
                image={meditationImgDB[practice]}
                width={screenWidth('44%')}
                height={screenHeight('17%')}
                onPress={() => { goToGuide(practice, meditationImgDB[practice]) }}
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
            <ImageCard
              title={data.title}
              type={getMeditationType(data.title)}
              titleSize={RFPercentage(2.5)}
              typeSize={RFPercentage(2)}
              image={data.guideImg}
              width={screenWidth('90%')}
              height={screenHeight('40%')}
              onPress={() => {goToGuide(data.title, data.guideImg, data.bia)}}
            />
          </View>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={styles.religionContainer}>
            <View style={styles.religionContent}>
              <Text style={[styles.colorPrimary, { fontSize: RFPercentage(2.5), fontWeight: 'bold', marginBottom: 15 }]}>Other Practices from {getMeditationReligion(data.title)}</Text>
            </View>
          </View>
        </View>

        <View>
          {getOtherPracticesFromSameReligion()}
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={styles.religionContainer}>
            <View style={styles.religionContent}>
              <Text style={[styles.colorPrimary, { fontSize: RFPercentage(2.5), fontWeight: 'bold', marginBottom: 15 }]}>Other Practices of the same Meditation Type</Text>
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
  },

  practiceCard: {
    flex: 1,
    marginHorizontal: 2.5,
    marginBottom: 5,
  },
});