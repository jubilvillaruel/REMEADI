import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { PrimaryButton } from '../components/Buttons'
import { styles } from '../../assets/css/Style'
import { screenHeight, screenWidth } from '../components/Dimensions'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { auth } from '../../firebase'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

export default function ForgotPassword({navigation}) {
    const [getEmail, setEmail] = useState("")

    const handlePasswordReset = () => {
        console.log("email: " + getEmail)
        // handle input if empty or not
        getEmail == '' || getEmail == null ? alert('invalid Email') : sendPasswordResetLink()
    }

    const sendPasswordResetLink = async () => {
      console.log('entered sendPasswordResetLink function')
      try {
        // handle Change Password
        auth.sendPasswordResetEmail(getEmail)

      //   .then(() => {
          // alert('Password Reset Email Sent');
          callToast('success','Password Reset link Sent!','A link has been sent to your email')
          const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
          await sleep(3000);
          navigation.navigate('SignIn')
      //   }) 
      }catch(error) {
        console.log(error.stack)
      } 
    }

    const callToast = (type, text1, text2) => {
      // call toast here
      Toast.show({
          type: type,
          text1: text1,
          text2: text2,
          onPress: ()=>{
              setAvatarVisible(true)
          }
          // position: 
      });
    }

    return (
        <SafeAreaView style={styles.screen}>
            <View style={inStyles.bodyContainer}>
                <View style={styles.containerCentered}>
                    <TextInput keyboardType={'email-address'} style={styles.inputContainer} placeholder="Email" selectionColor="transparent" onChangeText={text => setEmail(text)}/>
                    <PrimaryButton
                        text='Send Password Reset Link'
                        textColor= '#FFFFFF'
                        textSize={RFPercentage(2.2)}
                        width={screenWidth('80%')}
                        height={screenHeight('7%')}
                        borderRad={30}
                        borderW={0}
                        onPress={() => handlePasswordReset()}>
                    </PrimaryButton>
                </View>
            </View>
            <Toast/>
        </SafeAreaView>
    )
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