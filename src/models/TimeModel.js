import { timeDB, timeDB2 } from "../Data/LocalDB"

const getTimeModel = (practiceTitle) => {
    const minute = timeDB[practiceTitle]
    return minute
}

const getTimeModel2 = (practiceTitle,bia) => {
    const minute = timeDB2[practiceTitle][bia]
    return (minute * 60000)
}

const timeToMilliseconds = (timeString) => {
    console.log(timeString)
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
  

export {getTimeModel, getTimeModel2, timeToMilliseconds, millisecondsToTime}