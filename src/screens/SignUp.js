import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import { screenWidth, screenHeight } from '../components/dimensions';
import { PrimaryButton } from '../components/buttons';
import { RFPercentage } from "react-native-responsive-fontsize";
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-modern-datepicker';

import { styles } from '../../assets/css/Style';
import showPass from '../../assets/images/closed_eye.png';
import hidePass from '../../assets/images/open_eye.png';
import calendar from '../../assets/images/calendar.png';
import { auth, db } from '../../firebase';

export default function SignUp({ navigation, route }) {
  const { setUserToken } = route.params;

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged(user => {
    //   if (user) {
    //     console.log('uid: '+ user.uid)
    //     setUserToken(user.uid)      
    //   }
    // })
    // return unsubscribe
  }, [])

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [msgVisible, setMsgVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [age, setAge] = useState('');
  const [religion, setReligion] = useState('Christianity');
  const [dropdown, setDropdown] = useState(false);
  const [items, setItems] = useState([
    {label: 'Christianity', value: 'Christianity'},
    {label: 'Islam', value: 'Islam'},
    {label: 'Hinduism', value: 'Hinduism'},
    {label: 'Buddhism', value: 'Buddhism'},
    {label: 'Judaism', value: 'Judaism'},
  ]);

  useEffect(() => {
     if (calendarVisible && selectedDate !== '') {
      hideCalendarModal();
    }
  }, [selectedDate, age]);

  const showCalendarModal = () => {
    setCalendarVisible(true);
  };

  const handleDateSelect = (date) => {
    const currentDate = new Date();
    const selectedYear = parseInt(date.substring(0, 4), 10);
    const currentYear = currentDate.getFullYear();
    const calculatedAge = currentYear - selectedYear;

    if (calculatedAge >= 12) {
      setSelectedDate(date);
      setAge(calculatedAge.toString());
    }
  };

  const hideCalendarModal = () => {
    setCalendarVisible(false);
  };

  const showMsgModal = () => {
    setMsgVisible(true);
  };

  const hideMsgModal = () => {
    setMsgVisible(false);
    // redirect user to the home screen
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log('uid: '+ user.uid)
        setUserToken(user.uid)      
      }
    })
    return unsubscribe
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleForm = () => {
    // store var a, b, c, and d in a hashmap
    const userDetails = {};
    userDetails['First Name'] = firstName;
    userDetails['Last Name'] = lastName;
    userDetails['Email'] = email;
    userDetails['Birthdate'] = selectedDate;
    userDetails['Password'] = password;
    userDetails['Confirm Password'] = confirmPassword;
    userDetails['Age'] = age;

    // loop through each item of the hashmap and check if empty or not
    Object.keys(userDetails).forEach((key)=>{
      if ((userDetails[key] == null)||(userDetails[key]=='')){
        alert(`Please provide ${key}`);
        throw new Error(`${key} cannot be blank`);
      }
    });

    handleConfirmPassword();
  }

  const handleConfirmPassword = () => {
    console.log('Sign up button pressed!');
    if (!password ||!confirmPassword){
      alert('Please enter both passwords');
      // return false;
      } else {
        if (password!== confirmPassword) {
          alert('The two entered passwords do not match.');
          // return false;
        } else {
          handleSignUp();
        }
      }
    }

  const handleSignUp = async () => {
    // Perform sign up logic here
    try {
      // Create the user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
  
      // Store user information in Firestore
      const collectionRef = db.collection("users");
      await collectionRef.doc(user.uid).set({
        firstName,
        lastName,
        selectedDate,
        email,
        religion
      });
      
      // Send email verification
      await user.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://remeadi.firebaseapp.com/'
      });

      // Show success message
      showMsgModal()

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert(errorMessage);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={inStyles.signUpContainer}>
        <View style={styles.containerCentered}>
          <TextInput style={styles.inputContainer} placeholder="Last Name" selectionColor='transparent' value={lastName} onChangeText={setLastName}/>
          <TextInput style={styles.inputContainer} placeholder="First Name" selectionColor='transparent' value={firstName} onChangeText={setFirstName}/>
          <TextInput style={styles.inputContainer} placeholder="Email" selectionColor='transparent' value={email} onChangeText={setEmail} keyboardType="email-address"/>
          
          <DropDownPicker
            style={[inStyles.input, { borderRadius: 30, paddingVertical: 15, paddingHorizontal: 15 }]}
            open={dropdown}
            value={religion}
            items={items}
            setOpen={setDropdown}
            setValue={setReligion}
            setItems={setItems}
            containerStyle={{ width: screenWidth('80%'), marginTop: 10 }}
          />

          <View style={{ flexDirection: 'row' }}>
            <View style={[inStyles.inputGroup, { width: screenWidth('58%') }]}>
              <View style={[inStyles.input, inStyles.datePickerContainer]}>
                <TextInput
                style={inStyles.datePickerInput}
                selectionColor='transparent'
                placeholder="Birthdate"
                value={selectedDate}
                editable={false}/>
                <TouchableOpacity style={[{ position: 'absolute', right: 15 }]} onPress={showCalendarModal}>
                  <Image style={[{ width: 18, height: 18 }]} source={calendar} />
                </TouchableOpacity>
              </View>
            </View>


            <View style={[inStyles.inputGroup, { marginLeft: 5, width: screenWidth('20%') }]}>
              <TextInput
              style={inStyles.input}
              placeholder="Age"
              selectionColor='transparent'
              keyboardType="numeric"
              value={age}
              editable={false}/>
            </View>
          </View>

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

          <View style={styles.passwordInputContainer}>
            <TextInput style={styles.passwordInput} placeholder="Confirm Password" secureTextEntry={!confirmPasswordVisible} selectionColor='transparent' onChangeText={setConfirmPassword}/>
            <TouchableOpacity style={styles.passwordVisibilityButton} onPress={toggleConfirmPasswordVisibility}>
              {confirmPasswordVisible ? (
                <Image style={[{ width: 19, height: 14 }]} source={hidePass} />
              ) : (
                <Image style={[{ width: 19, height: 18 }]} source={showPass} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={hideCalendarModal}>
            <Modal visible={calendarVisible} animationType="slide" transparent={true} onRequestClose={hideCalendarModal}>
              <View style={inStyles.modalContainer}>
                <View style={{ width: 300, height: 300 }}>
                  <DatePicker mode="calendar" onSelectedChange={handleDateSelect} />
                </View>
              </View>
            </Modal>
          </TouchableOpacity>

          <Modal visible={msgVisible} animationType='slide' transparent={true}>
            <View style={inStyles.modalContainer}>
              <View style={[inStyles.modalContent, styles.dropShadow]}>
                <Text style={{ textAlign: 'center' }}>A link has been sent to your email! Open to verify your account.</Text>
                <PrimaryButton
                  text='Close'
                  textColor= '#FFFFFF'
                  textSize={RFPercentage(2.2)}
                  width={screenWidth('80%')}
                  height={screenHeight('7%')}
                  borderRad={30}
                  onPress={hideMsgModal}>
                </PrimaryButton>
              </View>
            </View>
          </Modal>

          <PrimaryButton
            text='Sign Up'
            textColor= '#FFFFFF'
            textSize={RFPercentage(2.2)}
            width={screenWidth('80%')}
            height={screenHeight('7%')}
            borderRad={30}
            onPress={handleForm}>
          </PrimaryButton>
        </View>
      </View>
      
    </SafeAreaView>
  );
}

const inStyles = StyleSheet.create({
  signUpContainer: {
    height: screenHeight('70%'),
    width: screenWidth('100%'),
  },

  inputGroup: {
    marginTop: 5,
    width: screenWidth('100%'),
  },

  input: {
    marginTop: 10,
    width: '100%',
    height: screenHeight('7%'),
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 30,
    fontSize: RFPercentage(1.5),
  },

  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 30,
    marginTop: 10,
  },

  datePickerInput: {
    flex: 1,
    height: 50,
    fontSize: RFPercentage(1.5),
  },

  ageInput: {
    marginLeft: 10,
    width: 60,
    height: 40,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 20,
    fontSize: RFPercentage(1.5),
  },

  modalContent: {
    width: screenWidth('90%'),
    height: screenHeight('20%'),
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
});