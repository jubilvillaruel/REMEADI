import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { ImageCard } from '../components/Cards';

import { styles } from '../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { timeDB2 } from '../Data/LocalDB';
import { meditationImgDB } from '../Data/ImageDB';
import { meditationReligionDB, meditationTypeDB } from '../Data/TypeDB';
import { screenWidth } from '../components/Dimensions';

export default function ExpertReligion({ navigation, route }) {
    const { data } = route.params;

    const goToGuide = (title, guideImg, bia) => {
        const data = {
            title: title, 
            guideImg: guideImg,
            bia: bia
        };
        navigation.navigate('Guide', {data});
    };

    const getMeditationType = (title) => {
        return meditationTypeDB[title] || 'Unknown';
    };

    const getMeditationReligion = (title) => {
        return meditationReligionDB[title] || 'Unknown';
    };

    const getOtherPracticesFromSameReligion = () => {
        const religion = getMeditationReligion(data.title);
        const practices = Object.keys(meditationReligionDB);

        if (practices && practices.length > 0) {
            const otherPractices = practices
            .filter((practice) => meditationReligionDB[practice] === religion && practice !== data.title);

            const rows = chunkArray(otherPractices, 2);

            return rows.map((row, index) => (
                <View key={index} style={inStyles.practiceRow}>
                    {row.map((practice) => (
                        <View key={practice} style={inStyles.practiceCard}>
                            <ImageCard
                                title={practice}
                                type={getMeditationType(practice)}
                                titleSize={RFPercentage(1.6)}
                                typeSize={RFPercentage(1)}
                                image={meditationImgDB[practice]}
                                onPress={() => { goToGuide(practice, meditationImgDB[practice], Object.keys(timeDB2).includes(practice)) }}/>
                        </View>
                    ))}
                </View>
            ));
        }

        return null;
    };

    const chunkArray = (arr, size) => {
        const chunkedArr = [];
        for (let i = 0; i < arr.length; i += size) {
            chunkedArr.push(arr.slice(i, i + size));
        }
        return chunkedArr;
    };

    return (
        <SafeAreaView style={styles.screenCenter}>
            <ScrollView showsVerticalScrollIndicator={false} style={[{ marginBottom: 15 }]}>
                <View style={[{ marginTop: 15 }]}>
                    {getOtherPracticesFromSameReligion()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const inStyles = StyleSheet.create({
    practiceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: screenWidth('90%'),
        marginBottom: 10,
    },

    practiceCard: {
        flex: 1,
        marginHorizontal: 8,
        marginBottom: 5,
    },
});