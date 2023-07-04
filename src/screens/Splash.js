import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import appLogo from '../../assets/images/app_logo.png';
import { styles } from '../../assets/css/Style';

export default function Splash() {
  return (
    <View style={[inStyles.container, {}]}>
      <Image style={styles.app_logo} source={appLogo} />
      <Text style={[styles.colorPrimary, { fontSize: 40, fontWeight: 'bold' }]}>REMEADI</Text>
      {/* react native material */}
      <ActivityIndicator style={inStyles.margin_top} size="large" />
    </View>
  )
}

const inStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  margin_top: {
    marginTop: 50
  }
});