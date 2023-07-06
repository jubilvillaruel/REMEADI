import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Session({route}) {
    const {title} = route.params
    return (
        <View>
        <Text>Session: + {route} </Text>
        
        </View>
    )
}

const styles = StyleSheet.create({})