import { timeDB, timeDB2 } from "../Data/LocalDB"

const getTimeModel = (practiceTitle) => {
    const minute = timeDB[practiceTitle]
    return minute
}

const getTimeModel2 = (practiceTitle,bia) => {
    const minute = timeDB2[practiceTitle][bia]
    return (minute * 60000)
}

export {getTimeModel, getTimeModel2}