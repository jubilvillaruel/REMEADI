import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Modal } from 'react-native';

import { styles } from './../../assets/css/Style';
import meditate from '../../assets/images/home/meditate.png';
import meditation_library from '../../assets/images/home/meditation_library.png';
import daily_motivation from '../../assets/images/home/daily_motivation.png';
import { auth, db } from '../../firebase';

// const handleLogout = () => {
//     auth
//     .signOut()
//     .then(
//         () => {
//             navigation.navigate("SignIn")
//         }
//     )
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode, errorMessage);
//     });
// }

const remindVerification = () => {
    alert('Please verify your account')
}

const goToMeditate = () => {
    alert("meditate")
}

const goToMeditationLibrary =() => {
    alert("meditation library")
}

export default function Home({ navigation, route }) {
    console.log(route.params);
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');

    const { user } = route.params;
    const uid = user.uid;
    const emailVerified = user.emailVerified
    console.log("email verified: " + emailVerified)
    // console.log(user)

    // fetch user data from firestore
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await db.collection("users").doc(uid).get();
                const userData = userDoc.data();
                if (userData) {
                    // fetch firstName
                    setFirstName(userData.firstName);
                    // fetch lastName
                    setLastName(userData.lastName)
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, [db, uid]);

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

    return (
        <SafeAreaView style={styles.screen}>
            <View>
                <View style={inStyles.titleContainer}>
                    <Text style={[styles.colorSecondary, inStyles.title]}>Welcome, { firstName + ' ' + lastName }</Text>
                    <Text style={inStyles.subtitle}>May you have a pleasant day</Text>
                    {/* <Text>{ route.params.user }</Text> */}
                </View>

                <View style={[inStyles.sec1Container, styles.dropShadow]}>
                    <View style={inStyles.progressContainer}>
                    <Text style={[styles.colorPrimary, inStyles.sec1Title, { fontWeight: 'bold' }]}>Your Progress</Text>
                        <View style={[styles.bgColorPrimary, inStyles.progressContent]}>
                            <Text style={[styles.colorWhite, { fontSize: 16, fontWeight: 'bold' }]}>Date</Text>
                            <Text style={styles.colorWhite}>Meditation Streak: 6 days</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={[inStyles.btnAvatar, styles.bgColorPrimary]} onPress={showAvatarModal}>
                        <Text style={styles.colorWhite}>Avatar</Text>
                    </TouchableOpacity>

                    {/* <Text>{ route.params.user }</Text> */}
                </View>

                <View style={inStyles.sec2Container}>
                    <TouchableOpacity style={[inStyles.btnFeature, styles.bgColorPrimary, styles.dropShadow]} onPress={() => (emailVerified === true ? goToMeditate() : remindVerification())}>
                        <Image style={[{ width: 100, height: 110 }]} source={meditate}/>
                        <Text style={[styles.colorWhite, { fontSize: 20, fontWeight: 'bold', marginTop: 5 }]}>Meditate</Text>
                        <Text style={[styles.colorWhite, { fontSize: 16 }]}>{'Recommend a practice for you'}</Text>
                    </TouchableOpacity>
                    <View style={inStyles.sec2SubContainer}>
                        <TouchableOpacity style={[inStyles.btnSubFeature, styles.dropShadow]} onPress={() => (emailVerified === true ? goToLibrary() : remindVerification())}>
                            <Image style={[{ width: 40, height: 40 }]} source={meditation_library}/>
                            <Text style={[styles.colorPrimary, { fontSize: 12, fontWeight: 'bold', marginTop: 5}]}>{'Meditation\nLibrary'}</Text>
                            <Text style={[styles.colorPrimary, { fontSize: 12, marginTop: 5}]}>{'Explore practice from different religions'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[inStyles.btnSubFeature, styles.dropShadow]}>
                            <Image style={[{ width: 40, height: 40 }]} source={daily_motivation}/>
                            <Text style={[styles.colorPrimary, { fontSize: 12, fontWeight: 'bold', marginTop: 5}]}>{'Daily\nMotivation'}</Text>
                            <Text style={[styles.colorPrimary, { fontSize: 12, marginTop: 5}]}>{'Start your day with a motivational quote'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const inStyles = StyleSheet.create({
    titleContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 15,
        width: 330,
    },

    sec1Container: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#2EC4B6',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 330,
    },

    sec2Container: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 330,
    },

    sec2SubContainer: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 330,
    },

    progressContainer: {
        flex: 1,
        marginRight: 10,
    },

    progressContent: {
        borderRadius: 10,
        padding: 15,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#8C8C8C',
    },

    sec1Title: {
        fontSize: 14,
        paddingBottom: 5,
    },

    subtitle: {
        fontSize: 16,
        color: '#8C8C8C',
    },

    btnAvatar: {
        marginLeft: 5,
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        fontSize: 14,
        fontWeight: 'bold',
    },

    btnFeature: {
        marginLeft: 5,
        width: 330,
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 'bold',
    },

    btnSubFeature: {
        marginLeft: 5,
        width: 160,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#2EC4B6',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
