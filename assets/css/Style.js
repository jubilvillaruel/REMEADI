import { StyleSheet } from 'react-native';
import { screenWidth, screenHeight } from '../../src/components/Dimensions';
import { RFPercentage } from "react-native-responsive-fontsize";

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

    containerCentered: {
        justifyContent: 'center',
        alignItems: 'center',
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
        shadowColor: 'rgba(35, 35, 35, 0.5)',
        shadowOpacity: 3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 3 },
    },

    inputContainer: {
        marginTop: 15,
        width: screenWidth('80%'),
        height: screenHeight('7%'),
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderWidth: 2,
        borderRadius: 30,
        fontSize: 14,
    },
  
    passwordInputContainer: {
        marginTop: 15,
        width: screenWidth('80%'),
        height: screenHeight('7%'),
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#000000',
        borderWidth: 2,
        borderRadius: 30,
    },

    passwordInput: {
        flex: 1,
        height: screenHeight('5%'),
        paddingHorizontal: 15,
        fontSize: 14,
    },

    passwordVisibilityButton: {
        padding: 10,
        marginRight: 5,
    },
    
    passwordVisibilityButtonText: {
        fontSize: RFPercentage(2),
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
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth('90%'),
    },

    religionContent: {
        flex: 1,
        flexDirection: 'row',
    },

    medContainer: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth('90%'),
        height: screenHeight('40%'),
    },

    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },

    dividerLine: {
        width: screenWidth('35%'),
        height: 4,
        borderRadius: 10,
        backgroundColor: '#FF9F1C',
        zIndex: 1,
    },
    
    dividerText: {
        paddingHorizontal: 10,
        fontSize: RFPercentage(2),
        fontWeight: 'bold',
    },

    activityIndicator : {
        position:'absolute', 
        display:'none', 
        zIndex:999, 
        backgroundColor: 'black', 
        opacity: 0.5, 
        width:screenWidth('100%'), 
        height:screenHeight('100%')
    },
});

export { styles }