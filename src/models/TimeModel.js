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
    console.log('from TimeModel: ', minute)
    // check if minute data type is list or number
    switch(typeof minute){
        case 'number':
            console.log('data type is number')
            break;
        case 'list':
            console.log('data type is list')
            break;
        default :
            console.log('data type is not')
            break;
    };
    
    return minute
}

export {getTimeModel}