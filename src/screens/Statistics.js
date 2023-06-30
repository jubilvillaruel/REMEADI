import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import PieChart from 'react-native-pie-chart';

import { styles } from './../../assets/css/Style';

import appLogo from './../../assets/images/app_logo.png';

export default function Statistics() {
    const widthAndHeight = 120
    const series = [177, 121, 65, 43, 43]
    const sliceColor = ['#04BFDA', '#8FD3D2', '#F27F77', '#FF9F1C', '#FF0000']

    return (
        <SafeAreaView style={[styles.screen, { padding: 15 }]}>
            <View style={inStyles.titleContainer}>
                <Text style={[styles.colorPrimary, inStyles.title]}>Statistics</Text>
            </View>

            <View style={{ width: '100%', flex: 1, flexDirection: 'row' }}>
                <View style={[styles.sectionContainer, styles.dropShadow]}>
                    <Text style={[styles.colorPrimary, styles.bold]}>Total Sessions</Text>
                    <Text style={styles.bold}>466</Text>
                </View>
                <View style={[styles.sectionContainer, styles.dropShadow]}>
                    <Text style={[styles.colorPrimary, styles.bold]}>Meditation Duration</Text>
                    <Text style={styles.bold}>1020 min</Text>
                </View>
            </View>

            <View style={{ width: '100%' }}>
                <View style={[styles.sectionContainer, styles.dropShadow, { gap: 5 }]}>
                    <Text style={[styles.colorPrimary, styles.bold]}>Sessions per Religion</Text>
                    <PieChart
                        widthAndHeight={widthAndHeight}
                        series={series}
                        sliceColor={sliceColor}
                        coverRadius={0.60}
                        style={{ marginBottom: 10 }}
                    />
                    <View style={inStyles.legendContainer}>
                        <Text style={[styles.bold, { color: '#04BFDA' }]}>○ Christianity    </Text>
                        <Text style={[styles.bold, { color: '#8FD3D2' }]}>○ Islam   </Text>
                        <Text style={[styles.bold, { color: '#F27F77' }]}>○ Hinduism    </Text>
                    </View>
                    <View style={inStyles.legendContainer}>
                        <Text style={[styles.bold, { color: '#FF9F1C' }]}>○ Buddhism    </Text>
                        <Text style={[styles.bold, { color: '#FF0000' }]}>○ Judaism </Text>
                    </View>
                </View>
            </View>

            <View style={{ width: '100%' }}>
                <View style={[styles.sectionContainer, styles.dropShadow]}>
                    <Text style={[styles.colorPrimary, styles.bold]}>Top 3 Religions</Text>
                    <View style={inStyles.topContainer}>
                        <Text>Christianity</Text>
                        <Text>177</Text>
                    </View>
                    <View style={inStyles.topContainer}>
                        <Text>Islam</Text>
                        <Text>121</Text>
                    </View>
                    <View style={inStyles.topContainer}>
                        <Text>Hinduism</Text>
                        <Text>65</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const inStyles = StyleSheet.create({
    titleContainer: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    legendContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5,
    },

    topContainer: {
        flexDirection: 'row',
        marginHorizontal: 5,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
});