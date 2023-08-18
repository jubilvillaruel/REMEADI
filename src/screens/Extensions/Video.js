import { StyleSheet, View, Text } from 'react-native';
import { Video } from 'expo-av';
import React, { useState, useEffect } from 'react';
import { screenHeight, screenWidth } from '../../components/Dimensions';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { styles } from '../../../assets/css/Style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { dayOfWeekMap } from '../../Data/LocalDB';

const VideoPlayer = () => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const fetchVideoUrl = async () => {
        try {
            // Get the current day of the week (0-6/Sunday-Saturday)
            const currentDayOfWeek = new Date().getDay();

            // Get the file name based on the current day of the week
            const fileName = dayOfWeekMap[currentDayOfWeek];
            const fullPath = `rosary/mysteries/${fileName}`;

            const storage = getStorage();
            const videoRef = ref(storage, fullPath);
            const videoDownloadURL = await getDownloadURL(videoRef);
            return videoDownloadURL;
        } 
        catch (error) {
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
        width: screenWidth('90%'),
        height: screenHeight('50%'),
        justifyContent: 'center',
        alignItems: 'center',
    },

    placeholder: {
        width: screenWidth('90%'),
        height: screenHeight('50%'),
        alignItems: 'center',
        justifyContent: 'center',
    },

    video: {
        width: screenWidth('90%'),
        height: screenHeight('50%'),
        alignSelf: 'center',
    },
});

export default VideoPlayer;