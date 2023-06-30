import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Switch, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

import { styles } from './../../assets/css/Style';
import { auth } from '../../firebase';

export default function Account({ navigation, route }) {
    const { setUserToken } = route.params;

    const [vol, setVol] = useState(0);
    const [notif, notifToggle] = useState(true);
    const [vib, vibToggle] = useState(true);
    const toggleNotif = () => notifToggle(previousState => !previousState);
    const toggleVib = () => vibToggle(previousState => !previousState);

    const handleLogout = () => {
        console.log('logout pressed')
        auth.signOut()
        setUserToken(null)
    }

    const goToEditAccount = () => {
        navigation.navigate('EditAccount');
    };

    const goToSignIn = () => {
        navigation.navigate('SignIn');
    };

    return (
        <SafeAreaView style={{ top: 0, backgroundColor: '#FFFFFF' }}>
            <View style={[ styles.dropShadow, { padding: 20, width: '100%' }]}>
                <Text style={[ inStyles.title, styles.colorPrimary]}>System</Text>
                <View style={inStyles.optionContainer}>
                    <Text style={{ fontWeight: '500' }}>Notifications</Text>
                    <Switch
                        style={inStyles.toggle}
                        thumbColor={notif ? '#000000' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleNotif}
                        value={notif}
                    />
                </View>
                <View style={inStyles.optionContainer}>
                    <Text style={{ fontWeight: '500' }}>Vibrate on notification</Text>
                    <Switch
                        style={inStyles.toggle}
                        thumbColor={vib ? '#000000' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleVib}
                        value={vib}
                    />
                </View>
                <View style={inStyles.optionContainer}>
                    <Text style={{ fontWeight: '500' }}>App Volume</Text>
                    <Slider
                        style={inStyles.volSlider}
                        value={100}
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        onValueChange={(value)=>setVol(value)}
                        thumbTintColor='#2EC4B6'>
                    </Slider>
                </View>
            </View>

            <View style={[ styles.dropShadow, { padding: 20, width: '100%' }]}>
                <Text style={[ inStyles.title, styles.colorPrimary]}>Profile</Text>
                <TouchableOpacity style={inStyles.optionContainer} onPress={goToEditAccount}>
                    <Text style={{ fontWeight: '500' }}>Edit Account Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={inStyles.optionContainer}>
                    <Text style={{ fontWeight: '500' }}>Switch Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={inStyles.optionContainer} onPress={handleLogout}>
                    <Text style={{ color: 'red', fontWeight: '500' }}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const inStyles = StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        marginHorizontal: 5,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    volSlider: {
        width: 120,
        height: 50,
        right: 10,
        position: 'absolute',
    },

    toggle: {
        right: 10,
        position: 'absolute',
    }
});