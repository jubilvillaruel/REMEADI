import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

import { styles } from '../../assets/css/Style';
import showPass from '../../assets/images/closed_eye.png';
import hidePass from '../../assets/images/open_eye.png';
import calendar from '../../assets/images/calendar.png';
import { auth, db } from '../../firebase';

export default function SignUp({ navigation }) {
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

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    if (modalVisible && selectedDate !== '') {
      handleModalClose();
    }
  }, [selectedDate, age]);

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
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

  const handleModalClose = () => {
    setModalVisible(false);
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
      });
      
      // Send email verification
      await user.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://spiritwalk-89b9f.firebaseapp.com/'
      });

      // Show success message
      alert("Verification Sent!");
      
      // redirect the user to the verification page while waiting for the email verification
      console.log(user.email + " waiting for verification");
      // navigation.navigate('Verification', );

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
        <View>
          <View style={inStyles.inputGroup}>
            <TextInput style={inStyles.input} placeholder="Last Name" selectionColor="transparent" value={lastName} onChangeText={setLastName}/>
          </View>

          <View style={inStyles.inputGroup}>
            <TextInput style={inStyles.input} placeholder="First Name" selectionColor="transparent" value={firstName} onChangeText={setFirstName}/>
          </View>

          <View style={inStyles.inputGroup}>
            <TextInput style={inStyles.input} placeholder="Email" selectionColor="transparent" value={email} onChangeText={setEmail} keyboardType="email-address"/>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={[inStyles.inputGroup, { width: 180 }]}>
              <View style={[inStyles.input, inStyles.datePickerContainer]}>
                <TextInput
                  style={inStyles.datePickerInput}
                  selectionColor="transparent"
                  placeholder="Birthdate"
                  value={selectedDate}
                  editable={false}
                />
                <TouchableOpacity style={[{ position: 'absolute', right: 15 }]} onPress={toggleModalVisibility}>
                  <Image style={[{ width: 18, height: 18 }]} source={calendar} />
                </TouchableOpacity>
              </View>
            </View>


            <View style={[inStyles.inputGroup, { marginLeft: 5, width: 100 }]}>
              <TextInput
                style={inStyles.input}
                placeholder="Age"
                selectionColor="transparent"
                keyboardType="numeric"
                value={age}
                editable={false}
              />
            </View>
          </View>


          <View style={inStyles.inputGroup}>
            <View style={inStyles.passwordInputContainer}>
              <TextInput style={inStyles.passwordInput} placeholder="Password" secureTextEntry={!passwordVisible} selectionColor="transparent" onChangeText={setPassword}/>
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
              <TextInput style={inStyles.passwordInput} placeholder="Confirm Password" secureTextEntry={!confirmPasswordVisible} selectionColor="transparent" onChangeText={setConfirmPassword}/>

              <TouchableOpacity style={inStyles.passwordVisibilityButton} onPress={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? (
                  <Image style={[{ width: 19, height: 14 }]} source={hidePass} />
                ) : (
                  <Image style={[{ width: 19, height: 18 }]} source={showPass} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={[styles.bgColorPrimary, inStyles.btnSignUp, styles.dropShadow]} onPress={handleForm}>
            <Text style={[styles.colorWhite, { fontWeight: 'bold' }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleModalClose}>
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={handleModalClose}>
          <View style={inStyles.modalContainer}>
            <View style={{ width: 300, height: 300 }}>
              <DatePicker mode="calendar" onSelectedChange={handleDateSelect} />
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const inStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
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
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 10,
  },
  datePickerInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
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