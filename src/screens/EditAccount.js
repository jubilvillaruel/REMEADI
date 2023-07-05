import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Modal, Picker } from 'react-native';
import { PrimaryButton } from '../components/buttons'; 
import DropDownPicker from 'react-native-dropdown-picker';

import { styles } from './../../assets/css/Style';
import showPass from '../../assets/images/closed_eye.png';
import hidePass from '../../assets/images/open_eye.png';

export default function EditAccount({ navigation }) {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [msgVisible, setMsgVisible] = useState(false);
  const [religion, setReligion] = useState('Christianity');
  const [dropdown, setDropdown] = useState(false);
  const [items, setItems] = useState([
    {label: 'Christianity', value: 'Christianity'},
    {label: 'Islam', value: 'Islam'},
    {label: 'Hinduism', value: 'Hinduism'},
    {label: 'Buddhism', value: 'Buddhism'},
    {label: 'Judaism', value: 'Judaism'},
  ]);

  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const showMsgModal = () => {
    setMsgVisible(true);
  };

  const hideMsgModal = () => {
    setMsgVisible(false);
  };

  const goToAccount = () => {
    hideMsgModal();
    navigation.goBack();
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

          <DropDownPicker
            style={[inStyles.input, { borderRadius: 30, paddingVertical: 15, paddingHorizontal: 15 }]}
            open={dropdown}
            value={religion}
            items={items}
            setOpen={setDropdown}
            setValue={setReligion}
            setItems={setItems}
            containerStyle={{ width: 280, marginTop: 10 }}
          />

          {/* <View style={inStyles.inputGroup}>
            <Picker style={inStyles.input} selectedValue={religion} onValueChange={(itemValue, itemIndex) => setReligion(itemValue)}>
              <Picker.Item label='Christianity' value='Christianity'/>
              <Picker.Item label='Islam' value='Islam'/>
              <Picker.Item label='Hinduism' value='Hinduism'/>
              <Picker.Item label='Buddhism' value='Buddhism'/>
              <Picker.Item label='Judaism' value='Judaism'/>
            </Picker>
          </View> */}

          <View style={inStyles.inputGroup}>
            <View style={inStyles.passwordInputContainer}>
              <TextInput style={inStyles.passwordInput} placeholder='Old Password' secureTextEntry={!oldPasswordVisible} selectionColor='transparent'/>
              <TouchableOpacity style={inStyles.passwordVisibilityButton} onPress={toggleOldPasswordVisibility}>
                {oldPasswordVisible ? (
                  <Image style={[{ width: 19, height: 14 }]} source={hidePass} />
                ) : (
                  <Image style={[{ width: 19, height: 18 }]} source={showPass} />
                )}
              </TouchableOpacity>
            </View>
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

          <TouchableOpacity style={[styles.bgColorPrimary, inStyles.btnSave, styles.dropShadow]} onPress={showMsgModal}>
            <Text style={[styles.colorWhite, { fontWeight: 'bold' }]}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={msgVisible} animationType='slide' transparent={true}>
          <View style={inStyles.modalContainer}>
              <View style={[inStyles.modalContent, styles.dropShadow]}>
                  <Text style={{ textAlign: 'center' }}>Account details changed successfully!</Text>
                  <PrimaryButton
                    text='Continue'
                    textColor='#FFFFFF'
                    width={280}
                    height={50}
                    borderRad={30} 
                    onPress={goToAccount}>
                  </PrimaryButton>
              </View>
          </View>
        </Modal>
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
    height: 50,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 30,
    fontSize: 14,
  },

  btnSave: {
    marginTop: 15,
    width: 280,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    fontSize: 14,
    fontWeight: 'bold',
  },

  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 30,
    marginTop: 10,
  },

  passwordInput: {
    flex: 1,
    height: 50,
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

  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalContent: {
    width: 300,
    height: 130,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});