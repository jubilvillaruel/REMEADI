import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { screenWidth, screenHeight } from '../components/Dimensions';
import { PrimaryButton } from '../components/Buttons';
import { meditationDescDB } from '../Data/LocalDB';
import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default function Guide({ navigation, route }) {
  const { data } = route.params
  const desc = meditationDescDB[data.title]

  const goToSession = () => {
    navigation.navigate('Session', {title: data.title, img: data.guideImg});
  };

  const goToSession2 = (bia) => {
    navigation.navigate('Session', {title: data.title, img: data.guideImg, bia: bia});
  };

  return (
    <SafeAreaView style={inStyles.screen}>
      <Image style={inStyles.imgGuide} source={data.guideImg}></Image>

      <View style={inStyles.textContainer}>
        <Text style={[inStyles.colorPrimary, inStyles.title, {textAlign:'center'}]}>{data.title}</Text>
        <Text style={[inStyles.content, {textAlign:'center'}]}>{desc}</Text>
      </View>

      {(data.bia) ?
        <View style={inStyles.btnContainer}>
          <PrimaryButton
            text='Beginner'
            textColor='#FFFFFF'
            textSize={RFPercentage(2.2)}
            width={screenWidth('80%')}
            height={screenHeight('7%')}
            borderRad={30}
            onPress={() => goToSession2(0)}>
          </PrimaryButton>
          <PrimaryButton
            text='Intermediate'
            textColor='#FFFFFF'
            textSize={RFPercentage(2.2)}
            width={screenWidth('80%')}
            height={screenHeight('7%')}
            borderRad={30}
            onPress={() => goToSession2(1)}>
          </PrimaryButton>
          <PrimaryButton
            text='Advanced'
            textColor='#FFFFFF'
            textSize={RFPercentage(2.2)}
            width={screenWidth('80%')}
            height={screenHeight('7%')}
            borderRad={30}
            onPress={() => goToSession2(2)}>
          </PrimaryButton>
        </View>
      : <View style={inStyles.btnContainer}>
        <PrimaryButton
          text='Start'
          textColor='#FFFFFF'
          textSize={RFPercentage(2.2)}
          width={screenWidth('80%')}
          height={screenHeight('7%')}
          borderRad={30}
          onPress={goToSession}>
        </PrimaryButton>
      </View>}
    </SafeAreaView>
  );
}

const inStyles = StyleSheet.create({
  screen: {
    top: 0,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  imgGuide : {
    resizeMode: 'cover',
    // ...StyleSheet.absoluteFillObject, 
    width: screenWidth('100%'),
    height: screenHeight('40%'),
  },

  textContainer: {
    width: screenWidth('80%'),
    height: screenHeight('20%'),
    paddingBottom: 15,
  },

  btnContainer: {
    // justifyContent: 'center',
    padding: 15,
    height: screenHeight('40%'),
  },

  img : {
    resizeMode: 'cover',
    ...StyleSheet.absoluteFillObject, 
  },

  title: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    padding: 15,
  },

  content: {
    fontSize: RFPercentage(2),
    color: '#8C8C8C',
    textAlign: 'justify',
    paddingHorizontal: 15,
  },

  colorPrimary: {
    color: '#2EC4B6'
  }
});