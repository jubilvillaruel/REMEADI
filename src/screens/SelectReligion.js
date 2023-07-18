import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { screenWidth, screenHeight } from '../components/Dimensions';
import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';

// Religion logos
import christianity_logo_w from '../../assets/images/religion/christianity_logo_w.png';
import islam_logo_w from '../../assets/images/religion/islam_logo_w.png';
import hinduism_logo_w from '../../assets/images/religion/hinduism_logo_w.png';
import buddhism_logo_w from '../../assets/images/religion/buddhism_logo_w.png';
import judaism_logo_w from '../../assets/images/religion/judaism_logo_w.png';

export default function SelectReligion({ navigation }) {

    const goToSelectMedType = () => {
        navigation.navigate('SelectMedType');
    };

    return (
        <View style={styles.screenCenter}>
            <View style={inStyles.religionContainer}>
                <View style={inStyles.row}>
                    <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={goToSelectMedType}>
                        <Image style={[{ width: 50, height: 70 }]} source={christianity_logo_w}/>
                        <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>Christianity</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={goToSelectMedType}>
                        <Image style={[{ width: 65, height: 70 }]} source={islam_logo_w}/>
                        <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>Islam</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={inStyles.row}>
                    <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={goToSelectMedType}>
                        <Image style={[{ width: 70, height: 70 }]} source={hinduism_logo_w}/>
                        <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>Hinduism</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={goToSelectMedType}>
                        <Image style={[{ width: 70, height: 70 }]} source={buddhism_logo_w}/>
                        <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>Buddhism</Text>
                    </TouchableOpacity>
                </View>

                <View style={ { alignSelf: 'flex-start', paddingHorizontal: 15 }}>
                    <TouchableOpacity style={[inStyles.religionCard, styles.bgColorPrimary]} onPress={goToSelectMedType}>
                        <Image style={[{ width: 65, height: 70 }]} source={judaism_logo_w}/>
                        <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>Judaism</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const inStyles = StyleSheet.create({
    religionCard: {
        padding: 15,
        width: screenWidth('40%'),
        height: screenHeight('18%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        textAlign: 'center',
        gap: 5,
    },

    religionContainer: {
        padding: 15,
        width: screenWidth('100%'),
        height: screenHeight('90%'),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },

});