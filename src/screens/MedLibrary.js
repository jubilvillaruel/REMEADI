import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';

import { styles } from '../../assets/css/Style';

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

export default function MedLibrary() {

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} style={[{ marginBottom: 15 }]}>
        <View style={[{ marginTop: 10 }]}>
          <View style={inStyles.religionContainer}>
            <View style={inStyles.religionContent}>
              <Image style={[{ width: 23, height: 32 }]} source={christianity_logo}/>
              <Text style={[styles.colorPrimary, { fontSize: 24, fontWeight: 'bold', marginHorizontal: 10 }]}>Christianity</Text>
            </View>
          </View>

          <View style={inStyles.medContainer}>
            <TouchableOpacity>
              <View>
                <ImageBackground style={[inStyles.medItem]} source={christianity_1}>
                  <View style={inStyles.medContent}>
                    <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Lectio Divina</Text>
                    <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Spiritual</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <ImageBackground style={[inStyles.medItem]} source={christianity_2}>
                  <View style={inStyles.medContent}>
                    <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Bible Meditation</Text>
                    <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Mantra</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>

          <View style={inStyles.medContainer}>
            <TouchableOpacity>
              <View>
                <ImageBackground style={[inStyles.medItem]} source={christianity_3}>
                  <View style={inStyles.medContent}>
                    <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Examen</Text>
                    <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Mindfulness, Visualization</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <ImageBackground style={[inStyles.medItem]} source={christianity_4}>
                  <View style={inStyles.medContent}>
                    <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Rosary</Text>
                    <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Focused, Loving-kindness</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
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
            <TouchableOpacity>
              <View>
                <ImageBackground style={[inStyles.medItem]} source={islam_1}>
                  <View style={inStyles.medContent}>
                    <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Taffakur</Text>
                    <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Mindfulness, Spiritual</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <ImageBackground style={[inStyles.medItem]} source={islam_2}>
                  <View style={inStyles.medContent}>
                    <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Dhikr</Text>
                    <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Mantra</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>

          <View style={inStyles.medContainer}>
            <TouchableOpacity>
              <View>
                <ImageBackground style={[inStyles.medItem]} source={islam_3}>
                  <View style={inStyles.medContent}>
                    <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Muraqaba</Text>
                    <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Focused</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <ImageBackground style={[inStyles.medItem]} source={islam_4}>
                  <View style={inStyles.medContent}>
                    <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Sufi Breathing</Text>
                    <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Visualization</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
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
            <TouchableOpacity>
              <View>
                <ImageBackground style={[inStyles.medItem]} source={hinduism_1}>
                  <View style={inStyles.medContent}>
                    <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Hatha Yoga</Text>
                    <Text style={[ styles.colorWhite, { fontSize: 8 }]}>Movement, Mindfulness, Spiritual</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <ImageBackground style={[inStyles.medItem]} source={hinduism_2}>
                  <View style={inStyles.medContent}>
                    <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Kriya Yoga</Text>
                    <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Focused</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[{ marginTop: 5 }]}>
            <View>
              <ImageBackground style={[inStyles.medItem]} source={hinduism_3}>
                <View style={inStyles.medContent}>
                  <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Chakra</Text>
                  <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Visualization</Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={inStyles.religionContainer}>
            <View style={inStyles.religionContent}>
              <Image style={[{ width: 36, height: 36 }]} source={buddhism_logo}/>
              <Text style={[styles.colorPrimary, { fontSize: 24, fontWeight: 'bold', marginHorizontal: 10 }]}>Buddhism</Text>
            </View>
          </View>

          <View style={inStyles.medContainer}>
            <TouchableOpacity>
              <View>
                <ImageBackground style={[inStyles.medItem]} source={buddhism_1}>
                  <View style={inStyles.medContent}>
                    <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Breath</Text>
                    <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Focused</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <ImageBackground style={[inStyles.medItem]} source={buddhism_2}>
                  <View style={inStyles.medContent}>
                    <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Walk</Text>
                    <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Movement</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>

          <View style={inStyles.medContainer}>
            <TouchableOpacity>
              <View>
                <ImageBackground style={[inStyles.medItem]} source={buddhism_3}>
                  <View style={inStyles.medContent}>
                    <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Tonglen</Text>
                    <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Loving-kindness, Visualization</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <ImageBackground style={[inStyles.medItem]} source={buddhism_4}>
                  <View style={inStyles.medContent}>
                    <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Metta</Text>
                    <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Spiritual, Mantra</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[{ marginTop: 5 }]}>
            <View>
              <ImageBackground style={[inStyles.medItem]} source={buddhism_5}>
                <View style={inStyles.medContent}>
                  <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Body Scan</Text>
                  <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Mindfulness, Relaxation</Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[{ marginTop: 15 }]}>
          <View style={inStyles.religionContainer}>
            <View style={inStyles.religionContent}>
              <Image style={[{ width: 32, height: 36 }]} source={judaism_logo}/>
              <Text style={[styles.colorPrimary, { fontSize: 24, fontWeight: 'bold', marginHorizontal: 10 }]}>Judaism</Text>
            </View>
          </View>

          <View style={inStyles.medContainer}>
            <TouchableOpacity>
              <View>
                <ImageBackground style={[inStyles.medItem]} source={judaism_1}>
                  <View style={inStyles.medContent}>
                    <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Hitbodedut</Text>
                    <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Spiritual</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <ImageBackground style={[inStyles.medItem]} source={judaism_2}>
                  <View style={inStyles.medContent}>
                    <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Kabbalistic/Chassidic</Text>
                    <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Visualization</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[{ marginTop: 5 }]}>
            <View>
              <ImageBackground style={[inStyles.medItem]} source={judaism_3}>
                <View style={inStyles.medContent}>
                  <Text style={[ styles.colorWhite, { fontSize: 13, fontWeight: 'bold' }]}>Shema</Text>
                  <Text style={[ styles.colorWhite, { fontSize: 10 }]}>Focused</Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
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
    flexDirection: 'row',
  },

  medContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 330,
  },

  medItem: {
    width: 160,
    height: 140,
    marginRight: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  medContent: {
    position: 'absolute',
    left: 15,
    bottom: 15,
  },
});