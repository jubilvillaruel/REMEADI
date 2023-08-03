import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useId, useState } from 'react'
import { TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { styles } from '../../assets/css/Style'
import { getQuoteID} from '../models/QuoteModel'
import { getDatabase, ref, set, push } from 'firebase/database'



export default function ManageQuote() {
    const [ quote, setQuote ] = useState('')
    const [ source, setSource ] = useState('')
    const [ religion, setReligion ] = useState('Christianity')

    const writeUserData = () => {
      const realtimeDB = getDatabase()
      
      // create custom ID
      const motivationId = push(ref(realtimeDB, 'motivation')).key;
      const religionMotivationId = (religion.substring(0,2).toUpperCase() + motivationId)

      // add details to the RealTime DB
      set(ref(realtimeDB, 'motivation/' + religionMotivationId), {
        quote: quote,
        religion : religion,
        source: source
      });

      clearInput();

      console.log('QUOTE SUCCESSFULLY ADDED')
      console.log("documentId:", religionMotivationId),"\n-----------------------";
    }

    const clearInput= () => {
      setQuote('')
      setSource('')
    }
    

    return (
        <SafeAreaView style={[styles.screen]}>
            <View style={inStyles.signUpContainer}>
                <View>
                  <View style={[inStyles.inputGroup ]}>
                      <TextInput  multiline numberOfLines={4} style={inStyles.inputWide} placeholder="Quote" selectionColor="transparent" value={quote} onChangeText={setQuote}/>
                  </View>

                  <View style={inStyles.inputGroup}>
                      <TextInput style={inStyles.input} placeholder="Source" selectionColor="transparent" value={source} onChangeText={setSource}/>
                  </View>

                  <Picker style={[inStyles.btnSignUp]}
                  selectedValue={religion}
                  onValueChange={(itemValue, itemIndex) => setReligion(itemValue)}>
                      <Picker.Item label='Christianity' value='Christianity'/>
                      <Picker.Item label='Islam' value='Islam'/>
                      <Picker.Item label='Hinduism' value='Hinduism'/>
                      <Picker.Item label='Buddhism' value='Buddhism'/>
                      <Picker.Item label='Judaism' value='Judaism'/>
                  </Picker>

                  {/* <View style={inStyles.inputGroup}>
                      <TextInput style={inStyles.input} placeholder="Religion" selectionColor="transparent" value={religion} onChangeText={setReligion}/>
                  </View> */}

                  <TouchableOpacity 
                    style={[styles.bgColorPrimary, inStyles.btnSignUp, styles.dropShadow]} 
                    onPress={writeUserData}>
                      <Text style={[styles.colorWhite, { fontWeight: 'bold' }]}>Add Quote</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.bgColorPrimary, inStyles.btnSignUp, styles.dropShadow]} 
                    onPress={getQuoteID}>
                      <Text style={[styles.colorWhite, { fontWeight: 'bold' }]}>Get Quote</Text>
                  </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

const inStyles = StyleSheet.create({
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
    inputGroup: {
      marginTop: 10,
      width: 280,
    },
    input: {
      marginTop: 10,
      width: '100%',
      height: 40,
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderColor: '#000000',
      borderWidth: 2,
      borderRadius: 20,
      fontSize: 14,
    },
    inputWide: {
        marginTop: 10,
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: '#000000',
        borderWidth: 2,
        borderRadius: 20,
        fontSize: 14,
    },
    passwordInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#000000',
      borderWidth: 2,
      borderRadius: 20,
      marginTop: 10,
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
    signUpContainer: {
      alignItems: 'center',
    },
});