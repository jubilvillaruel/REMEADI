import { StyleSheet, View, Text } from 'react-native';
import { Video } from 'expo-av';
import React, { useState, useEffect } from 'react';
import { screenHeight, screenWidth } from '../../components/Dimensions';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const VideoPlayer = () => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
  
    const fetchVideoUrl = async () => {
        try {
            const storage = getStorage();
            const videoRef = ref(storage, 'rosary/mysteries/Sorrowful Mysteries of the Holy Rosary.mp4');
            const videoDownloadURL = await getDownloadURL(videoRef);
            return videoDownloadURL;
        } catch (error) {
            console.error("Error fetching video URL:", error);
            return null;
        }
    };

    const [videoUrl, setVideoUrl] = useState(null);

    useEffect(() => {
        const getVideoUrl = async () => {
            const url = await fetchVideoUrl();
            setVideoUrl(url);
        };
        getVideoUrl();
    }, []);

    if (!videoUrl) {
        return (
            <View style={inStyles.placeholder}>
                <Text>Fetching Rosary of the Day...</Text>
            </View>
        );
    }

    return (
        <Video
            ref={video}
            videoStyle={inStyles.video}
            style={inStyles.videoContainer}
            source={{ uri: videoUrl }}
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

    placeholder: {
        width: screenWidth('100%'),
        height: screenHeight('50%'),
        alignItems: 'center',
        justifyContent: 'center',
    },

    video: {
        width: screenWidth('100%'),
        height: screenHeight('50%'),
        alignSelf: 'center',
    },
});

export default VideoPlayer;