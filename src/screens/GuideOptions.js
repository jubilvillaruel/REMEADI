import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { screenWidth, screenHeight } from '../components/Dimensions';
import { RFPercentage } from "react-native-responsive-fontsize";

import { styles } from '../../assets/css/Style';
import { TextCard, IconCard } from '../components/Cards';
import locked from '../../assets/images/locked.png';

export const Options = ({ title }) => {
  return (
    <SafeAreaView style={styles.screen}>
        <Text style={[styles.colorPrimary, inStyles.title]}>{title}</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={inStyles.cardContainer}>
            <TextCard title='Title' desc='Description'></TextCard>
            <IconCard title='Title' desc='Description' icon={locked}></IconCard>
        </ScrollView>
    </SafeAreaView>
  );
};

export default function GuideOptions() {
  return (
    <Options title='Title'></Options>
  );
}

const inStyles = StyleSheet.create({
  title: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    paddingTop: 15,
  },

  cardContainer: {
    padding: 15,
    width: screenWidth('90%'),
    height: screenHeight('20%'),
  },
});