import { timeDB, timeDB2 } from "../Data/LocalDB"
import { getDatabase, onValue, ref } from "firebase/database"
import { auth } from "../../firebase"

const getTimeModel = (practiceTitle) => {
    const minute = timeDB[practiceTitle]
    return minute
}

const getTimeModel2 = (practiceTitle,bia) => {
    const minute = timeDB2[practiceTitle][bia]
    return (minute * 60000)
}

const timeToMilliseconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
};

const millisecondsToTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const getTimesPracticed = async (practiceTitle) => {
    const historyRef = ref(getDatabase(), 'histories');
    try {
        // Create a Promise wrapper for the onValue function
        const snapshot = await new Promise((resolve, reject) => {
            onValue(historyRef, resolve, reject);
        });

        const dataFromFirebase = snapshot.val();
        const uid = auth.currentUser.uid;

        const sessionData = Object.keys(dataFromFirebase)
        .filter((sessionId) => dataFromFirebase[sessionId].uid === uid)
        .map((sessionId) => ({
            sessionId,
            uid: dataFromFirebase[sessionId].uid,
            religion: dataFromFirebase[sessionId].religion,
            practiceTitle: dataFromFirebase[sessionId].practiceTitle,
            duration: dataFromFirebase[sessionId].duration,
        }));

        let count = 0
        sessionData.forEach((session) => {
            if (session['practiceTitle'] == practiceTitle){
                count ++
            }        
        })
        const finalCount = count
        console.log('count: ', finalCount)
        return finalCount
    } catch (error) {
        return 0
    }
}
  

export {getTimeModel, getTimeModel2, timeToMilliseconds, millisecondsToTime, getTimesPracticed}