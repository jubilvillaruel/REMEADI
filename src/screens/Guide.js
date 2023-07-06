import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { screenWidth, screenHeight } from '../components/dimensions';
import { PrimaryButton } from '../components/buttons';

import { meditationDescDB } from '../Data/LocalDB';

import { styles } from '../../assets/css/Style';

import christianity_1 from '../../assets/images/christianity/christianity_1.png';
import { TextCard, IconCard } from '../components/cards';
import locked from '../../assets/images/locked.png';
import { ScrollView } from 'react-native-web';

export const MedGuide1 = ({ title, desc, guideImg }) => {
  const goToSession = () => {
    navigation.navigate('Session',{sessionTitle:title})
  }
  return (
    <SafeAreaView style={styles.screen}>
      <View style={inStyles.imgContainer}>
        <Image style={inStyles.img} source={guideImg}></Image>
      </View>

      <View style={inStyles.textContainer}>
        <Text style={[styles.colorPrimary, inStyles.title]}>{title}</Text>
        <Text style={inStyles.content}>{desc}</Text>
      </View>

      <View style={inStyles.btnContainer}>
        <PrimaryButton
          text='Start'
          textColor='#FFFFFF'
          width={screenWidth('90%')}
          height={screenHeight('5%')}
          borderRad={20}
          onPress={goToSession(title)}>
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
};

export const MedGuide2 = ({ title, desc, guideImg }) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={inStyles.imgContainer}>
        <Image style={inStyles.img} source={guideImg}></Image>
      </View>

      <View style={inStyles.textContainer}>
        <Text style={[styles.colorPrimary, inStyles.title]}>{title}</Text>
        <Text style={inStyles.content}>{desc}</Text>
      </View>

      {/* <View style={styles.dividerContainer}>
        <View style={styles.dividerLine}/>
        <Text style={styles.dividerText}>Guides</Text>
        <View style={styles.dividerLine}/>
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false} style={inStyles.cardContainer}>
        <TextCard title='Milestone Title' desc='Description'></TextCard>
        <IconCard title='Milestone Title' desc='Description' icon={locked}></IconCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default function Guide({navigation, route}) {
  const { data }= route.params
  console.log("title: "+data.title)
  console.log("image: "+data.guideImg)
  console.log("desc: "+meditationDescDB[data.title])
  const desc = meditationDescDB[data.title]
  
  return (
    <MedGuide2
      title={data.title}
      desc={desc}
      guideImg={data.guideImg}
    </MedGuide2>
  );
}

const inStyles = StyleSheet.create({
  imgContainer: {
    width: screenWidth('100%'),
    height: screenHeight('50%'),
  },

  img : {
    resizeMode: 'cover',
    ...StyleSheet.absoluteFillObject, 
  },

  textContainer: {
    height: screenHeight('30%'),
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
  },

  content: {
    fontSize: 18,
    color: '#8C8C8C',
    textAlign: 'justify',
    paddingHorizontal: 15,
  },

  btnContainer: {
    bottom: 0,
    position: 'absolute',
    padding: 15,
    height: screenHeight('20%'),
  },

  cardContainer: {
    padding: 15,
    width: screenWidth('90%'),
    height: screenHeight('20%'),
  },
});