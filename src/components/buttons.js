import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { styles } from './../../assets/css/Style';

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
            <Image source={icon} style={{ width: 20, height: 20, marginRight: 8 }} />
            <Text style={[{ color: textColor, fontSize: textSize }, styles.bold]}>{text}</Text>
        </TouchableOpacity>
    );
};


const inStyles = StyleSheet.create({
    btnContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});