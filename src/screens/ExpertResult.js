import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import { ImageCard } from '../components/cards';
import { styles } from '../../assets/css/Style';

// Christianity
import christianity_1 from '../../assets/images/christianity/christianity_1.png';
import { styles } from '../../assets/css/Style';

export default function ExpertResult({ navigation }) {

  const goToGuide = () => {
    navigation.navigate('Guide');
  };

  return (
    <SafeAreaView style={styles.screenCenter}>
      <ScrollView showsVerticalScrollIndicator={false} style={[{ marginBottom: 15 }]}>
        <View style={[{ marginTop: 15 }]}>
          <View style={styles.medContainer}>
            <ImageCard
              title='Examen'
              type='Mindfulness, Visualization'
              titleSize={20}
              typeSize={16}
              image={christianity_1}
              width={320}
              height={300}
              onPress={goToGuide}></ImageCard>
          </View>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={styles.religionContainer}>
            <View style={styles.religionContent}>
              <Text style={[styles.colorPrimary, { fontSize: 16, fontWeight: 'bold' }]}>Other Practices from Christianity</Text>
            </View>
          </View>

          <View style={styles.medContainer}>
            <ImageCard title='Taffakur' type='Mindfulness, Spiritual' titleSize={13} typeSize={10} image={christianity_1} onPress={goToGuide}></ImageCard>
            <ImageCard title='Dhikr' type='Mantra' titleSize={13} typeSize={10} image={christianity_1} onPress={goToGuide}></ImageCard>
          </View>

          <View style={{ marginTop: 5 }}>
            <ImageCard title='Muraqaba' type='Focused' titleSize={13} typeSize={10} image={christianity_1} onPress={goToGuide}></ImageCard>
          </View>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={styles.religionContainer}>
            <View style={styles.religionContent}>
              <Text style={[styles.colorPrimary, { fontSize: 16, fontWeight: 'bold' }]}>Other Practices of the same Meditation Type</Text>
            </View>
          </View>

          <View style={styles.medContainer}>
            <ImageCard title='Hatha Yoga' type='Movement, Mindfulness, Spiritual' titleSize={13} typeSize={8} image={christianity_1} onPress={goToGuide}></ImageCard>
            <ImageCard title='Kriya Yoga' type='Focused' titleSize={13} typeSize={10} image={christianity_1} onPress={goToGuide}></ImageCard>
          </View>

          <View style={{ marginTop: 5 }}>
            <ImageCard title='Chakra' type='Visualization' titleSize={13} typeSize={10} image={christianity_1} onPress={goToGuide}></ImageCard>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}