import React, { useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
  } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
  
//importing library to use Stopwatch and Timer
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { screenHeight, screenWidth } from '../../components/Dimensions';


export default function StopwatchSession( {navigation}) {
    const [isTimerStart, setIsTimerStart] = useState(false);
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [timerDuration, setTimerDuration] = useState(5000);
    const [resetTimer, setResetTimer] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);

    const [ duration, setDuration ] = useState()

    const gotoConcludeSession = () => {
        const data = {
            practiceTitle: 'Examen',
            stopwatchTime: duration
            // meditation type
            // times practiced
        };
        navigation.navigate('ConcludeSession', {data});
    }

    const handleDone = () => {
        // stop stopwatch
        // ... code here
        setIsStopwatchStart(false);
        setResetStopwatch(false);
        
        gotoConcludeSession()
      }
  
    return (
      <SafeAreaView style={inStyles.container}>
        <View style={inStyles.container}>
          <Text style={inStyles.title}>
            Example of React Native Timer and Stopwatch
          </Text>
          <View style={inStyles.sectionStyle}>
            <Stopwatch
              laps
            //   msecs
              start={isStopwatchStart}
              //To start
              reset={resetStopwatch}
              //To reset
              options={options}
              //options for the styling
              getTime={(time) => {
                console.log(time);
                setDuration(time)
              }}
            />
            <TouchableHighlight
              onPress={() => {
                setIsStopwatchStart(!isStopwatchStart);
                setResetStopwatch(false);
              }}>
              <Text style={inStyles.buttonText}>
                {!isStopwatchStart ? 'START' : 'STOP'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                setIsStopwatchStart(false);
                setResetStopwatch(true);
              }}>
              <Text style={inStyles.buttonText}>RESET</Text>
            </TouchableHighlight>
          </View>

          <View style={inStyles.bottomContainer}>      
            <TouchableOpacity style={[inStyles.dropShadow, inStyles.bgColorPrimary, inStyles.btnEnd]} onPress={() => {handleDone()}}>
              <Text style={[{ fontSize: RFPercentage(3) }, inStyles.colorWhite, inStyles.bold]}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  
}

const inStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
    sectionStyle: {
        flex: 1,
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        marginTop: 10,
    },
    bottomContainer: {
        width: screenWidth('100%'),
        height: screenHeight('10%'),
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(35, 35, 35, 0.5)',
        shadowOpacity: 3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: -3 },
    },
});
      
const options = {
    container: {
        backgroundColor: '#FF0000',
        padding: 5,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        color: '#FFF',
        marginLeft: 7,
    },
}
