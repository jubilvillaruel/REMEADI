import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import appLogo from '../../assets/images/app_logo.png';
import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { screenHeight, screenWidth } from '../components/Dimensions';

export default function Splash() {
  return (
    <View style={[inStyles.container]}>
      <View style={[inStyles.content]}>
        <Image style={styles.app_logo} source={appLogo} />
        <Text style={[styles.colorPrimary, styles.bold, { fontSize: RFPercentage(4)}]}>REMEADI</Text>
        <Text style={{ fontSize: RFPercentage(2) }}>Uplifting spirituality through meditation</Text>
        <ActivityIndicator style={inStyles.margin_top} size="large" />
      </View>
    </View>
  )
}

const inStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    width: screenWidth('90%'),
    height: screenHeight('40%'),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  margin_top: {
    marginTop: 50
  }
});