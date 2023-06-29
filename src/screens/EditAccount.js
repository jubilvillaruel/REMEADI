import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';

import { styles } from './../../assets/css/Style';
import showPass from '../../assets/images/closed_eye.png';
import hidePass from '../../assets/images/open_eye.png';

export default function EditAccount({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const goToAccount = () => {
    navigation.navigate('Account');
  };


  return (
    <SafeAreaView style={styles.screen}>
      <View style={inStyles.editContainer}>
        <View>
          <View style={inStyles.inputGroup}>
            <TextInput style={inStyles.input} placeholder='Last Name' selectionColor='transparent'/>
          </View>

          <View style={inStyles.inputGroup}>
            <TextInput style={inStyles.input} placeholder='First Name' selectionColor='transparent'/>
          </View>

          <View style={inStyles.inputGroup}>
            <View style={inStyles.passwordInputContainer}>
              <TextInput style={inStyles.passwordInput} placeholder='Password' secureTextEntry={!passwordVisible} selectionColor='transparent'/>
              <TouchableOpacity style={inStyles.passwordVisibilityButton} onPress={togglePasswordVisibility}>
                {passwordVisible ? (
                  <Image style={[{ width: 19, height: 14 }]} source={hidePass} />
                ) : (
                  <Image style={[{ width: 19, height: 18 }]} source={showPass} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={inStyles.inputGroup}>
            <View style={inStyles.passwordInputContainer}>
              <TextInput style={inStyles.passwordInput} placeholder='Confirm Password' secureTextEntry={!confirmPasswordVisible} selectionColor='transparent'/>

              <TouchableOpacity style={inStyles.passwordVisibilityButton} onPress={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? (
                  <Image style={[{ width: 19, height: 14 }]} source={hidePass} />
                ) : (
                  <Image style={[{ width: 19, height: 18 }]} source={showPass} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={[styles.bgColorPrimary, inStyles.btnSave, styles.dropShadow]} onPress={goToAccount}>
            <Text style={[styles.colorWhite, { fontWeight: 'bold' }]}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const inStyles = StyleSheet.create({
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

  btnSave: {
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
    marginTop: 10,
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

  editContainer: {
    alignItems: 'center',
  },
});