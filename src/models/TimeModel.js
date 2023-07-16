import { timeDB } from "../Data/LocalDB"

const setTimeModel = () => {

}

const getTimeByBIA = () => {

}

const getTimeByAge = () => {
    
}

const getTimeByConstantDuration = () => {
    
}

const getTimeModel = (practiceTitle) => {
    const minute = timeDB[practiceTitle]
    // console.log('from TimeModel: ', minute)
    // check if minute data type is list or number
    switch(typeof minute){
        case 'number':
            console.log('data type is number')
            break;
            // check type of minute is list/array
        case 'object':
            if (Array.isArray(minute)) {
                // Handle if minute is an array
                console.log('Minute is an array:', minute);
                // let user choose if A, B or C
            } else {
                // Handle if minute is an object
                console.log('Minute is an object:', minute);
            }
            break;
        default :
            console.log('Unknown data type for minute(null)')
            break;
    };
    
    return minute
}

export {getTimeModel}