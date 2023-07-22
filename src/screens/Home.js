import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';

import { RFPercentage } from "react-native-responsive-fontsize";

import { styles } from './../../assets/css/Style';
import meditate from '../../assets/images/home/meditate.png';
import meditation_library from '../../assets/images/home/meditation_library.png';
import daily_motivation from '../../assets/images/home/daily_motivation.png';
import { auth } from '../../firebase';
import close from '../../assets/images/close.png';
import { getQuote, getQuoteID } from '../models/QuoteModel';
import { screenHeight, screenWidth } from '../components/Dimensions';
import { child, get, getDatabase, onValue, ref } from 'firebase/database';
// import MedLibrary from './MedLibrary'


export default function Home({ navigation }) {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ quote, setQuote ] = useState('')
    const [ source, setSource ] = useState('')

    const uid = auth.currentUser.uid
    const emailVerified = auth.currentUser.emailVerified

    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    
    // fetch user data from realtime db
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('fetching user data\nuser id: ',uid)

                // set user first name and last name
                const realtimeDB = getDatabase()
                const dbRef = ref(realtimeDB);
                get(child(dbRef, `users/${uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                      setFirstName(snapshot.val().firstName) // setFirstName("jubil reign")
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
        fetchUserData();
    }, [uid]);

    // fetch daily motivation - on going
    useEffect(() => {
        const fetchMotivationData = async () => {
            try {
                let quoteID = await getQuoteID()
                console.log('quoteID: ',quoteID)

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
    }, [uid]);

    const [quoteVisible, setQuoteVisible] = useState(false);
    const [avatarVisible, setAvatarVisible] = useState(false);

    const showQuoteModal = () => {
        setQuoteVisible(true);
    };

    const hideQuoteModal = () => {
        setQuoteVisible(false);
    };

    const showAvatarModal = () => {
        setAvatarVisible(true);
    };

    const hideAvatarModal = () => {
        setAvatarVisible(false);
    };

    const goToLibrary = () => {
        navigation.navigate('MedLibrary');
    };

    const goToSelectReligion = () => {
        navigation.navigate('SelectReligion');
    };

    const remindVerification = () => {
        console.log('Please verify your account')
    }

    return (
        <SafeAreaView style={[styles.screen, { marginTop: 45 }]}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 15 }}>
                <View style={inStyles.titleContainer}>
                    <Text style={[styles.colorSecondary, inStyles.title]}>Welcome, { firstName }</Text>
                    <Text style={inStyles.subtitle}>May you have a pleasant day</Text>
                </View>

                <View style={[inStyles.sec1Container, styles.dropShadow]}>
                    <View style={inStyles.progressContainer}>
                    <Text style={[styles.colorPrimary, inStyles.sec1Title, styles.bold]}>Your Progress</Text>
                        <View style={[styles.bgColorPrimary, inStyles.progressContent]}>
                            <Text style={[styles.colorWhite, styles.bold, { fontSize: RFPercentage(2.2) }]}>{currentDate}</Text>
                            <Text style={styles.colorWhite}>Meditation Streak: 6 days</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={[inStyles.btnAvatar, styles.bgColorPrimary]} onPress={showAvatarModal}>
                        <Text style={styles.colorWhite}>Avatar</Text>
                    </TouchableOpacity>
                </View>

                <View style={inStyles.sec2Container}>
                    <TouchableOpacity style={[inStyles.btnFeature, styles.bgColorPrimary, styles.dropShadow]} onPress={() => {emailVerified == true ? goToSelectReligion() : remindVerification()}}>
                        <Image style={[{ width: 110, height: 120 }]} source={meditate}/>
                        <Text style={[styles.colorWhite, styles.bold, { fontSize: RFPercentage(2.5), marginTop: 5 }]}>Meditate</Text>
                        <Text style={[styles.colorWhite, { fontSize: RFPercentage(2.2) }]}>{'Recommend a practice for you'}</Text>
                    </TouchableOpacity>
                    <View style={inStyles.sec2SubContainer}>
                        <TouchableOpacity style={[inStyles.btnSubFeature, styles.dropShadow]} onPress={() => {emailVerified == true ? goToLibrary() : remindVerification()}}>
                            <Image style={[{ width: 40, height: 40 }]} source={meditation_library}/>
                            <Text style={[styles.colorPrimary, styles.bold, inStyles.medlib]}>{'Meditation\nLibrary'}</Text>
                            <Text style={[styles.colorPrimary, { fontSize: RFPercentage(1.6), marginTop: 5, textAlign:'center' }]}>{'Explore practice from different religions'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[inStyles.btnSubFeature, styles.dropShadow, { marginLeft: 15 }]} onPress={showQuoteModal}>
                            <Image style={[{ width: 40, height: 40 }]} source={daily_motivation}/>
                            <Text style={[styles.colorPrimary, styles.bold, inStyles.medlib]}>{'Daily\nMotivation'}</Text>
                            <Text style={[styles.colorPrimary, { fontSize: RFPercentage(1.8), marginTop: 5, textAlign:'center' }]}>{'Start your day with a motivational quote'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style={[inStyles.btnFeature, styles.bgColorPrimary, styles.dropShadow]}>
                    <Text style={[styles.colorWhite, styles.bold, { fontSize: RFPercentage(3), position:'absolute', top:20 }]}>Daily Motivation</Text>
                    <Image style={[{ width: 50, height: 50 }]} source={meditate}/>
                    <Text style={[styles.colorWhite, { fontSize: RFPercentage(2.6), width: screenWidth('80%'), textAlign:'center' }]}>"{quote}"</Text>
                    <Text style={[styles.colorWhite, { fontSize: RFPercentage(2.2), position:'absolute', bottom:10 }]}>{source}</Text>
                </View> */}

                {/* <View style={inStyles.sec2SubContainer}>
                    <TouchableOpacity style={[styles.dropShadow, inStyles.sec1Container, styles.bgColorSecondary, { width: screenWidth('90%')}]} onPress={showQuoteModal}>
                        <Image style={[{ width: 40, height: 40, paddingHorizontal:30, marginRight:20, resizeMode: 'contain' }]} source={daily_motivation}/>
                        <View>
                            <Text style={[styles.colorWhite, styles.bold, inStyles.medlib]}>{'Meditate'}</Text>
                            <Text style={[styles.colorWhite, { fontSize: RFPercentage(1.8), marginTop: 5, textAlign:'center' }]}>{'Recommend a practice for you'}</Text>    
                        </View>
                    </TouchableOpacity>
                </View> */}

                {/* <View style={inStyles.sec2Container}>
                    <MedLibrary></MedLibrary>
                </View> */}

                <Modal visible={quoteVisible} animationType='slide' transparent={true}>
                    <View style={inStyles.modalContainer}>
                        <View style={[inStyles.modalContent, styles.dropShadow]}>
                            <Text style={[styles.bold, { fontSize: RFPercentage(2.5), top: 15, position: 'absolute' }]}>Daily Motivation</Text>
                            <Text style={{ textAlign:'center', fontSize:20, fontWeight:'bold', color:'darkgray'}}>"{quote}"</Text>
                            <Text style={{ bottom: 15, right: 15, position: 'absolute' }}>- {source}</Text>
                            <TouchableOpacity style={inStyles.btnCloseModal} onPress={hideQuoteModal}>
                                <Image style={[{ width: 20, height: 20 }]} source={close}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal visible={avatarVisible} animationType='slide' transparent={true}>
                    <View style={inStyles.modalContainer}>
                        <View style={[inStyles.modalContent, styles.dropShadow]}>
                            <Text>Coming soon.</Text>
                            <TouchableOpacity style={inStyles.btnCloseModal} onPress={hideAvatarModal}>
                                <Image style={[{ width: 20, height: 20 }]} source={close}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}



const inStyles = StyleSheet.create({
    titleContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 15,
        paddingRight: 15,
        width: screenWidth('90%'),
    },

    sec1Container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#2EC4B6',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth('90%'),
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

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        width: screenWidth('90%'),
        height: screenHeight('40%'),
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#2EC4B6',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },

    progressContainer: {
        flex: 1,
        marginRight: 10,
    },

    progressContent: {
        borderRadius: 15,
        padding: 15,
    },

    title: {
        fontSize: RFPercentage(3),
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: RFPercentage(2),
        color: '#8C8C8C',
    },

    sec1Title: {
        fontSize: RFPercentage(2),
        marginBottom: 5,
    },

    btnAvatar: {
        marginLeft: 5,
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
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
    
    btnCloseModal: {
        position: 'absolute',
        right: 15,
        top: 15,
    },

    medlib: { 
        fontSize: RFPercentage(2),
        marginTop: 5,
        alignItems:'center',
        textAlign:'center',
    }
});