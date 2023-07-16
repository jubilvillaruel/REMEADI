import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import { styles } from '../../assets/css/Style';
import { ImageCard } from '../components/cards';
import { screenWidth } from '../components/dimensions';
import { RFPercentage } from 'react-native-responsive-fontsize';

// Religion logos
import christianity_logo from '../../assets/images/religion/christianity_logo.png';
import islam_logo from '../../assets/images/religion/islam_logo.png';
import hinduism_logo from '../../assets/images/religion/hinduism_logo.png';
import buddhism_logo from '../../assets/images/religion/buddhism_logo.png';
import judaism_logo from '../../assets/images/religion/judaism_logo.png';

// Christianity
import christianity_1 from '../../assets/images/christianity/christianity_1.png';
import christianity_2 from '../../assets/images/christianity/christianity_2.png';
import christianity_3 from '../../assets/images/christianity/christianity_3.png';
import christianity_4 from '../../assets/images/christianity/christianity_4.png';

// Islam
import islam_1 from '../../assets/images/islam/islam_1.png';
import islam_2 from '../../assets/images/islam/islam_2.png';
import islam_3 from '../../assets/images/islam/islam_3.png';
import islam_4 from '../../assets/images/islam/islam_4.png';

// Hinduism
import hinduism_1 from '../../assets/images/hinduism/hinduism_1.png';
import hinduism_2 from '../../assets/images/hinduism/hinduism_2.png';
import hinduism_3 from '../../assets/images/hinduism/hinduism_3.png';

// Buddhism
import buddhism_1 from '../../assets/images/buddhism/buddhism_1.png';
import buddhism_2 from '../../assets/images/buddhism/buddhism_2.png';
import buddhism_3 from '../../assets/images/buddhism/buddhism_3.png';
import buddhism_4 from '../../assets/images/buddhism/buddhism_4.png';
import buddhism_5 from '../../assets/images/buddhism/buddhism_5.png';

// Judaism
import judaism_1 from '../../assets/images/judaism/judaism_1.png';
import judaism_2 from '../../assets/images/judaism/judaism_2.png';
import judaism_3 from '../../assets/images/judaism/judaism_3.png';

export default function MedLibrary( {navigation}) {
  const goToGuide = (title, guideImg, bia) => {
    const data = {
      title: title, 
      guideImg: guideImg,
      bia: bia
    };
    navigation.navigate('Guide', {data});
  };

  return (
    <SafeAreaView style={styles.screenCenter}>
      <ScrollView showsVerticalScrollIndicator={false} style={[{ marginBottom: 15 }]}>
        <View style={[{ marginTop: 10 }]}>
          <View style={inStyles.religionContainer}>
            <View style={inStyles.religionContent}>
              <Image style={[{ width: 23, height: 32 }]} source={christianity_logo}/>
              <Text style={[styles.colorPrimary, { fontSize: RFPercentage(3), fontWeight: 'bold', marginHorizontal: 10 }]}>Christianity</Text>
            </View>
          </View>

          <View style={inStyles.medContainer}>
            <ImageCard title='Lectio Divina' type='Spiritual' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={christianity_1} onPress={() => {
              goToGuide('Lectio Divina',christianity_1)
            }}></ImageCard>
            <ImageCard title='Christian Meditation' type='Mantra' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={christianity_2} onPress={() => {goToGuide('Christian Meditation',christianity_2)}}></ImageCard>
          </View>

          <View style={inStyles.medContainer}>
            <ImageCard title='Examen' type='Mindfulness, Visualization' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={christianity_3} onPress={() => {goToGuide('Examen',christianity_3)}}></ImageCard>
            <ImageCard title='Rosary' type='Focused, Loving-kindness' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={christianity_4} onPress={() => {goToGuide('Rosary',christianity_4)}}></ImageCard>
          </View>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={inStyles.religionContainer}>
            <View style={inStyles.religionContent}>
              <Image style={[{ width: 33, height: 36 }]} source={islam_logo}/>
              <Text style={[styles.colorPrimary, { fontSize: RFPercentage(3), fontWeight: 'bold', marginHorizontal: 10 }]}>Islam</Text>
            </View>
          </View>

          <View style={inStyles.medContainer}>
            <ImageCard title='Taffakur' type='Mindfulness, Spiritual' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={islam_1} onPress={() => {goToGuide('Taffakur',islam_1,false)}}></ImageCard>
            <ImageCard title='Dhikr' type='Mantra' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={islam_2} onPress={() => {goToGuide('Dhikr',islam_2,true)}}></ImageCard>
          </View>

          <View style={inStyles.medContainer}>
            <ImageCard title='Muraqaba' type='Focused' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={islam_3} onPress={() => {goToGuide('Muraqaba',islam_3,true)}}></ImageCard>
            <ImageCard title='Sufi Breathing' type='Visualization' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={islam_4} onPress={() => {goToGuide('Sufi Breathing',islam_4)}}></ImageCard>
          </View>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={inStyles.religionContainer}>
            <View style={inStyles.religionContent}>
              <Image style={[{ width: 35, height: 36 }]} source={hinduism_logo}/>
              <Text style={[styles.colorPrimary, { fontSize: RFPercentage(3), fontWeight: 'bold', marginHorizontal: 10 }]}>Hinduism</Text>
            </View>
          </View>

          <View style={inStyles.medContainer}>
            <ImageCard title='Hatha Yoga' type='Movement, Mindfulness, Spiritual' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.1)} image={hinduism_1} onPress={() => {goToGuide('Hatha Yoga',hinduism_1)}}></ImageCard>
            <ImageCard title='Kriya Yoga' type='Focused' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={hinduism_2} onPress={() => {goToGuide('Kriya Yoga',hinduism_2)}}></ImageCard>
          </View>

          <View style={{ marginTop: 5, paddingHorizontal: 13.5, width: screenWidth('90%') }}>
            <ImageCard title='Chakra' type='Visualization' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={hinduism_3} onPress={() => {goToGuide('Chakra',hinduism_3)}}></ImageCard>
          </View>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={inStyles.religionContainer}>
            <View style={inStyles.religionContent}>
              <Image style={[{ width: 36, height: 36 }]} source={buddhism_logo}/>
              <Text style={[styles.colorPrimary, { fontSize: RFPercentage(3), fontWeight: 'bold', marginHorizontal: 10 }]}>Buddhism</Text>
            </View>
          </View>

          <View style={inStyles.medContainer}>
            <ImageCard title='Breath' type='Focused' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={buddhism_1} onPress={() => {goToGuide('Breath',buddhism_1,true)}}></ImageCard>
            <ImageCard title='Walk' type='Movement' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={buddhism_2} onPress={() => {goToGuide('Walk',buddhism_2,true)}}></ImageCard>
          </View>

          <View style={inStyles.medContainer}>
            <ImageCard title='Tonglen' type='Loving-kindness, Visualization' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={buddhism_3} onPress={() => {goToGuide('Tonglen',buddhism_3,true)}}></ImageCard>
            <ImageCard title='Metta' type='Spiritual, Mantra' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={buddhism_4} onPress={() => {goToGuide('Metta',buddhism_4,true)}}></ImageCard>
          </View>

          <View style={{ marginTop: 5, paddingHorizontal: 13.5, width: screenWidth('90%') }}>
            <ImageCard title='Body Scan' type='Mindfulness, Relaxation' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={buddhism_5} onPress={() => {goToGuide('Body Scan',buddhism_5,true)}}></ImageCard>
          </View>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={inStyles.religionContainer}>
            <View style={inStyles.religionContent}>
              <Image style={[{ width: 32, height: 36 }]} source={judaism_logo}/>
              <Text style={[styles.colorPrimary, { fontSize: RFPercentage(3), fontWeight: 'bold', marginHorizontal: 10 }]}>Judaism</Text>
            </View>
          </View>

          <View style={inStyles.medContainer}>
            <ImageCard title='Hitbodedut' type='Spiritual' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={judaism_1} onPress={() => {goToGuide('Hitbodedut',judaism_1)}}></ImageCard>
            <ImageCard title='Kabbalistic/Chassidic' type='Visualization' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={judaism_2} onPress={() => {goToGuide('Kabbalistic/Chassidic',judaism_2,true)}}></ImageCard>
          </View>

          <View style={{ marginTop: 5, paddingHorizontal: 13.5, width: screenWidth('90%') }}>
            <ImageCard title='Shema' type='Focused' titleSize={RFPercentage(1.6)} typeSize={RFPercentage(1.2)} image={judaism_3} onPress={() => {goToGuide('Shema',judaism_3,true)}}></ImageCard>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const inStyles = StyleSheet.create({
  religionContainer: {
    paddingTop: 10,
    alignItems: 'left',
    justifyContent: 'left',
    width: screenWidth('90%'),
  },

  religionContent: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },

  medContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 5,
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth('90%'),
  },
});