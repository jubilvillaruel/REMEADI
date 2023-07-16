import { timeDB, timeDB2 } from "../Data/LocalDB"

const getTimeModel = (practiceTitle) => {
    const minute = timeDB[practiceTitle]
    // console.log('from TimeModel: ', minute)
    // check if minute data type is list or number
    // switch(typeof minute){
    //     case 'number':
    //         console.log('data type is number')
    //         break;
    //         // check type of minute is list/array
    //     case 'object':
    //         if (Array.isArray(minute)) {
    //             // Handle if minute is an array
    //             console.log('Minute is an array:', minute);
    //             // let user choose if A, B or C
    //         } else {
    //             // Handle if minute is an object
    //             console.log('Minute is an object:', minute);
    //         }
    //         break;
    //     default :
    //         console.log('Unknown data type for minute(null)')
    //         break;
    // };
    return minute
}

const getTimeModel2 = (practiceTitle,bia) => {
    const minute = timeDB2[practiceTitle][bia]
    return (minute * 60000)
}

export {getTimeModel, getTimeModel2}