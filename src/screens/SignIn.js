import { StyleSheet, Text, SafeAreaView, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect }  from 'react'
import { screenWidth, screenHeight } from '../components/Dimensions';
import { RFPercentage } from "react-native-responsive-fontsize";
import { IconButton, PrimaryButton } from '../components/Buttons';

import { styles } from '../../assets/css/Style';
import appLogo from '../../assets/images/app_logo.png';
import showPass from '../../assets/images/closed_eye.png';
import hidePass from '../../assets/images/open_eye.png';
import googleLogo from './../../assets/images/google_logo.png';
import facebookLogo from './../../assets/images/facebook_logo.png';
import { auth } from '../../firebase';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function SignIn({ navigation, route }) {
    const { setUserToken } = route.params;
    // const { setUserToken } = route.params?.setUserToken;

    const [getUsername, setUsername] = useState("")
    const [getPassword, setPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [user, setUser] = useState();
    const [showLoad, setShowLoad] = useState(false)
  
    useEffect(() => {
      const isUserExist = () => {
        const userExist = auth?.currentUser
        if (userExist) {
          setShowLoad(false)
          setUserToken(userExist.uid)
        }
      }
      isUserExist()
    }, [user])
    
    const handleSignIn = () => {
      console.log("sign in pressed")
      setShowLoad(true)
      auth
        .signInWithEmailAndPassword(getUsername, getPassword)
        .then((userCredential) => {
            // const user = userCredential.user;
            console.log(userCredential.user.uid)
            setUser(userCredential.user.uid)
        })
        .catch((error) => {
          setShowLoad(false)
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage.split(': ')[1].split('.')[0]);
          const errorMsg = errorMessage.split(': ')[1].split('.')[0]
          callToast('error','Error Sign In',errorMsg+'😥.')

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

    const callToast = (type, text1, text2) => {
      // call toast here
      Toast.show({
          type: type,
          text1: text1,
          text2: text2,
      });
    }
  
    return (
      <SafeAreaView style={styles.screen}>
        <ActivityIndicator style={[styles.activityIndicator, (showLoad) && {display:'flex'}]} size="large"/>  
        <View style={[styles.containerCentered, inStyles.appContainer]}>
          <Image style={styles.app_logo} source={appLogo}/>
          <Text style={[styles.colorPrimary, styles.bold, { fontSize: RFPercentage(4)}]}>REMEADI</Text>
        </View>

        <View style={inStyles.bodyContainer}>
          <View style={styles.containerCentered}>
            <TextInput keyboardType={'email-address'} style={styles.inputContainer} placeholder="Email" selectionColor="transparent" onChangeText={text => setUsername(text)}/>
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

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine}/>
              <Text style={[styles.dividerText, { fontSize: RFPercentage(2) }]}>or</Text>
              <View style={styles.dividerLine}/>
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
        
        <Toast
          position='top'
          topOffset={10}
        />
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
});