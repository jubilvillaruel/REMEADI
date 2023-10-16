import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

import { RFPercentage } from "react-native-responsive-fontsize";

import { styles } from './../../assets/css/Style';
import meditate from '../../assets/images/home/meditate.png';
import meditation_library from '../../assets/images/home/meditation_library.png';
import { auth } from '../../firebase';
import { getQuote, getQuoteID } from '../models/QuoteModel';
import { screenHeight, screenWidth } from '../components/Dimensions';
import { child, get, getDatabase, onValue, ref } from 'firebase/database';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import avatar from '../../assets/images/avatar/avatar1.png';
import { ImageBackground } from 'react-native';
import { FeatureCard } from '../components/Cards';
import { retrieveHistories, streakChecker } from '../models/MilestonesModel';

export default function Home({ navigation }) {
    const [ firstName, setFirstName ] = useState('');
    const [ quote, setQuote ] = useState('')
    const [ source, setSource ] = useState('')
    const [ isEmailVerified, setIsEmailVerified] = useState(false)
    const [ faithFocusedValue, setFaithFocusedValue] = useState(Boolean)
    const [ streak, setStreak ] = useState(Number)

    const uid = auth.currentUser.uid
    const emailVerified = auth.currentUser.emailVerified

    useEffect(() => {
        const fetchUserData = async () => {

            // retrieve meditation streak days
            const historiesObj = await retrieveHistories(uid)
            setStreak(streakChecker(historiesObj,9999))

            // check if email is verified
            try {
                if (emailVerified) {
                    setIsEmailVerified(true)
                }   
                // console.log('fetching user data\nuser id: ',uid)

                // set user first name and last name
                const realtimeDB = getDatabase()
                const dbRef = ref(realtimeDB);
                get(child(dbRef, `users/${uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                      setFirstName(snapshot.val().firstName) 
                    } else {
                      console.log("No data available");
                    }
                }).catch((error) => {
                console.error(error);
                });
            } catch (error) {
                console.log(error);
            }

            console.log("===USER DETAILS===")
            console.log("uid:\t\t" + uid)
            console.log("email:\t\t" + auth.currentUser.email)
            console.log("email verified:\t" + emailVerified)
            console.log("first name:\t" + firstName)
            console.log("------------------\n")

        };
        fetchUserData();
    }, [uid]);

    // faithFocused listener
    useEffect(() => {
        // Set up a listener for changes to the faithFocused data in the database
        const faithFocusedRef = ref(getDatabase(), 'users/'+auth.currentUser.uid+'/faithFocused');
        
        // const historyRef = ref(getDatabase(), 'milestones/' + uid);
    
        onValue(faithFocusedRef, (snapshot) => {
            const dataFromFirebase = snapshot.val();
            setFaithFocusedValue(dataFromFirebase)
            // setMilestones(dataFromFirebase);
        }, (error) => {
            console.log(error.stack);
        });
    }, []);

    // fetch daily motivation - on going
    useEffect(() => {
        const fetchMotivationData = async () => {
            try {
                let quoteID = await getQuoteID(faithFocusedValue)
                console.log('quoteID: \t\t' + quoteID)

                // fetch quote 
                const realtimeDB = getDatabase()
                const dbRef = ref(realtimeDB);
                get(child(dbRef, `motivation/${quoteID}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setQuote(snapshot.val().quote)
                        setSource(snapshot.val().source)
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                console.error(error);
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchMotivationData();
    }, [uid, faithFocusedValue]);

    const goToLibrary = () => {
        navigation.navigate('MedLibrary');
    };

    const goToExpertSystem = () => {
        navigation.navigate('SelectExpertPath');
    };

    const remindVerification = async () => {
        callToast('error','Unverified Email Address','Oh no! Verify your email address and re-login')
        console.log('Please verify your account')
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
        <SafeAreaView style={[styles.screen, { paddingTop: 35,  backgroundColor: '#F3F3F3'}]}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 15 }}>
                <View style={[inStyles.sec1Container, styles.dropShadow]}>
                    <TouchableOpacity style={[inStyles.btnAvatar]} onPress={() =>callToast('info','Hi, '+firstName,'I\'m ready to meditate with you!')}>
                        <ImageBackground style={[{ width: 200, height: 200 }]} imageStyle={{ borderRadius: 15 }} source={avatar}></ImageBackground>
                    </TouchableOpacity>
                    <View style={inStyles.titleContainer}>
                        <Text style={[styles.colorSecondary, inStyles.title]}>Welcome, { firstName }!</Text>
                        <Text style={[styles.colorPrimary, inStyles.subtitle]}>Meditation Streak: {streak} days</Text>
                    </View>
                </View>
                
                <View style={[styles.dividerContainer, { width: screenWidth('90%'), justifyContent: 'center' }]}>
                    <View style={[styles.dividerLine, { width: screenWidth('20%'), height: 1, backgroundColor: 'lightgray' }]}/>
                        <Text style={[styles.dividerText, { fontSize: RFPercentage(2), color: '#6F6F6F' }]}>Daily Motivation</Text>
                    <View style={[styles.dividerLine, { width: screenWidth('20%'), height: 1, backgroundColor: 'lightgray' }]}/>
                </View>

                <View style={[inStyles.modalContent, styles.dropShadow]}>
                    <Text style={{ textAlign:'center', fontStyle: 'italic', fontSize: RFPercentage(1.8), fontWeight: 'bold', color:'#6F6F6F'}}>"{quote}" {"\n\n"} {source}</Text>
                </View>

                <View style={[styles.dividerLine, { alignSelf: 'center', width: screenWidth('75%'), height: 1, backgroundColor: 'lightgray', marginBottom: 10 }]}/>

                <FeatureCard title={"Meditation"} desc={"Recommend a practice for you"} image={meditate} onPress={() => {isEmailVerified == true ? goToExpertSystem() : remindVerification()}}/>
                <FeatureCard title={"Library"} desc={"Explore practice from different religions"} image={meditation_library} onPress={() => {isEmailVerified == true ? goToLibrary() : remindVerification()}}/>
            </ScrollView>
            <Toast />
        </SafeAreaView>
    );
}

const inStyles = StyleSheet.create({
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth('90%'),
    },

    sec1Container: {
        flexDirection: 'column',
        padding: 20,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth('90%'),
        borderRadius: 20,
        // borderWidth: 1,
        borderColor: 'lightgray',
        backgroundColor: 'white',
    },

    sec2Container: {
        paddingTop: 15,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth('90%'),
    },

    sec2SubContainer: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth('90%'),
    },

    modalContent: {
        width: screenWidth('90%'),
        height: screenHeight('20%'),
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },

    title: {
        fontSize: RFPercentage(3),
        fontWeight: 'bold',
    },

    subtitle: {
        fontSize: RFPercentage(2),
        color: '#8C8C8C',
    },

    btnAvatar: {
        width: 200,
        height: 200,
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },

    btnFeature: {
        width: screenWidth('90%'),
        height: screenHeight('30%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },

    btnSubFeature: {
        padding: 15,
        width: screenWidth('43%'),
        height: screenHeight('25%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#2EC4B6',
        textAlign: 'center',
    },

    medlib: { 
        fontSize: RFPercentage(2),
        marginTop: 5,
        alignItems:'center',
        textAlign:'center',
    }
});