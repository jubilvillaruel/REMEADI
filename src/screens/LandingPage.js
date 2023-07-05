import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { screenWidth, screenHeight } from '../components/dimensions';
import { SecondaryButton } from '../components/buttons';
import { RFPercentage } from "react-native-responsive-fontsize";

import { styles } from './../../assets/css/Style';
import appLogo from '../../assets/images/app_logo.png';
import { auth } from '../../firebase';

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
      <View style={[styles.containerCentered, inStyles.appContainer]}>
        <Image style={styles.app_logo} source={appLogo} />
        <Text style={[styles.colorPrimary, styles.bold, { fontSize: RFPercentage(4)}]}>REMEADI</Text>
      </View>

      <View style={[styles.containerCentered, styles.bgColorPrimary, inStyles.optionsContainer]}>

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

        <Text style={[styles.colorWhite, styles.bold, { paddingTop: 15, fontSize: RFPercentage(2) }]}>{"Don't have an account? "}
            <TouchableOpacity onPress={() => goToSignUp()}>
              <Text style={[styles.colorSecondary, { fontSize: RFPercentage(2) }]}>Sign Up</Text>
            </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const inStyles = StyleSheet.create({
  appContainer: {
    height: screenHeight('60%'),
    width: screenWidth('100%'),
  },

  optionsContainer: {
    height: screenHeight('40%'),
    width: screenWidth('100%'),
  },
});