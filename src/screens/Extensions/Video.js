import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Video } from 'expo-av';
import React from 'react';
import { screenHeight, screenWidth } from '../../components/Dimensions';
import { RFPercentage } from 'react-native-responsive-fontsize';

const VideoPlayer = () => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
  
    return (
        <Video
            ref={video}
            videoStyle={inStyles.video}
            style={inStyles.videoContainer}
            source={require('../../../assets/videos/hehehhehee.mp4')}
            useNativeControls={true}
            resizeMode="contain"
            onPlaybackStatusUpdate={setStatus}
        />
    );
};

const inStyles = StyleSheet.create({
    videoContainer: {
        width: screenWidth('100%'),
        height: screenHeight('50%'),
        justifyContent: 'center',
        backgroundColor: 'rgba(35, 35, 35, 0.5)',
    },

    video: {
        width: screenWidth('100%'),
        height: screenHeight('50%'),
        alignSelf: 'center',
    },
});

export default VideoPlayer;