import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';

import { styles } from '../../assets/css/Style';
import { LibraryCard } from '../components/cards';

// Religion logos
import christianity_logo from '../../assets/images/religion/christianity_logo.png';
import islam_logo from '../../assets/images/religion/islam_logo.png';
import hinduism_logo from '../../assets/images/religion/hinduism_logo.png';
import buddhism_logo from '../../assets/images/religion/buddhism_logo.png';
import judaism_logo from '../../assets/images/religion/judaism_logo.png';

// Christianity
import christianity_1 from '../../assets/images/christianity/christianity_1.png';
import christianity_2 from '../../assets/images/christianity/christianity_2.png';
import christianity_3 from '../../assets/images/christianity/christianity_3.png';
import christianity_4 from '../../assets/images/christianity/christianity_4.png';

// Islam
import islam_1 from '../../assets/images/islam/islam_1.png';
import islam_2 from '../../assets/images/islam/islam_2.png';
import islam_3 from '../../assets/images/islam/islam_3.png';
import islam_4 from '../../assets/images/islam/islam_4.png';

// Hinduism
import hinduism_1 from '../../assets/images/hinduism/hinduism_1.png';
import hinduism_2 from '../../assets/images/hinduism/hinduism_2.png';
import hinduism_3 from '../../assets/images/hinduism/hinduism_3.png';

// Buddhism
import buddhism_1 from '../../assets/images/buddhism/buddhism_1.png';
import buddhism_2 from '../../assets/images/buddhism/buddhism_2.png';
import buddhism_3 from '../../assets/images/buddhism/buddhism_3.png';
import buddhism_4 from '../../assets/images/buddhism/buddhism_4.png';
import buddhism_5 from '../../assets/images/buddhism/buddhism_5.png';

// Judaism
import judaism_1 from '../../assets/images/judaism/judaism_1.png';
import judaism_2 from '../../assets/images/judaism/judaism_2.png';
import judaism_3 from '../../assets/images/judaism/judaism_3.png';

export default function MedLibrary( {navigation}) {

  const goToGuide = () => {
    navigation.navigate('Guide');
  };

  return (
    <SafeAreaView style={styles.screenCenter}>
      <ScrollView showsVerticalScrollIndicator={false} style={[{ marginBottom: 15 }]}>
        <View style={[{ marginTop: 10 }]}>
          <View style={inStyles.religionContainer}>
            <View style={inStyles.religionContent}>
              <Image style={[{ width: 23, height: 32 }]} source={christianity_logo}/>
              <Text style={[styles.colorPrimary, { fontSize: 24, fontWeight: 'bold', marginHorizontal: 10 }]}>Christianity</Text>
            </View>
          </View>

          <View style={inStyles.medContainer}>
            <LibraryCard title='Lectio Divina' type='Spiritual' titleSize={13} typeSize={10} image={christianity_1} onPress={goToGuide}></LibraryCard>
            <LibraryCard title='Christian Meditation' type='Mantra' titleSize={13} typeSize={10} image={christianity_2} onPress={goToGuide}></LibraryCard>
          </View>

          <View style={inStyles.medContainer}>
            <LibraryCard title='Examen' type='Mindfulness, Visualization' titleSize={13} typeSize={10} image={christianity_3} onPress={goToGuide}></LibraryCard>
            <LibraryCard title='Rosary' type='Focused, Loving-kindness' titleSize={13} typeSize={10} image={christianity_4} onPress={goToGuide}></LibraryCard>
          </View>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={inStyles.religionContainer}>
            <View style={inStyles.religionContent}>
              <Image style={[{ width: 33, height: 36 }]} source={islam_logo}/>
              <Text style={[styles.colorPrimary, { fontSize: 24, fontWeight: 'bold', marginHorizontal: 10 }]}>Islam</Text>
            </View>
          </View>

          <View style={inStyles.medContainer}>
            <LibraryCard title='Taffakur' type='Mindfulness, Spiritual' titleSize={13} typeSize={10} image={islam_1} onPress={goToGuide}></LibraryCard>
            <LibraryCard title='Dhikr' type='Mantra' titleSize={13} typeSize={10} image={islam_2} onPress={goToGuide}></LibraryCard>
          </View>

          <View style={inStyles.medContainer}>
            <LibraryCard title='Muraqaba' type='Focused' titleSize={13} typeSize={10} image={islam_3} onPress={goToGuide}></LibraryCard>
            <LibraryCard title='Sufi Breathing' type='Visualization' titleSize={13} typeSize={10} image={islam_4} onPress={goToGuide}></LibraryCard>
          </View>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={inStyles.religionContainer}>
            <View style={inStyles.religionContent}>
              <Image style={[{ width: 35, height: 36 }]} source={hinduism_logo}/>
              <Text style={[styles.colorPrimary, { fontSize: 24, fontWeight: 'bold', marginHorizontal: 10 }]}>Hinduism</Text>
            </View>
          </View>

          <View style={inStyles.medContainer}>
            <LibraryCard title='Hatha Yoga' type='Movement, Mindfulness, Spiritual' titleSize={13} typeSize={8} image={hinduism_1} onPress={goToGuide}></LibraryCard>
            <LibraryCard title='Kriya Yoga' type='Focused' titleSize={13} typeSize={10} image={hinduism_2} onPress={goToGuide}></LibraryCard>
          </View>

          <View style={{ marginTop: 5 }}>
            <LibraryCard title='Chakra' type='Visualization' titleSize={13} typeSize={10} image={hinduism_3} onPress={goToGuide}></LibraryCard>
          </View>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={inStyles.religionContainer}>
            <View style={inStyles.religionContent}>
              <Image style={[{ width: 36, height: 36 }]} source={buddhism_logo}/>
              <Text style={[styles.colorPrimary, { fontSize: 24, fontWeight: 'bold', marginHorizontal: 10 }]}>Buddhism</Text>
            </View>
          </View>

          <View style={inStyles.medContainer}>
            <LibraryCard title='Breath' type='Focused' titleSize={13} typeSize={10} image={buddhism_1} onPress={goToGuide}></LibraryCard>
            <LibraryCard title='Walk' type='Movement' titleSize={13} typeSize={10} image={buddhism_2} onPress={goToGuide}></LibraryCard>
          </View>

          <View style={inStyles.medContainer}>
            <LibraryCard title='Tonglen' type='Loving-kindness, Visualization' titleSize={13} typeSize={10} image={buddhism_3} onPress={goToGuide}></LibraryCard>
            <LibraryCard title='Metta' type='Spiritual, Mantra' titleSize={13} typeSize={10} image={buddhism_4} onPress={goToGuide}></LibraryCard>
          </View>

          <View style={{ marginTop: 5 }}>
            <LibraryCard title='Body Scan' type='Mindfulness, Relaxation' titleSize={13} typeSize={10} image={buddhism_5} onPress={goToGuide}></LibraryCard>
          </View>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={inStyles.religionContainer}>
            <View style={inStyles.religionContent}>
              <Image style={[{ width: 32, height: 36 }]} source={judaism_logo}/>
              <Text style={[styles.colorPrimary, { fontSize: 24, fontWeight: 'bold', marginHorizontal: 10 }]}>Judaism</Text>
            </View>
          </View>

          <View style={inStyles.medContainer}>
            <LibraryCard title='Hitbodedut' type='Spiritual' titleSize={13} typeSize={10} image={judaism_1} onPress={goToGuide}></LibraryCard>
            <LibraryCard title='Kabbalistic/Chassidic' type='Visualization' titleSize={13} typeSize={10} image={judaism_2} onPress={goToGuide}></LibraryCard>
          </View>

          <View style={{ marginTop: 5 }}>
            <LibraryCard title='Shema' type='Focused' titleSize={13} typeSize={10} image={judaism_3} onPress={goToGuide}></LibraryCard>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const inStyles = StyleSheet.create({
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