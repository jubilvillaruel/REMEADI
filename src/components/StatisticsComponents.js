import { View, Text, StyleSheet } from "react-native"
import { styles } from "../../assets/css/Style"

const StatisticsHeader = ({int, label, descs}) => {
    return (
        <View style={[inStyles.sectionContainer]}>
            <Text style={[styles.colorPrimary, styles.header, styles.bold]}>{descs}</Text>    
            <Text style={[styles.bold,{fontSize:32}]}>{int} {label}</Text>
        </View>
    )
}

const StatisticsGraph = () => {

}

const inStyles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#2EC4B6',
        padding: 15,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export {StatisticsHeader}