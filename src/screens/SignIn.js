import { StyleSheet, Text, SafeAreaView, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect }  from 'react'

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
  
    return (
      <SafeAreaView style={styles.screenCenter}>
        <View style={inStyles.signInContainer}>
          <Image style={styles.app_logo} source={appLogo}/>
          <Text style={[styles.colorPrimary, { fontSize: 40, fontWeight: 'bold' }]}>REMEADI</Text>
  
          <View>
            <TextInput style={inStyles.input} placeholder="Username" selectionColor="transparent" onChangeText={text => setUsername(text)}/>
  
            <View style={inStyles.passwordInputContainer}>
              <TextInput style={inStyles.passwordInput} placeholder="Password" secureTextEntry={!passwordVisible} selectionColor="transparent" onChangeText={text => setPassword(text)}/>
  
              <TouchableOpacity style={inStyles.passwordVisibilityButton} onPress={togglePasswordVisibility}>
                {passwordVisible ? (
                  <Image style={[{ width: 19, height: 14 }]} source={hidePass}/>
                ) : (
                  <Image style={[{ width: 19, height: 18 }]} source={showPass}/>
                )}
              </TouchableOpacity>
            </View>
  
            <TouchableOpacity style={[styles.bgColorPrimary, inStyles.btnSignIn, styles.dropShadow]} onPress={() => handleSignIn()}>
            <Text style={[styles.colorWhite, { fontWeight: 'bold' }]}>Sign In</Text>
            </TouchableOpacity>
  
            <Text style={inStyles.forgotPassword}><TouchableOpacity><Text>Forgot Password?</Text></TouchableOpacity></Text>
  
            <View style={inStyles.dividerContainer}>
              <View style={inStyles.dividerLine} />
              <Text style={inStyles.dividerText}>or</Text>
              <View style={inStyles.dividerLine} />
            </View>
          </View>
  
          <TouchableOpacity style={[styles.bgColorPrimary, inStyles.btnOthers, inStyles.btnGoogle, styles.dropShadow]}>
            <Image source={googleLogo} style={inStyles.icon} />
            <Text style={[inStyles.btnText]}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bgColorPrimary, inStyles.btnOthers, inStyles.btnFacebook, styles.dropShadow]}>
            <Image source={facebookLogo} style={inStyles.icon} />
            <Text style={[styles.colorWhite, inStyles.btnText]}>CONTINUE WITH FACEBOOK</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const inStyles = StyleSheet.create({
    container: {
      width: '100%',
      height: 65,
      backgroundColor: '#fff',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      flexDirection: 'row',
      position: 'absolute',
      top: 0,
    },
    backButton: {
      position: 'absolute',
      left: 20,
      top: '50%',
      transform: [{ translateY: -10 }],
    },
    backButtonText: {
      fontSize: 16,
      color: '#000',
    },
    input: {
      marginTop: 15,
      width: 280,
      height: 40,
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderColor: '#000000',
      borderWidth: 2,
      borderRadius: 20,
      fontSize: 14,
    },
    btnSignIn: {
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
    passwordInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#000000',
      borderWidth: 2,
      borderRadius: 20,
      marginTop: 15,
    },
    passwordInput: {
      flex: 1,
      height: 40,
      paddingHorizontal: 15,
      fontSize: 14,
    },
    passwordVisibilityButton: {
      padding: 10,
      marginRight: 5,
    },
    passwordVisibilityButtonText: {
      fontSize: 14,
    },
    forgotPassword: {
      color: '#000000',
      marginTop: 15,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
    },
    dividerLine: {
      flex: 1,
      height: 2,
      backgroundColor: '#FF9F1C',
    },
    dividerText: {
      paddingHorizontal: 10,
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000',
    },
    btnOthers: {
      marginTop: 15,
      width: 280,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 'bold',
    },
    btnText: {
      fontSize: 12,
      fontWeight: 'bold',
      marginLeft: 8,
    },
    btnGoogle: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderColor: '#000',
      borderWidth: 2,
    },
    btnFacebook: {
      flexDirection: 'row',
      backgroundColor: '#1877F2',
      borderWidth: 0,
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 8,
    },
    signInContainer: {
      alignItems: 'center',
    },
  });