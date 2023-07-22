import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { screenWidth, screenHeight } from '../components/Dimensions';
import { SecondaryButton } from '../components/Buttons';
import { RFPercentage } from "react-native-responsive-fontsize";

import { styles } from './../../assets/css/Style';
import appLogo from '../../assets/images/app_logo.png';
import landingBG from '../../assets/images/landingBG.png';

LandingPage.navigationOptions = {
  headerShown: false,
};

export default function LandingPage({ navigation }) {
  const goToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ImageBackground style={inStyles.landingBGContainer} source={landingBG}>
        <View style={[styles.containerCentered, inStyles.appContainer]}>
          <Image style={[styles.app_logo, { marginTop: 100 }]} source={appLogo} />
          <Text style={[styles.colorPrimary, styles.bold, { fontSize: RFPercentage(4)}]}>REMEADI</Text>
        </View>

        <View style={[styles.containerCentered, inStyles.optionsContainer]}>
          <View style={{ marginBottom: 50, alignItems: 'center' }}>
            <Text style={[styles.colorWhite, styles.bold, { fontSize: RFPercentage(2.5) }]}>WHAT WE DO</Text>
            <Text style={[styles.colorWhite, { fontSize: RFPercentage(2) }]}>Uplifting spirituality through meditation</Text>
          </View>

          <SecondaryButton
            text='Sign In'
            textColor= '#FFFFFF'
            textSize={RFPercentage(2.2)}
            width={screenWidth('80%')}
            height={screenHeight('7%')}
            borderRad={30}
            borderW={0}
            onPress={goToSignIn}>
          </SecondaryButton>

          <TouchableOpacity style={{ paddingTop: 15 }} onPress={() => goToSignUp()}>
            <Text style={[styles.colorSecondary, styles.bold, { fontSize: RFPercentage(2) }]}>
              <Text style={[styles.colorWhite, styles.bold]}>Don't have an account? </Text>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const inStyles = StyleSheet.create({
  appContainer: {
    height: screenHeight('60%'),
    width: screenWidth('100%'),
  },

  landingBGContainer: {
    height: screenHeight('105%'),
    width: screenWidth('100%'),
  },

  optionsContainer: {
    height: screenHeight('55%'),
    width: screenWidth('100%'),
  },
});