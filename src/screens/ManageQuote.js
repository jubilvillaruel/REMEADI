import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Picker } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-web'
import { styles } from '../../assets/css/Style'
import { auth, db } from '../../firebase'

export default function ManageQuote() {
    const [ quote, setQuote ] = useState('')
    const [ source, setSource ] = useState('')
    const [ religion, setReligion ] = useState('')

    const handleAddQuote = async () => {
        console.log('add quote')

        // Store user information in Firestore
        const collectionRef = db.collection("motivation");

        // custom document ID
        const docRef_temp = collectionRef.doc();
        const documentId = (religion.substring(0,2).toUpperCase() + docRef_temp.id);

        const docRef = collectionRef.doc(documentId);

        await docRef.set({
            quote,
            source,
            religion            
        });
        
        console.log("documentId:", documentId);
        
        // print the number of documents inside a collection
        let countDocs;
        try{
            countDocs = await collectionRef.get()
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }
        // console.log("count: " + countDocs.size);


        // clear all TextInputs
        setSource('');
        setQuote('');
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

                <TouchableOpacity style={[styles.bgColorPrimary, inStyles.btnSignUp, styles.dropShadow]} onPress={handleAddQuote}>
                    <Text style={[styles.colorWhite, { fontWeight: 'bold' }]}>Add Quote</Text>
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