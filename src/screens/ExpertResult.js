import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';

import { styles } from '../../assets/css/Style';
import { LibraryCard } from '../components/cards';

// Christianity
import christianity_1 from '../../assets/images/christianity/christianity_1.png';

export default function ExpertResult({ navigation }) {

  const goToGuide = () => {
    navigation.navigate('Guide');
  };

  return (
    <SafeAreaView style={styles.screenCenter}>
      <ScrollView showsVerticalScrollIndicator={false} style={[{ marginBottom: 15 }]}>
        <View style={[{ marginTop: 15 }]}>
          <View style={styles.medContainer}>
            <LibraryCard
            title='Examen'
            type='Mindfulness, Visualization'
            titleSize={20}
            typeSize={16}
            image={christianity_1}
            width={320}
            height={300}
            onPress={goToGuide}></LibraryCard>
          </View>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={styles.religionContainer}>
            <View style={styles.religionContent}>
              <Text style={[styles.colorPrimary, { fontSize: 16, fontWeight: 'bold' }]}>Other Practices from Christianity</Text>
            </View>
          </View>

          <View style={styles.medContainer}>
            <LibraryCard title='Taffakur' type='Mindfulness, Spiritual' titleSize={13} typeSize={10} image={christianity_1} onPress={goToGuide}></LibraryCard>
            <LibraryCard title='Dhikr' type='Mantra' titleSize={13} typeSize={10} image={christianity_1} onPress={goToGuide}></LibraryCard>
          </View>

          <View style={{ marginTop: 5 }}>
            <LibraryCard title='Muraqaba' type='Focused' titleSize={13} typeSize={10} image={christianity_1} onPress={goToGuide}></LibraryCard>
          </View>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={styles.religionContainer}>
            <View style={styles.religionContent}>
              <Text style={[styles.colorPrimary, { fontSize: 16, fontWeight: 'bold' }]}>Other Practices of the same Meditation Type</Text>
            </View>
          </View>

          <View style={styles.medContainer}>
            <LibraryCard title='Hatha Yoga' type='Movement, Mindfulness, Spiritual' titleSize={13} typeSize={8} image={christianity_1} onPress={goToGuide}></LibraryCard>
            <LibraryCard title='Kriya Yoga' type='Focused' titleSize={13} typeSize={10} image={christianity_1} onPress={goToGuide}></LibraryCard>
          </View>

          <View style={{ marginTop: 5 }}>
            <LibraryCard title='Chakra' type='Visualization' titleSize={13} typeSize={10} image={christianity_1} onPress={goToGuide}></LibraryCard>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}