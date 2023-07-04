import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { screenWidth, screenHeight } from '../components/dimensions';
import { PrimaryButton } from '../components/buttons';

import { meditationDescDB } from '../Data/LocalDB';

import { styles } from '../../assets/css/Style';
import { useState } from 'react';
// import christianity_1 from '../../assets/images/christianity/christianity_1.png';

export const MedGuide = ({ title, desc, guideImg }) => {
  // const [ description, setDescription ] = useState('')

  // console.log(meditationDescDB['Lectio Divina'])
  // setDescription(meditationDescDB[title])
  // console.log(description)

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
          borderRad={20}>
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
};

export default function Guide({navigation, route}) {
  const { data }= route.params
  console.log("title: "+data.title)
  // console.log("description: "+data.desc)
  console.log("image: "+data.guideImg)

  console.log(meditationDescDB[data.title])
  const desc = meditationDescDB[data.title]

  return (
    <MedGuide
      title={data.title}
      desc={desc}
      guideImg={data.guideImg}
    > 
    </MedGuide>
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
  }
});