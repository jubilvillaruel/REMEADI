import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import { screenWidth, screenHeight } from '../components/Dimensions';
import { PrimaryButton } from '../components/Buttons';
import { meditationDescDB } from '../Data/LocalDB';
import { meditationTypeDB } from '../Data/TypeDB';
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
    <SafeAreaView style={styles.screen}>
      <Image style={inStyles.imgGuide} source={data.guideImg}></Image>
      {(data.title === 'Kriya Yoga') ? (
        <View style={inStyles.contentContainer}>
          <View style={inStyles.textContainer}>
            <Text style={[styles.colorPrimary, inStyles.title]}>{data.title}</Text>
            <Text style={[styles.colorSecondary, inStyles.subTitle]}>{meditationTypeDB[data.title]}</Text>
            <Text style={inStyles.content}>{desc}</Text>
          </View>
          <View style={styles.dividerContainer}>
              <View style={styles.dividerLine}/>
              <Text style={[styles.dividerText, { fontSize: RFPercentage(2) }]}>Guides</Text>
              <View style={styles.dividerLine}/>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={inStyles.btnContainer}>
            <PrimaryButton
              text='Level 1'
              textColor='#FFFFFF'
              textSize={RFPercentage(2.2)}
              width={screenWidth('80%')}
              height={screenHeight('7%')}
              borderRad={30}
              onPress={() => goToSession2(0)}>
            </PrimaryButton>
            <PrimaryButton
              text='Level 2'
              textColor='#FFFFFF'
              textSize={RFPercentage(2.2)}
              width={screenWidth('80%')}
              height={screenHeight('7%')}
              borderRad={30}
              onPress={() => goToSession2(1)}>
            </PrimaryButton>
            <PrimaryButton
              text='Level 3'
              textColor='#FFFFFF'
              textSize={RFPercentage(2.2)}
              width={screenWidth('80%')}
              height={screenHeight('7%')}
              borderRad={30}
              onPress={() => goToSession2(2)}>
            </PrimaryButton>
            <PrimaryButton
              text='Level 4'
              textColor='#FFFFFF'
              textSize={RFPercentage(2.2)}
              width={screenWidth('80%')}
              height={screenHeight('7%')}
              borderRad={30}
              onPress={() => goToSession2(3)}>
            </PrimaryButton>
            <PrimaryButton
              text='Level 5'
              textColor='#FFFFFF'
              textSize={RFPercentage(2.2)}
              width={screenWidth('80%')}
              height={screenHeight('7%')}
              borderRad={30}
              onPress={() => goToSession2(4)}>
            </PrimaryButton>
            <PrimaryButton
              text='Level 6'
              textColor='#FFFFFF'
              textSize={RFPercentage(2.2)}
              width={screenWidth('80%')}
              height={screenHeight('7%')}
              borderRad={30}
              onPress={() => goToSession2(5)}>
            </PrimaryButton>
          </ScrollView>
        </View>
      ) : (
        (data.bia) ?
          <View style={inStyles.contentContainer}>
            <View style={inStyles.textContainer}>
              <Text style={[styles.colorPrimary, inStyles.title]}>{data.title}</Text>
              <Text style={[styles.colorSecondary, inStyles.subTitle]}>{meditationTypeDB[data.title]}</Text>
              <Text style={inStyles.content}>{desc}</Text>
            </View>
            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine}/>
                <Text style={[styles.dividerText, { fontSize: RFPercentage(2) }]}>Guides</Text>
                <View style={styles.dividerLine}/>
            </View>
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
          </View>
        : <View style={inStyles.contentContainer}>
            <View style={inStyles.textContainer}>
              <Text style={[styles.colorPrimary, inStyles.title]}>{data.title}</Text>
              <Text style={[styles.colorSecondary, inStyles.subTitle]}>{meditationTypeDB[data.title]}</Text>
              <Text style={inStyles.content}>{desc}</Text>
            </View>
            <View style={[inStyles.btnContainer, { bottom: -180 }]}>
              <PrimaryButton
                text='Start'
                textColor='#FFFFFF'
                textSize={RFPercentage(2.2)}
                width={screenWidth('80%')}
                height={screenHeight('7%')}
                borderRad={30}
                onPress={goToSession}>
              </PrimaryButton>
            </View>
          </View>
        )}
    </SafeAreaView>
  );
}

const inStyles = StyleSheet.create({
  imgGuide : {
    resizeMode: 'cover',
    width: screenWidth('100%'),
    height: screenHeight('40%'),
  },

  contentContainer:{
    width: screenWidth('100%'),
    height: screenHeight('60%'),
    alignItems: 'center',
    marginTop: 15,
  },

  textContainer: {
    width: screenWidth('100%'),
    height: screenHeight('25%'),
    padding: 15,
    justifyContent: 'center',
  },

  title: {
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold',
    paddingTop: 15,
    paddingHorizontal: 15,
    textAlign: 'left',
  },

  subTitle: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    paddingBottom: 15,
    paddingHorizontal: 15,
    textAlign: 'left',
  },
  
  content: {
    fontSize: RFPercentage(2),
    color: '#8C8C8C',
    paddingBottom: 15,
    paddingHorizontal: 15,
    textAlign: 'justify',
  },

  btnContainer: {
    margin: 15,
    height: screenHeight('25%'),
  },
});