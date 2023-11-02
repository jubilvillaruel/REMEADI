import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { styles } from '../../assets/css/Style';
import { screenHeight, screenWidth } from './Dimensions';
import { RFPercentage } from 'react-native-responsive-fontsize';


// Clickables
export const PrimaryButton = ({ text, textColor, textSize, width, height, borderRad, borderW, onPress }) => {
    const buttonStyle = {
        width: width,
        height: height,
        borderRadius: borderRad,
        borderWidth: borderW,
        marginTop: 15,
    };

    return (
      <TouchableOpacity style={[styles.bgColorPrimary, inStyles.btnContainer, styles.dropShadow, buttonStyle]} onPress={onPress}>
        <Text style={[{ color: textColor, fontSize: textSize }, styles.bold]}>{text}</Text>
      </TouchableOpacity>
    );
};

export const SecondaryButton = ({ text, textColor, textSize, width, height, borderRad, borderW, onPress }) => {
    const buttonStyle = {
        width: width,
        height: height,
        borderRadius: borderRad,
        borderWidth: borderW,
        marginTop: 15,
    };

    return (
      <TouchableOpacity style={[styles.bgColorSecondary, inStyles.btnContainer, styles.dropShadow, buttonStyle]} onPress={onPress}>
        <Text style={[{ color: textColor, fontSize: textSize }, styles.bold]}>{text}</Text>
      </TouchableOpacity>
    );
};

export const ReligionButton = ({ text, width, height, onPress, icon }) => {
    const buttonStyle = {
        // borderWidth: borderW,
        marginTop: 15,
    };

    const religionCard = {
        padding: 15,
        flexDirection: 'row',
        width: screenWidth('82%'),
        height: screenHeight('9%'),
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 50,
        textAlign: 'center',
        gap: 5,
    }

    return (
        <TouchableOpacity style={[religionCard, buttonStyle, { marginTop: -5, backgroundColor:'#e3fffc' }]} onPress={onPress}>
            {icon && <Image style={[{ width: width, height: height, position: 'relative' }]} source={icon}/>}
            <Text style={[{ color: '#2ec4b6', fontSize: RFPercentage(2.5), fontWeight: '400', left: icon ? 10 : 35 }, icon && { position: 'absolute', left: 65 }]}>{text}</Text>
        </TouchableOpacity>
    );
};

export const IconButton = ({ text, textColor, textSize, icon, width, height, bgColor, borderRad, borderW, borderC, onPress }) => {
    const buttonStyle = {
        width: width,
        height: height,
        backgroundColor: bgColor,
        borderRadius: borderRad,
        borderWidth: borderW,
        borderColor: borderC,
        flexDirection: 'row',
        marginTop: 15,
    };

    return (
        <TouchableOpacity style={[inStyles.btnContainer, styles.dropShadow, buttonStyle]} onPress={onPress}>
            {/* <Image source={icon} style={{ width: 30, height: 30, marginRight: 8 }} /> */}
            <Text style={[{ color: textColor, fontSize: textSize }, styles.bold]}>{text}</Text>
        </TouchableOpacity>
    );
};


const inStyles = StyleSheet.create({
    btnContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
