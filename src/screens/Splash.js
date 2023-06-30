import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Splash() {
  return (
    <View>
        <Text>Getting token...</Text>
        <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({})