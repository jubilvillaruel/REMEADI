import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    screen: {
        top: 0,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    screenCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
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
    
    bold: {
        fontWeight: 'bold',
    },

    dropShadow: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 3 },
    },
    sectionContainer: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#2EC4B6',
        padding: 15,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    religionContainer: {
        paddingTop: 10,
        alignItems: 'left',
        justifyContent: 'left',
        width: 330,
    },

    religionContent: {
        flex: 1,
        flexDirection: 'row',
    },

    medContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 330,
    },
});

export { styles }
