import React from 'react';

import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
// import { useEffect } from 'react'

import { styles } from './../../assets/css/Style';
import appLogo from '../../assets/images/app_logo.png';
import { auth } from '../../firebase';
// import { auth, db } from '../../firebase';
// import { doc, getDoc } from "../../firebase/compat/firestore";


LandingPage.navigationOptions = {
  headerShown: false,
};

export default function LandingPage({ navigation }) {
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user && user.emailVerified) {
  //       // User is signed in and email is verified, redirect to Home Screen
  //       navigation.navigate('HomeScreen');
  //     }
  //   });

  //   // Clean up the subscription
  //   return unsubscribe;
  // }, []);
  
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //         console.log((user.email) + " user is currently signed in")
  //         navigation.navigate('HomeScreen', {
  //           screen: 'Home',
  //           params: { user: user }
  //         });
  //     } else {
  //       console.log("User not logged into app");
  //     }
  //   })
  //   return unsubscribe
  // }, [])

  const goToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.screenCenter}>
      <View style={[inStyles.container, { paddingBottom: 300 }]}>
        <Image style={styles.app_logo} source={appLogo} />
        <Text style={[styles.colorPrimary, { fontSize: 40, fontWeight: 'bold' }]}>REMEADI</Text>
      </View>

      <View style={[inStyles.wavyContainer, styles.bgColorPrimary]}>
        <View style={inStyles.container}>
          <Text style={[styles.colorWhite, { fontWeight: "bold", fontSize: 20 }]}>WHAT WE DO</Text>
          <Text style={styles.colorWhite}>Uplifting spirituality through meditation</Text>
        </View>

        <View style={[inStyles.container, { padding: 30 }]}>
          <TouchableOpacity style={[inStyles.btnSignUp, styles.bgColorSecondary, styles.dropShadow]} onPress={() => goToSignIn()}>
            <Text style={[styles.colorWhite, { fontWeight: "bold" }]}>Sign In</Text>
          </TouchableOpacity>

          <Text style={[styles.colorWhite, { fontWeight: "bold", paddingTop: 10 }]}>{"Don't have an account? "}
            <TouchableOpacity onPress={() => goToSignUp()}>
              <Text style={styles.colorSecondary}>Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const inStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  bottomItems: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  btnSignUp: {
    marginTop: 15,
    width: 280,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },
  wavyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
  },
});