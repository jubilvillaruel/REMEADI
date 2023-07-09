import { StyleSheet, Text, SafeAreaView, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect }  from 'react'
import { screenWidth, screenHeight } from '../components/dimensions';
import { RFPercentage } from "react-native-responsive-fontsize";
import { IconButton, PrimaryButton } from '../components/buttons';

import { styles } from '../../assets/css/Style';
import appLogo from '../../assets/images/app_logo.png';
import showPass from '../../assets/images/closed_eye.png';
import hidePass from '../../assets/images/open_eye.png';
import googleLogo from './../../assets/images/google_logo.png';
import facebookLogo from './../../assets/images/facebook_logo.png';
import { auth } from '../../firebase';

export default function SignIn({ navigation, route }) {
    const { setUserToken } = route.params;
    const [getUsername, setUsername] = useState("")
    const [getPassword, setPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            console.log('uid: '+ user.uid)
            setUserToken(user.uid)
            // navigation.navigate('HomeScreen', {
            //   screen: 'Home',
            //   params: { user: user }
            // });          
          }
      })
      return unsubscribe
    }, [])
    
    const handleSignIn = () => {
      console.log("sign in pressed")
      auth
        .signInWithEmailAndPassword(getUsername, getPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.email + "You are logged in successfully")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    };
  
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const goToHome = () => {
      navigation.navigate('HomeScreen');
    };

    const handleForgotPassword = () => {
      // alert("Please enter your email address to reset password");
      navigation.navigate('ForgotPassword')
    }
  
    return (
      <SafeAreaView style={styles.screen}>
        <View style={[styles.containerCentered, inStyles.appContainer]}>
          <Image style={styles.app_logo} source={appLogo}/>
          <Text style={[styles.colorPrimary, styles.bold, { fontSize: RFPercentage(4)}]}>REMEADI</Text>
        </View>

        <View style={inStyles.bodyContainer}>
          <View style={styles.containerCentered}>
            <TextInput style={styles.inputContainer} placeholder="Email" selectionColor="transparent" onChangeText={text => setUsername(text)}/>
            <View style={styles.passwordInputContainer}>
              <TextInput style={styles.passwordInput} placeholder="Password" secureTextEntry={!passwordVisible} selectionColor="transparent" onChangeText={text => setPassword(text)}/>
              <TouchableOpacity style={styles.passwordVisibilityButton} onPress={togglePasswordVisibility}>
                {passwordVisible ? (
                  <Image style={[{ width: 19, height: 14 }]} source={hidePass}/>
                ) : (
                  <Image style={[{ width: 19, height: 18 }]} source={showPass}/>
                )}
              </TouchableOpacity>
            </View>

            <PrimaryButton
              text='Sign In'
              textColor= '#FFFFFF'
              textSize={RFPercentage(2.2)}
              width={screenWidth('80%')}
              height={screenHeight('7%')}
              borderRad={30}
              borderW={0}
              onPress={() => handleSignIn()}>
            </PrimaryButton>

            <Text style={[styles.bold, inStyles.forgotPassword]}>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={{ fontSize: RFPercentage(2) }}>Forgot Password?</Text>
              </TouchableOpacity>
            </Text>

            <View style={inStyles.dividerContainer}>
              <View style={inStyles.dividerLine}/>
              <Text style={[inStyles.dividerText, { fontSize: RFPercentage(2) }]}>or</Text>
              <View style={inStyles.dividerLine}/>
            </View>

            <IconButton
              text='Continue with Google'
              textColor='#000000'
              textSize={RFPercentage(2.2)}
              width={screenWidth('80%')}
              height={screenHeight('7%')}
              borderRad={30}
              icon={googleLogo}
              borderC='#000000'
              borderW={2}>
            </IconButton>

            <IconButton
              text='Continue with Facebook'
              textColor='#FFFFFF'
              bgColor='#1877F2'
              textSize={RFPercentage(2.2)}
              width={screenWidth('80%')}
              height={screenHeight('7%')}
              borderRad={30}
              icon={facebookLogo}>
            </IconButton>

          </View>
        </View>
      </SafeAreaView>
    );
  }

  const inStyles = StyleSheet.create({
    appContainer: {
      height: screenHeight('35%'),
      width: screenWidth('100%'),
    },

    bodyContainer: {
      height: screenHeight('40%'),
      width: screenWidth('100%'),
    },

    forgotPassword: {
      marginTop: 15,
      textAlign: 'center',
    },

    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },

    dividerLine: {
      flex: 1,
      height: 2,
      backgroundColor: '#FF9F1C',
      zIndex: 1,
    },
    
    dividerText: {
      paddingHorizontal: 10,
      fontSize: RFPercentage(2),
      fontWeight: 'bold',
      color: '#000',
    },
  });