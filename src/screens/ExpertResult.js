import { Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { ImageCard } from '../components/cards';
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
      return practices
        .filter((practice) => meditationReligionDB[practice] === religion && practice !== data.title)
        .map((practice) => (
          <View key={practice} style={inStyles.practiceCard}>
            <ImageCard
              title={practice}
              image={meditationImgDB[practice]}
              width={screenWidth('30%')} // Adjust the width as needed
              height={screenHeight('15%')} // Adjust the height as needed
              onPress={() => { goToGuide(practice, meditationImgDB[practice]) }}
            />
          </View>
        ));
    }

    return null;
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
              <Text style={[styles.colorPrimary, { fontSize: RFPercentage(2.5), fontWeight: 'bold' }]}>Other Practices from {getMeditationReligion(data.title)}</Text>
            </View>
          </View>
        </View>

        <ScrollView horizontal>
          {getOtherPracticesFromSameReligion()}
        </ScrollView>

        <View style={[{ marginTop: 15 }]}>
          <View style={styles.religionContainer}>
            <View style={styles.religionContent}>
              <Text style={[styles.colorPrimary, { fontSize: RFPercentage(2.5), fontWeight: 'bold' }]}>Other Practices of the same Meditation Type</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const inStyles = StyleSheet.create({
  practiceCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});