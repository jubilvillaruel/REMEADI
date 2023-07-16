import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { screenWidth, screenHeight } from '../components/dimensions';
import { PrimaryButton } from '../components/buttons';
import { meditationDescDB } from '../Data/LocalDB';
import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const MedGuide = ({ title, desc, guideImg, onPress }) => {

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
          textSize={RFPercentage(2.2)}
          width={screenWidth('80%')}
          height={screenHeight('7%')}
          borderRad={30}
          onPress={onPress}>
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
};

export default function Guide({ navigation, route }) {
  const { data } = route.params
  const desc = meditationDescDB[data.title]

  const goToOptions = () => {
    navigation.navigate('GuideOptions');
  };

  const goToSession = () => {
    navigation.navigate('Session', {title: data.title});
  };

  const goToSession2 = (bia) => {
    navigation.navigate('Session', {title: data.title, bia: bia});
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={inStyles.imgContainer}>
        <Image style={inStyles.img} source={data.guideImg}></Image>
      </View>

      <View style={inStyles.textContainer}>
        <Text style={[styles.colorPrimary, inStyles.title]}>{data.title}</Text>
        <Text style={inStyles.content}>{desc}</Text>
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
  imgContainer: {
    width: screenWidth('100%'),
    height: screenHeight('40%'),
  },

  img : {
    resizeMode: 'cover',
    ...StyleSheet.absoluteFillObject, 
  },

  textContainer: {
    height: screenHeight('30%'),
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

  btnContainer: {
    bottom: 0,
    position: 'absolute',
    padding: 15,
    height: screenHeight('30%'),
  },
});