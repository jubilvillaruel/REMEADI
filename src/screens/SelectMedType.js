import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { screenWidth, screenHeight } from '../components/dimensions';
import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';

// Meditation Type Icons

export const MedTypes = ({ meditationTypes }) => {
    const createRows = () => {
      return meditationTypes.map((types, index) => (
        <View key={index} style={inStyles.row}>
            {types.map((medType) => (
                <TouchableOpacity key={medType.id} style={[inStyles.typeCard, styles.bgColorPrimary]}>
                    <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>
                        {medType.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
      ));
    };
  
    return (
        <View style={styles.screenCenter}>
            <View style={inStyles.typeContainer}>
                {createRows()}
            </View>
        </View>
    );
  };
  

export default function SelectMedType() {

    // return (
    //     <View style={styles.screenCenter}>
    //         <View style={inStyles.typeContainer}>
    //             <View style={inStyles.row}>
    //                 <TouchableOpacity style={[inStyles.typeCard, styles.bgColorPrimary]}>
    //                     <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>Christianity</Text>
    //                 </TouchableOpacity>

    //                 <TouchableOpacity style={[inStyles.typeCard, styles.bgColorPrimary]}>
    //                     <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>Christianity</Text>
    //                 </TouchableOpacity>
    //             </View>
                
    //             <View style={inStyles.row}>
    //                 <TouchableOpacity style={[inStyles.typeCard, styles.bgColorPrimary]}>
    //                     <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>Christianity</Text>
    //                 </TouchableOpacity>

    //                 <TouchableOpacity style={[inStyles.typeCard, styles.bgColorPrimary]}>
    //                     <Text style={[styles.bold, styles.colorWhite, { fontSize: RFPercentage(2) }]}>Christianity</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         </View>
    //     </View>
    // );

    const meditationTypes = [
        [
            { id: 1, name: 'Type 1' },
            { id: 2, name: 'Type 2' },
        ],
        [
            { id: 3, name: 'Type 3' },
            { id: 4, name: 'Type 4' },
        ],
    ];

    return <MedTypes meditationTypes={meditationTypes}></MedTypes>
}

const inStyles = StyleSheet.create({
    typeCard: {
        padding: 15,
        width: screenWidth('40%'),
        height: screenHeight('18%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        textAlign: 'center',
        gap: 5,
    },

    typeContainer: {
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