import { Text, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Animated, Easing, Image } from 'react-native';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';

import next_w from '../../assets/images/right_w.png'

import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { meditationReligionDB, meditationTypeDB } from '../Data/TypeDB';
import { screenWidth, screenHeight } from '../components/Dimensions';
import React, { useEffect, useRef, useState } from 'react';
import { FeatureCardWide } from '../components/Cards';
import next from '../../assets/images/right.png'


export default function ExpertResult({ navigation, route }) {
  // const [scrolledToBottom, setScrolledToBottom] = useState(false);

  // const [scrollPosition, setScrollPosition] = useState(0);
  
  const scrollViewRef = useRef(null);

  // const scrollSpeed = -100; // Adjust the speed as needed

  // useEffect(() => {
  //   if (scrollPosition < 1) {
  //     // Scroll incrementally
  //     const scrollInterval = setInterval(() => {
  //       if (scrollViewRef.current) {
  //         setScrollPosition(scrollPosition + scrollSpeed);
  //         scrollViewRef.current.scrollTo({ y: scrollPosition });
  //       }
  //     }, 16); // 60 frames per second

  //     // Stop scrolling after reaching the bottom
  //     return () => clearInterval(scrollInterval);
  //   }
  // }, [scrollPosition]);


  // useEffect(() => {
  //   if (!scrolledToBottom) {
  //     setTimeout(() => {
  //       // Scroll to the bottom of the screen
  //       scrollViewRef.current.scrollToEnd({});
  //       setScrolledToBottom(true);
  //     }, 3000); // 3 seconds
  //   }
  // }, [scrolledToBottom]);



  // useEffect(() => {
  //   scrollPosition.current.setValue(0);
  //   Animated.timing(scrollPosition, {
  //     toValue: 0,
  //     duration: 2000,
  //     decelerationRate: 0.997,
  //   }).start();
  // }, []);

  


  // const scrollViewRef = useRef();

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
    <SafeAreaView  style={styles.screenCenter} >
      <ScrollView ref={scrollViewRef} style={{ marginBottom: 15 }}>
        <View style={[inStyles.messageContainer,{}]}>
          <Text style={[{color: 'black', fontWeight:'300', marginBottom:10 , fontSize: RFPercentage(5), textAlign: 'center' }]}>
            You are Ready to Meditate 
          </Text>

          <Text style={[{color: 'black', fontWeight:'300', marginTop:20 , fontSize: RFPercentage(2.5), textAlign: 'center' }]}>
            Your responses have led us to recommend {data.title}, a meditation practice that complements your preferences and objectives
          </Text>
          
          {/* <View style={[styles.medContainer, { height: screenHeight('60%'), borderWidth:1 }]}> */}
            {/* scroll here */}
            <TouchableOpacity onPress={() => { goToGuide(data.title, data.guideImg, data.bia) }} style={{marginTop:20}}> 
              <View>
                <ImageBackground style={inStyles.mainItem} 
                  imageStyle={{ borderRadius: 15 }} 
                  source={data.guideImg}>

                    <View style={{flexDirection:'row', width:screenWidth('80%'), position:'absolute', alignItems: 'center', justifyContent: 'flex-end', bottom:10}}>

                      <View style={inStyles.mainContent}>
                        <Text style={[styles.colorWhite, styles.bold, { fontSize: RFPercentage(3) }]}>{data.title}</Text>
                        <Text style={[styles.colorWhite, { fontSize: RFPercentage(1.8) }]}>{getMeditationType(data.title)}</Text>
                      </View>

                      <View style={[ inStyles.buttonContainer, { borderRadius:30, backgroundColor:'#2EC4B6'}]}>
                        <TouchableOpacity style={[]} onPress={() => {goToGuide(data.title, data.guideImg, data.bia)}}>
                            <Image style={[{ width: 25, height: 25 }]} source={next_w}/>
                        </TouchableOpacity>
                      </View>

                    </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          {/* </View> */}

        </View>

        {/* <View style={[styles.dividerLine,{marginVertical:20, width:screenWidth('80%'), alignSelf:'center'}]}/> */}

        <Text style={[{color: 'black', fontWeight:'300', marginBottom:0 , fontSize: RFPercentage(3.5), textAlign: 'center' }]}>
          Other Related Practices
        </Text>

        <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-between'}}>

          <SecondaryButton
            text={getMeditationReligion(data.title)}
            textColor= '#FFFFFF'
            textSize={RFPercentage(2.2)}
            width={screenWidth('43%')}
            height={screenHeight('7%')}
            borderRad={30}
            borderW={0}
            onPress={goToExpertReligion}>
          </SecondaryButton>
          
          <SecondaryButton
            text='Practice Types'
            textColor= '#FFFFFF'
            textSize={RFPercentage(2.2)}
            width={screenWidth('43%')}
            height={screenHeight('7%')}
            borderRad={30}
            borderW={0}
            onPress={goToExpertType}>
          </SecondaryButton>
          
          {/* <TouchableOpacity style={[styles.bgColorPrimary, inStyles.otherRecom]} onPress={goToExpertReligion}
          > */}
            {/* <Text style={[styles.bold, inStyles.otherRecomTitle]}>{"More from "+ getMeditationReligion(data.title)}</Text> */}
            {/* <Text style={[ {textAlign:'center', fontSize: RFPercentage(2), color:'#5c5c5c', fontWeight:'300'}]}> */}
              {/* {"Embark on an Enlightening Journey of the Discovery of the Same Religion"} */}
            {/* </Text> */}
            {/* <Image style={[{marginVertical:10, width: 25, height: 25 }]} source={next}/> */}
          {/* </TouchableOpacity> */}

          {/* <TouchableOpacity style={[styles.bgColorPrimary, inStyles.otherRecom]} onPress={goToExpertReligion}
          > */}
            {/* <Text style={[styles.bold, inStyles.otherRecomTitle]}>{"More from The Same Type"}</Text> */}
            {/* <Text style={[ {textAlign:'center', fontSize: RFPercentage(2), color:'#5c5c5c', fontWeight:'300'}]}> */}
              {/* {"Explore a Selection of Meditations Sharing the Same Meditative Type"} */}
            {/* </Text> */}
            {/* <Image style={[{marginVertical:10, width: 25, height: 25 }]} source={next}/> */}
          {/* </TouchableOpacity> */}

          {/* <TouchableOpacity style={[styles.bgColorPrimary, {width:screenWidth('40%'), 
            backgroundColor:'#e3fffc', borderRadius: 40, marginVertical: 5, padding: 20, 
            alignItems:'center' }]} onPress={goToExpertReligion}
          >
            <Text style={[styles.bold, {textAlign:'center', fontSize: RFPercentage(3), marginBottom:10, color:'#5c5c5c', fontWeight:'400', marginTop:15 }]}>{"More from "+ getMeditationReligion(data.title)}</Text>
            <Text style={[ {textAlign:'center', fontSize: RFPercentage(2), color:'#5c5c5c', fontWeight:'300'}]}>{"Embark on an Enlightening Journey of Discovery to Explore an Array of Meditation Practices, Unveiling the Profound Wisdom of "+getMeditationReligion(data.title)+" and Beyond"}</Text>
          </TouchableOpacity> */}

          {/* <FeatureCardWide
              title = {"More from "+ getMeditationReligion(data.title)}
              desc = {"Embark on an Enlightening Journey of Discovery to Explore an Array of Meditation Practices, Unveiling the Profound Wisdom of "+getMeditationReligion(data.title)+" and Beyond"}
              onPress={}
              width={'40'}
              // height={''}
              pad={20}
              // style={{width:screenWidth("30%"),alignItems: 'center', justifyContent: 'center'}}
          /> */}

          {/* <FeatureCardWide
              title = {"More from "+ getMeditationType(data.title)}
              desc = {"Explore a Selection of Meditations Sharing the Same Meditative Type for an Enriching Spiritual Experience."}
              onPress={goToExpertReligion}
              width={'40'}
          /> */}
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
    height: screenHeight('30%'),
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
    height: screenHeight('70%'),
  },

  buttonContainer: {
    padding: 15,
  },

  otherRecom: {
    width:('45%'), 
    // height:screenHeight('14%'),
    backgroundColor:'#fff7d4', 
    borderRadius: 40, 
    // padding: 10, 
    alignItems:'center', 
    // marginVertical: 10, 
    // marginHorizontal:5
  },

  otherRecomTitle: {
    textAlign:'center', 
    fontSize: RFPercentage(2), 
    marginBottom:10, 
    color:'#5c5c5c', 
    fontWeight:'400', 
    marginTop:15 
  }
});