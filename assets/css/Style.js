import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    app_logo: {
        width: 250,
        height: 180,
    },
    bgColorPrimary: {
        backgroundColor: '#2EC4B6',
    },
    bgColorSecondary: {
        backgroundColor: "#FFBF69",
    },
    colorPrimary: {
        color: "#2EC4B6"
    },
    colorSecondary: {
        color: "#FFBF69",
    },
    colorWhite: {
        color: "#fff"
    },
    dropShadow: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 3 },
    },
});

export { styles }
