import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { PrimaryButton } from '../components/Buttons'
import { styles } from '../../assets/css/Style'
import { screenHeight, screenWidth } from '../components/Dimensions'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { auth } from '../../firebase'

export default function ForgotPassword() {
    const [getUsername, setUsername] = useState("")

    const handlePasswordReset = () => {
        console.log("username: " + getUsername)
        // handle input if empty or not
        (getUsername === '' || getUsername === null ? alert('invalid Email') : sendPasswordResetLink())
    }

    const sendPasswordResetLink = () => {
      try {
        // handle Change Password
        auth.sendPasswordResetEmail(getUsername)
        .then(() => {
          alert('Password Reset Email Sent');
        }) 
      }catch(error) {
        console.log(error)
      }
      navigation.navigate('SignIn')
    }

    return (
        <SafeAreaView style={styles.screen}>
            <View style={inStyles.bodyContainer}>
                <View style={styles.containerCentered}>
                    <TextInput style={styles.inputContainer} placeholder="Email" selectionColor="transparent" onChangeText={text => setUsername(text)} keyboardType="email-address"/>
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