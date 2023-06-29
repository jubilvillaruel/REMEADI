import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

import { styles } from './../../assets/css/Style';
import { auth } from '../../firebase';

export default function Verification({ navigation }) {
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user && user.emailVerified) {
          // User is signed in and email is verified, redirect to Home Screen
          navigation.navigate('Home');
        }
      });

      // Clean up the subscription
      return unsubscribe;
    }, []);

    const CELL_COUNT = 6;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({value, setValue,});

    const handleResendVerification = async () => {
      try {
        const user = auth.currentUser;
  
        if (user) {
          // Resend the email verification
          await user.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://spiritwalk-89b9f.firebaseapp.com/'
          });
  
          alert('Verification email resent!');
        }
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
      }
    };
  

    // const handleVerificationCodeChange = (text) => {
    //     const numericValue = text.replace(/[^0-9]/g, '');
    //     setValue(numericValue);
    // };

    return (
        <SafeAreaView style={styles.screen}>
            <Text style={inStyles.text}>Please verify your email with the link sent to your email.</Text>
            <Text style={[inStyles.text, { marginTop: 20 }]}>{"Didn't receive the code? "}
                <TouchableOpacity onPress={handleResendVerification}>
                    <Text style={styles.colorPrimary}>Resend</Text>
                </TouchableOpacity>
            </Text>
        </SafeAreaView>
    );
}

const inStyles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    codeFieldRoot: { marginTop: 20 },
        cell: {
            margin: 5,
            width: 40,
            height: 40,
            lineHeight: 34,
            fontSize: 16,
            borderWidth: 2,
            borderRadius: 10,
            textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
    btnVerify: {
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
});
